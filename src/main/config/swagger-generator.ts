import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'Pokemon Manager API',
    description: 'API REST para gerenciamento de Pokemons',
    version: '1.0.0',
  },
  host: 'localhost:3333',
  schemes: ['http'],
  basePath: '/api/v1',
  definitions: {
    Pokemon: {
      id: '25',
      name: 'Pikachu',
      type: 'Electric',
      hp: 35,
      attack: 55,
      defense: 40,
    },
  },
};

const outputFile = './src/main/config/swagger-output.json';

const endpointsFiles = [
  './src/infrastructure/http/routes/pokemon.routes.ts',
];

swaggerAutogen()(outputFile, endpointsFiles, doc);