const input = "6,19,0,5,7,13,1"
const numbers = input.split(",").map(Number)

// Part 1
// const spoken = [...numbers]
// let prevSpoken = spoken[spoken.length - 1]
// for (let turn = numbers.length + 1; turn <= 2020; turn++) {
//   const prevIndex = spoken.slice(0, -1).lastIndexOf(prevSpoken)
//   prevSpoken = prevIndex === -1 ? 0 : turn - 1 - (prevIndex + 1)
//   spoken.push(prevSpoken)
// }
// console.log(prevSpoken)

// Part 2
const spoken = numbers.slice(0, numbers.length - 1).reduce((acc, n, i) => acc.set(n, i), new Map())
let last = numbers[numbers.length - 1]
for (let i = numbers.length; i < 30000000; i++) {
  const current = spoken.has(last) ? i - 1 - spoken.get(last) : 0
  spoken.set(last, i - 1)
  last = current
}
console.log(last)
