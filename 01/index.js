const fs = require("fs")

const input = fs.readFileSync(__dirname + "/input.txt", "utf8")
const lines = input.split("\n").filter(Boolean)

// const [lower, upper] = lines.reduce(
//   (acc, line) => {
//     const number = parseInt(line)
//     if (number < 1010) acc[0].push(number)
//     else acc[1].push(number)
//     return acc
//   },
//   [[], []]
// )

// for (const low of lower) {
//   for (const up of upper) {
//     if (low + up === 2020) return console.log(low, up, low * up)
//   }
// }

const numbers = lines.map((line) => parseInt(line, 10))

for (const i in numbers) {
  for (const j in numbers) {
    if (i === j) continue
    for (const k in numbers) {
      if (i === k || j === k) continue
      const [a, b, c] = [numbers[i], numbers[j], numbers[k]]
      if (a + b + c === 2020) return console.log(a, b, c, a * b * c)
    }
  }
}
