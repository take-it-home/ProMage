import mongoose, { Schema } from 'mongoose';

const TaskSchema = new Schema({
  name: String,
  description: String,
  startDate: Date,
  endDate: Date,
  status: String,
  assignedTo: { type: Schema.Types.ObjectId, ref: 'User' },
  project: { type: Schema.Types.ObjectId, ref: 'Project' },
});

export const Task = mongoose.model('Task', TaskSchema);
