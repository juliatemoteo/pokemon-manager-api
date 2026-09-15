import { Pokemon } from '@domain/entities/pokemon';
import { IPokemonRepository } from '@domain/repositories/pokemon.repository';

export interface UpdatePokemonRequest {
  name: string;
  type: string;
  hp: number;
  attack: number;
  defense: number;
}

export class UpdatePokemonUseCase {
  constructor(private pokemonRepository: IPokemonRepository) {}

  async execute(id: string, data: UpdatePokemonRequest): Promise<Pokemon | null> {

    const existingPokemon = await this.pokemonRepository.findById(id);

    if (!existingPokemon) {
      return null;
    }

    const pokemon = new Pokemon({
      id,
      name: data.name,
      type: data.type,
      hp: data.hp,
      attack: data.attack,
      defense: data.defense,
    });

    await this.pokemonRepository.update(pokemon);

    return pokemon;
  }
}