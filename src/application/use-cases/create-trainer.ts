import { ITrainerRepository } from '@domain/repositories/trainer.repository';
export class CreateTrainerUseCase {
  constructor(private readonly repository: ITrainerRepository) {}
  execute(data: { name: string; email: string }) {
    return this.repository.create(data);
  }
}
