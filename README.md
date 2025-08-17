# Dissemble

A very WIP tracing disassembler (currently) supporting the 6502, written in TypeScript.

## Compilng and running

Requires `node` and `npm`

Compile:
- `npm install`
- `npm run tsc`

Run:
- `node build/main.js` (or `npm start --` to compile as well)

## Usage

The disassembler takes three arguments:
- The path to the file to disassemble
- The path to the output file to write
- The path to the config file to use

The config file is a [JSON5](https://json5.org) file, that describes how to handle disassembly.
JSON5 is used to make editing directly easier, due to support for comments and hexadecimal numbers.
Example (format not final):
```javascript
{
  // Architecture to use, only 'm6502' is currently supported
  architecture: "m6502",
  // Offset in file to start loading from
  fileOffset: 0x10,
  // Location in address space to load to
  offset: 0xc000,
  // Amount of bytes to load
  length: 0x4000,
  // Optional. Indicates that addresses s to e (inclusive) are RAM (or otherwise not ROM), so expected to be written
  nonRom: {s: 0, e: 0x7fff},
  // Optional. If true, idicates to also use labels for addresses accessed in the indicated non-rom area.
  // All of them will be defined with equates at the top of the disassembly
  ramLabels: true,
  // Optional. If true, will add a comment in the form ';@<adr>' after each line of disassembly or data.
  // This can make finding locations in long stretches without labels easier
  adrComments: false,
  // List of addresses to handle
  addresses: [
    // Indicates to start disassembly from this address
    {t: "start", adr: 0xc000},
    // Indicates to stop assembly when this address is traced to (e.g. to handle 'branch always' situations)
    {t: "stop", adr: 0xc183},
    // Indicates to place a label at address. If off is provided as well,
    // indicates that the label should be at adr + off, and references to use label - off
    // (e.g. for data accessed with an offset, to prevent these labels to be placed at the wrong spot)
    {t: "data", adr: 0xc231},
    {t: "data", adr: 0xc532, off: 12},
    // Indicates that when the subroutine at adr is called, it should skip that amount of bytes.
    // 0 indicates that the call does not return at all and to stop disassemly there
    // (e.g. for routines that modify the return address on the stack)
    {t: "skip", adr: 0xd103, skip: 0},
    {t: "skip", adr: 0xc342, skip: 2},
    // Indicate a table of count subroutine pointers at adr, each a word, each of which will be disassembled from.
    // If adrh is specified, idicates a table split in low and high bytes instead, with the high bytes at adrh.
    // If off is specified, indicates that the values in the table need this offset for the actual locations
    {t: "pointers", adr: 0xd543, count: 5},
    {t: "pointers", adr: 0xd571, adrh: 0xd579, count: 8, off: 1},
    // Indicates a table of data pointers. Format is further the same as for subroutine pointers
    {t: "table", adr: 0xd672, count: 4, off: 1},
    {t: "table", adr: 0xd712, adrh: 0xd716, count: 4}
  ]
}
```

The disassembler will trace from the given starts to use, following jumps, calls and branches, and stopping at returns.
Labels will be emitted for jump/branch targets and subroutines, as well as data locations.
It can not handle dynamic jumps, and will emit a warning when these are encountered.
No labels will be generated for locations outside the disassembled area, and the output should directly reassemble.
Warning are thrown for various cases, like accesses to outside the mapped area or writes to ROM.

## License

Licensed under the MIT license. See `LICENSE.txt` for details.
