; test input assembly, assembles with elsemble (to 'test.bin')
.arch m6502
.org $8000

start:
  jsr stopTest
  jsr dataTest
  jsr skipTest
  jsr pointerTest
  jsr tableTest
  jmp start

second:
  lda #$34
  sta $01
  rti

stopTest:
  lda stopData, x
  sta $00
  lda #$01
  bne stopTest

stopData:
  .db 1, 2, 3

dataTest:
  lda datat1, x
  sta $01
  lda datat2 - 1, x
  sta $02
  lda datat1 + 1, x
  sta $03
  rts

datat2:
  .db 1, 2, 3
datat1:
  .dw 1, 2

skipTest:
  jsr skip2
  .dw $1234
  jsr noContinue

  .db $ff, $ff

skip2:
  pla
  sta $00
  pla
  sta $01
  clc
  lda $00
  adc #$02
  sta $00
  lda $01
  adc #$00
  pha
  lda $00
  pha
  rts

noContinue:
  pla
  pla
  rts

pointerTest:
  lda rtWord, x
  lda rtWord + 1, x
  lda rtLow, x
  lda rtHigh, x
  lda rtWordOff, x
  lda rtWordOff + 1, x
  lda rtLowOff, x
  lda rtHighOff, x
  rts

rtWord:
  .dw routine1, routine2
rtLow:
  .dlb routine3, routine4
rtHigh:
  .dhb routine3, routine4
rtWordOff:
  .dw routine5 - 1, routine6 - 1
rtLowOff:
  .dlb routine7 - 2, routine8 - 2
rtHighOff:
  .dhb routine7 - 2, routine8 - 2

routine1:
  lda $1234
  rts
routine2:
  lda $1234
  rts
routine3:
  lda $1234
  rts
routine4:
  lda $1234
  rts
routine5:
  lda $1234
  rts
routine6:
  lda $1234
  rts
routine7:
  lda $1234
  rts
routine8:
  lda $1234
  rts

tableTest:
  lda dtWord, x
  lda dtWord + 1, x
  lda dtLow, x
  lda dtHigh, x
  lda dtWordOff, x
  lda dtWordOff + 1, x
  lda dtLowOff, x
  lda dtHighOff, x
  rts

dtWord:
  .dw data1, $1000
dtLow:
  .dlb data2, $1012
dtHigh:
  .dhb data2, $1012
dtWordOff:
  .dw data3 - 1, $1024 - 1
dtLowOff:
  .dlb data4 + 3, $1036 + 3
dtHighOff:
  .dhb data4 + 3, $1036 + 3

data1:
  .db "abcdef"
data2:
  .db "abcdef"
data3:
  .db "abcdef"
data4:
  .db "abcdef"

.pad $9000
; length = $1000
