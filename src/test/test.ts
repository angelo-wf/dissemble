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

// create dirctory for test results
fs.mkdirSync("testout", {recursive: true});
// runs test(s)
let args = ["build/main.js", "test/test.bin", "testout/out.s", "test/test_cfg.json5"];
let result = child_process.spawnSync("node", args, {timeout: 10000});
// test return code (0)
if(result.status !== 0) throw new Error("Disassembly failed! Error:\n" + result.stderr.toString("utf-8"));
// test matching output
if(!compareFiles("testout/out.s", "test/expected.s")) throw new Error("Output files were not equal!");
