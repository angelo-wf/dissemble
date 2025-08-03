import { Disassembler, hexStr, OpcodeHandler } from "../disassembler.js";

enum Am {
  IMP,
  IMM,
  ZPG,
  ZPX,
  ZPY,
  IZX,
  IZY,
  ABS,
  ABX,
  ABY,
  IND,
  REL
};

const opcodeStrings: string[] = [
  "brk","ora","stp","slo","nop","ora","asl","slo","php","ora","asl","anc","nop","ora","asl","slo",
  "bpl","ora","stp","slo","nop","ora","asl","slo","clc","ora","nop","slo","nop","ora","asl","slo",
  "jsr","and","stp","rla","bit","and","rol","rla","plp","and","rol","anc","bit","and","rol","rla",
  "bmi","and","stp","rla","nop","and","rol","rla","sec","and","nop","rla","nop","and","rol","rla",
  "rti","eor","stp","sre","nop","eor","lsr","sre","pha","eor","lsr","alr","jmp","eor","lsr","sre",
  "bvc","eor","stp","sre","nop","eor","lsr","sre","cli","eor","nop","sre","nop","eor","lsr","sre",
  "rts","adc","stp","rra","nop","adc","ror","rra","pla","adc","ror","arr","jmp","adc","ror","rra",
  "bvs","adc","stp","rra","nop","adc","ror","rra","sei","adc","nop","rra","nop","adc","ror","rra",
  "nop","sta","nop","sax","sty","sta","stx","sax","dey","nop","txa","xaa","sty","sta","stx","sax",
  "bcc","sta","stp","ahx","sty","sta","stx","sax","tya","sta","txs","tas","shy","sta","shx","ahx",
  "ldy","lda","ldx","lax","ldy","lda","ldx","lax","tay","lda","tax","lxa","ldy","lda","ldx","lax",
  "bcs","lda","stp","lax","ldy","lda","ldx","lax","clv","lda","tsx","las","ldy","lda","ldx","lax",
  "cpy","cmp","nop","dcp","cpy","cmp","dec","dcp","iny","cmp","dex","axs","cpy","cmp","dec","dcp",
  "bne","cmp","stp","dcp","nop","cmp","dec","dcp","cld","cmp","nop","dcp","nop","cmp","dec","dcp",
  "cpx","sbc","nop","isc","cpx","sbc","inc","isc","inx","sbc","nop","sbc","cpx","sbc","inc","isc",
  "beq","sbc","stp","isc","nop","sbc","inc","isc","sed","sbc","nop","isc","nop","sbc","inc","isc"
];

const opcodeModes: Am[] = [
  Am.IMM,Am.IZX,Am.IMP,Am.IZX,Am.ZPG,Am.ZPG,Am.ZPG,Am.ZPG,Am.IMP,Am.IMM,Am.IMP,Am.IMM,Am.ABS,Am.ABS,Am.ABS,Am.ABS,
  Am.REL,Am.IZY,Am.IMP,Am.IZY,Am.ZPX,Am.ZPX,Am.ZPX,Am.ZPX,Am.IMP,Am.ABY,Am.IMP,Am.ABY,Am.ABX,Am.ABX,Am.ABX,Am.ABX,
  Am.ABS,Am.IZX,Am.IMP,Am.IZX,Am.ZPG,Am.ZPG,Am.ZPG,Am.ZPG,Am.IMP,Am.IMM,Am.IMP,Am.IMM,Am.ABS,Am.ABS,Am.ABS,Am.ABS,
  Am.REL,Am.IZY,Am.IMP,Am.IZY,Am.ZPX,Am.ZPX,Am.ZPX,Am.ZPX,Am.IMP,Am.ABY,Am.IMP,Am.ABY,Am.ABX,Am.ABX,Am.ABX,Am.ABX,
  Am.IMP,Am.IZX,Am.IMP,Am.IZX,Am.ZPG,Am.ZPG,Am.ZPG,Am.ZPG,Am.IMP,Am.IMM,Am.IMP,Am.IMM,Am.ABS,Am.ABS,Am.ABS,Am.ABS,
  Am.REL,Am.IZY,Am.IMP,Am.IZY,Am.ZPX,Am.ZPX,Am.ZPX,Am.ZPX,Am.IMP,Am.ABY,Am.IMP,Am.ABY,Am.ABX,Am.ABX,Am.ABX,Am.ABX,
  Am.IMP,Am.IZX,Am.IMP,Am.IZX,Am.ZPG,Am.ZPG,Am.ZPG,Am.ZPG,Am.IMP,Am.IMM,Am.IMP,Am.IMM,Am.IND,Am.ABS,Am.ABS,Am.ABS,
  Am.REL,Am.IZY,Am.IMP,Am.IZY,Am.ZPX,Am.ZPX,Am.ZPX,Am.ZPX,Am.IMP,Am.ABY,Am.IMP,Am.ABY,Am.ABX,Am.ABX,Am.ABX,Am.ABX,
  Am.IMM,Am.IZX,Am.IMM,Am.IZX,Am.ZPG,Am.ZPG,Am.ZPG,Am.ZPG,Am.IMP,Am.IMM,Am.IMP,Am.IMM,Am.ABS,Am.ABS,Am.ABS,Am.ABS,
  Am.REL,Am.IZY,Am.IMP,Am.IZY,Am.ZPX,Am.ZPX,Am.ZPY,Am.ZPY,Am.IMP,Am.ABY,Am.IMP,Am.ABY,Am.ABX,Am.ABX,Am.ABY,Am.ABY,
  Am.IMM,Am.IZX,Am.IMM,Am.IZX,Am.ZPG,Am.ZPG,Am.ZPG,Am.ZPG,Am.IMP,Am.IMM,Am.IMP,Am.IMM,Am.ABS,Am.ABS,Am.ABS,Am.ABS,
  Am.REL,Am.IZY,Am.IMP,Am.IZY,Am.ZPX,Am.ZPX,Am.ZPY,Am.ZPY,Am.IMP,Am.ABY,Am.IMP,Am.ABY,Am.ABX,Am.ABX,Am.ABY,Am.ABY,
  Am.IMM,Am.IZX,Am.IMM,Am.IZX,Am.ZPG,Am.ZPG,Am.ZPG,Am.ZPG,Am.IMP,Am.IMM,Am.IMP,Am.IMM,Am.ABS,Am.ABS,Am.ABS,Am.ABS,
  Am.REL,Am.IZY,Am.IMP,Am.IZY,Am.ZPX,Am.ZPX,Am.ZPX,Am.ZPX,Am.IMP,Am.ABY,Am.IMP,Am.ABY,Am.ABX,Am.ABX,Am.ABX,Am.ABX,
  Am.IMM,Am.IZX,Am.IMM,Am.IZX,Am.ZPG,Am.ZPG,Am.ZPG,Am.ZPG,Am.IMP,Am.IMM,Am.IMP,Am.IMM,Am.ABS,Am.ABS,Am.ABS,Am.ABS,
  Am.REL,Am.IZY,Am.IMP,Am.IZY,Am.ZPX,Am.ZPX,Am.ZPX,Am.ZPX,Am.IMP,Am.ABY,Am.IMP,Am.ABY,Am.ABX,Am.ABX,Am.ABX,Am.ABX
];

// 0: documented, 1: undocumented, 2: repeated encoding
const opcodeTypes: number[] = [
  0,0,1,1,1,0,0,1,0,0,0,1,1,0,0,1,
  0,0,2,1,1,0,0,1,0,0,2,1,1,0,0,1,
  0,0,2,1,0,0,0,1,0,0,0,2,0,0,0,1,
  0,0,2,1,2,0,0,1,0,0,2,1,2,0,0,1,
  0,0,2,1,2,0,0,1,0,0,0,1,0,0,0,1,
  0,0,2,1,2,0,0,1,0,0,2,1,2,0,0,1,
  0,0,2,1,2,0,0,1,0,0,0,1,0,0,0,1,
  0,0,2,1,2,0,0,1,0,0,2,1,2,0,0,1,
  1,0,2,1,0,0,0,1,0,2,0,1,0,0,0,1,
  0,0,2,1,0,0,0,1,0,0,0,1,1,0,1,1,
  0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,
  0,0,2,1,0,0,0,1,0,0,0,1,0,0,0,1,
  0,0,2,1,0,0,0,1,0,0,0,1,0,0,0,1,
  0,0,2,1,2,0,0,1,0,0,2,1,2,0,0,1,
  0,0,2,1,0,0,0,1,0,0,0,2,0,0,0,1,
  0,0,2,1,2,0,0,1,0,0,2,1,2,0,0,1
];

export class M6502Handler implements OpcodeHandler {

  private dis: Disassembler;

  constructor(disassembler: Disassembler) {
    this.dis = disassembler;
  }

  private getLengthForMode(mode: Am): number {
    switch(mode) {
      case Am.IMP: return 1;
      case Am.IMM: return 2;
      case Am.ZPG: case Am.ZPX: case Am.ZPY: case Am.IZX: case Am.IZY: return 2;
      case Am.ABS: case Am.ABX: case Am.ABY: return 3;
      case Am.IND: return 3;
      case Am.REL: return 2;
    }
  }

  getOpcodeLength(byte1: number, byte2: number): number {
    return this.getLengthForMode(opcodeModes[byte1]!);
  }

  private asWord(b1: number, b2: number): number {
    return b1 | (b2 << 8);
  }

  private getBranchTarget(pc: number, byte: number): number {
    let target = pc + 2 + (byte < 0x80 ? byte : -(0x100 - byte));
    return target & 0xffff;
  }

  traceOpcode(pc: number, ...bytes: number[]): boolean {
    let cont = true;

    let opcode = bytes[0]!;
    if([0x10, 0x30, 0x50, 0x70, 0x90, 0xb0, 0xd0, 0xf0].includes(opcode)) {
      // branch, add target as start
      this.dis.addStart(this.getBranchTarget(pc, bytes[1]!), pc, true);
    }
    if(opcode === 0x20) {
      // jsr, add address as start, handle skip bytes
      let adr = this.asWord(bytes[1]!, bytes[2]!);
      this.dis.addStart(adr, pc, true);
      let skip = this.dis.getSkipCount(adr);
      if(skip !== undefined) {
        cont = false;
        if(skip !== 0) {
          this.dis.addStart(pc + 3 + skip, pc, false);
        }
      }
    }
    if(opcode === 0x40 || opcode === 0x60) {
      // rti/rts, stop tracing
      cont = false;
    }
    if(opcode === 0x4c) {
      // jmp abs, add address as start, stop tracing
      let adr = this.asWord(bytes[1]!, bytes[2]!);
      this.dis.addStart(adr, pc, true);
      cont = false;
    }
    if(opcode === 0x6c) {
      // jmp ind, warn and stop tracing
      this.dis.logWarning(`Indirect jump at $${hexStr(pc, 16)}`);
      cont = false;
    }

    return cont;
  }

  disassembleOpcode(pc: number, ...bytes: number[]): string {
    let opcode = bytes[0]!;
    let opString = opcodeStrings[opcode]!;
    let opMode = opcodeModes[opcode]!;
    
    switch(opMode) {
      case Am.IMP: return `${opString}`;
      case Am.IMM: return `${opString} #$${hexStr(bytes[1]!, 8)}`;
      case Am.ZPG: return `${opString} ${this.dis.getAdrRef(bytes[1]!, true)}`;
      case Am.ZPX: return `${opString} ${this.dis.getAdrRef(bytes[1]!, true)}, x`;
      case Am.ZPY: return `${opString} ${this.dis.getAdrRef(bytes[1]!, true)}, y`;
      case Am.IZX: return `${opString} (${this.dis.getAdrRef(bytes[1]!, true)}, x)`;
      case Am.IZY: return `${opString} (${this.dis.getAdrRef(bytes[1]!, true)}), y`;
      case Am.ABS: return `${opString} ${this.dis.getAdrRef(this.asWord(bytes[1]!, bytes[2]!), false)}`;
      case Am.ABX: return `${opString} ${this.dis.getAdrRef(this.asWord(bytes[1]!, bytes[2]!), false)}, x`;
      case Am.ABY: return `${opString} ${this.dis.getAdrRef(this.asWord(bytes[1]!, bytes[2]!), false)}, y`;
      case Am.IND: return `${opString} (${this.dis.getAdrRef(this.asWord(bytes[1]!, bytes[2]!), false)})`;
      case Am.REL: return `${opString} ${this.dis.getAdrRef(this.getBranchTarget(pc, bytes[1]!), false)}`;
    }
  }
}
