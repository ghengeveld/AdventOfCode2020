const fs = require("fs")

/*
const input = `
mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X
mem[8] = 11
mem[7] = 101
mem[8] = 0
`
/*/
const input = fs.readFileSync(__dirname + "/input.txt", "utf8")
//*/

const lines = input.trim().split("\n")
let mask = "000000000000000000000000000000000000"
let mem = []

// Part 1
for (const line of lines) {
  const [action, value] = line.split(" = ")
  if (action === "mask") mask = value
  if (action.startsWith("mem")) {
    const adr = parseInt(action.slice(4, -1))
    const bin = parseInt(value).toString(2).padStart(36, "0").split("")
    mem[adr] = parseInt(bin.map((v, i) => (mask[i] === "X" ? v : mask[i])).join(""), 2)
  }
}
console.log(mem.reduce((sum, val) => sum + val))
