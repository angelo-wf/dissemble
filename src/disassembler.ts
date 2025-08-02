
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

  traceOpcode(...bytes: number[]): boolean;
}

// TEMP to allow to compile
class TestHandler implements OpcodeHandler {
  getOpcodeLength(byte1: number, byte2: number): number {
    return 1;
  }
  traceOpcode(...bytes: number[]): boolean {
    return true;
  }
}

export function hexStr(val: number, size: number): string {
  return ("000" + val.toString(16)).slice(-(size / 4));
}

export class Disassembler {

  private opcodeHandler: OpcodeHandler;

  private byteInfo: ByteInfo[] = [];
  private data: Uint8Array = new Uint8Array(0x10000);

  // map of addresses for labels, 0 for label at location, non-0 for offset to label to use
  private labels: Map<number, number> = new Map();
  // map of subroutine addresses to amount of bytes to skip after call to it, or 0 for end of trace
  private routineSkips: Map<number, number> = new Map();

  private codeStarts: number[] = [];

  constructor() {
    this.opcodeHandler = new TestHandler();
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

    let cont = this.opcodeHandler.traceOpcode(...opBytes);
    return cont ? pc + length : undefined;
  }

  addLabel(pc: number): void {
    if(this.labels.has(pc)) {
      if(this.labels.get(pc) !== 0) {
        this.logWarning("Direct label wanted for label with offset");
      }
    } else {
      this.labels.set(pc, 0);
    }
  }

  addStart(pc: number, origLoc: number): void {
    let info = this.byteInfo[pc]!;
    let pcStr = hexStr(pc, 16);
    let locStr = hexStr(origLoc, 16);
    if(info.type === ByteType.NON_ROM) return this.logWarning(`Jump to $${pcStr} in non-rom area from $${locStr}`);
    if(info.type === ByteType.UNMAPPED) return this.logWarning(`Jump to $${pcStr} outside mapped area from $${locStr}`);
    if(info.type === ByteType.DATA) return this.logWarning(`Jump to explicit stop $${pcStr} from $${locStr}`);
    this.codeStarts.push(pc);
  }

  logWarning(warning: string): void {
    console.log(warning);
  }

  private writeDisassembly(): string {
    let output = "";

    return output;
  }
}
