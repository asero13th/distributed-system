// distributed_task_system/backend/models/Chat.js

import { Schema, model } from 'mongoose';

const ChatSchema = new Schema({
  username: String,
  message: String,
  timestamp: { type: Date, default: Date.now },
});

export default model('Chat', ChatSchema);