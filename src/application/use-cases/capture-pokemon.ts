import { ITrainerRepository } from '@domain/repositories/trainer.repository';
import { IPokeApiGateway } from '@domain/gateways/poke-api.gateway';
export class CapturePokemonUseCase {
  constructor(
    private readonly repository: ITrainerRepository,
    private readonly gateway: IPokeApiGateway,
  ) {}
  async execute(trainerId: string, pokemonName: string) {
    const pokemon = await this.gateway.searchByName(pokemonName);
    return this.repository.capture(trainerId, pokemon);
  }
}
