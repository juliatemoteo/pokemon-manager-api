export class AppError extends Error {
  constructor(
    message: string,
    public readonly statusCode = 400,
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export class TrainerNotFoundError extends AppError {
  constructor() {
    super('Treinador não encontrado.', 404);
  }
}

export class TeamLimitError extends AppError {
  constructor() {
    super('O treinador já possui 6 Pokémon no time ativo.', 409);
  }
}
