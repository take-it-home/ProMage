import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
  name: String,
  email: String,
  role: String,
});

export const User = mongoose.model('User', UserSchema);
