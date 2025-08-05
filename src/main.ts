import fs from "node:fs";
import { AdrType, Architecture, Config } from "./config.js";
import { Disassembler } from "./disassembler.js";

function readBinaryFile(path: string): Uint8Array {
  let data = fs.readFileSync(path);
  return new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
}

function writeOutput(path: string, data: string): void {
  fs.writeFileSync(path, data, "utf-8");
}

let input = new Uint8Array([0x8d, 0x34, 0x12, 0x8d, 0x12, 0x00, 0x85, 0x12, 0x40]);

let config: Config = {
  architecture: Architecture.M6502,
  fileOffset: 0,
  offset: 0xc000,
  length: input.length,
  nonRom: {s: 0, e: 0x7fff},
  addresses: [
    {t: AdrType.START, adr: 0xc000}
  ]
};

let disassembler = new Disassembler(config, input);

let output = disassembler.disassemble();

console.log(output);
