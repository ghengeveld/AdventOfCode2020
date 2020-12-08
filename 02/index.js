const fs = require("fs")

// const input = `
// 1-3 a: abcde
// 1-3 b: cdefg
// 2-9 c: ccccccccc
// `
const input = fs.readFileSync(__dirname + "/input.txt", "utf8")
const lines = input.split("\n").filter(Boolean)

let valid = 0

// Part 1
// for (const line of lines) {
//   const [policy, password] = line.split(": ")
//   const [range, letter] = policy.split(" ")
//   const [from, to] = range.split("-")
//   const matches = [...password.matchAll(letter)]
//   if (matches.length >= parseInt(from) && matches.length <= parseInt(to)) {
//     valid++
//   }
// }

// Part 2
for (const line of lines) {
  const [policy, password] = line.split(": ")
  const [positions, letter] = policy.split(" ")
  const [leftPos, rightPos] = positions.split("-")
  const [left, right] = [password[leftPos - 1], password[rightPos - 1]]
  if (left !== letter && right !== letter) continue
  if (left === letter && right === letter) continue
  valid++
}

console.log(valid)
