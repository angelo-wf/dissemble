; test input assembly, assembles with elsemble (to 'test.bin')
.arch z80

; rst-handlers

.org $0
ret
.pad $8
ret
.pad $10
ret
.pad $18
ret
.pad $20
ret
.pad $28
ret
.pad $30
ret
.pad $38
ret
.pad $40

ptrs:
  .dw start, start2, start3, start4, start5, start6, start7, start8
  .dw start9, start10, start11, start12, start13, start14, start15

; main opcodes

start:
nop
djnz target1
jr nz, target1
jr nc, target1
target1:
ld bc, $1234
ld de, $1234
ld hl, $1234
ld sp, $1234
ld (bc), a
ld (de), a
ld ($89ab), hl
ld ($89ab), a
inc bc
inc de
inc hl
inc sp
inc b
inc d
inc h
inc (hl)
dec b
dec d
dec h
dec (hl)
ld b, $12
ld d, $12
ld h, $12
ld (hl), $12
rlca
rla
daa
scf
ex af, af' ;'
jr target2
start2:
jr z, target2
jr c, target2
target2:
add hl, bc
add hl, de
add hl, hl
add hl, sp
ld a, (bc)
ld a, (de)
ld hl, ($89ab)
ld a, ($89ab)
dec bc
dec de
dec hl
dec sp
inc c
inc e
inc l
inc a
dec c
dec e
dec l
dec a
ld c, $12
ld e, $12
ld l, $12
ld a, $12
rrca
rra
cpl
ccf

ld b, b
ld b, c
ld b, d
ld b, e
ld b, h
ld b, l
ld b, (hl)
ld b, a
ld c, b
ld c, c
ld c, d
ld c, e
ld c, h
ld c, l
ld c, (hl)
ld c, a
ld d, b
ld d, c
ld d, d
ld d, e
ld d, h
ld d, l
ld d, (hl)
ld d, a
ld e, b
ld e, c
ld e, d
ld e, e
ld e, h
ld e, l
ld e, (hl)
ld e, a
ld h, b
ld h, c
ld h, d
ld h, e
ld h, h
ld h, l
ld h, (hl)
ld h, a
ld l, b
ld l, c
ld l, d
ld l, e
ld l, h
ld l, l
ld l, (hl)
ld l, a
ld (hl), b
ld (hl), c
ld (hl), d
ld (hl), e
ld (hl), h
ld (hl), l
halt
ld (hl), a
ld a, b
ld a, c
ld a, d
ld a, e
ld a, h
ld a, l
ld a, (hl)
ld a, a

add a, b
add a, c
add a, d
add a, e
add a, h
add a, l
add a, (hl)
add a, a
adc a, b
adc a, c
adc a, d
adc a, e
adc a, h
adc a, l
adc a, (hl)
adc a, a
sub b
sub c
sub d
sub e
sub h
sub l
sub (hl)
sub a
sbc a, b
sbc a, c
sbc a, d
sbc a, e
sbc a, h
sbc a, l
sbc a, (hl)
sbc a, a
and b
and c
and d
and e
and h
and l
and (hl)
and a
xor b
xor c
xor d
xor e
xor h
xor l
xor (hl)
xor a
or b
or c
or d
or e
or h
or l
or (hl)
or a
cp b
cp c
cp d
cp e
cp h
cp l
cp (hl)
cp a

ret nz
ret nc
ret po
ret p
pop bc
pop de
pop hl
pop af
jp nz, target3
jp nc, target3
jp po, target3
jp p, target3
jp target3
start3:
out ($12), a
ex (sp), hl
di
call nz, target3
call nc, target3
call po, target3
call p, target3
target3:
push bc
push de
push hl
push af
add a, $12
sub $12
and $12
or $12
rst $00
rst $10
rst $20
rst $30
ret z
ret c
ret pe
ret m
ret
start4:
exx
jp (hl)
start5:
ld sp, hl
jp z, target4
jp c, target4
jp pe, target4
jp m, target4
; cb
in a, ($12)
ex de, hl
ei
call z, target4
call c, target4
call pe, target4
call m, target4
call target4
target4:
; dd
; ed
; fd
adc a, $12
sbc a, $12
xor $12
cp $12
rst $08
rst $18
rst $28
rst $38

; ed-opcodes

.repeat $40, @i
  .db $ed, @i
.endrepeat

in b, (c)
in d, (c)
in h, (c)
in (c)
out (c), b
out (c), d
out (c), h
out (c), 0
sbc hl, bc
sbc hl, de
sbc hl, hl
sbc hl, sp
ld ($89ab), bc
ld ($89ab), de
.db $ed, $63, $ab, $89
ld ($89ab), sp
neg
.db $ed, $54
.db $ed, $64
.db $ed, $74
retn
start6:
.db $ed, $55
start7:
.db $ed, $65
start8:
.db $ed, $75
start9:
im 0
im 1
.db $ed, $66
.db $ed, $76
ld i, a
ld a, i
rrd
.db $ed, $77
in c, (c)
in e, (c)
in l, (c)
in a, (c)
out (c), c
out (c), e
out (c), l
out (c), a
adc hl, bc
adc hl, de
adc hl, hl
adc hl, sp
ld bc, ($89ab)
ld de, ($89ab)
.db $ed, $6b, $ab, $89
ld sp, ($89ab)
.db $ed, $4c
.db $ed, $5c
.db $ed, $6c
.db $ed, $7c
reti
start10:
.db $ed, $5d
start11:
.db $ed, $6d
start12:
.db $ed, $7d
start13:
.db $ed, $4e
im 2
.db $ed, $6e
.db $ed, $7e
ld r, a
ld a, r
rld
.db $ed, $7f

.repeat $20, @i
  .db $ed, $80 + @i
.endrepeat
ldi
cpi
ini
outi
.db $ed, $a4
.db $ed, $a5
.db $ed, $a6
.db $ed, $a7
ldd
cpd
ind
outd
.db $ed, $ac
.db $ed, $ad
.db $ed, $ae
.db $ed, $af
ldir
cpir
inir
otir
.db $ed, $b4
.db $ed, $b5
.db $ed, $b6
.db $ed, $b7
lddr
cpdr
indr
otdr
.db $ed, $bc
.db $ed, $bd
.db $ed, $be
.db $ed, $bf

.repeat $40, @i
  .db $ed, $c0 + @i
.endrepeat

; bit-opcodes

.repeat $100, @i
  .db $cb, @i
.endrepeat

; ix-opcodes

ld ix, $1234
ld ($89ab), ix
inc ix
inc ixh
inc (ix + $12)
dec ixh
dec (ix + $12)
ld ixh, $12
ld (ix + $12), $34
add ix, bc
add ix, de
add ix, ix
add ix, sp
ld ix, ($89ab)
dec ix
inc ixl
dec ixl
ld ixl, $12

ld b, ixh
ld b, ixl
ld b, (ix + $12)
ld c, ixh
ld c, ixl
ld c, (ix + $12)
ld d, ixh
ld d, ixl
ld d, (ix + $12)
ld e, ixh
ld e, ixl
ld e, (ix + $12)
ld ixh, ixh
ld ixh, ixl
ld h, (ix + $12)
ld ixl, ixh
ld ixl, ixl
ld l, (ix + $12)
ld (ix + $12), b
ld (ix + $12), c
ld (ix + $12), d
ld (ix + $12), e
ld (ix - $12), h
ld (ix - $12), l
ld (ix - $12), a
ld a, ixh
ld a, ixl
ld a, (ix + $12)

add a, ixh
add a, ixl
add a, (ix + $12)
adc a, ixh
adc a, ixl
adc a, (ix + $12)
sub ixh
sub ixl
sub (ix + $12)
sbc a, ixh
sbc a, ixl
sbc a, (ix + $12)
and ixh
and ixl
and (ix + $12)
xor ixh
xor ixl
xor (ix + $12)
or ixh
or ixl
or (ix + $12)
cp ixh
cp ixl
cp (ix + $12)

pop ix
ex (sp), ix
push ix
jp (ix)
start14:
ld sp, ix

; iy-opcodes

ld iy, $1234
ld ($89ab), iy
inc iy
inc iyh
inc (iy + $12)
dec iyh
dec (iy + $12)
ld iyh, $12
ld (iy + $12), $34
add iy, bc
add iy, de
add iy, iy
add iy, sp
ld iy, ($89ab)
dec iy
inc iyl
dec iyl
ld iyl, $12

ld b, iyh
ld b, iyl
ld b, (iy + $12)
ld c, iyh
ld c, iyl
ld c, (iy + $12)
ld d, iyh
ld d, iyl
ld d, (iy + $12)
ld e, iyh
ld e, iyl
ld e, (iy + $12)
ld iyh, iyh
ld iyh, iyl
ld h, (iy + $12)
ld iyl, iyh
ld iyl, iyl
ld l, (iy + $12)
ld (iy + $12), b
ld (iy + $12), c
ld (iy + $12), d
ld (iy + $12), e
ld (iy - $12), h
ld (iy - $12), l
ld (iy - $12), a
ld a, iyh
ld a, iyl
ld a, (iy + $12)

add a, iyh
add a, iyl
add a, (iy + $12)
adc a, iyh
adc a, iyl
adc a, (iy + $12)
sub iyh
sub iyl
sub (iy + $12)
sbc a, iyh
sbc a, iyl
sbc a, (iy + $12)
and iyh
and iyl
and (iy + $12)
xor iyh
xor iyl
xor (iy + $12)
or iyh
or iyl
or (iy + $12)
cp iyh
cp iyl
cp (iy + $12)

pop iy
ex (sp), iy
push iy
jp (iy)
start15:
ld sp, iy

; ix-bit-opcodes

.repeat $100, @i
  .db $dd, $cb, $12, @i
.endrepeat

; iy-bit-opcodes

.repeat $100, @i
  .db $fd, $cb, $12, @i
.endrepeat

; ignored prefixes

.db $dd, $00
.db $fd, $80
.db $dd, $ed, $40
.db $fd, $ed, $6f
.db $dd, $fd, $23
.db $fd, $dd, $24
.db $dd, $dd, $25
.db $fd, $fd, $e1
.db $dd, $dd, $dd, $2b
.db $fd, $fd, $fd, $2c
.db $dd, $fd, $dd, $2d
.db $fd, $dd, $fd, $e5

jp start

.pad $1000
; length = $1000
