import { Schema, model } from 'mongoose';

const chatSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  title: { type: String, default: 'Chat' },
  messages: [{
    text: String,
    sender: { type: String, enum: ['user', 'system'] },
    timestamp: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

export default model('Chat', chatSchema);