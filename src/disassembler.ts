import { M6502Handler } from "./architectures/m6502.js";
import { AdrType, Architecture, Config } from "./config.js";

export enum ByteType {
  UNKNOWN,
  UNMAPPED,
  NON_ROM,
  CODE_S,
  CODE_P,
  DATA,
  DATA_LB,
  DATA_HB,
  DATA_LW,
  DATA_HW
};

const dataTableTypes: ByteType[] = [
  ByteType.DATA_LB, ByteType.DATA_HB, ByteType.DATA_LW, ByteType.DATA_HW
];

export type ByteInfo = {
  type: ByteType,
  word?: number
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

  private ramLabels: boolean;
  private adrComments: boolean;

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
          this.codeStarts.push(adr.adr);
          this.labels.set(adr.adr, 0);
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
        case AdrType.POINTERS: case AdrType.TABLE: {
          let offset = adr.off ?? 0;
          let hasAdrh = adr.adrh !== undefined;
          for(let i = 0; i < adr.count; i++) {
            let target: number;
            if(!hasAdrh) {
              this.byteInfo[adr.adr + i * 2]!.type = ByteType.DATA_LW;
              this.byteInfo[adr.adr + i * 2 + 1]!.type = ByteType.DATA_HW;
              target = this.data[adr.adr + i * 2]! | (this.data[adr.adr + i * 2 + 1]! << 8);
            } else {
              this.byteInfo[adr.adr + i]!.type = ByteType.DATA_LB;
              this.byteInfo[adr.adrh! + i]!.type = ByteType.DATA_HB;
              target = this.data[adr.adr + i]! | (this.data[adr.adrh! + i]! << 8);
              this.byteInfo[adr.adr + i]!.word = target;
              this.byteInfo[adr.adrh! + i]!.word = target;
            }
            let valid = this.checkLabelAdd(target, adr.adr + i * (hasAdrh ? 1 : 2));
            if(valid) {
              this.labels.set(target, offset);
              if(offset) this.labels.set(target + offset, 0);
            }
            if(adr.t === AdrType.POINTERS) {
              this.addStart(target + offset, adr.adr + i * (hasAdrh ? 1 : 2), false);
            }
          }
          this.labels.set(adr.adr, 0);
          if(!hasAdrh) {
            this.labels.set(adr.adr + 1, -1);
          } else {
            this.labels.set(adr.adrh!, 0);
          }
          break;
        }
      }
    }
    // create opcode handler according to arch
    switch(config.architecture) {
      case Architecture.M6502: this.opcodeHandler = new M6502Handler(this);
    }
    // set misc items
    this.ramLabels = config.ramLabels;
    this.adrComments = config.adrComments;
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
      if(dataTableTypes.includes(info.type)) {
        if(i > 0) this.logWarning(`Pointer table within opcode at $${hexStr(pc + i, 16)}`);
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

  private checkLabelAdd(pc: number, origLoc: number): boolean {
    if(this.byteInfo[pc]!.type === ByteType.NON_ROM) {
      return this.ramLabels;
    }
    if(this.byteInfo[pc]!.type === ByteType.UNMAPPED) {
      this.logWarning(`Access to unmapped area at $${hexStr(pc, 16)} from $${hexStr(origLoc, 16)}`);
      return false;
    }
    return true;
  }

  addLabel(pc: number, origLoc: number): void {
    if(!this.checkLabelAdd(pc, origLoc)) return;
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
    if(dataTableTypes.includes(info.type)) return this.logWarning(`Jump to within pointer table at $${pcStr} from $${locStr}`);
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

  private getDataByte(byte: number, type: ByteType, word?: number): string {
    if(type === ByteType.DATA_LB) {
      let adr = (word! & 0xff00) | byte;
      return this.getAdrRef(adr, false);
    }
    if(type === ByteType.DATA_HB) {
      let adr = (word! & 0xff) | (byte << 8);
      return this.getAdrRef(adr, false);
    }
    return `$${hexStr(byte, 8)}`;
  }

  private writeDisassembly(): string {
    let pc = this.mapOffset;
    let output = `.org $${hexStr(pc, 16)}\n\n`;

    // emit all labels not within mapped area as equals
    let labelEmitted = false;
    for(let i = 0; i < 0x10000; i++) {
      if((i < this.mapOffset || i >= this.mapOffset + this.mapLength) && this.labels.get(i) === 0) {
        output += `_${hexStr(i, 16)} = $${hexStr(i, 16)}\n`;
        labelEmitted = true;
      }
    }
    output += labelEmitted ? "\n" : "";

    while(pc < this.mapOffset + this.mapLength) {
      if(this.labels.get(pc) === 0) {
        output += `_${hexStr(pc, 16)}:\n`;
      }
      let info = this.byteInfo[pc]!;
      let type = info.type;
      let linePc = pc;
      if(type === ByteType.CODE_S) {
        let length = this.opcodeHandler.getOpcodeLength(this.data[pc]!, this.data[pc + 1] ?? 0);
        // check for labels during opcode, put them using equals
        let opcodeBytes: number[] = [this.data[pc]!];
        for(let i = 1; i < length; i++) {
          if(this.labels.get(pc + i) === 0) {
            output += `_${hexStr(pc + i, 16)} = * + ${i}\n`;
            this.logWarning(`Label wanted within opcode at $${hexStr(pc + i, 16)}`);
          }
          opcodeBytes.push(this.data[pc + i]!);
        }
        // then emit opcode
        output += `  ${this.opcodeHandler.disassembleOpcode(pc, ...opcodeBytes)}`;
        pc += length;
      } else if(type === ByteType.DATA_LW) {
        // check for label one spot ahead in word
        if(this.labels.get(pc + 1) === 0) {
          output += `_${hexStr(pc + 1, 16)} = * + 1\n`;
          this.logWarning(`Label wanted within word at $${hexStr(pc + 1, 16)}`);
        }
        // emit word
        let word = this.data[pc]! | (this.data[pc + 1]! << 8);
        output += `  .dw ${this.getAdrRef(word, false)}`;
        pc += 2;
      } else {
        // print first byte, or lb/hb of word for split table
        let dir = ".db";
        if(type === ByteType.DATA_LB) dir = ".dlb";
        if(type === ByteType.DATA_HB) dir = ".dhb";
        output += `  ${dir} ${this.getDataByte(this.data[pc]!, type, info.word)}`;
        pc++;
        // and print up to 7 more, provided no labels or switch to different type
        for(let i = 0; i < 7; i++) {
          let bInfo = this.byteInfo[pc]!;
          if(this.labels.get(pc) === 0 || pc >= this.mapOffset + this.mapLength || bInfo.type !== type) {
            break;
          }
          output += `, ${this.getDataByte(this.data[pc]!, type, bInfo.word)}`;
          pc++;
        }
      }
      if(this.adrComments) {
        output += ` ;@${hexStr(linePc, 16)}`;
      }
      output += "\n";
    }

    return output;
  }
}
