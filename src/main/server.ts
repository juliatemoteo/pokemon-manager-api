import 'dotenv/config';
import express from 'express';
import { createPokemonRoutes } from '@infrastructure/http/routes/pokemon.routes';
import { createTrainerRoutes } from '@infrastructure/http/routes/trainer.routes';
import { createPokedexRoutes } from '@infrastructure/http/routes/pokedex.routes';
import { makePokemonController } from './factories/make-pokemon-controller.factory';
import {
  makeTrainerController,
  makePokedexController,
} from './factories/make-trainer-controller.factory';
import { setupSwagger } from './config/swagger';
import { errorHandler } from '@infrastructure/http/middlewares/error-handler';
import { prisma } from '@infrastructure/database/prisma/prisma-client';

const app = express();

app.use(express.json());

setupSwagger(app);

app.use('/api/v1/pokemons', createPokemonRoutes(makePokemonController()));

app.use('/api/v1/trainers', createTrainerRoutes(makeTrainerController()));

app.use('/api/v1/pokedex', createPokedexRoutes(makePokedexController()));

app.use(errorHandler);

const PORT = Number(process.env.PORT || 3333);
async function start() {
  await prisma.$connect();
  app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
}

start().catch((error) => {
  console.error('Erro ao iniciar: ', error);
  process.exit(1);
});
