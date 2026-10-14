import { IPokeApiGateway } from '@domain/gateways/poke-api.gateway';
export class SearchPokedexUseCase {
  constructor(private readonly gateway: IPokeApiGateway) {}
  execute(name: string) {
    return this.gateway.searchByName(name);
  }
}
