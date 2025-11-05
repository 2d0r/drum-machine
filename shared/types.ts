export type DrumName = 'kick' | 'snare' | 'hihat' | 'openhh' | 'tom1' | 'tom2'
  // | 'ride' | 'crash' | 'tom3';

export type GenrePattern = {
  name: string;
  steps: Record<DrumName, Step[]>;
  tempo: number;
  timeSig: TimeSig;
  _id?: string;
};

export type GenreTagStatus = 'load' | 'detect' | 'ready';

export type Pattern = {
  name: string;
  steps: Record<DrumName, Step[]>;
  tempo: number;
  timeSig: TimeSig;
  createdAt: Date;
  _id?: string;
};

export type ModalName = 'load' | 'save' | null; 

export interface Step {
  active: boolean;
}

export type TimeSig = '4/4' | '3/4';
