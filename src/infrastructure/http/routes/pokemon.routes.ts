import { Router } from 'express';
import { PokemonController } from '../controllers/pokemon.controller';
import { validate } from '../middlewares/validate';
import {
  idParamsSchema,
  pokemonCreateSchema,
  pokemonUpdateSchema,
  pokemonQuerySchema,
} from '../schemas/request.schemas';

export function createPokemonRoutes(controller: PokemonController): Router {
  const router = Router();
  router.post('/', validate(pokemonCreateSchema), (req, res) =>
    controller.create(req, res),
  );
  router.get('/', validate(pokemonQuerySchema, 'query'), (req, res) =>
    controller.list(req, res),
  );
  router.get('/:id', validate(idParamsSchema, 'params'), (req, res) =>
    controller.findById(req, res),
  );
  router.put(
    '/:id',
    validate(idParamsSchema, 'params'),
    validate(pokemonUpdateSchema),
    (req, res) => controller.update(req, res),
  );
  router.delete('/:id', validate(idParamsSchema, 'params'), (req, res) =>
    controller.delete(req, res),
  );
  return router;
}
