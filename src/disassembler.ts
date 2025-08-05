import { M6502Handler } from "./architectures/m6502.js";
import { AdrType, Architecture, Config } from "./config.js";

export enum ByteType {
  UNKNOWN,
  UNMAPPED,
  NON_ROM,
  CODE_S,
  CODE_P,
  DATA
};

export type ByteInfo = {
  type: ByteType
};

export interface OpcodeHandler {
  // Assumes 2 bytes to be enough to determine opcode length
  getOpcodeLength(byte1: number, byte2: number): number;
  traceOpcode(pc: number, ...bytes: number[]): boolean;
  disassembleOpcode(pc: number, ...bytes: number[]): string;
}

export function hexStr(val: number, size: number): string {
  return ("000" + val.toString(16)).slice(-(size / 4));
}

export class Disassembler {

  private opcodeHandler: OpcodeHandler;

  private mapOffset: number = 0;
  private mapLength: number = 0;

  private byteInfo: ByteInfo[] = [];
  private data: Uint8Array = new Uint8Array(0x10000);

  // map of addresses for labels, 0 for label at location, non-0 for offset to label to use
  private labels: Map<number, number> = new Map();
  // map of subroutine addresses to amount of bytes to skip after call to it, or 0 for end of trace
  private routineSkips: Map<number, number> = new Map();

  private codeStarts: number[] = [];

  constructor(config: Config, data: Uint8Array) {
    // copy data to correct spot
    for(let i = 0; i < config.length; i++) {
      this.data[config.offset + i] = data[config.fileOffset + i]!;
    }
    this.mapOffset = config.offset;
    this.mapLength = config.length;
    // create initial byteInfo
    for(let i = 0; i < 0x10000; i++) {
      if(i >= config.offset && i < config.offset + config.length) {
        this.byteInfo[i] = {type: ByteType.UNKNOWN};
      } else if(config.nonRom && i >= config.nonRom.s && i <= config.nonRom.e) {
        this.byteInfo[i] = {type: ByteType.NON_ROM};
      } else {
        this.byteInfo[i] = {type: ByteType.UNMAPPED};
      }
    }
    // create starts/labels
    for(let adr of config.addresses) {
      switch(adr.t) {
        case AdrType.START: {
          let offset = adr.off ?? 0;
          let actAdr = adr.adr + offset;
          this.codeStarts.push(actAdr);
          this.labels.set(adr.adr, offset);
          if(offset) this.labels.set(actAdr, 0);
          break;
        }
        case AdrType.DATA: {
          let offset = adr.off ?? 0;
          this.labels.set(adr.adr, offset);
          if(offset) this.labels.set(adr.adr + offset, 0);
          break;
        }
        case AdrType.STOP: {
          this.byteInfo[adr.adr]!.type = ByteType.DATA;
          break;
        }
        case AdrType.SKIP: {
          this.routineSkips.set(adr.adr, adr.skip);
          break;
        }
      }
    }
    // create opcode handler according to arch
    switch(config.architecture) {
      case Architecture.M6502: this.opcodeHandler = new M6502Handler(this);
    }
  }

  disassemble(): string {
    // trace from starts
    this.trace();
    // then create disassembly
    return this.writeDisassembly();
  }

  private trace(): void {
    while(this.codeStarts.length > 0) {
      let start = this.codeStarts.pop()!;
      while(true) {
        let next = this.traceOpcode(start);
        if(next === undefined) break;
        start += next;
      }
    }
  }

  private traceOpcode(pc: number): number | undefined {
    if(pc >= 0x10000) {
      this.logWarning("Ran into end of 16-bit address range");
      return undefined;
    }
    let length = this.opcodeHandler.getOpcodeLength(this.data[pc]!, this.data[pc + 1] ?? 0);
    if(pc + length > 0x10000) {
      this.logWarning("Ran into end of 16-bit address range within opcode");
      return undefined;
    }

    for(let i = 0; i < length; i++) {
      let info = this.byteInfo[pc + i]!;

      if(info.type === ByteType.NON_ROM || info.type === ByteType.UNMAPPED) {
        this.logWarning("Ran into end of mapped range" + (i > 0 ? " within opcode" : ""));
        return undefined;
      }
      if(info.type === ByteType.CODE_S) {
        if(i > 0) this.logWarning(`Opcode start within opcode at $${hexStr(pc + i, 16)}`);
        return undefined;
      }
      if(info.type === ByteType.CODE_P) {
        this.logWarning(`Opcode start within opcode at $${hexStr(pc + i, 16)}`);
        return undefined;
      }
      if(info.type === ByteType.DATA) {
        if(i > 0) this.logWarning(`Explcit stop within opcode at $${hexStr(pc + i, 16)}`);
        return undefined;
      }
    }

    // mark as opcode and handle
    let opBytes: number[] = [];
    for(let i = 0; i < length; i++) {
      this.byteInfo[pc + i]!.type = i === 0 ? ByteType.CODE_S : ByteType.CODE_P;
      opBytes.push(this.data[pc + i]!);
    }

    let cont = this.opcodeHandler.traceOpcode(pc, ...opBytes);
    return cont ? length : undefined;
  }

  addLabel(pc: number, origLoc: number): void {
    if(this.byteInfo[pc]!.type === ByteType.NON_ROM) return;
    if(this.byteInfo[pc]!.type === ByteType.UNMAPPED) {
      this.logWarning(`Access to unmapped area at $${hexStr(pc, 16)} from $${hexStr(origLoc, 16)}`);
      return;
    }
    if(!this.labels.has(pc)) {
      this.labels.set(pc, 0);
    }
  }

  addStart(pc: number, origLoc: number, label: boolean): void {
    let info = this.byteInfo[pc]!;
    let pcStr = hexStr(pc, 16);
    let locStr = hexStr(origLoc, 16);
    if(info.type === ByteType.NON_ROM) return this.logWarning(`Jump to $${pcStr} in non-rom area from $${locStr}`);
    if(info.type === ByteType.UNMAPPED) return this.logWarning(`Jump to $${pcStr} outside mapped area from $${locStr}`);
    if(info.type === ByteType.DATA) return this.logWarning(`Jump to explicit stop $${pcStr} from $${locStr}`);
    if(label) this.addLabel(pc, origLoc);
    this.codeStarts.push(pc);
  }

  logWarning(warning: string): void {
    console.log(warning);
  }

  getAdrRef(adr: number, byte: boolean): string {
    if(this.labels.has(adr)) {
      let lbl;
      let skip = this.labels.get(adr)!;
      if(skip != 0) {
        let actLabel = adr + skip;
        lbl = `_${hexStr(actLabel, 16)} ${skip > 0 ? "-" : "+"} ${Math.abs(skip)}`;
      } else {
        lbl = `_${hexStr(adr, 16)}`;
      }
      return lbl;
    }
    return `${byte ? "<" : ""}$${hexStr(adr, byte ? 8 : 16)}`;
  }

  getSkipCount(adr: number): number | undefined {
    return this.routineSkips.get(adr);
  }

  isRomArea(adr: number): boolean {
    return this.byteInfo[adr]!.type !== ByteType.NON_ROM;
  }

  private writeDisassembly(): string {
    let pc = this.mapOffset;
    let output = `.org $${hexStr(pc, 16)}\n\n`;

    while(pc < this.mapOffset + this.mapLength) {
      if(this.labels.get(pc) === 0) {
        output += `_${hexStr(pc, 16)}:\n`;
      }
      let type = this.byteInfo[pc]!.type;
      if(type === ByteType.CODE_S) {
        let length = this.opcodeHandler.getOpcodeLength(this.data[pc]!, this.data[pc + 1] ?? 0);
        // check for labels during opcode, put them using equals
        let opcodeBytes: number[] = [this.data[pc]!];
        for(let i = 1; i < length; i++) {
          if(this.labels.get(pc + i) === 0) {
            output += `_${hexStr(pc + i, 16)} = * + ${i}\n`;
          }
          opcodeBytes.push(this.data[pc + i]!);
        }
        // then emit opcode
        output += `  ${this.opcodeHandler.disassembleOpcode(pc, ...opcodeBytes)}\n`;
        pc += length;
      } else {
        // print first byte
        output += `  .db $${hexStr(this.data[pc]!, 8)}`;
        pc++;
        // and print up to 7 more, provided no labels or opcode starts
        for(let i = 0; i < 7; i++) {
          if(this.labels.get(pc) === 0 || pc >= this.mapOffset + this.mapLength || this.byteInfo[pc]!.type === ByteType.CODE_S) {
            break;
          }
          output += `, $${hexStr(this.data[pc]!, 8)}`;
          pc++;
        }
        output += "\n";
      }
    }

    return output;
  }
}
