import { Request, Response } from 'express';
import { CreateTrainerUseCase } from '@application/use-cases/create-trainer';
import { CapturePokemonUseCase } from '@application/use-cases/capture-pokemon';
import { ListTeamUseCase } from '@application/use-cases/list-team';

export class TrainerController {
  constructor(
    private readonly createTrainer: CreateTrainerUseCase,
    private readonly capturePokemon: CapturePokemonUseCase,
    private readonly listTeam: ListTeamUseCase,
  ) {}
  async create(req: Request, res: Response) {
    const trainer = await this.createTrainer.execute(req.body);
    return res.status(201).json(trainer);
  }
  async capture(req: Request, res: Response) {
    const capture = await this.capturePokemon.execute(
      req.params.trainerId as string,
      req.body.name,
    );
    return res.status(201).json(capture);
  }
  async team(req: Request, res: Response) {
    const team = await this.listTeam.execute(req.params.trainerId as string);
    return res.status(200).json(team);
  }
}
