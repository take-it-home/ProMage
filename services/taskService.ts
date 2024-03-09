import { Task } from '../models/Task';
import { Document, Schema } from 'mongoose';

// the interface can be moved to a separate file for simplicity we will keep it here
export interface ITask extends Document {
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  status: string;
  assignedTo: Schema.Types.ObjectId;
  project: Schema.Types.ObjectId;
}

export const createTask = async (taskData: ITask) => {
  try {
    const task = new Task(taskData);
    await task.save();
    return task;
  } catch (error) {
    throw error;
  }
};

export const getAllTasks = async () => {
  try {
    // to populate the referece ids
    const tasks = await Task.find().populate('assignedTo').populate('project');
    return tasks;
  } catch (error) {
    throw error;
  }
};

export const getTaskById = async (id: string) => {
  try {
    const task = await Task.findById(id)
      .populate('assignedTo')
      .populate('project');
    if (!task) {
      throw new Error('Task not found');
    }
    return task;
  } catch (error) {
    throw error;
  }
};

export const updateTask = async (id: string, updates: Partial<ITask>) => {
  const allowedUpdates: Array<keyof ITask> = [
    'name',
    'description',
    'startDate',
    'endDate',
    'status',
    'assignedTo',
    'project',
  ];
  const isValidOperation = Object.keys(updates).every((update) =>
    allowedUpdates.includes(update as keyof ITask)
  );

  if (!isValidOperation) {
    throw new Error('Invalid updates');
  }

  try {
    const task = await Task.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });
    if (!task) {
      throw new Error('Task not found');
    }
    return task;
  } catch (error) {
    throw error;
  }
};

export const deleteTask = async (id: string) => {
  try {
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      throw new Error('Task not found');
    }
    return task;
  } catch (error) {
    throw error;
  }
};
