import { Router } from 'express';
import * as taskService from '../services/taskService';
import { validateTask } from '../middleware/validateReqMiddleware';
import { verifyToken } from '../middleware/authMiddleware';

const router = Router();

// create a new task
router.post('/', verifyToken, validateTask, async (req, res) => {
  try {
    const task = await taskService.createTask(req.body);
    res.status(201).json(task);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: 'An unknown error occurred' });
    }
  }
});

// get all tasks
router.get('/', verifyToken, async (req, res) => {
  try {
    const tasks = await taskService.getAllTasks();
    res.send(tasks);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
});

// get by id
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const task = await taskService.getTaskById(req.params.id);
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(error);
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
});

// update by id
router.patch('/:id', verifyToken, async (req, res) => {
  try {
    const task = await taskService.updateTask(req.params.id, req.body);
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send({ error: error.message });
    } else {
      res.status(400).send({ error: 'An unknown error occurred' });
    }
  }
});

// delete by id
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const task = await taskService.deleteTask(req.params.id);
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
});

export default router;
