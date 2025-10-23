export type DrumName = 'kick' | 'snare' | 'hihat' | 'openhh' | 'tom1' | 'tom2'
  // | 'ride' | 'crash' | 'tom3';

export interface Step {
  active: boolean;
}

export type Pattern = {
  name: string;
  steps: Record<DrumName, Step[]>;
  length: number;
  createdAt: Date;
  _id?: string;
};

export type TimeSig = '4/4' | '3/4';