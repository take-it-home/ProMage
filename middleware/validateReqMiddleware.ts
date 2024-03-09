import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const taskSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().optional(),
  projectId: Joi.string().required(),
  assignedTo: Joi.string().required(),
  status: Joi.string().valid('pending', 'in progress', 'completed'),
  dueDate: Joi.date().optional(),
});

export const validateTask = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = taskSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  next();
};
