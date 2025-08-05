
export enum Architecture {
  M6502 = "m6502"
};

export enum AdrType {
  START,
  STOP,
  DATA,
  SKIP
};

export type AdrDef = {
  t: AdrType,
  adr: number
} & ({
  t: AdrType.START | AdrType.DATA,
  off?: number
} | {
  t: AdrType.STOP
} | {
  t: AdrType.SKIP,
  skip: number
});

export type Config = {
  architecture: Architecture,
  fileOffset: number,
  offset: number,
  length: number,
  nonRom?: {s: number, e: number},
  addresses: AdrDef[];
};
