import { Pokemon } from '@domain/entities/pokemon';
import { IPokemonRepository } from '@domain/repositories/pokemon.repository';

export interface CreatePokemonRequest {
    id: string;
    name: string;
    type: string;
    hp: number;
    attack: number;
    defense: number;
}

export class CreatePokemonUseCase {
    constructor(private pokemonRepository: IPokemonRepository) {}

    async execute(data: CreatePokemonRequest): Promise<Pokemon>{
        const pokemon = new Pokemon({
            id: data.id,
            name: data.name,
            type: data.type,
            hp: data.hp,
            attack: data.attack,
            defense: data.defense
        });

        await this.pokemonRepository.create(pokemon);

        return pokemon;
    }

}