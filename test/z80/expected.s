.org $0000

_89ab = $89ab

_0000:
  ret
  .db $00, $00, $00, $00, $00, $00, $00
_0008:
  ret
  .db $00, $00, $00, $00, $00, $00, $00
_0010:
  ret
  .db $00, $00, $00, $00, $00, $00, $00
_0018:
  ret
  .db $00, $00, $00, $00, $00, $00, $00
_0020:
  ret
  .db $00, $00, $00, $00, $00, $00, $00
_0028:
  ret
  .db $00, $00, $00, $00, $00, $00, $00
_0030:
  ret
  .db $00, $00, $00, $00, $00, $00, $00
_0038:
  ret
  .db $00, $00, $00, $00, $00, $00, $00
_0040:
  .dw _0060
  .dw _0096
  .dw _0155
  .dw _017a
  .dw _017c
  .dw _025c
  .dw _025e
  .dw _0260
  .dw _0262
  .dw _02a4
  .dw _02a6
  .dw _02a8
  .dw _02aa
  .dw _0670
  .dw _0728
  .dw _0f5b
_0060:
  nop
  djnz _0067
  jr nz, _0067
  jr nc, _0067
_0067:
  ld bc, $1234
  ld de, $1234
  ld hl, $1234
  ld sp, $1234
  ld (bc), a
  ld (de), a
  ld (_89ab), hl
  ld (_89ab), a
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
  jr _009a
_0096:
  jr z, _009a
  jr c, _009a
_009a:
  add hl, bc
  add hl, de
  add hl, hl
  add hl, sp
  ld a, (bc)
  ld a, (de)
  ld hl, (_89ab)
  ld a, (_89ab)
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
  jp nz, _0165
  jp nc, _0165
  jp po, _0165
  jp p, _0165
  jp _0165
_0155:
  out ($12), a
  ex (sp), hl
  di
  call nz, _0165
  call nc, _0165
  call po, _0165
  call p, _0165
_0165:
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
_017a:
  exx
  jp (hl)
_017c:
  ld sp, hl
  jp z, _019c
  jp c, _019c
  jp pe, _019c
  jp m, _019c
  in a, ($12)
  ex de, hl
  ei
  call z, _019c
  call c, _019c
  call pe, _019c
  call m, _019c
  call _019c
_019c:
  adc a, $12
  sbc a, $12
  xor $12
  cp $12
  rst $08
  rst $18
  rst $28
  .db $34, $12
  rst $38
  .db $ed, $00 ; nop
  .db $ed, $01 ; nop
  .db $ed, $02 ; nop
  .db $ed, $03 ; nop
  .db $ed, $04 ; nop
  .db $ed, $05 ; nop
  .db $ed, $06 ; nop
  .db $ed, $07 ; nop
  .db $ed, $08 ; nop
  .db $ed, $09 ; nop
  .db $ed, $0a ; nop
  .db $ed, $0b ; nop
  .db $ed, $0c ; nop
  .db $ed, $0d ; nop
  .db $ed, $0e ; nop
  .db $ed, $0f ; nop
  .db $ed, $10 ; nop
  .db $ed, $11 ; nop
  .db $ed, $12 ; nop
  .db $ed, $13 ; nop
  .db $ed, $14 ; nop
  .db $ed, $15 ; nop
  .db $ed, $16 ; nop
  .db $ed, $17 ; nop
  .db $ed, $18 ; nop
  .db $ed, $19 ; nop
  .db $ed, $1a ; nop
  .db $ed, $1b ; nop
  .db $ed, $1c ; nop
  .db $ed, $1d ; nop
  .db $ed, $1e ; nop
  .db $ed, $1f ; nop
  .db $ed, $20 ; nop
  .db $ed, $21 ; nop
  .db $ed, $22 ; nop
  .db $ed, $23 ; nop
  .db $ed, $24 ; nop
  .db $ed, $25 ; nop
  .db $ed, $26 ; nop
  .db $ed, $27 ; nop
  .db $ed, $28 ; nop
  .db $ed, $29 ; nop
  .db $ed, $2a ; nop
  .db $ed, $2b ; nop
  .db $ed, $2c ; nop
  .db $ed, $2d ; nop
  .db $ed, $2e ; nop
  .db $ed, $2f ; nop
  .db $ed, $30 ; nop
  .db $ed, $31 ; nop
  .db $ed, $32 ; nop
  .db $ed, $33 ; nop
  .db $ed, $34 ; nop
  .db $ed, $35 ; nop
  .db $ed, $36 ; nop
  .db $ed, $37 ; nop
  .db $ed, $38 ; nop
  .db $ed, $39 ; nop
  .db $ed, $3a ; nop
  .db $ed, $3b ; nop
  .db $ed, $3c ; nop
  .db $ed, $3d ; nop
  .db $ed, $3e ; nop
  .db $ed, $3f ; nop
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
  ld (_89ab), bc
  ld (_89ab), de
  .db $ed, $63 ; ld (_89ab), hl
  .dw $89ab
  ld (_89ab), sp
  neg
  .db $ed, $54 ; neg
  .db $ed, $64 ; neg
  .db $ed, $74 ; neg
  retn
_025c:
  .db $ed, $55 ; retn
_025e:
  .db $ed, $65 ; retn
_0260:
  .db $ed, $75 ; retn
_0262:
  im 0
  im 1
  .db $ed, $66 ; im 0
  .db $ed, $76 ; im 1
  ld i, a
  ld a, i
  rrd
  .db $ed, $77 ; nop
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
  ld bc, (_89ab)
  ld de, (_89ab)
  .db $ed, $6b ; ld hl, (_89ab)
  .dw $89ab
  ld sp, (_89ab)
  .db $ed, $4c ; neg
  .db $ed, $5c ; neg
  .db $ed, $6c ; neg
  .db $ed, $7c ; neg
  reti
_02a4:
  .db $ed, $5d ; reti
_02a6:
  .db $ed, $6d ; reti
_02a8:
  .db $ed, $7d ; reti
_02aa:
  .db $ed, $4e ; im 0
  im 2
  .db $ed, $6e ; im 0
  .db $ed, $7e ; im 2
  ld r, a
  ld a, r
  rld
  .db $ed, $7f ; nop
  .db $ed, $80 ; nop
  .db $ed, $81 ; nop
  .db $ed, $82 ; nop
  .db $ed, $83 ; nop
  .db $ed, $84 ; nop
  .db $ed, $85 ; nop
  .db $ed, $86 ; nop
  .db $ed, $87 ; nop
  .db $ed, $88 ; nop
  .db $ed, $89 ; nop
  .db $ed, $8a ; nop
  .db $ed, $8b ; nop
  .db $ed, $8c ; nop
  .db $ed, $8d ; nop
  .db $ed, $8e ; nop
  .db $ed, $8f ; nop
  .db $ed, $90 ; nop
  .db $ed, $91 ; nop
  .db $ed, $92 ; nop
  .db $ed, $93 ; nop
  .db $ed, $94 ; nop
  .db $ed, $95 ; nop
  .db $ed, $96 ; nop
  .db $ed, $97 ; nop
  .db $ed, $98 ; nop
  .db $ed, $99 ; nop
  .db $ed, $9a ; nop
  .db $ed, $9b ; nop
  .db $ed, $9c ; nop
  .db $ed, $9d ; nop
  .db $ed, $9e ; nop
  .db $ed, $9f ; nop
  ldi
  cpi
  ini
  outi
  .db $ed, $a4 ; nop
  .db $ed, $a5 ; nop
  .db $ed, $a6 ; nop
  .db $ed, $a7 ; nop
  ldd
  cpd
  ind
  outd
  .db $ed, $ac ; nop
  .db $ed, $ad ; nop
  .db $ed, $ae ; nop
  .db $ed, $af ; nop
  ldir
  cpir
  inir
  otir
  .db $ed, $b4 ; nop
  .db $ed, $b5 ; nop
  .db $ed, $b6 ; nop
  .db $ed, $b7 ; nop
  lddr
  cpdr
  indr
  otdr
  .db $ed, $bc ; nop
  .db $ed, $bd ; nop
  .db $ed, $be ; nop
  .db $ed, $bf ; nop
  .db $ed, $c0 ; nop
  .db $ed, $c1 ; nop
  .db $ed, $c2 ; nop
  .db $ed, $c3 ; nop
  .db $ed, $c4 ; nop
  .db $ed, $c5 ; nop
  .db $ed, $c6 ; nop
  .db $ed, $c7 ; nop
  .db $ed, $c8 ; nop
  .db $ed, $c9 ; nop
  .db $ed, $ca ; nop
  .db $ed, $cb ; nop
  .db $ed, $cc ; nop
  .db $ed, $cd ; nop
  .db $ed, $ce ; nop
  .db $ed, $cf ; nop
  .db $ed, $d0 ; nop
  .db $ed, $d1 ; nop
  .db $ed, $d2 ; nop
  .db $ed, $d3 ; nop
  .db $ed, $d4 ; nop
  .db $ed, $d5 ; nop
  .db $ed, $d6 ; nop
  .db $ed, $d7 ; nop
  .db $ed, $d8 ; nop
  .db $ed, $d9 ; nop
  .db $ed, $da ; nop
  .db $ed, $db ; nop
  .db $ed, $dc ; nop
  .db $ed, $dd ; nop
  .db $ed, $de ; nop
  .db $ed, $df ; nop
  .db $ed, $e0 ; nop
  .db $ed, $e1 ; nop
  .db $ed, $e2 ; nop
  .db $ed, $e3 ; nop
  .db $ed, $e4 ; nop
  .db $ed, $e5 ; nop
  .db $ed, $e6 ; nop
  .db $ed, $e7 ; nop
  .db $ed, $e8 ; nop
  .db $ed, $e9 ; nop
  .db $ed, $ea ; nop
  .db $ed, $eb ; nop
  .db $ed, $ec ; nop
  .db $ed, $ed ; nop
  .db $ed, $ee ; nop
  .db $ed, $ef ; nop
  .db $ed, $f0 ; nop
  .db $ed, $f1 ; nop
  .db $ed, $f2 ; nop
  .db $ed, $f3 ; nop
  .db $ed, $f4 ; nop
  .db $ed, $f5 ; nop
  .db $ed, $f6 ; nop
  .db $ed, $f7 ; nop
  .db $ed, $f8 ; nop
  .db $ed, $f9 ; nop
  .db $ed, $fa ; nop
  .db $ed, $fb ; nop
  .db $ed, $fc ; nop
  .db $ed, $fd ; nop
  .db $ed, $fe ; nop
  .db $ed, $ff ; nop
  rlc b
  rlc c
  rlc d
  rlc e
  rlc h
  rlc l
  rlc (hl)
  rlc a
  rrc b
  rrc c
  rrc d
  rrc e
  rrc h
  rrc l
  rrc (hl)
  rrc a
  rl b
  rl c
  rl d
  rl e
  rl h
  rl l
  rl (hl)
  rl a
  rr b
  rr c
  rr d
  rr e
  rr h
  rr l
  rr (hl)
  rr a
  sla b
  sla c
  sla d
  sla e
  sla h
  sla l
  sla (hl)
  sla a
  sra b
  sra c
  sra d
  sra e
  sra h
  sra l
  sra (hl)
  sra a
  sll b
  sll c
  sll d
  sll e
  sll h
  sll l
  sll (hl)
  sll a
  srl b
  srl c
  srl d
  srl e
  srl h
  srl l
  srl (hl)
  srl a
  bit 0, b
  bit 0, c
  bit 0, d
  bit 0, e
  bit 0, h
  bit 0, l
  bit 0, (hl)
  bit 0, a
  bit 1, b
  bit 1, c
  bit 1, d
  bit 1, e
  bit 1, h
  bit 1, l
  bit 1, (hl)
  bit 1, a
  bit 2, b
  bit 2, c
  bit 2, d
  bit 2, e
  bit 2, h
  bit 2, l
  bit 2, (hl)
  bit 2, a
  bit 3, b
  bit 3, c
  bit 3, d
  bit 3, e
  bit 3, h
  bit 3, l
  bit 3, (hl)
  bit 3, a
  bit 4, b
  bit 4, c
  bit 4, d
  bit 4, e
  bit 4, h
  bit 4, l
  bit 4, (hl)
  bit 4, a
  bit 5, b
  bit 5, c
  bit 5, d
  bit 5, e
  bit 5, h
  bit 5, l
  bit 5, (hl)
  bit 5, a
  bit 6, b
  bit 6, c
  bit 6, d
  bit 6, e
  bit 6, h
  bit 6, l
  bit 6, (hl)
  bit 6, a
  bit 7, b
  bit 7, c
  bit 7, d
  bit 7, e
  bit 7, h
  bit 7, l
  bit 7, (hl)
  bit 7, a
  res 0, b
  res 0, c
  res 0, d
  res 0, e
  res 0, h
  res 0, l
  res 0, (hl)
  res 0, a
  res 1, b
  res 1, c
  res 1, d
  res 1, e
  res 1, h
  res 1, l
  res 1, (hl)
  res 1, a
  res 2, b
  res 2, c
  res 2, d
  res 2, e
  res 2, h
  res 2, l
  res 2, (hl)
  res 2, a
  res 3, b
  res 3, c
  res 3, d
  res 3, e
  res 3, h
  res 3, l
  res 3, (hl)
  res 3, a
  res 4, b
  res 4, c
  res 4, d
  res 4, e
  res 4, h
  res 4, l
  res 4, (hl)
  res 4, a
  res 5, b
  res 5, c
  res 5, d
  res 5, e
  res 5, h
  res 5, l
  res 5, (hl)
  res 5, a
  res 6, b
  res 6, c
  res 6, d
  res 6, e
  res 6, h
  res 6, l
  res 6, (hl)
  res 6, a
  res 7, b
  res 7, c
  res 7, d
  res 7, e
  res 7, h
  res 7, l
  res 7, (hl)
  res 7, a
  set 0, b
  set 0, c
  set 0, d
  set 0, e
  set 0, h
  set 0, l
  set 0, (hl)
  set 0, a
  set 1, b
  set 1, c
  set 1, d
  set 1, e
  set 1, h
  set 1, l
  set 1, (hl)
  set 1, a
  set 2, b
  set 2, c
  set 2, d
  set 2, e
  set 2, h
  set 2, l
  set 2, (hl)
  set 2, a
  set 3, b
  set 3, c
  set 3, d
  set 3, e
  set 3, h
  set 3, l
  set 3, (hl)
  set 3, a
  set 4, b
  set 4, c
  set 4, d
  set 4, e
  set 4, h
  set 4, l
  set 4, (hl)
  set 4, a
  set 5, b
  set 5, c
  set 5, d
  set 5, e
  set 5, h
  set 5, l
  set 5, (hl)
  set 5, a
  set 6, b
  set 6, c
  set 6, d
  set 6, e
  set 6, h
  set 6, l
  set 6, (hl)
  set 6, a
  set 7, b
  set 7, c
  set 7, d
  set 7, e
  set 7, h
  set 7, l
  set 7, (hl)
  set 7, a
  ld ix, $1234
  ld (_89ab), ix
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
  ld ix, (_89ab)
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
_0670:
  ld sp, ix
  ld iy, $1234
  ld (_89ab), iy
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
  ld iy, (_89ab)
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
_0728:
  ld sp, iy
  rlc (ix + $12), b
  rlc (ix + $12), c
  rlc (ix + $12), d
  rlc (ix + $12), e
  rlc (ix + $12), h
  rlc (ix + $12), l
  rlc (ix + $12)
  rlc (ix + $12), a
  rrc (ix + $12), b
  rrc (ix + $12), c
  rrc (ix + $12), d
  rrc (ix + $12), e
  rrc (ix + $12), h
  rrc (ix + $12), l
  rrc (ix + $12)
  rrc (ix + $12), a
  rl (ix + $12), b
  rl (ix + $12), c
  rl (ix + $12), d
  rl (ix + $12), e
  rl (ix + $12), h
  rl (ix + $12), l
  rl (ix + $12)
  rl (ix + $12), a
  rr (ix + $12), b
  rr (ix + $12), c
  rr (ix + $12), d
  rr (ix + $12), e
  rr (ix + $12), h
  rr (ix + $12), l
  rr (ix + $12)
  rr (ix + $12), a
  sla (ix + $12), b
  sla (ix + $12), c
  sla (ix + $12), d
  sla (ix + $12), e
  sla (ix + $12), h
  sla (ix + $12), l
  sla (ix + $12)
  sla (ix + $12), a
  sra (ix + $12), b
  sra (ix + $12), c
  sra (ix + $12), d
  sra (ix + $12), e
  sra (ix + $12), h
  sra (ix + $12), l
  sra (ix + $12)
  sra (ix + $12), a
  sll (ix + $12), b
  sll (ix + $12), c
  sll (ix + $12), d
  sll (ix + $12), e
  sll (ix + $12), h
  sll (ix + $12), l
  sll (ix + $12)
  sll (ix + $12), a
  srl (ix + $12), b
  srl (ix + $12), c
  srl (ix + $12), d
  srl (ix + $12), e
  srl (ix + $12), h
  srl (ix + $12), l
  srl (ix + $12)
  srl (ix + $12), a
  .db $dd, $cb, $12, $40 ; bit 0, (ix + $12)
  .db $dd, $cb, $12, $41 ; bit 0, (ix + $12)
  .db $dd, $cb, $12, $42 ; bit 0, (ix + $12)
  .db $dd, $cb, $12, $43 ; bit 0, (ix + $12)
  .db $dd, $cb, $12, $44 ; bit 0, (ix + $12)
  .db $dd, $cb, $12, $45 ; bit 0, (ix + $12)
  bit 0, (ix + $12)
  .db $dd, $cb, $12, $47 ; bit 0, (ix + $12)
  .db $dd, $cb, $12, $48 ; bit 1, (ix + $12)
  .db $dd, $cb, $12, $49 ; bit 1, (ix + $12)
  .db $dd, $cb, $12, $4a ; bit 1, (ix + $12)
  .db $dd, $cb, $12, $4b ; bit 1, (ix + $12)
  .db $dd, $cb, $12, $4c ; bit 1, (ix + $12)
  .db $dd, $cb, $12, $4d ; bit 1, (ix + $12)
  bit 1, (ix + $12)
  .db $dd, $cb, $12, $4f ; bit 1, (ix + $12)
  .db $dd, $cb, $12, $50 ; bit 2, (ix + $12)
  .db $dd, $cb, $12, $51 ; bit 2, (ix + $12)
  .db $dd, $cb, $12, $52 ; bit 2, (ix + $12)
  .db $dd, $cb, $12, $53 ; bit 2, (ix + $12)
  .db $dd, $cb, $12, $54 ; bit 2, (ix + $12)
  .db $dd, $cb, $12, $55 ; bit 2, (ix + $12)
  bit 2, (ix + $12)
  .db $dd, $cb, $12, $57 ; bit 2, (ix + $12)
  .db $dd, $cb, $12, $58 ; bit 3, (ix + $12)
  .db $dd, $cb, $12, $59 ; bit 3, (ix + $12)
  .db $dd, $cb, $12, $5a ; bit 3, (ix + $12)
  .db $dd, $cb, $12, $5b ; bit 3, (ix + $12)
  .db $dd, $cb, $12, $5c ; bit 3, (ix + $12)
  .db $dd, $cb, $12, $5d ; bit 3, (ix + $12)
  bit 3, (ix + $12)
  .db $dd, $cb, $12, $5f ; bit 3, (ix + $12)
  .db $dd, $cb, $12, $60 ; bit 4, (ix + $12)
  .db $dd, $cb, $12, $61 ; bit 4, (ix + $12)
  .db $dd, $cb, $12, $62 ; bit 4, (ix + $12)
  .db $dd, $cb, $12, $63 ; bit 4, (ix + $12)
  .db $dd, $cb, $12, $64 ; bit 4, (ix + $12)
  .db $dd, $cb, $12, $65 ; bit 4, (ix + $12)
  bit 4, (ix + $12)
  .db $dd, $cb, $12, $67 ; bit 4, (ix + $12)
  .db $dd, $cb, $12, $68 ; bit 5, (ix + $12)
  .db $dd, $cb, $12, $69 ; bit 5, (ix + $12)
  .db $dd, $cb, $12, $6a ; bit 5, (ix + $12)
  .db $dd, $cb, $12, $6b ; bit 5, (ix + $12)
  .db $dd, $cb, $12, $6c ; bit 5, (ix + $12)
  .db $dd, $cb, $12, $6d ; bit 5, (ix + $12)
  bit 5, (ix + $12)
  .db $dd, $cb, $12, $6f ; bit 5, (ix + $12)
  .db $dd, $cb, $12, $70 ; bit 6, (ix + $12)
  .db $dd, $cb, $12, $71 ; bit 6, (ix + $12)
  .db $dd, $cb, $12, $72 ; bit 6, (ix + $12)
  .db $dd, $cb, $12, $73 ; bit 6, (ix + $12)
  .db $dd, $cb, $12, $74 ; bit 6, (ix + $12)
  .db $dd, $cb, $12, $75 ; bit 6, (ix + $12)
  bit 6, (ix + $12)
  .db $dd, $cb, $12, $77 ; bit 6, (ix + $12)
  .db $dd, $cb, $12, $78 ; bit 7, (ix + $12)
  .db $dd, $cb, $12, $79 ; bit 7, (ix + $12)
  .db $dd, $cb, $12, $7a ; bit 7, (ix + $12)
  .db $dd, $cb, $12, $7b ; bit 7, (ix + $12)
  .db $dd, $cb, $12, $7c ; bit 7, (ix + $12)
  .db $dd, $cb, $12, $7d ; bit 7, (ix + $12)
  bit 7, (ix + $12)
  .db $dd, $cb, $12, $7f ; bit 7, (ix + $12)
  res 0, (ix + $12), b
  res 0, (ix + $12), c
  res 0, (ix + $12), d
  res 0, (ix + $12), e
  res 0, (ix + $12), h
  res 0, (ix + $12), l
  res 0, (ix + $12)
  res 0, (ix + $12), a
  res 1, (ix + $12), b
  res 1, (ix + $12), c
  res 1, (ix + $12), d
  res 1, (ix + $12), e
  res 1, (ix + $12), h
  res 1, (ix + $12), l
  res 1, (ix + $12)
  res 1, (ix + $12), a
  res 2, (ix + $12), b
  res 2, (ix + $12), c
  res 2, (ix + $12), d
  res 2, (ix + $12), e
  res 2, (ix + $12), h
  res 2, (ix + $12), l
  res 2, (ix + $12)
  res 2, (ix + $12), a
  res 3, (ix + $12), b
  res 3, (ix + $12), c
  res 3, (ix + $12), d
  res 3, (ix + $12), e
  res 3, (ix + $12), h
  res 3, (ix + $12), l
  res 3, (ix + $12)
  res 3, (ix + $12), a
  res 4, (ix + $12), b
  res 4, (ix + $12), c
  res 4, (ix + $12), d
  res 4, (ix + $12), e
  res 4, (ix + $12), h
  res 4, (ix + $12), l
  res 4, (ix + $12)
  res 4, (ix + $12), a
  res 5, (ix + $12), b
  res 5, (ix + $12), c
  res 5, (ix + $12), d
  res 5, (ix + $12), e
  res 5, (ix + $12), h
  res 5, (ix + $12), l
  res 5, (ix + $12)
  res 5, (ix + $12), a
  res 6, (ix + $12), b
  res 6, (ix + $12), c
  res 6, (ix + $12), d
  res 6, (ix + $12), e
  res 6, (ix + $12), h
  res 6, (ix + $12), l
  res 6, (ix + $12)
  res 6, (ix + $12), a
  res 7, (ix + $12), b
  res 7, (ix + $12), c
  res 7, (ix + $12), d
  res 7, (ix + $12), e
  res 7, (ix + $12), h
  res 7, (ix + $12), l
  res 7, (ix + $12)
  res 7, (ix + $12), a
  set 0, (ix + $12), b
  set 0, (ix + $12), c
  set 0, (ix + $12), d
  set 0, (ix + $12), e
  set 0, (ix + $12), h
  set 0, (ix + $12), l
  set 0, (ix + $12)
  set 0, (ix + $12), a
  set 1, (ix + $12), b
  set 1, (ix + $12), c
  set 1, (ix + $12), d
  set 1, (ix + $12), e
  set 1, (ix + $12), h
  set 1, (ix + $12), l
  set 1, (ix + $12)
  set 1, (ix + $12), a
  set 2, (ix + $12), b
  set 2, (ix + $12), c
  set 2, (ix + $12), d
  set 2, (ix + $12), e
  set 2, (ix + $12), h
  set 2, (ix + $12), l
  set 2, (ix + $12)
  set 2, (ix + $12), a
  set 3, (ix + $12), b
  set 3, (ix + $12), c
  set 3, (ix + $12), d
  set 3, (ix + $12), e
  set 3, (ix + $12), h
  set 3, (ix + $12), l
  set 3, (ix + $12)
  set 3, (ix + $12), a
  set 4, (ix + $12), b
  set 4, (ix + $12), c
  set 4, (ix + $12), d
  set 4, (ix + $12), e
  set 4, (ix + $12), h
  set 4, (ix + $12), l
  set 4, (ix + $12)
  set 4, (ix + $12), a
  set 5, (ix + $12), b
  set 5, (ix + $12), c
  set 5, (ix + $12), d
  set 5, (ix + $12), e
  set 5, (ix + $12), h
  set 5, (ix + $12), l
  set 5, (ix + $12)
  set 5, (ix + $12), a
  set 6, (ix + $12), b
  set 6, (ix + $12), c
  set 6, (ix + $12), d
  set 6, (ix + $12), e
  set 6, (ix + $12), h
  set 6, (ix + $12), l
  set 6, (ix + $12)
  set 6, (ix + $12), a
  set 7, (ix + $12), b
  set 7, (ix + $12), c
  set 7, (ix + $12), d
  set 7, (ix + $12), e
  set 7, (ix + $12), h
  set 7, (ix + $12), l
  set 7, (ix + $12)
  set 7, (ix + $12), a
  rlc (iy + $12), b
  rlc (iy + $12), c
  rlc (iy + $12), d
  rlc (iy + $12), e
  rlc (iy + $12), h
  rlc (iy + $12), l
  rlc (iy + $12)
  rlc (iy + $12), a
  rrc (iy + $12), b
  rrc (iy + $12), c
  rrc (iy + $12), d
  rrc (iy + $12), e
  rrc (iy + $12), h
  rrc (iy + $12), l
  rrc (iy + $12)
  rrc (iy + $12), a
  rl (iy + $12), b
  rl (iy + $12), c
  rl (iy + $12), d
  rl (iy + $12), e
  rl (iy + $12), h
  rl (iy + $12), l
  rl (iy + $12)
  rl (iy + $12), a
  rr (iy + $12), b
  rr (iy + $12), c
  rr (iy + $12), d
  rr (iy + $12), e
  rr (iy + $12), h
  rr (iy + $12), l
  rr (iy + $12)
  rr (iy + $12), a
  sla (iy + $12), b
  sla (iy + $12), c
  sla (iy + $12), d
  sla (iy + $12), e
  sla (iy + $12), h
  sla (iy + $12), l
  sla (iy + $12)
  sla (iy + $12), a
  sra (iy + $12), b
  sra (iy + $12), c
  sra (iy + $12), d
  sra (iy + $12), e
  sra (iy + $12), h
  sra (iy + $12), l
  sra (iy + $12)
  sra (iy + $12), a
  sll (iy + $12), b
  sll (iy + $12), c
  sll (iy + $12), d
  sll (iy + $12), e
  sll (iy + $12), h
  sll (iy + $12), l
  sll (iy + $12)
  sll (iy + $12), a
  srl (iy + $12), b
  srl (iy + $12), c
  srl (iy + $12), d
  srl (iy + $12), e
  srl (iy + $12), h
  srl (iy + $12), l
  srl (iy + $12)
  srl (iy + $12), a
  .db $fd, $cb, $12, $40 ; bit 0, (iy + $12)
  .db $fd, $cb, $12, $41 ; bit 0, (iy + $12)
  .db $fd, $cb, $12, $42 ; bit 0, (iy + $12)
  .db $fd, $cb, $12, $43 ; bit 0, (iy + $12)
  .db $fd, $cb, $12, $44 ; bit 0, (iy + $12)
  .db $fd, $cb, $12, $45 ; bit 0, (iy + $12)
  bit 0, (iy + $12)
  .db $fd, $cb, $12, $47 ; bit 0, (iy + $12)
  .db $fd, $cb, $12, $48 ; bit 1, (iy + $12)
  .db $fd, $cb, $12, $49 ; bit 1, (iy + $12)
  .db $fd, $cb, $12, $4a ; bit 1, (iy + $12)
  .db $fd, $cb, $12, $4b ; bit 1, (iy + $12)
  .db $fd, $cb, $12, $4c ; bit 1, (iy + $12)
  .db $fd, $cb, $12, $4d ; bit 1, (iy + $12)
  bit 1, (iy + $12)
  .db $fd, $cb, $12, $4f ; bit 1, (iy + $12)
  .db $fd, $cb, $12, $50 ; bit 2, (iy + $12)
  .db $fd, $cb, $12, $51 ; bit 2, (iy + $12)
  .db $fd, $cb, $12, $52 ; bit 2, (iy + $12)
  .db $fd, $cb, $12, $53 ; bit 2, (iy + $12)
  .db $fd, $cb, $12, $54 ; bit 2, (iy + $12)
  .db $fd, $cb, $12, $55 ; bit 2, (iy + $12)
  bit 2, (iy + $12)
  .db $fd, $cb, $12, $57 ; bit 2, (iy + $12)
  .db $fd, $cb, $12, $58 ; bit 3, (iy + $12)
  .db $fd, $cb, $12, $59 ; bit 3, (iy + $12)
  .db $fd, $cb, $12, $5a ; bit 3, (iy + $12)
  .db $fd, $cb, $12, $5b ; bit 3, (iy + $12)
  .db $fd, $cb, $12, $5c ; bit 3, (iy + $12)
  .db $fd, $cb, $12, $5d ; bit 3, (iy + $12)
  bit 3, (iy + $12)
  .db $fd, $cb, $12, $5f ; bit 3, (iy + $12)
  .db $fd, $cb, $12, $60 ; bit 4, (iy + $12)
  .db $fd, $cb, $12, $61 ; bit 4, (iy + $12)
  .db $fd, $cb, $12, $62 ; bit 4, (iy + $12)
  .db $fd, $cb, $12, $63 ; bit 4, (iy + $12)
  .db $fd, $cb, $12, $64 ; bit 4, (iy + $12)
  .db $fd, $cb, $12, $65 ; bit 4, (iy + $12)
  bit 4, (iy + $12)
  .db $fd, $cb, $12, $67 ; bit 4, (iy + $12)
  .db $fd, $cb, $12, $68 ; bit 5, (iy + $12)
  .db $fd, $cb, $12, $69 ; bit 5, (iy + $12)
  .db $fd, $cb, $12, $6a ; bit 5, (iy + $12)
  .db $fd, $cb, $12, $6b ; bit 5, (iy + $12)
  .db $fd, $cb, $12, $6c ; bit 5, (iy + $12)
  .db $fd, $cb, $12, $6d ; bit 5, (iy + $12)
  bit 5, (iy + $12)
  .db $fd, $cb, $12, $6f ; bit 5, (iy + $12)
  .db $fd, $cb, $12, $70 ; bit 6, (iy + $12)
  .db $fd, $cb, $12, $71 ; bit 6, (iy + $12)
  .db $fd, $cb, $12, $72 ; bit 6, (iy + $12)
  .db $fd, $cb, $12, $73 ; bit 6, (iy + $12)
  .db $fd, $cb, $12, $74 ; bit 6, (iy + $12)
  .db $fd, $cb, $12, $75 ; bit 6, (iy + $12)
  bit 6, (iy + $12)
  .db $fd, $cb, $12, $77 ; bit 6, (iy + $12)
  .db $fd, $cb, $12, $78 ; bit 7, (iy + $12)
  .db $fd, $cb, $12, $79 ; bit 7, (iy + $12)
  .db $fd, $cb, $12, $7a ; bit 7, (iy + $12)
  .db $fd, $cb, $12, $7b ; bit 7, (iy + $12)
  .db $fd, $cb, $12, $7c ; bit 7, (iy + $12)
  .db $fd, $cb, $12, $7d ; bit 7, (iy + $12)
  bit 7, (iy + $12)
  .db $fd, $cb, $12, $7f ; bit 7, (iy + $12)
  res 0, (iy + $12), b
  res 0, (iy + $12), c
  res 0, (iy + $12), d
  res 0, (iy + $12), e
  res 0, (iy + $12), h
  res 0, (iy + $12), l
  res 0, (iy + $12)
  res 0, (iy + $12), a
  res 1, (iy + $12), b
  res 1, (iy + $12), c
  res 1, (iy + $12), d
  res 1, (iy + $12), e
  res 1, (iy + $12), h
  res 1, (iy + $12), l
  res 1, (iy + $12)
  res 1, (iy + $12), a
  res 2, (iy + $12), b
  res 2, (iy + $12), c
  res 2, (iy + $12), d
  res 2, (iy + $12), e
  res 2, (iy + $12), h
  res 2, (iy + $12), l
  res 2, (iy + $12)
  res 2, (iy + $12), a
  res 3, (iy + $12), b
  res 3, (iy + $12), c
  res 3, (iy + $12), d
  res 3, (iy + $12), e
  res 3, (iy + $12), h
  res 3, (iy + $12), l
  res 3, (iy + $12)
  res 3, (iy + $12), a
  res 4, (iy + $12), b
  res 4, (iy + $12), c
  res 4, (iy + $12), d
  res 4, (iy + $12), e
  res 4, (iy + $12), h
  res 4, (iy + $12), l
  res 4, (iy + $12)
  res 4, (iy + $12), a
  res 5, (iy + $12), b
  res 5, (iy + $12), c
  res 5, (iy + $12), d
  res 5, (iy + $12), e
  res 5, (iy + $12), h
  res 5, (iy + $12), l
  res 5, (iy + $12)
  res 5, (iy + $12), a
  res 6, (iy + $12), b
  res 6, (iy + $12), c
  res 6, (iy + $12), d
  res 6, (iy + $12), e
  res 6, (iy + $12), h
  res 6, (iy + $12), l
  res 6, (iy + $12)
  res 6, (iy + $12), a
  res 7, (iy + $12), b
  res 7, (iy + $12), c
  res 7, (iy + $12), d
  res 7, (iy + $12), e
  res 7, (iy + $12), h
  res 7, (iy + $12), l
  res 7, (iy + $12)
  res 7, (iy + $12), a
  set 0, (iy + $12), b
  set 0, (iy + $12), c
  set 0, (iy + $12), d
  set 0, (iy + $12), e
  set 0, (iy + $12), h
  set 0, (iy + $12), l
  set 0, (iy + $12)
  set 0, (iy + $12), a
  set 1, (iy + $12), b
  set 1, (iy + $12), c
  set 1, (iy + $12), d
  set 1, (iy + $12), e
  set 1, (iy + $12), h
  set 1, (iy + $12), l
  set 1, (iy + $12)
  set 1, (iy + $12), a
  set 2, (iy + $12), b
  set 2, (iy + $12), c
  set 2, (iy + $12), d
  set 2, (iy + $12), e
  set 2, (iy + $12), h
  set 2, (iy + $12), l
  set 2, (iy + $12)
  set 2, (iy + $12), a
  set 3, (iy + $12), b
  set 3, (iy + $12), c
  set 3, (iy + $12), d
  set 3, (iy + $12), e
  set 3, (iy + $12), h
  set 3, (iy + $12), l
  set 3, (iy + $12)
  set 3, (iy + $12), a
  set 4, (iy + $12), b
  set 4, (iy + $12), c
  set 4, (iy + $12), d
  set 4, (iy + $12), e
  set 4, (iy + $12), h
  set 4, (iy + $12), l
  set 4, (iy + $12)
  set 4, (iy + $12), a
  set 5, (iy + $12), b
  set 5, (iy + $12), c
  set 5, (iy + $12), d
  set 5, (iy + $12), e
  set 5, (iy + $12), h
  set 5, (iy + $12), l
  set 5, (iy + $12)
  set 5, (iy + $12), a
  set 6, (iy + $12), b
  set 6, (iy + $12), c
  set 6, (iy + $12), d
  set 6, (iy + $12), e
  set 6, (iy + $12), h
  set 6, (iy + $12), l
  set 6, (iy + $12)
  set 6, (iy + $12), a
  set 7, (iy + $12), b
  set 7, (iy + $12), c
  set 7, (iy + $12), d
  set 7, (iy + $12), e
  set 7, (iy + $12), h
  set 7, (iy + $12), l
  set 7, (iy + $12)
  set 7, (iy + $12), a
  .db $dd ; ignored ix-prefix
  nop
  .db $fd ; ignored iy-prefix
  add a, b
  .db $dd ; ignored ix-prefix
  in b, (c)
  .db $fd ; ignored iy-prefix
  rld
  .db $dd ; ignored ix-prefix
  inc iy
  .db $fd ; ignored iy-prefix
  inc ixh
  .db $dd ; ignored ix-prefix
  dec ixh
  .db $fd ; ignored iy-prefix
  pop iy
  .db $dd ; ignored ix-prefix
  .db $dd ; ignored ix-prefix
  dec ix
  .db $fd ; ignored iy-prefix
  .db $fd ; ignored iy-prefix
  inc iyl
  .db $dd ; ignored ix-prefix
  .db $fd ; ignored iy-prefix
  dec ixl
  .db $fd ; ignored iy-prefix
  .db $dd ; ignored ix-prefix
  push iy
  jp _0060
_0f53:
  ret
  .db $00
_0f55:
  reti
  .db $00
_0f58:
  retn
  .db $00
_0f5b:
  djnz _0f53
  jr nz, _0f55
  jr nc, _0f58
  jr z, _0fa7
  jr c, _0faa
  jp nz, _0fad
  jp nc, _0fb0
  jp po, _0fb3
  jp p, _0fb6
  jp z, _0fb9
  jp c, _0fbb
  jp pe, _0fbe
  jp m, _0fc1
  call nz, _0fc3
  call nc, _0fc5
  call po, _0fc7
  call p, _0fc9
  call z, _0fcb
  call c, _0fcd
  call pe, _0fcf
  call m, _0fd1
  call _0fd3
  call _0ff0
  .db $12
  jr _0f9f
  .db $00
_0f9f:
  jp _0fa3
  .db $00
_0fa3:
  call _0ff2
  .db $00
_0fa7:
  .db $ed, $55 ; retn
  .db $00
_0faa:
  .db $ed, $65 ; retn
  .db $00
_0fad:
  .db $ed, $75 ; retn
  .db $00
_0fb0:
  .db $ed, $5d ; reti
  .db $00
_0fb3:
  .db $ed, $6d ; reti
  .db $00
_0fb6:
  .db $ed, $7d ; reti
  .db $00
_0fb9:
  jp (hl)
  .db $00
_0fbb:
  jp (ix)
  .db $00
_0fbe:
  jp (iy)
  .db $00
_0fc1:
  ret
  .db $00
_0fc3:
  ret
  .db $00
_0fc5:
  ret
  .db $00
_0fc7:
  ret
  .db $00
_0fc9:
  ret
  .db $00
_0fcb:
  ret
  .db $00
_0fcd:
  ret
  .db $00
_0fcf:
  ret
  .db $00
_0fd1:
  ret
  .db $00
_0fd3:
  ret
  .db $00, $00, $00, $00, $00, $00, $00, $00
  .db $00, $00, $00, $00, $00, $00, $00, $00
  .db $00, $00, $00, $00, $00, $00, $00, $00
  .db $00, $00, $00, $00
_0ff0:
  ret
  .db $00
_0ff2:
  ret
  .db $00, $00, $00, $00, $00, $00, $00, $00
  .db $00, $00, $00, $00, $00
