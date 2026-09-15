import { Pokemon } from '@domain/entities/pokemon';
import { IPokemonRepository } from '@domain/repositories/pokemon.repository';

export class InMemoryPokemonRepository implements IPokemonRepository {
    private pokemons: Pokemon[] = [];

    async create (pokemon: Pokemon): Promise<void>{
        this.pokemons.push(pokemon);
    }

    async findAll(type?: string): Promise<Pokemon[]> {
        if (type){
            return this.pokemons.filter((pokemon) => pokemon.type.toLocaleLowerCase() === type.toLocaleLowerCase());
        }
        return this.pokemons;
    }

    async findById(id: string): Promise<Pokemon | null> {
        const pokemon = this.pokemons.find((pokemon)=> pokemon.id === id);

        return pokemon ?? null;
    }

    async update(pokemon: Pokemon): Promise<void>{
        const index = this.pokemons.findIndex((item) => item.id === pokemon.id);

        if (index !== -1){
            this.pokemons[index] = pokemon;
        }
    }

    async delete (id: string): Promise<void>{
        const index = this.pokemons.findIndex((pokemon) => pokemon.id === id);

        if (index !== -1){
            // splice vai remover 1 item a partir do indice "index"
            this.pokemons.splice(index, 1);
        }
    }
}