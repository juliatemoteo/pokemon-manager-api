import { PrismaClient, Prisma } from '@prisma/client';
import { ITrainerRepository } from '@domain/repositories/trainer.repository';
import { TrainerNotFoundError, TeamLimitError } from '@domain/errors/app-error';
import { PokeApiPokemon } from '@domain/gateways/poke-api.gateway';

export class PrismaTrainerRepository implements ITrainerRepository {
  constructor(private readonly db: PrismaClient) {}

  async create(data: { name: string; email: string }) {
    return this.db.trainer.create({ data });
  }

  async capture(trainerId: string, pokemon: PokeApiPokemon) {
    // A transação serializable + retry impede que capturas simultâneas ultrapassem 6.
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        return await this.db.$transaction(
          async (tx) => {
            const trainer = await tx.trainer.findUnique({
              where: { id: trainerId },
            });
            if (!trainer) throw new TrainerNotFoundError();
            const count = await tx.capture.count({
              where: { trainerId, active: true },
            });
            if (count >= 6) throw new TeamLimitError();
            return tx.capture.create({
              data: {
                trainerId,
                pokemonId: pokemon.id,
                name: pokemon.name,
                imageUrl: pokemon.imageUrl,
                types: pokemon.types,
                hp: pokemon.hp,
                attack: pokemon.attack,
                defense: pokemon.defense,
                active: true,
              },
            });
          },
          { isolationLevel: Prisma.TransactionIsolationLevel.Serializable },
        );
      } catch (err) {
        if (
          err instanceof Prisma.PrismaClientKnownRequestError &&
          err.code === 'P2034' &&
          attempt < 2
        )
          continue;
        throw err;
      }
    }
    throw new Error('Transação não concluída.');
  }

  async findTeam(trainerId: string) {
    const trainer = await this.db.trainer.findUnique({
      where: { id: trainerId },
    });
    if (!trainer) throw new TrainerNotFoundError();
    return this.db.capture.findMany({
      where: { trainerId, active: true },
      orderBy: { capturedAt: 'asc' },
    });
  }
}
