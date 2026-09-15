import express from 'express';
import { createPokemonRoutes } from '@infrastructure/http/routes/pokemon.routes';
import { makePokemonController } from './factories/make-pokemon-controller.factory';
import { setupSwagger } from './config/swagger';

const app = express();

app.use(express.json());

setupSwagger(app);

const pokemonController = makePokemonController();

app.use('/api/v1/pokemons', createPokemonRoutes(pokemonController));

const PORT = 3333;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});