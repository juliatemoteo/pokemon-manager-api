import { RequestHandler } from 'express';
import { z } from 'zod';
export function validate(
  schema: z.ZodTypeAny,
  part: 'body' | 'params' | 'query' = 'body',
): RequestHandler {
  return (req, _res, next) => {
    try {
      schema.parse(req[part]);
      next();
    } catch (error) {
      next(error);
    }
  };
}
