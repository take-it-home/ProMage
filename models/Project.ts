import mongoose, { Schema } from 'mongoose';

const ProjectSchema = new Schema({
  name: String,
  description: String,
  startDate: Date,
  endDate: Date,
  projectManager: { type: Schema.Types.ObjectId, ref: 'User' },
  tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }],
});

export const Project = mongoose.model('Project', ProjectSchema);
