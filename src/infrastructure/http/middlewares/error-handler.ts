import { ErrorRequestHandler } from 'express';
import { Prisma } from '@prisma/client';
import { ZodError } from 'zod';
import { AppError } from '@domain/errors/app-error';

export const errorHandler: ErrorRequestHandler = (
  error: unknown,
  _req,
  res,
  _next,
) => {
  if (error instanceof ZodError) {
    res
      .status(400)
      .json({ message: 'Dados inválidos.', errors: error.flatten() });
    return;
  }
  if (error instanceof AppError) {
    res.status(error.statusCode).json({ message: error.message });
    return;
  }
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === 'P2002') {
      res.status(409).json({
        message: 'Já existe um registro com esse identificador ou e-mail.',
      });
      return;
    }
    if (error.code === 'P2025') {
      res.status(404).json({ message: 'Registro não encontrado.' });
      return;
    }
    if (error.code === 'P2034') {
      res
        .status(409)
        .json({ message: 'Conflito de concorrência. Tente novamente.' });
      return;
    }
  }
  console.error(error);
  res.status(500).json({ message: 'Erro interno do servidor.' });
};
