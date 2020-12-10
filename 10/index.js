const fs = require("fs")

/*
const input = `
16
10
15
5
1
11
7
19
6
12
4
`
/*/
const input = fs.readFileSync(__dirname + "/input.txt", "utf8")
//*/

const numbers = input
  .trim()
  .split("\n")
  .map((line) => parseInt(line))
  .sort((a, b) => a - b)

// Part 1
const adapters = [0, ...numbers, numbers[numbers.length - 1] + 3]
// const jumps = { one: 0, three: 0 }
// for (let i = 1; i < adapters.length; i++) {
//   const jump = adapters[i] - adapters[i - 1]
//   if (jump === 1) jumps.one++
//   if (jump === 3) jumps.three++
// }
// console.log(jumps.one * jumps.three)

// Part 2
const map = adapters.reduce((acc, n, i) => {
  acc[n] = adapters.slice(i + 1, i + 4).filter((x) => x <= n + 3)
  return acc
}, {})
// console.log(map)

const walk = (n, cache = {}) => {
  if (cache[n]) return cache[n]
  if (map[n].length === 0) return 1
  return map[n].reduce((sum, v) => {
    cache[v] = cache[v] || walk(v, cache)
    return sum + cache[v]
  }, 0)
}
console.log(walk(0))
