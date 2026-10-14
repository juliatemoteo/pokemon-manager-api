import { AppError } from '@domain/errors/app-error';
import {
  IPokeApiGateway,
  PokeApiPokemon,
} from '@domain/gateways/poke-api.gateway';

type ApiStat = { base_stat: number; stat: { name: string } };
type ApiPayload = {
  id: number;
  name: string;
  sprites: {
    front_default: string | null;
    other?: { 'official-artwork'?: { front_default: string | null } };
  };
  types: Array<{ type: { name: string } }>;
  stats: ApiStat[];
};

export class PokeApiProvider implements IPokeApiGateway {
  async searchByName(name: string): Promise<PokeApiPokemon> {
    const normalized = name.trim().toLowerCase();
    let response: Response;
    try {
      response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(normalized)}`,
        {
          signal: AbortSignal.timeout(8000),
        },
      );
    } catch {
      throw new AppError('Não foi possível acessar a PokéAPI.', 502);
    }
    if (response.status === 404)
      throw new AppError('Pokémon não encontrado na PokéAPI.', 404);
    if (!response.ok) throw new AppError('Falha na consulta à PokéAPI.', 502);

    try {
      const data = (await response.json()) as ApiPayload;
      const stat = (key: string) => {
        const value = data.stats.find(
          (item) => item.stat.name === key,
        )?.base_stat;
        if (typeof value !== 'number') throw new Error('Estatística inválida');
        return value;
      };
      return {
        id: data.id,
        name: data.name,
        imageUrl:
          data.sprites.other?.['official-artwork']?.front_default ??
          data.sprites.front_default ??
          '',
        types: data.types.map((item) => item.type.name),
        hp: stat('hp'),
        attack: stat('attack'),
        defense: stat('defense'),
      };
    } catch {
      throw new AppError('Resposta inválida da PokéAPI.', 502);
    }
  }
}
