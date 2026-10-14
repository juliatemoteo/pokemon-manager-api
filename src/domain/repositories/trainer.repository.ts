import { PokeApiPokemon } from '@domain/gateways/poke-api.gateway';

export interface TrainerDTO {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}
export interface CaptureDTO {
  id: string;
  trainerId: string;
  pokemonId: number;
  name: string;
  imageUrl: string;
  types: string[];
  hp: number;
  attack: number;
  defense: number;
  active: boolean;
  capturedAt: Date;
}
export type NewCapture = Omit<CaptureDTO, 'id' | 'capturedAt'>;

export interface ITrainerRepository {
  create(data: { name: string; email: string }): Promise<TrainerDTO>;
  capture(trainerId: string, pokemon: PokeApiPokemon): Promise<CaptureDTO>;
  findTeam(trainerId: string): Promise<CaptureDTO[]>;
}
