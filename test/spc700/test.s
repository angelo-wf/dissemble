; test input assembly, assembles with elsemble (to 'test.bin')
.arch spc700
.org $8000

ptrs:
  .dw start, start2, start3, start4, start5, start6, start7

start:
nop
bpl target1
clrp
bmi target1
setp
bvc target1
clrc
bvs target1
setc
bcc target1
ei
bcs target1
di
bne target1
clrv
beq target1
target1:

tcall 0
tcall 1
tcall 2
tcall 3
tcall 4
tcall 5
tcall 6
tcall 7
tcall 8
tcall 9
tcall 10
tcall 11
tcall 12
tcall 13
tcall 14
tcall 15

set1 $12,0
clr1 $13,0
set1 $12,1
clr1 $12,1
set1 $12,2
clr1 $12,2
set1 $12,3
clr1 $12,3
set1 $12,4
clr1 $12,4
set1 $12,5
clr1 $12,5
set1 $12,6
clr1 $12,6
set1 $12,7
clr1 $12,7

bbs $12,0, target2
bbc $14,0, target2
bbs $12,1, target2
bbc $12,1, target2
bbs $12,2, target2
bbc $12,2, target2
bbs $12,3, target2
bbc $12,3, target2
bbs $12,4, target2
bbc $12,4, target2
bbs $12,5, target2
bbc $12,5, target2
bbs $12,6, target2
bbc $12,6, target2
bbs $12,7, target2
bbc $12,7, target2
target2:

or a, $12
or a, $1234
or a, (x)
or a, ($12 + x)
or a, #$12
or $12, $34
or a, $12 + x
or a, $1234 + x
or a, $1234 + y
or a, ($12) + y
or $12, #$34
or (x), (y)

and a, $15
and a, $1235
and a, (x)
and a, ($12 + x)
and a, #$12
and $16, $35
and a, $12 + x
and a, $1234 + x
and a, $1234 + y
and a, ($12) + y
and $17, #$34
and (x), (y)

eor a, $12
eor a, $1234
eor a, (x)
eor a, ($12 + x)
eor a, #$12
eor $12, $34
eor a, $12 + x
eor a, $1234 + x
eor a, $1234 + y
eor a, ($12) + y
eor $12, #$34
eor (x), (y)

cmp a, $12
cmp a, $1234
cmp a, (x)
cmp a, ($12 + x)
cmp a, #$12
cmp $12, $34
cmp a, $12 + x
cmp a, $1234 + x
cmp a, $1234 + y
cmp a, ($12) + y
cmp $12, #$34
cmp (x), (y)

adc a, $12
adc a, $1234
adc a, (x)
adc a, ($12 + x)
adc a, #$12
adc $12, $34
adc a, $12 + x
adc a, $1234 + x
adc a, $1234 + y
adc a, ($12) + y
adc $12, #$34
adc (x), (y)

sbc a, $12
sbc a, $1234
sbc a, (x)
sbc a, ($12 + x)
sbc a, #$12
sbc $12, $34
sbc a, $12 + x
sbc a, $1234 + x
sbc a, $1234 + y
sbc a, ($12) + y
sbc $12, #$34
sbc (x), (y)

mov $12, a
mov $1234, a
mov (x), a
mov ($12 + x), a
cmp x, #$12
mov $1234, x
mov $12 + x, a
mov $1234 + x, a
mov $1234 + y, a
mov ($12) + y, a
mov $12, x
mov $12 + y, x

mov a, $12
mov a, $1234
mov a, (x)
mov a, ($12 + x)
mov a, #$12
mov x, $1234
mov a, $12 + x
mov a, $1234 + x
mov a, $1234 + y
mov a, ($12) + y
mov x, $12
mov x, $12 + y

or1 c, $1234,1
decw $12
or1 c, /$1236,1
incw $12
and1 c, $1234,1
cmpw ya, $12
and1 c, /$1234,1
addw ya, $12
eor1 c, $1234,1
subw ya, $12
mov1 c, $1234,1
movw ya, $12
mov1 $1234,1, c
movw $12, ya
not1 $1234,1
mov $12, $34

asl $12
asl $1234
asl $12 + x
asl a
rol $12
rol $1234
rol $12 + x
rol a
lsr $12
lsr $1234
lsr $12 + x
lsr a
ror $12
ror $1234
ror $12 + x
ror a

dec $12
dec $1234
dec $12 + x
dec a
inc $12
inc $1234
inc $12 + x
inc a
mov $12, y
mov $1234, y
mov $12 + x, y
dec y
mov y, $12
mov y, $1234
mov y, $12 + x
inc y

push psw
dec x
push a
inc x
push x
mov x, a
push y
mov a, x
mov y, #$12
mov x, sp
cmp y, #$12
mov sp, x
mov x, #$12
mov a, y
notc
mov y, a

tset $1234
cmp x, $1234
cbne $12, target3
cmp x, $12
tclr $1234
cmp y, $1234
dbnz $12, target3
cmp y, $12
pop psw
div ya, x
pop a
das a
pop x
cbne $12 + x, target3
pop y
dbnz y, target3
target3:

brk
jmp ($1237 + x)
start2:
bra target4
start3:
call target4
pcall $12
jmp target4
start4:
ret
start5:
reti
start6:
mov $12, #$34
xcn a
mov (x+), a
mov a, (x+)
mul ya
daa a
sleep
stop
start7:
target4:

; absolute opcodes with arguments < $100

or.a a, $12
or.a a, $12 + x
and.a a, $12
and.a a, $12 + x
eor.a a, $12
eor.a a, $12 + x
cmp.a a, $12
cmp.a a, $12 + x
adc.a a, $12
adc.a a, $12 + x
sbc.a a, $12
sbc.a a, $12 + x
mov.a $12, a
mov.a $12 + x, a
mov.a a, $12
mov.a a, $12 + x

mov.a $12, x
mov.a $12, y
mov.a x, $12
mov.a y, $12

asl.a $12
rol.a $12
lsr.a $12
ror.a $12
inc.a $12
dec.a $12

cmp.a x, $12
cmp.a y, $12

jmp start

.pad $8ff0

.pad $9000
