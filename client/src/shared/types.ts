export type DrumName = "kick" | "snare" | "hihat" | "openhh" | "tom1" | "tom2"
    // | "ride" | "crash" | "tom3";

export interface Step {
  active: boolean;
}

export type Pattern = Record<DrumName, Step[]>;