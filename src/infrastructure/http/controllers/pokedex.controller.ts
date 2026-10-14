import { Request, Response } from 'express';
import { SearchPokedexUseCase } from '@application/use-cases/search-pokedex';
export class PokedexController {
  constructor(private readonly searchPokedex: SearchPokedexUseCase) {}
  async search(req: Request, res: Response) {
    const pokemon = await this.searchPokedex.execute(req.query.name as string);
    return res.status(200).json(pokemon);
  }
}
