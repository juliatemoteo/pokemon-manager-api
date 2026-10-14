export interface PokeApiPokemon {
  id: number;
  name: string;
  imageUrl: string;
  types: string[];
  hp: number;
  attack: number;
  defense: number;
}

export interface IPokeApiGateway {
  searchByName(name: string): Promise<PokeApiPokemon>;
}
