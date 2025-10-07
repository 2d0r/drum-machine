// models/Pattern.ts
import { Schema, model } from 'mongoose';

const PatternSchema = new Schema({
  name: String,
  steps: [String],
  createdAt: { type: Date, default: Date.now }
});

export default model('Pattern', PatternSchema);