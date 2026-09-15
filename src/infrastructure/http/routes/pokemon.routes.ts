import { Router } from 'express';
import { PokemonController } from '../controllers/pokemon.controller';

export function createPokemonRoutes(pokemonController: PokemonController): Router {
  const router = Router();

  router.post('/', (req, res) => 
    /*
      #swagger.tags = ['Pokemons']
      #swagger.summary = 'Cadastrar um Pokemon'
      #swagger.description = 'Cadastra um novo Pokemon no sistema.'

      #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: { $ref: '#/definitions/Pokemon' }
      }

      #swagger.responses[201] = {
        description: 'Pokemon cadastrado com sucesso'
      }
    */
    pokemonController.create(req, res));

  router.get('/', (req, res) => 
    /*
      #swagger.tags = ['Pokemons']
      #swagger.summary = 'Listar Pokemons'
      #swagger.description = 'Lista todos os Pokemons e permite filtrar por tipo.'

      #swagger.parameters['type'] = {
        in: 'query',
        required: false,
        type: 'string',
        description: 'Tipo do Pokemon. Exemplo: Electric'
      }

      #swagger.responses[200] = {
        description: 'Lista de Pokemons'
      }
    */
    pokemonController.list(req, res));

  router.get('/:id', (req, res) => 
     /*
      #swagger.tags = ['Pokemons']
      #swagger.summary = 'Buscar Pokemon por ID'

      #swagger.parameters['id'] = {
        in: 'path',
        required: true,
        type: 'string'
      }

      #swagger.responses[200] = {
        description: 'Pokemon encontrado'
      }

      #swagger.responses[404] = {
        description: 'Pokemon nao encontrado'
      }
    */
    pokemonController.findById(req, res));

  router.put('/:id', (req, res) => 
    /*
      #swagger.tags = ['Pokemons']
      #swagger.summary = 'Atualizar um Pokemon'

      #swagger.parameters['id'] = {
        in: 'path',
        required: true,
        type: 'string'
      }

      #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: { $ref: '#/definitions/Pokemon' }
      }

      #swagger.responses[200] = {
        description: 'Pokemon atualizado com sucesso'
      }

      #swagger.responses[404] = {
        description: 'Pokemon nao encontrado'
      }
    */
    pokemonController.update(req, res));

  router.delete('/:id', (req, res) => 
    /*
      #swagger.tags = ['Pokemons']
      #swagger.summary = 'Remover um Pokemon'

      #swagger.parameters['id'] = {
        in: 'path',
        required: true,
        type: 'string'
      }

      #swagger.responses[204] = {
        description: 'Pokemon removido com sucesso'
      }

      #swagger.responses[404] = {
        description: 'Pokemon nao encontrado'
      }
    */
    pokemonController.delete(req, res));

  return router;
}