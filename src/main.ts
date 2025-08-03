import { Architecture, Config } from "./config.js";
import { Disassembler } from "./disassembler.js";

let config: Config = {
  architecture: Architecture.M6502,
  fileOffset: 0,
  offset: 0x8000,
  length: 16,
  nonRom: {s: 0, e: 0x7fff},
  codeStarts: [0x8000, 0x800a],
  dataStarts: [{adr: 0x8006, off: 3}],
  codeStops: [0x8010],
  routineSkips: [{adr: 0x4000, skip: 1}]
};

let disassembler = new Disassembler(config, new Uint8Array([0xa9, 0x12, 0xea, 0x20, 0x06, 0x80, 0x4c, 0x00, 0x80, 0x00, 0x20, 0x00, 0x40, 0x12, 0x10, 0xfe]));

console.log(disassembler.disassemble());
