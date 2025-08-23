; test input assembly, assembles with elsemble (to 'test.bin')
.arch m6502
.org $8000

jmp *

.pad $9000
; length = $1000
