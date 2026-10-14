import { z } from 'zod';
export const idParamsSchema = z.object({ id: z.string().trim().min(1) });
export const trainerParamsSchema = z.object({ trainerId: z.string().uuid() });
export const pokedexQuerySchema = z.object({ name: z.string().trim().min(1) });
export const pokemonQuerySchema = z.object({
  type: z.string().min(1).optional(),
});
export const pokemonCreateSchema = z.object({
  id: z.string().trim().min(1),
  name: z.string().trim().min(1),
  type: z.string().trim().min(1),
  hp: z.number().int().positive(),
  attack: z.number().int().positive(),
  defense: z.number().int().positive(),
});
export const pokemonUpdateSchema = pokemonCreateSchema.omit({ id: true });
export const trainerCreateSchema = z.object({
  name: z.string().trim().min(1),
  email: z.string().trim().email(),
});
export const captureSchema = z.object({ name: z.string().trim().min(1) });
