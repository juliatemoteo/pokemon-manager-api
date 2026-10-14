import { Router } from 'express';
import { TrainerController } from '../controllers/trainer.controller';
import { validate } from '../middlewares/validate';
import {
  captureSchema,
  trainerCreateSchema,
  trainerParamsSchema,
} from '../schemas/request.schemas';

export function createTrainerRoutes(controller: TrainerController) {
  const router = Router();
  router.post('/', validate(trainerCreateSchema), (req, res) =>
    controller.create(req, res),
  );
  router.post(
    '/:trainerId/captures',
    validate(trainerParamsSchema, 'params'),
    validate(captureSchema),
    (req, res) => controller.capture(req, res),
  );
  router.get(
    '/:trainerId/team',
    validate(trainerParamsSchema, 'params'),
    (req, res) => controller.team(req, res),
  );
  return router;
}
