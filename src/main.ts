import fs from "node:fs";
import JSON5 from "json5";
import { parseConfig } from "./config.js";
import { Disassembler } from "./disassembler.js";

function readBinaryFile(path: string): Uint8Array {
  let data = fs.readFileSync(path);
  return new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
}

function readConfigFile(path: string): any {
  let data = fs.readFileSync(path, "utf-8");
  return JSON5.parse(data);
}

function writeOutput(path: string, data: string): void {
  fs.writeFileSync(path, data, "utf-8");
}

function main(args: string[]): void {
  if(args.length !== 3) {
    console.log("Usage: dissemble <input> <output.s> <config.json5>")
    return;
  }
  let input = readBinaryFile(args[0]!);
  let config = parseConfig(readConfigFile(args[2]!));

  let disassembler = new Disassembler(config, input);
  writeOutput(args[1]!, disassembler.disassemble());
}

main(process.argv.slice(2));
