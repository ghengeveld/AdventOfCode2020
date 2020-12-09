const fs = require("fs")

/*
const input = `
35
20
15
25
47
40
62
55
65
95
102
117
150
182
127
219
299
277
309
576
`
const preamble = 5
/*/
const input = fs.readFileSync(__dirname + "/input.txt", "utf8")
const preamble = 25
//*/

const numbers = input
  .trim()
  .split("\n")
  .map((line) => parseInt(line))

// Part 1
let invalid
for (let i = preamble; i < numbers.length; i++) {
  let valid
  for (let j = 1; j <= preamble; j++) {
    if (valid) break
    for (let k = 1; k <= preamble; k++) {
      if (j === k) continue
      if (numbers[i - j] === numbers[i - k]) continue
      if (numbers[i] === numbers[i - j] + numbers[i - k]) {
        valid = true
        break
      }
    }
  }
  if (!valid) invalid = numbers[i]
}
console.log(invalid)

// Part 2
for (let i = 0; i < numbers.length; i++) {
  for (let l = 2; l < numbers.length; l++) {
    const range = numbers.slice(i, i + l)
    const sum = range.reduce((sum, n) => sum + n)
    if (sum === invalid) {
      range.sort((a, b) => a - b)
      console.log(range[0] + range[l - 1])
      process.exit()
    }
  }
}
