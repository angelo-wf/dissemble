
export enum Architecture {
  M6502 = "m6502"
};

export type Config = {
  architecture: Architecture,
  fileOffset: number,
  offset: number,
  length: number,
  nonRom?: {s: number, e: number},
  codeStarts: number[],
  dataStarts: {adr: number, off?: number}[],
  codeStops: number[],
  routineSkips: {adr: number, skip: number}[]
};
