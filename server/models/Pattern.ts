import { Schema, model } from 'mongoose';
import type { Pattern as PatternType } from '../../shared/types';

const StepSchema = new Schema(
  { active: { type: Boolean, required: true } },
  { _id: false },
);

const StepsSchema = new Schema(
  {
    kick: { type: [StepSchema], default: [] },
    snare: { type: [StepSchema], default: [] },
    hihat: { type: [StepSchema], default: [] },
    openhh: { type: [StepSchema], default: [] },
    tom1: { type: [StepSchema], default: [] },
    tom2: { type: [StepSchema], default: [] },
  },
  { _id: false },
);

const PatternSchema = new Schema<PatternType>({
  name: { type: String, required: true },
  steps: { type: StepsSchema, required: true },
  length: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Pattern = model('Pattern', PatternSchema);