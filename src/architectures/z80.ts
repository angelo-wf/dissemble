import { Disassembler, hexStr, OpcodeHandler } from "../disassembler.js";

const mainOpcodes: string[] = [
  "nop",         "ld bc, WRD",  "ld (bc), a",    "inc bc",       "inc b",        "dec b",       "ld b, BYT",     "rlca",        "ex af, af'", "add IDX, bc",  "ld a, (bc)",    "dec bc",      "inc c",        "dec c",       "ld c, BYT",    "rrca",
  "djnz REL",    "ld de, WRD",  "ld (de), a",    "inc de",       "inc d",        "dec d",       "ld d, BYT",     "rla",         "jr REL",     "add IDX, de",  "ld a, (de)",    "dec de",      "inc e",        "dec e",       "ld e, BYT",    "rra",
  "jr nz, REL",  "ld IDX, WRD", "ld (ADW), IDX", "inc IDX",      "inc IDH",      "dec IDH",     "ld IDH, BYT",   "daa",         "jr z, REL",  "add IDX, IDX", "ld IDX, (ADR)", "dec IDX",     "inc IDL",      "dec IDL",     "ld IDL, BYT",  "cpl",
  "jr nc, REL",  "ld sp, WRD",  "ld (ADW), a",   "inc sp",       "inc (IDD)",    "dec (IDD)",   "ld (IDD), BYT", "dcf",         "jr c, REL",  "add IDX, sp",  "ld a, (ADR)",   "dec sp",      "inc a",        "dec a",       "ld a, BYT",    "ccf",
  "ld b, b",     "ld b, c",     "ld b, d",       "ld b, e",      "ld b, IDH",    "ld b, IDL",   "ld b, (IDD)",   "ld b, a",     "ld c, b",    "ld c, c",      "ld c, d",       "ld c, e",     "ld c, IDH",    "ld c, IDL",   "ld c, (IDD)",  "ld c, a",
  "ld d, b",     "ld d, c",     "ld d, d",       "ld d, e",      "ld d, IDH",    "ld d, IDL",   "ld d, (IDD)",   "ld d, a",     "ld e, b",    "ld e, c",      "ld e, d",       "ld e, e",     "ld e, IDH",    "ld e, IDL",   "ld e, (IDD)",  "ld e, a",
  "ld IDH, b",   "ld IDH, c",   "ld IDH, d",     "ld IDH, e",    "ld IDH, IDH",  "ld IDH, IDL", "ld h, (IDD)",   "ld IDH, a",   "ld IDL, b",  "ld IDL, c",    "ld IDL, d",     "ld IDL, e",   "ld IDL, IDH",  "ld IDL, IDL", "ld l, (IDD)",  "ld IDL, a",
  "ld (IDD), b", "ld (IDD), c", "ld (IDD), d",   "ld (IDD), e",  "ld (IDD), h",  "ld (IDD), l", "halt",          "ld (IDD), a", "ld a, b",    "ld a, c",      "ld a, d",       "ld a, e",     "ld a, IDH",    "ld a, IDL",   "ld a, (IDD)",  "ld a, a",
  "add a, b",    "add a, c",    "add a, d",      "add a, e",     "add a, IDH",   "add a, IDL",  "add a, (IDD)",  "add a, a",    "adc a, b",   "adc a, c",     "adc a, d",      "adc a, e",    "adc a, IDH",   "adc a, IDL",  "adc a, (IDD)", "adc a, a",
  "sub b",       "sub c",       "sub d",         "sub e",        "sub IDH",      "sub IDL",     "sub (IDD)",     "sub a",       "sbc a, b",   "sbc a, c",     "sbc a, d",      "sbc a, e",    "sbc a, IDH",   "sbc a, IDL",  "sbc a, (IDD)", "sbc a, a",
  "and b",       "and c",       "and d",         "and e",        "and IDH",      "and IDL",     "and (IDD)",     "and a",       "xor b",      "xor c",        "xor d",         "xor e",       "xor IDH",      "xor IDL",     "xor (IDD)",    "xor a",
  "or b",        "or c",        "or d",          "or e",         "or IDH",       "or IDL",      "or (IDD)",      "or a",        "cp b",       "cp c",         "cp d",          "cp e",        "cp IDH",       "cp IDL",      "cp (IDD)",     "cp a",
  "ret nz",      "pop bc",      "jp nz, ADR",    "jp ADR",       "call nz, ADR", "push bc",     "add a, BYT",    "rst $00",     "ret z",      "ret",          "jp z, ADR",     "<bit>",       "call z, ADR",  "call ADR",    "adc a, BYT",   "rst $08",
  "ret nc",      "pop de",      "jp nc, ADR",    "out (BYT), a", "call nc, ADR", "push de",     "sub BYT",       "rst $10",     "ret c",      "exx",          "jp c, ADR",     "in a, (BYT)", "call c, ADR",  "<ix>",        "sbc a, BYT",   "rst $18",
  "ret po",      "pop IDX",     "jp po, ADR",    "ex (sp), IDX", "call po, ADR", "push IDX",    "and BYT",       "rst $20",     "ret pe",     "jp (IDX)",     "jp pe, ADR",    "ex de, hl",   "call pe, ADR", "<ed>",        "xor BYT",      "rst $28",
  "ret p",       "pop af",      "jp p, ADR",     "di",           "call p, ADR",  "push af",     "or BYT",        "rst $30",     "ret m",      "ld sp, IDX",   "jp m, ADR",     "ei",          "call m, ADR",  "<iy>",        "cp BYT",       "rst $38"
];

const edOpcodes: string[] = [
  "Unop",      "Unop",       "Unop",       "Unop",          "Unop", "Unop",  "Unop",  "Unop",    "Unop",      "Unop",       "Unop",       "Unop",          "Unop", "Unop",  "Unop",  "Unop",
  "Unop",      "Unop",       "Unop",       "Unop",          "Unop", "Unop",  "Unop",  "Unop",    "Unop",      "Unop",       "Unop",       "Unop",          "Unop", "Unop",  "Unop",  "Unop",
  "Unop",      "Unop",       "Unop",       "Unop",          "Unop", "Unop",  "Unop",  "Unop",    "Unop",      "Unop",       "Unop",       "Unop",          "Unop", "Unop",  "Unop",  "Unop",
  "Unop",      "Unop",       "Unop",       "Unop",          "Unop", "Unop",  "Unop",  "Unop",    "Unop",      "Unop",       "Unop",       "Unop",          "Unop", "Unop",  "Unop",  "Unop",
  "in b, (c)", "out (c), b", "sbc hl, bc", "ld (ADW), bc",  "neg",  "retn",  "im 0",  "ld i, a", "in c, (c)", "out (c), c", "adc hl, bc", "ld bc, (ADR)",  "Uneg", "reti",  "Uim 0", "ld r, a",
  "in d, (c)", "out (c), d", "sbc hl, de", "ld (ADW), de",  "Uneg", "Uretn", "im 1",  "ld a, i", "in e, (c)", "out (c), e", "adc hl, de", "ld de, (ADR)",  "Uneg", "Ureti", "im 2",  "ld a, r",
  "in h, (c)", "out (c), h", "sbc hl, hl", "Uld (ADW), hl", "Uneg", "Uretn", "Uim 0", "rrd",     "in l, (c)", "out (c), l", "adc hl, hl", "Uld hl, (ADR)", "Uneg", "Ureti", "Uim 0", "rld",
  "in (c)",    "out (c), 0", "sbc hl, sp", "ld (ADW), sp",  "Uneg", "Uretn", "Uim 1", "Unop",    "in a, (c)", "out (c), a", "adc hl, sp", "ld sp, (ADR)",  "Uneg", "Ureti", "Uim 2", "Unop",
  "Unop",      "Unop",       "Unop",       "Unop",          "Unop", "Unop",  "Unop",  "Unop",    "Unop",      "Unop",       "Unop",       "Unop",          "Unop", "Unop",  "Unop",  "Unop",
  "Unop",      "Unop",       "Unop",       "Unop",          "Unop", "Unop",  "Unop",  "Unop",    "Unop",      "Unop",       "Unop",       "Unop",          "Unop", "Unop",  "Unop",  "Unop",
  "ldi",       "cpi",        "ini",        "outi",          "Unop", "Unop",  "Unop",  "Unop",    "ldd",       "cpd",        "ind",        "outd",          "Unop", "Unop",  "Unop",  "Unop",
  "ldir",      "cpir",       "inir",       "otir",          "Unop", "Unop",  "Unop",  "Unop",    "lddr",      "cpdr",       "indr",       "otdr",          "Unop", "Unop",  "Unop",  "Unop",
  "Unop",      "Unop",       "Unop",       "Unop",          "Unop", "Unop",  "Unop",  "Unop",    "Unop",      "Unop",       "Unop",       "Unop",          "Unop", "Unop",  "Unop",  "Unop",
  "Unop",      "Unop",       "Unop",       "Unop",          "Unop", "Unop",  "Unop",  "Unop",    "Unop",      "Unop",       "Unop",       "Unop",          "Unop", "Unop",  "Unop",  "Unop",
  "Unop",      "Unop",       "Unop",       "Unop",          "Unop", "Unop",  "Unop",  "Unop",    "Unop",      "Unop",       "Unop",       "Unop",          "Unop", "Unop",  "Unop",  "Unop",
  "Unop",      "Unop",       "Unop",       "Unop",          "Unop", "Unop",  "Unop",  "Unop",    "Unop",      "Unop",       "Unop",       "Unop",          "Unop", "Unop",  "Unop",  "Unop"
];

const bitOpcodes = [
  "rlc",    "rrc",    "rl",     "rr",     "sla",    "sra",    "sll",    "srl",
  "bit 0,", "bit 1,", "bit 2,", "bit 3,", "bit 4,", "bit 5,", "bit 6,", "bit 7,",
  "res 0,", "res 1,", "res 2,", "res 3,", "res 4,", "res 5,", "res 6,", "res 7,",
  "set 0,", "set 1,", "set 2,", "set 3,", "set 4,", "set 5,", "set 6,", "set 7,"
];

export class Z80Handler implements OpcodeHandler {

  private dis: Disassembler;

  constructor(disassembler: Disassembler) {
    this.dis = disassembler;
  }

  private includesAny(str: string, checks: string[]): boolean {
    for(let check of checks) {
      if(str.includes(check)) return true;
    }
    return false;
  }

  getOpcodeLength(byte1: number, byte2: number): number {
    if(byte1 === 0xed) {
      // ed opcode
      return this.includesAny(edOpcodes[byte2]!, ["ADR", "ADW"]) ? 4 : 2;
    }
    if(byte1 === 0xcb) {
      // bit opcode
      return 2;
    }
    let idxPrefix = byte1 === 0xdd || byte1 === 0xfd;
    if(idxPrefix && byte2 === 0xcb) {
      // idx-bit opcode
      return 4;
    }
    if(idxPrefix && !this.includesAny(mainOpcodes[byte2]!, ["IDX", "IDL", "IDH", "IDD"])) {
      // unused idx-prefix
      return 1;
    }
    let opStr = idxPrefix ? mainOpcodes[byte2]! : mainOpcodes[byte1]!;
    let length = idxPrefix ? 2 : 1;
    if(this.includesAny(opStr, ["BYT", "REL"])) length += 1;
    if(this.includesAny(opStr, ["WRD", "ADR", "ADW"])) length += 2;
    if(idxPrefix && opStr.includes("IDD")) length += 1;
    return length;
  }

  private asWord(b1: number, b2: number): number {
    return b1 | (b2 << 8);
  }

  private getBranchTarget(pc: number, byte: number): number {
    let target = pc + 2 + (byte < 0x80 ? byte : -(0x100 - byte));
    return target & 0xffff;
  }

  traceOpcode(pc: number, bytes: number[]): boolean {
    if(bytes[0] === 0xed) {
      // ed opcode
      let opByte = bytes[1]!;
      let opStr = edOpcodes[bytes[1]!]!;
      if(opByte === 0x70 || opByte === 0x71 || opStr.startsWith("U")) {
        this.dis.logWarning(`Undocumented opcode encountered at $${hexStr(pc, 16)}`);
      }

      if([0x45, 0x55, 0x65, 0x75, 0x4d, 0x5d, 0x6d, 0x7d].includes(opByte)) {
        // reti/retn, stop tracing
        return false;
      }

      if(opStr.includes("ADW")) {
        let adr = this.asWord(bytes[2]!, bytes[3]!);
        if(this.dis.isRomArea(adr)) {
          this.dis.logWarning(`Write to rom area at $${hexStr(adr, 16)} from $${hexStr(pc, 16)}`);
        }
      }

      return true;
    }
    if(bytes[0] === 0xcb) {
      // bit opcode
      let opByte = bytes[1]!;
      if(opByte >= 0x30 && opByte < 0x38) {
        this.dis.logWarning(`Undocumented opcode encountered at $${hexStr(pc, 16)}`);
      }

      return true;
    }
    let idxPrefix = bytes[0] === 0xdd || bytes[0] === 0xfd;
    if(idxPrefix && bytes[1] === 0xcb) {
      // idx-bit opcode
      let opByte = bytes[3]!;
      if((opByte & 0x7) !== 0x6 || opByte === 0x36) {
        this.dis.logWarning(`Undocumented opcode encountered at $${hexStr(pc, 16)}`);
      }

      return true;
    }

    if(idxPrefix && bytes[1] === undefined) {
      // unused idx-prefix
      this.dis.logWarning(`Undocumented opcode encountered at $${hexStr(pc, 16)}`);
      return true;
    }

    let opByte = idxPrefix ? bytes[1]! : bytes[0]!;
    let opStr = mainOpcodes[opByte]!;

    if(idxPrefix && this.includesAny(opStr, ["IDH", "IDL"])) {
      this.dis.logWarning(`Undocumented opcode encountered at $${hexStr(pc, 16)}`);
    }

    if([0x10, 0x20, 0x30, 0x18, 0x28, 0x38].includes(opByte)) {
      // branch, add target as start
      this.dis.addStart(this.getBranchTarget(pc, bytes[1]!), pc, true);
      return true;
    }
    if([0xc4, 0xd4, 0xe4, 0xf4, 0xcc, 0xdc, 0xec, 0xfc, 0xcd].includes(opByte)) {
      // call, add address as start, handle skip bytes
      let adr = this.asWord(bytes[1]!, bytes[2]!);
      this.dis.addStart(adr, pc, true);
      let skip = this.dis.getSkipCount(adr);
      if(skip !== undefined) {
        if(skip !== 0) {
          this.dis.addStart(pc + 3 + skip, pc, false);
        }
        return false;
      }
      return true;
    }
    if([0xc7, 0xd7, 0xe7, 0xf7, 0xcf, 0xdf, 0xef, 0xff].includes(opByte)) {
      // rst, add destination as start, handle skip bytes
      let adr = (opByte & 0x38) >> 3;
      this.dis.addStart(adr, pc, true);
      let skip = this.dis.getSkipCount(adr);
      if(skip !== undefined) {
        if(skip !== 0) {
          this.dis.addStart(pc + 1 + skip, pc, false);
        }
        return false;
      }
      return true;
    }
    if([0xc0, 0xd0, 0xe0, 0xf0, 0xc8, 0xd8, 0xe8, 0xf8, 0xc9].includes(opByte)) {
      // ret, stop tracing
      return false;
    }
    if([0xc2, 0xd2, 0xe2, 0xf2, 0xca, 0xda, 0xea, 0xfa, 0xc3].includes(opByte)) {
      // jmp, add address as start, stop tracing
      let adr = this.asWord(bytes[1]!, bytes[2]!);
      this.dis.addStart(adr, pc, true);
      return false;
    }
    if(opByte === 0xe9) {
      // jmp (ind), warn and stop tracing
      this.dis.logWarning(`Indirect jump at $${hexStr(pc, 16)}`);
      return false;
    }

    if(opStr.includes("ADW")) {
      let adrStart = idxPrefix ? 2 : 1;
      let adr = this.asWord(bytes[adrStart]!, bytes[adrStart + 1]!);
      if(this.dis.isRomArea(adr)) {
        this.dis.logWarning(`Write to rom area at $${hexStr(adr, 16)} from $${hexStr(pc, 16)}`);
      }
    }

    return true;
  }

  disassembleOpcode(pc: number, bytes: number[]): string[] {
    return ["op"];
  }
}
