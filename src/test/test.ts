import child_process from "node:child_process";
import fs from "node:fs";

// handles running tests

function compareFiles(pathA: string, pathB: string): boolean {
  let dataA = fs.readFileSync(pathA);
  let arrA = new Uint8Array(dataA.buffer, dataA.byteOffset, dataA.byteLength);
  let dataB = fs.readFileSync(pathB);
  let arrB = new Uint8Array(dataB.buffer, dataB.byteOffset, dataB.byteLength);

  if(arrA.length !== arrB.length) return false;
  for(let i = 0; i < arrA.length; i++) {
    if(arrA[i] !== arrB[i]) return false;
  }
  return true;
}

function runTest(loc: string): void {
  console.log(`Running test ${loc}`);
  // runs test(s)
  let args = ["build/main.js", `${loc}/test.bin`, "testout/out.s", `${loc}/test_cfg.json5`];
  let result = child_process.spawnSync("node", args, {timeout: 10000});
  // test return code (0)
  if(result.status !== 0) throw new Error("Disassembly failed! Error:\n" + result.stderr.toString("utf-8"));
  // console.log(result.stdout.toString("utf-8"));
  // test matching output
  if(!compareFiles("testout/out.s", `${loc}/expected.s`)) throw new Error("Output files were not equal!");
}

const tests: string[] = [
  "test", "test/m6502", "test/z80"
];

// create dirctory for test results
fs.mkdirSync("testout", {recursive: true});

// runs test(s)
for(let test of tests) {
  runTest(test);
}
