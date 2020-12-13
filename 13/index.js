const fs = require("fs")

/*
const input = `
939
7,13,x,x,59,x,31,19
`
/*/
const input = fs.readFileSync(__dirname + "/input.txt", "utf8")
//*/

const lines = input.trim().split("\n")
const busses = lines[1].split(",").map(Number)

// Part 1
const earliest = parseInt(lines[0])
const available = busses.filter(Boolean)
loop: for (let n = earliest; ; n++) {
  for (const id of available) {
    if (n % id === 0) {
      console.log(id * (n - earliest))
      break loop
    }
  }
}

// Part 2
const [first, ...rest] = busses.map((id, index) => [id, index]).filter(([id]) => !isNaN(id))

// Negative-safe modulus
const mod = (n, m) => ((n % m) + m) % m

let [factor, time] = first
for (const [id, index] of rest) {
  const offset = mod(id - index, id)
  while (time % id !== offset) time += factor
  factor *= id
}
console.log(time)
