import { Request, Response } from 'express';

import { CreatePokemonUseCase } from '@application/use-cases/create-pokemon';
import { ListPokemonsUseCase } from '@application/use-cases/list-pokemons';
import { FindPokemonByIdUseCase } from '@application/use-cases/find-pokemon-by-id';
import { UpdatePokemonUseCase } from '@application/use-cases/update-pokemon';
import { DeletePokemonUseCase } from '@application/use-cases/delete-pokemon';

export class PokemonController {
  constructor(
    private createPokemonUseCase: CreatePokemonUseCase,
    private listPokemonsUseCase: ListPokemonsUseCase,
    private findPokemonByIdUseCase: FindPokemonByIdUseCase,
    private updatePokemonUseCase: UpdatePokemonUseCase,
    private deletePokemonUseCase: DeletePokemonUseCase,
  ) {}

  async create(req: Request, res: Response): Promise<Response> {
    const { id, name, type, hp, attack, defense } = req.body;

    const pokemon = await this.createPokemonUseCase.execute({
      id,
      name,
      type,
      hp,
      attack,
      defense,
    });

    return res.status(201).json({
      message: 'Pokemon cadastrado com sucesso',
      data: pokemon,
    });
  }

  async list(req: Request, res: Response): Promise<Response> {
    const type = req.query.type as string | undefined;

    const pokemons = await this.listPokemonsUseCase.execute(type);

    return res.status(200).json(pokemons);
  }

  async findById(req: Request, res: Response): Promise<Response> {
    const id = req.params.id as string;

    const pokemon = await this.findPokemonByIdUseCase.execute(id);

    if (!pokemon) {
      return res.status(404).json({
        message: 'Pokemon não encontrado',
      });
    }

    return res.status(200).json(pokemon);
  }

  async update(req: Request, res: Response): Promise<Response> {
    const id = req.params.id as string;
    const { name, type, hp, attack, defense } = req.body;

    const pokemon = await this.updatePokemonUseCase.execute(id, {
      name,
      type,
      hp,
      attack,
      defense,
    });

    if (!pokemon) {
      return res.status(404).json({
        message: 'Pokemon não encontrado',
      });
    }

    return res.status(200).json(pokemon);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const id = req.params.id as string;

    const deleted = await this.deletePokemonUseCase.execute(id);

    if (!deleted) {
      return res.status(404).json({
        message: 'Pokemon não encontrado',
      });
    }

    return res.status(204).send();
  }
}