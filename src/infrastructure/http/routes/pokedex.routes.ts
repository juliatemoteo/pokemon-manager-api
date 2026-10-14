import { Router } from 'express';
import { PokedexController } from '../controllers/pokedex.controller';
import { validate } from '../middlewares/validate';
import { pokedexQuerySchema } from '../schemas/request.schemas';
export function createPokedexRoutes(controller: PokedexController) {
  const router = Router();
  router.get('/search', validate(pokedexQuerySchema, 'query'), (req, res) =>
    controller.search(req, res),
  );
  return router;
}
