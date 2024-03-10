import { ITask, createTask } from '../../services/taskService';
import { Task } from '../../models/Task';
import mongoose from 'mongoose';

// jest.mock('../../models/Task', () => {
//   const mockSchema = {
//     create: jest.fn(),
//     find: jest.fn(),
//     findOne: jest.fn(),
//     findById: jest.fn(),
//     findByIdAndUpdate: jest.fn(),
//     findByIdAndDelete: jest.fn(),
//   };
//   return jest.fn().mockImplementation(() => mockSchema);
// });

const mockTaskCreate = jest.fn();
jest.mock('../../models/Task', () => {
  return jest.fn().mockImplementation(() => {
    return { create: mockTaskCreate };
  });
});

describe('taskService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  jest.setTimeout(80000);

  it('should create a new task', async () => {
    const taskData = {
      name: 'Task 1',
      description: 'Description for task 1',
      startDate: new Date(),
      endDate: new Date(),
      status: 'To Do',
      assignedTo:
        '507f1f77bcf86cd799439011' as unknown as mongoose.Types.ObjectId,
      project: '507f1f77bcf86cd799439012' as unknown as mongoose.Types.ObjectId,
    };

    const mockTask = { _id: '1', ...taskData };
    mockTaskCreate.mockResolvedValue(mockTask);
    const task = await createTask(taskData as unknown as ITask);

    expect(Task.create).toHaveBeenCalledWith(taskData);
    expect(task).toEqual(mockTask);
  });

  it('should throw an error when creating a task', async () => {
    const taskData = {
      name: 'Task 1',
      description: 'Description for task 1',
      startDate: new Date(),
      endDate: new Date(),
      status: 'To Do',
      assignedTo:
        '507f1f77bcf86cd799439013' as unknown as mongoose.Types.ObjectId,
      project: '507f1f77bcf86cd799439014' as unknown as mongoose.Types.ObjectId,
    };

    const mockError = new Error('An error occurred');
    mockTaskCreate.mockRejectedValue(mockError);

    await expect(createTask(taskData as unknown as ITask)).rejects.toEqual(
      mockError
    );
  });
});
