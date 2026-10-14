import { CreatePokemonUseCase } from '@application/use-cases/create-pokemon';
import { ListPokemonsUseCase } from '@application/use-cases/list-pokemons';
import { FindPokemonByIdUseCase } from '@application/use-cases/find-pokemon-by-id';
import { UpdatePokemonUseCase } from '@application/use-cases/update-pokemon';
import { DeletePokemonUseCase } from '@application/use-cases/delete-pokemon';
import { PrismaPokemonRepository } from '@infrastructure/database/prisma/prisma-pokemon.repository';
import { prisma } from '@infrastructure/database/prisma/prisma-client';
import { PokemonController } from '@infrastructure/http/controllers/pokemon.controller';

export function makePokemonController(): PokemonController {
  const repository = new PrismaPokemonRepository(prisma);
  return new PokemonController(
    new CreatePokemonUseCase(repository),
    new ListPokemonsUseCase(repository),
    new FindPokemonByIdUseCase(repository),
    new UpdatePokemonUseCase(repository),
    new DeletePokemonUseCase(repository),
  );
}
