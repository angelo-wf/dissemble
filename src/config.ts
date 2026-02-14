
export enum Architecture {
  M6502 = "m6502",
  Z80 = "z80"
};

export enum AdrType {
  START = "start",
  STOP = "stop",
  DATA = "data",
  SKIP = "skip",
  POINTERS = "pointers",
  TABLE = "table"
};

export type AdrDef = {
  t: AdrType,
  adr: number
} & ({
  t: AdrType.DATA,
  off?: number
} | {
  t: AdrType.START | AdrType.STOP
} | {
  t: AdrType.SKIP,
  skip: number
} | {
  t: AdrType.POINTERS | AdrType.TABLE,
  count: number,
  adrh?: number,
  off?: number
});

export type Config = {
  architecture: Architecture,
  fileOffset: number,
  offset: number,
  length: number,
  nonRom?: {s: number, e: number},
  ramLabels: boolean,
  adrComments: boolean,
  addresses: AdrDef[];
};

export class ConfigError extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
  }
}

function checkArchitecture(obj: any, key: string): Architecture {
  let value = obj[key];
  if(typeof value === "string" && Object.values<string>(Architecture).includes(value)) {
    return value as Architecture;
  }
  throw new ConfigError("Unknown or no architecture");
}

function checkIntNumber(obj: any, key: string): number {
  let value = obj[key];
  if(typeof value === "number" && Math.floor(value) === value) {
    return value;
  }
  throw new ConfigError(`Field ${key} not a integer number`);
}

function checkBoolean(obj: any, key: string): boolean {
  let value = obj[key];
  if(typeof value === "boolean") return value;
  throw new ConfigError(`Field ${key} not a boolean`);
}

function checkAdrType(obj: any, key: string): AdrType {
  let value = obj[key];
  if(typeof value === "string" && Object.values<string>(AdrType).includes(value)) {
    return value as AdrType;
  }
  throw new ConfigError("Unknown or no address type");
}

export function parseConfig(input: any): Config {
  if(typeof input !== "object") throw new ConfigError("Not an object");
  let architecture = checkArchitecture(input, "architecture");
  let fileOffset = checkIntNumber(input, "fileOffset");
  let offset = checkIntNumber(input, "offset");
  let length = checkIntNumber(input, "length");

  let ramLabels = false;
  if(input.ramLabels) ramLabels = checkBoolean(input, "ramLabels");
  let adrComments = false;
  if(input.adrComments) adrComments = checkBoolean(input, "adrComments");

  let nonRom: Config["nonRom"] = undefined;
  if(typeof input.nonRom === "object") {
    let s = checkIntNumber(input.nonRom, "s");
    let e = checkIntNumber(input.nonRom, "e");
    nonRom = {s, e};
  }

  let addresses: Config["addresses"] = [];
  if(!Array.isArray(input.addresses)) throw new ConfigError("Field addresses not an array");
  for(let item of input.addresses) {
    if(typeof item !== "object") throw new ConfigError("Entry in addresses not an object");
    let t = checkAdrType(item, "t");
    let adr = checkIntNumber(item, "adr");
    let parsedItem: AdrDef;
    if(t === AdrType.DATA) {
      let off: number | undefined = undefined;
      if(item.off) off = checkIntNumber(item, "off");
      parsedItem = {t, adr, off};
    } else if(t === AdrType.SKIP) {
      let skip = checkIntNumber(item, "skip");
      parsedItem = {t, adr, skip};
    } else if(t === AdrType.POINTERS || t === AdrType.TABLE) {
      let count = checkIntNumber(item, "count");
      let adrh: number | undefined = undefined;
      if(item.adrh) adrh = checkIntNumber(item, "adrh");
      let off: number | undefined = undefined;
      if(item.off) off = checkIntNumber(item, "off");
      parsedItem = {t, adr, count, adrh, off};
    } else {
      parsedItem = {t, adr};
    }
    addresses.push(parsedItem);
  }

  return {architecture, fileOffset, offset, length, nonRom, ramLabels, adrComments, addresses};
}
