const fs = require("fs")

/*
const input = `
nop +0
acc +1
jmp +4
acc +3
jmp -3
acc -99
acc +1
jmp -4
acc +6
`
/*/
const input = fs.readFileSync(__dirname + "/input.txt", "utf8")
//*/

const lines = input.trim().split("\n")

// Part 1
// console.log(run(lines))

// Part 2
for (let i = 0; i < lines.length; i++) {
  if (lines[i].startsWith("acc")) continue
  const instr = [...lines]
  instr[i] = instr[i].startsWith("jmp")
    ? instr[i].replace("jmp", "nop")
    : instr[i].replace("nop", "jmp")
  const { acc, lastInstruction } = run(instr)
  if (!lastInstruction) console.log(acc)
}

function run(instructions) {
  let i = 0
  let acc = 0
  const visited = []

  while (!visited.includes(i) && instructions[i]) {
    visited.push(i)
    const [op, arg] = instructions[i].split(" ")
    const val = parseInt(arg)

    if (op === "acc") {
      acc += val
      i += 1
    }
    if (op === "jmp") i += val
    if (op === "nop") i += 1
  }

  return { acc, lastInstruction: instructions[i] }
}
