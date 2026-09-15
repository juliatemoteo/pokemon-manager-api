# PokéManager API — Entrega 1

API RESTful para gerenciamento de Pokémons, desenvolvida como parte da disciplina de Tópicos Especiais em Engenharia de Software.

Esta primeira entrega tem como foco a construção de uma API utilizando **TypeScript**, **Express** e princípios de **Clean Architecture**, com persistência de dados em memória e documentação interativa utilizando **Swagger/OpenAPI**.

---

## Arquitetura do Projeto

O projeto segue os princípios da **Clean Architecture**, buscando separar as responsabilidades da aplicação e diminuir o acoplamento entre suas camadas.

```text
src/
├── domain/
│   ├── entities/
│   │   └── pokemon.ts
│   └── repositories/
│       └── pokemon.repository.ts
│
├── application/
│   └── use-cases/
│       ├── create-pokemon.ts
│       ├── list-pokemons.ts
│       ├── find-pokemon-by-id.ts
│       ├── update-pokemon.ts
│       └── delete-pokemon.ts
│
├── infrastructure/
│   ├── database/
│   │   └── in-memory/
│   │       └── in-memory-pokemon.repository.ts
│   └── http/
│       ├── controllers/
│       │   └── pokemon.controller.ts
│       └── routes/
│           └── pokemon.routes.ts
│
└── main/
    ├── config/
    │   ├── swagger-generator.ts
    │   ├── swagger-output.json
    │   └── swagger.ts
    ├── factories/
    │   └── make-pokemon-controller.factory.ts
    └── server.ts
```

### Responsabilidade das camadas

- **Domain:** contém a entidade `Pokemon` e o contrato do repositório.
- **Application:** contém os casos de uso da aplicação.
- **Infrastructure:** contém as implementações relacionadas ao armazenamento e ao HTTP, como repository, controller e rotas.
- **Main:** realiza a composição das dependências e inicializa o servidor.

---

## Tecnologias Utilizadas

- Node.js
- TypeScript
- Express
- tsx
- Swagger UI Express
- swagger-autogen
- ESLint
- Prettier

---

## Como Executar

### Pré-requisitos

- Node.js instalado
- npm instalado

### Instalação

Clone o repositório e instale as dependências:

```bash
npm install
```

### Gerar a documentação Swagger

```bash
npm run swagger
```

### Executar em modo de desenvolvimento

```bash
npm run dev
```

O servidor será iniciado na porta `3333`.

- API: `http://localhost:3333/api/v1/pokemons`
- Swagger: `http://localhost:3333/api/docs`

---

## Endpoints

| Método | Endpoint | Descrição | Status de sucesso |
|---|---|---|---|
| POST | `/api/v1/pokemons` | Cadastra um novo Pokémon | `201 Created` |
| GET | `/api/v1/pokemons` | Lista todos os Pokémons | `200 OK` |
| GET | `/api/v1/pokemons?type=Electric` | Lista Pokémons filtrados por tipo | `200 OK` |
| GET | `/api/v1/pokemons/:id` | Busca um Pokémon pelo ID | `200 OK` |
| PUT | `/api/v1/pokemons/:id` | Atualiza um Pokémon | `200 OK` |
| DELETE | `/api/v1/pokemons/:id` | Remove um Pokémon | `204 No Content` |

---

## Estrutura de um Pokémon

Os Pokémons cadastrados possuem os seguintes atributos:

```json
{
  "id": "25",
  "name": "Pikachu",
  "type": "Electric",
  "hp": 35,
  "attack": 55,
  "defense": 40
}
```

Os atributos `hp`, `attack` e `defense` devem possuir valores maiores que zero.

---

## 🧪 Exemplos de Requisições

### Cadastrar um Pokémon

```bash
curl --request POST \
  --url http://localhost:3333/api/v1/pokemons \
  --header 'Content-Type: application/json' \
  --data '{
    "id": "25",
    "name": "Pikachu",
    "type": "Electric",
    "hp": 35,
    "attack": 55,
    "defense": 40
  }'
```

### Listar todos os Pokémons

```bash
curl --request GET \
  --url http://localhost:3333/api/v1/pokemons
```

### Filtrar Pokémons por tipo

```bash
curl --request GET \
  --url 'http://localhost:3333/api/v1/pokemons?type=Electric'
```

### Buscar Pokémon por ID

```bash
curl --request GET \
  --url http://localhost:3333/api/v1/pokemons/25
```

---

## Persistência

Nesta primeira entrega, os dados são armazenados em memória através do `InMemoryPokemonRepository`.

Por esse motivo, os dados cadastrados existem apenas enquanto o servidor estiver em execução. Ao reiniciar a aplicação, os dados armazenados são perdidos.

---

## Documentação Swagger

A API possui documentação interativa utilizando Swagger/OpenAPI.

Com o servidor em execução, a documentação pode ser acessada em:

```text
http://localhost:3333/api/docs
```

A interface permite visualizar e testar os endpoints disponíveis na API.

---

## 👤 Autora

Desenvolvido por **Júlia dos Santos Temoteo**.

Estudante de Ciência da Computação.