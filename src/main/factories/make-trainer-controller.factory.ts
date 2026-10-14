import { CreateTrainerUseCase } from '@application/use-cases/create-trainer';
import { CapturePokemonUseCase } from '@application/use-cases/capture-pokemon';
import { ListTeamUseCase } from '@application/use-cases/list-team';
import { SearchPokedexUseCase } from '@application/use-cases/search-pokedex';
import { PrismaTrainerRepository } from '@infrastructure/database/prisma/prisma-trainer.repository';
import { PokeApiProvider } from '@infrastructure/providers/poke-api.provider';
import { prisma } from '@infrastructure/database/prisma/prisma-client';
import { TrainerController } from '@infrastructure/http/controllers/trainer.controller';
import { PokedexController } from '@infrastructure/http/controllers/pokedex.controller';

const repository = new PrismaTrainerRepository(prisma);
const gateway = new PokeApiProvider();
export function makeTrainerController() {
  return new TrainerController(
    new CreateTrainerUseCase(repository),
    new CapturePokemonUseCase(repository, gateway),
    new ListTeamUseCase(repository),
  );
}
export function makePokedexController() {
  return new PokedexController(new SearchPokedexUseCase(gateway));
}
