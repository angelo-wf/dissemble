; test input assembly, assembles with elsemble (to 'test.bin')
.arch m6502
.org $8000

ptrs:
  .dw start, start2, start3, start4, start5

start:

brk #$12
bpl target1
jsr target1
bmi target1
rti
start2:
bvc target1
rts
start3:
bvs target1
nop #$12
bcc target1
ldy #$12
bcs target1
cpy #$12
bne target1
cpx #$12
beq target1
target1:

ora ($12, x)
ora ($12), y
and ($12, x)
and ($12), y
eor ($12, x)
eor ($12), y
adc ($12, x)
adc ($12), y
sta ($12, x)
sta ($12), y
lda ($12, x)
lda ($12), y
cmp ($12, x)
cmp ($12), y
sbc ($12, x)
sbc ($12), y

stp
.db $12
.db $22
.db $32
.db $42
.db $52
.db $62
.db $72
.db $82, $12
.db $92
ldx #$12
.db $b2
.db $c2, $12
.db $d2
.db $e2, $12
.db $f2

slo ($12, x)
slo ($12), y
rla ($12, x)
rla ($12), y
sre ($12, x)
sre ($12), y
rra ($12, x)
rra ($12), y
sax ($12, x)
ahx ($12), y
lax ($12, x)
lax ($12), y
dcp ($12, x)
dcp ($12), y
isc ($12, x)
isc ($12), y

nop $12
nop $12, x
bit $12
.db $34, $12
.db $44, $12
.db $54, $12
.db $64, $12
.db $74, $12
sty $12
sty $12, x
ldy $12
ldy $12, x
cpy $12
.db $d4, $12
cpx $12
.db $f4, $12

ora $12
ora $12, x
and $12
and $12, x
eor $12
eor $12, x
adc $12
adc $12, x
sta $12
sta $12, x
lda $12
lda $12, x
cmp $12
cmp $12, x
sbc $12
sbc $12, x

asl $12
asl $12, x
rol $12
rol $12, x
lsr $12
lsr $12, x
ror $12
ror $12, x
stx $12
stx $12, y
ldx $12
ldx $12, y
dec $12
dec $12, x
inc $12
inc $12, x

slo $12
slo $12, x
rla $12
rla $12, x
sre $12
sre $12, x
rra $12
rra $12, x
sax $12
sax $12, y
lax $12
lax $12, y
dcp $12
dcp $12, x
isc $12
isc $12, x

php
clc
plp
sec
pha
cli
pla
sei
dey
tya
tay
clv
iny
cld
inx
sed

ora #$12
ora $1234, y
and #$12
and $1234, y
eor #$12
eor $1234, y
adc #$12
adc $1234, y
.db $89, $12
sta $1234, y
lda #$12
lda $1234, y
cmp #$12
cmp $1234, y
sbc #$12
sbc $1234, y

asl
.db $1a
rol
.db $3a
lsr
.db $5a
ror
.db $7a
txa
txs
tax
tsx
dex
.db $da
nop
.db $fa

anc #$12
slo $1234, y
.db $2b, $12
rla $1234, y
alr #$12
sre $1234, y
arr #$12
rra $1234, y
xaa #$12
tas $1234, y
lxa #$12
las $1234, y
axs #$12
dcp $1234, y
.db $eb, $12
isc $1234, y

nop $1234
nop $1234, x
bit $1234
.db $3c, $34, $12
jmp target2
start4:
.db $5c, $34, $12
jmp ($1234)
start5:
.db $7c, $34, $12
sty $1234
shy $1234, x
ldy $1234
ldy $1234, x
cpy $1234
.db $dc, $34, $12
cpx $1234
.db $fc, $34, $12
target2:

ora $1234
ora $1234, x
and $1234
and $1234, x
eor $1234
eor $1234, x
adc $1234
adc $1234, x
sta $1234
sta $1234, x
lda $1234
lda $1234, x
cmp $1234
cmp $1234, x
sbc $1234
sbc $1234, x

asl $1234
asl $1234, x
rol $1234
rol $1234, x
lsr $1234
lsr $1234, x
ror $1234
ror $1234, x
stx $1234
shx $1234, y
ldx $1234
ldx $1234, y
dec $1234
dec $1234, x
inc $1234
inc $1234, x

slo $1234
slo $1234, x
rla $1234
rla $1234, x
sre $1234
sre $1234, x
rra $1234
rra $1234, x
sax $1234
ahx $1234, y
lax $1234
lax $1234, y
dcp $1234
dcp $1234, x
isc $1234
isc $1234, x

jmp start

.pad $9000
; length = $1000
