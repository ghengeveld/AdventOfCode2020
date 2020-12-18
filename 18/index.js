const fs = require("fs")

/*
const input = `
1 + 2 * 3 + 4 * 5 + 6
1 + (2 * 3) + (4 * (5 + 6))
2 * 3 + (4 * 5)
5 + (8 * 3 + 9 + 3 * 4 * 3)
5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))
((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2
`
/*/
const input = fs.readFileSync(__dirname + "/input.txt", "utf8")
//*/

const lines = input.trim().split("\n")

// Part 1
const group = new RegExp(/\(\d+ [+*] \d+\)/g)
const expr = new RegExp(/\d+ [+*] \d+/)
const parens = new RegExp(/\(\d+\)/g)
const total = lines.reduce((sum, line) => {
  while (expr.test(line)) {
    line = line.replace(group, eval)
    line = line.replace(expr, eval)
    line = line.replace(parens, eval)
  }
  return sum + parseInt(line)
}, 0)

console.log(total)

// Part 2
const add = new RegExp(/\d+ \+ \d+/g)
const mul = new RegExp(/\d+ \* \d+/g)
const grp = new RegExp(/\(([^()]+)\)/)

const run = (line) => {
  while (grp.test(line)) {
    line = line.replace(grp, (_, p1) => run(p1))
  }
  while (add.test(line)) {
    line = line.replace(add, eval)
    line = line.replace(parens, eval)
  }
  while (mul.test(line)) {
    line = line.replace(mul, eval)
    line = line.replace(parens, eval)
  }
  return line
}

const res = lines.reduce((sum, line) => {
  while (expr.test(line)) line = run(line)
  return sum + parseInt(line)
}, 0)

console.log(res)
