# hilo
## Z80 High Level Language Ideas
### Design principles
- suitable for 8-bit architecture
- control structures instead of branches
- familiar, easy to read
- not heavily stack-based
- manually memory managed
- compiled, not interpreted
- manually recurive
- language can break in assembler mode

### Implications
- variables stored in global memory
- locals and params aliased
- use registers wherever possible
- avoid memory access wherever possible
- use the most efficient instruction wherever possible
- recursion manually managed
- data types:
    - byte
    - word
    - long
    - pointer
- bytes can be booleans
- bytes can be chars
- bytes can be short integers
- words can be pointers
- words can be integers
- arrays can be of bytes and words
- arrays are pre-allocated
- a stack is an array and a top pointer
- Z80 doesn't have stack frames so this could be handled in a separate stack in memory


if (expr) {

}
else {

}