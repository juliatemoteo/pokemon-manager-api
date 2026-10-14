import { ITrainerRepository } from '@domain/repositories/trainer.repository';
export class ListTeamUseCase {
  constructor(private readonly repository: ITrainerRepository) {}
  execute(trainerId: string) {
    return this.repository.findTeam(trainerId);
  }
}
