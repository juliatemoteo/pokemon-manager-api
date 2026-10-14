import { PrismaClient } from '@prisma/client';
import { Pokemon } from '@domain/entities/pokemon';
import { IPokemonRepository } from '@domain/repositories/pokemon.repository';

export class PrismaPokemonRepository implements IPokemonRepository {
  constructor(private readonly db: PrismaClient) {}
  async create(pokemon: Pokemon): Promise<void> {
    await this.db.pokemon.create({ data: pokemon.toJSON() });
  }
  async findAll(type?: string): Promise<Pokemon[]> {
    const result = await this.db.pokemon.findMany({
      where: type ? { type: { equals: type, mode: 'insensitive' } } : undefined,
    });
    return result.map((p) => new Pokemon(p));
  }
  async findById(id: string): Promise<Pokemon | null> {
    const result = await this.db.pokemon.findUnique({ where: { id } });
    return result ? new Pokemon(result) : null;
  }
  async update(pokemon: Pokemon): Promise<void> {
    await this.db.pokemon.update({
      where: { id: pokemon.id },
      data: pokemon.toJSON(),
    });
  }
  async delete(id: string): Promise<void> {
    await this.db.pokemon.delete({ where: { id } });
  }
}
