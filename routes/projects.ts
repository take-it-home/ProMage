import { Router } from 'express';
import { Project } from '../models/Project';

const router = Router();

// create a new project
router.post('/', async (req, res) => {
  try {
    const project = new Project(req.body);

    // validation
    const validationErrors = project.validateSync();
    if (validationErrors) {
      const errorMessages = Object.values(validationErrors.errors).map(
        (error: any) => error.message
      );
      return res.status(400).send(errorMessages);
    }

    // if validation passes
    await project.save();
    res.status(201).send(project);
  } catch (error) {
    res.status(400).send(error);
  }
});

// read all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).send(projects);
  } catch (error) {
    res.status(500).send(error);
  }
});

// get by id
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).send();
    }
    res.send(project);
  } catch (error) {
    res.status(500).send(error);
  }
});

// update by id
router.patch('/:id', async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    'name',
    'description',
    'startDate',
    'endDate',
    'projectManager',
    'tasks',
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!project) {
      return res.status(404).send();
    }

    res.send(project);
  } catch (error) {
    res.status(400).send(error);
  }
});

// del by id
router.delete('/:id', async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).send();
    }
    res.send(project);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
