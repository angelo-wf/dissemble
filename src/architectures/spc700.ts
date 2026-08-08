import { asWord, Disassembler, hexStr, OpcodeHandler } from "../disassembler.js";

enum Am {
  IMP,
  IMM,
  DPG,
  DPD,
  DPI,
  DPR,
  ABS,
  ABB,
  REL
};

const opcodeStrings: string[] = [
  "nop",    "tcall 0",  "set1 V1,0", "bbs V1,0, V2", "or a, V1",      "or a, V1",      "or a, (x)",     "or a, (V1 + x)",  "or a, #V1",   "or V1, V2",     "or1 c, V1,V2",   "asl V1",        "asl V1",    "push psw",   "tset V1",         "brk",
  "bpl V1", "tcall 1",  "clr1 V1,0", "bbc V1,0, V2", "or a, V1 + x",  "or a, V1 + x",  "or a, V1 + y",  "or a, (V1) + y",  "or V1, #V2",  "or (x), (y)",   "decw V1",        "asl V1 + x",    "asl a",     "dec x",      "cmp x, V1",       "jmp (V1 + x)",
  "clrp",   "tcall 2",  "set1 V1,1", "bbs V1,1, V2", "and a, V1",     "and a, V1",     "and a, (x)",    "and a, (V1 + x)", "and a, #V1",  "and V1, V2",    "or1 c, /V1,V2",  "rol V1",        "rol V1",    "push a",     "cbne V1, V2",     "bra V1",
  "bmi V1", "tcall 3",  "clr1 V1,1", "bbc V1,1, V2", "and a, V1 + x", "and a, V1 + x", "and a, V1 + y", "and a, (V1) + y", "and V1, #V2", "and (x), (y)",  "incw V1",        "rol V1 + x",    "rol a",     "inc x",      "cmp x, V1",       "call V1",
  "setp",   "tcall 4",  "set1 V1,2", "bbs V1,2, V2", "eor a, V1",     "eor a, V1",     "eor a, (x)",    "eor a, (V1 + x)", "eor a, #V1",  "eor V1, V2",    "and1 c, V1,V2",  "lsr V1",        "lsr V1",    "push x",     "tclr V1",         "pcall V1",
  "bvc V1", "tcall 5",  "clr1 V1,2", "bbc V1,2, V2", "eor a, V1 + x", "eor a, V1 + x", "eor a, V1 + y", "eor a, (V1) + y", "eor V1, #V2", "eor (x), (y)",  "cmpw ya, V1",    "lsr V1 + x",    "lsr a",     "mov x, a",   "cmp y, V1",       "jmp V1",
  "clrc",   "tcall 6",  "set1 V1,3", "bbs V1,3, V2", "cmp a, V1",     "cmp a, V1",     "cmp a, (x)",    "cmp a, (V1 + x)", "cmp a, #V1",  "cmp V1, V2",    "and1 c, /V1,V2", "ror V1",        "ror V1",    "push y",     "dbnz V1, V2",     "ret",
  "bvs V1", "tcall 7",  "clr1 V1,3", "bbc V1,3, V2", "cmp a, V1 + x", "cmp a, V1 + x", "cmp a, V1 + y", "cmp a, (V1) + y", "cmp V1, #V2", "cmp (x), (y)",  "addw ya, V1",    "ror V1 + x",    "ror a",     "mov a, x",   "cmp y, V1",       "reti",
  "setc",   "tcall 8",  "set1 V1,4", "bbs V1,4, V2", "adc a, V1",     "adc a, V1",     "adc a, (x)",    "adc a, (V1 + x)", "adc a, #V1",  "adc V1, V2",    "eor1 c, V1,V2",  "dec V1",        "dec V1",    "mov y, #V1", "pop psw",         "mov V1, #V2",
  "bcc V1", "tcall 9",  "clr1 V1,4", "bbc V1,4, V2", "adc a, V1 + x", "adc a, V1 + x", "adc a, V1 + y", "adc a, (V1) + y", "adc V1, #V2", "adc (x), (y)",  "subw ya, V1",    "dec V1 + x",    "dec a",     "mov x, sp",  "div ya, x",       "xcn a",
  "ei",     "tcall 10", "set1 V1,5", "bbs V1,5, V2", "sbc a, V1",     "sbc a, V1",     "sbc a, (x)",    "sbc a, (V1 + x)", "sbc a, #V1",  "sbc V1, V2",    "mov1 c, V1,V2",  "inc V1",        "inc V1",    "cmp y, #V1", "pop a",           "mov (x+), a",
  "bcs V1", "tcall 11", "clr1 V1,5", "bbc V1,5, V2", "sbc a, V1 + x", "sbc a, V1 + x", "sbc a, V1 + y", "sbc a, (V1) + y", "sbc V1, #V2", "sbc (x), (y)",  "movw ya, V1",    "inc V1 + x",    "inc a",     "mov sp, x",  "das a",           "mov a, (x+)",
  "di",     "tcall 12", "set1 V1,6", "bbs V1,6, V2", "mov V1, a",     "mov V1, a",     "mov (x), a",    "mov (V1 + x), a", "cmp x, #V1",  "mov V1, x",     "mov1 V1,V2, c",  "mov V1, y",     "mov V1, y", "mov x, #V1", "pop x",           "mul ya",
  "bne V1", "tcall 13", "clr1 V1,6", "bbc V1,6, V2", "mov V1 + x, a", "mov V1 + x, a", "mov V1 + y, a", "mov (V1) + y, a", "mov V1, x",   "mov V1 + y, x", "movw V1, ya",    "mov V1 + x, y", "dec y",     "mov a, y",   "cbne V1 + x, V2", "daa a",
  "clrv",   "tcall 14", "set1 V1,7", "bbs V1,7, V2", "mov a, V1",     "mov a, V1",     "mov a, (x)",    "mov a, (V1 + x)", "mov a, #V1",  "mov x, V1",     "not1 V1,V2",     "mov y, V1",     "mov y, V1", "notc",       "pop y",           "sleep",
  "beq V1", "tcall 15", "clr1 V1,7", "bbc V1,7, V2", "mov a, V1 + x", "mov a, V1 + x", "mov a, V1 + y", "mov a, (V1) + y", "mov x, V1",   "mov x, V1 + y", "mov V1, V2",     "mov y, V1 + x", "inc y",     "mov y, a",   "dbnz y, V1",      "stop"
];

const opcodeModes: Am[] = [
  Am.IMP, Am.IMP, Am.DPG, Am.DPR, Am.DPG, Am.ABS, Am.IMP, Am.DPG, Am.IMM, Am.DPD, Am.ABB, Am.DPG, Am.ABS, Am.IMP, Am.ABS, Am.IMP,
  Am.REL, Am.IMP, Am.DPG, Am.DPR, Am.DPG, Am.ABS, Am.ABS, Am.DPG, Am.DPI, Am.IMP, Am.DPG, Am.DPG, Am.IMP, Am.IMP, Am.ABS, Am.ABS,
  Am.IMP, Am.IMP, Am.DPG, Am.DPR, Am.DPG, Am.ABS, Am.IMP, Am.DPG, Am.IMM, Am.DPD, Am.ABB, Am.DPG, Am.ABS, Am.IMP, Am.DPR, Am.REL,
  Am.REL, Am.IMP, Am.DPG, Am.DPR, Am.DPG, Am.ABS, Am.ABS, Am.DPG, Am.DPI, Am.IMP, Am.DPG, Am.DPG, Am.IMP, Am.IMP, Am.DPG, Am.ABS,
  Am.IMP, Am.IMP, Am.DPG, Am.DPR, Am.DPG, Am.ABS, Am.IMP, Am.DPG, Am.IMM, Am.DPD, Am.ABB, Am.DPG, Am.ABS, Am.IMP, Am.ABS, Am.IMM,
  Am.REL, Am.IMP, Am.DPG, Am.DPR, Am.DPG, Am.ABS, Am.ABS, Am.DPG, Am.DPI, Am.IMP, Am.DPG, Am.DPG, Am.IMP, Am.IMP, Am.ABS, Am.ABS,
  Am.IMP, Am.IMP, Am.DPG, Am.DPR, Am.DPG, Am.ABS, Am.IMP, Am.DPG, Am.IMM, Am.DPD, Am.ABB, Am.DPG, Am.ABS, Am.IMP, Am.DPR, Am.IMP,
  Am.REL, Am.IMP, Am.DPG, Am.DPR, Am.DPG, Am.ABS, Am.ABS, Am.DPG, Am.DPI, Am.IMP, Am.DPG, Am.DPG, Am.IMP, Am.IMP, Am.DPG, Am.IMP,
  Am.IMP, Am.IMP, Am.DPG, Am.DPR, Am.DPG, Am.ABS, Am.IMP, Am.DPG, Am.IMM, Am.DPD, Am.ABB, Am.DPG, Am.ABS, Am.IMM, Am.IMP, Am.DPI,
  Am.REL, Am.IMP, Am.DPG, Am.DPR, Am.DPG, Am.ABS, Am.ABS, Am.DPG, Am.DPI, Am.IMP, Am.DPG, Am.DPG, Am.IMP, Am.IMP, Am.IMP, Am.IMP,
  Am.IMP, Am.IMP, Am.DPG, Am.DPR, Am.DPG, Am.ABS, Am.IMP, Am.DPG, Am.IMM, Am.DPD, Am.ABB, Am.DPG, Am.ABS, Am.IMM, Am.IMP, Am.IMP,
  Am.REL, Am.IMP, Am.DPG, Am.DPR, Am.DPG, Am.ABS, Am.ABS, Am.DPG, Am.DPI, Am.IMP, Am.DPG, Am.DPG, Am.IMP, Am.IMP, Am.IMP, Am.IMP,
  Am.IMP, Am.IMP, Am.DPG, Am.DPR, Am.DPG, Am.ABS, Am.IMP, Am.DPG, Am.IMM, Am.ABS, Am.ABB, Am.DPG, Am.ABS, Am.IMM, Am.IMP, Am.IMP,
  Am.REL, Am.IMP, Am.DPG, Am.DPR, Am.DPG, Am.ABS, Am.ABS, Am.DPG, Am.DPG, Am.DPG, Am.DPG, Am.DPG, Am.IMP, Am.IMP, Am.DPR, Am.IMP,
  Am.IMP, Am.IMP, Am.DPG, Am.DPR, Am.DPG, Am.ABS, Am.IMP, Am.DPG, Am.IMM, Am.ABS, Am.ABB, Am.DPG, Am.ABS, Am.IMP, Am.IMP, Am.IMP,
  Am.REL, Am.IMP, Am.DPG, Am.DPR, Am.DPG, Am.ABS, Am.ABS, Am.DPG, Am.DPG, Am.DPG, Am.DPD, Am.DPG, Am.IMP, Am.IMP, Am.REL, Am.IMP
];

// 0: no access, 1: read, 2: (read and) write, +4: abs with dp equivalent
const opcodeType: number[] = [
  0, 0, 2, 1, 1, 5, 0, 1, 0, 2, 1, 2, 6, 0, 2, 0,
  0, 0, 2, 1, 1, 5, 1, 1, 1, 0, 2, 2, 0, 0, 5, 0,
  0, 0, 2, 1, 1, 5, 0, 1, 0, 2, 1, 2, 6, 0, 1, 0,
  0, 0, 2, 1, 1, 5, 1, 1, 1, 0, 2, 2, 0, 0, 1, 0,
  0, 0, 2, 1, 1, 5, 0, 1, 0, 2, 1, 2, 6, 0, 2, 0,
  0, 0, 2, 1, 1, 5, 1, 1, 1, 0, 1, 2, 0, 0, 5, 0,
  0, 0, 2, 1, 1, 5, 0, 1, 0, 2, 1, 2, 6, 0, 2, 0,
  0, 0, 2, 1, 1, 5, 1, 1, 1, 0, 1, 2, 0, 0, 1, 0,
  0, 0, 2, 1, 1, 5, 0, 1, 0, 2, 1, 2, 6, 0, 0, 2,
  0, 0, 2, 1, 1, 5, 1, 1, 1, 0, 1, 2, 0, 0, 0, 0,
  0, 0, 2, 1, 1, 5, 0, 1, 0, 2, 1, 2, 6, 0, 0, 0,
  0, 0, 2, 1, 1, 5, 1, 1, 1, 0, 1, 2, 0, 0, 0, 0,
  0, 0, 2, 1, 2, 6, 0, 2, 0, 6, 2, 2, 6, 0, 0, 0,
  0, 0, 2, 1, 2, 6, 2, 2, 2, 2, 2, 2, 0, 0, 1, 0,
  0, 0, 2, 1, 1, 5, 0, 1, 0, 5, 2, 1, 5, 0, 0, 0,
  0, 0, 2, 1, 1, 5, 1, 1, 1, 1, 2, 1, 0, 0, 0, 0
];

export class Spc700Handler implements OpcodeHandler {

  private dis: Disassembler;

  constructor(dis: Disassembler) {
    this.dis = dis;
  }

  private getLengthForMode(mode: Am): number {
    switch(mode) {
      case Am.IMP: return 1;
      case Am.IMM: return 2;
      case Am.DPG: return 2;
      case Am.DPD: return 3;
      case Am.DPI: return 3;
      case Am.DPR: return 3;
      case Am.ABS: return 3;
      case Am.ABB: return 3;
      case Am.REL: return 2;
    }
  }

  getOpcodeLength(byte1: number, byte2: number): number {
    return this.getLengthForMode(opcodeModes[byte1]!);
  }

  private getBranchTarget(pc: number, byte: number, size: number): number {
    let target = pc + size + (byte < 0x80 ? byte : -(0x100 - byte));
    return target & 0xffff;
  }

  traceOpcode(pc: number, bytes: number[]): boolean {
    let opcode = bytes[0]!;

    if([0x10, 0x30, 0x50, 0x70, 0x90, 0xb0, 0xd0, 0xf0, 0xfe].includes(opcode)) {
      // branch
      this.dis.addStart(this.getBranchTarget(pc, bytes[1]!, 2), pc, true);
      return true;
    }
    if((opcode & 0x0f) === 0x03 || [0x2e, 0x6e, 0xde].includes(opcode)) {
      // branch with dp-access
      this.dis.addStart(this.getBranchTarget(pc, bytes[2]!, 3), pc, true);
      if(opcode === 0x6e) {
        // increment on dp
        this.dis.logPossibleRomWrite(bytes[1]!, pc);
      }
      this.dis.addLabel(bytes[1]!, pc);
      return true;
    }
    if(opcode === 0x2f) {
      // branch always
      this.dis.addStart(this.getBranchTarget(pc, bytes[1]!, 2), pc, true);
      return false;
    }
    if(opcode === 0x3f) {
      // jump to subroutine
      let adr = asWord(bytes[1]!, bytes[2]!);
      this.dis.addStart(adr, pc, true);
      return this.dis.handleRoutineSkip(adr, pc, 3);
    }
    if([0x6f, 0x7f, 0xff].includes(opcode)) {
      // return/stop
      return false;
    }
    if(opcode === 0x5f) {
      // jump
      let adr = asWord(bytes[1]!, bytes[2]!);
      this.dis.addStart(adr, pc, true);
      return false;
    }
    if(opcode === 0x1f) {
      // jump indirect
      let adr = asWord(bytes[1]!, bytes[2]!);
      this.dis.addLabel(adr, pc);
      this.dis.logIndirect(pc);
      return false;
    }

    let mode = opcodeModes[opcode]!;
    let type = opcodeType[opcode]! & 3;
    if(mode === Am.DPI) {
      this.dis.logPossibleRomWrite(bytes[2]!, pc);
      this.dis.addLabel(bytes[2]!, pc);
    } else if(mode === Am.DPD) {
      this.dis.logPossibleRomWrite(bytes[2]!, pc);
      this.dis.addLabel(bytes[2]!, pc);
      this.dis.addLabel(bytes[1]!, pc);
    } else if(type > 0) {
      let adr: number;
      if(mode === Am.ABB) {
        adr = asWord(bytes[1]!, bytes[2]!) & 0x1fff;
      } else {
        adr = mode === Am.ABS ? asWord(bytes[1]!, bytes[2]!) : bytes[1]!;
      }
      if(type === 2) {
        this.dis.logPossibleRomWrite(adr, pc);
      }
      this.dis.addLabel(adr, pc);
    }

    return true;
  }

  disassembleOpcode(pc: number, bytes: number[]): string[] {
    let opString = opcodeStrings[bytes[0]!]!;
    let mode = opcodeModes[bytes[0]!];
    let absWithZp = (opcodeType[bytes[0]!]! >> 2) == 1;
    let outString = opString;
    let extra = "";

    if(opString.includes("V1")) {
      let replacement = "";
      switch(mode) {
        case Am.IMM: replacement = `$${hexStr(bytes[1]!, 8)}`; break;
        case Am.DPG: replacement = this.dis.getAdrRef(bytes[1]!, true); break;
        case Am.DPD: replacement = this.dis.getAdrRef(bytes[2]!, true); break;
        case Am.DPI: replacement = this.dis.getAdrRef(bytes[2]!, true); break;
        case Am.DPR: replacement = this.dis.getAdrRef(bytes[1]!, true); break;
        case Am.ABS: replacement = this.dis.getAdrRef(asWord(bytes[1]!, bytes[2]!), false); break;
        case Am.ABB: replacement = this.dis.getAdrRef(asWord(bytes[1]!, bytes[2]!) & 0x1fff, false); break;
        case Am.REL: replacement = this.dis.getAdrRef(this.getBranchTarget(pc, bytes[1]!, 2), false); break;
      }
      outString = outString.replace("V1", replacement);
      if(mode === Am.ABS && absWithZp) {
        if(asWord(bytes[1]!, bytes[2]!) < 0x100) extra = ".a";
      }
    }
    if(opString.includes("V2")) {
      let replacement = "";
      switch(mode) {
        case Am.DPD: replacement = this.dis.getAdrRef(bytes[1]!, true); break;
        case Am.DPI: replacement = `$${hexStr(bytes[1]!, 8)}`; break;
        case Am.DPR: replacement = this.dis.getAdrRef(this.getBranchTarget(pc, bytes[2]!, 3), false); break;
        case Am.ABB: replacement = `${asWord(bytes[1]!, bytes[2]!) >> 13}`; break;
      }
      outString = outString.replace("V2", replacement);
    }
    let parts = outString.split(" ");
    parts[0] = parts[0] + extra;
    outString = parts.join(" ");

    return [outString];
  }
}
