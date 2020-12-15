const input = "6,19,0,5,7,13,1"

const numbers = input.split(",").map(Number)

// Part 1
let prev = numbers[numbers.length - 1]
for (let turn = numbers.length + 1; turn <= 2020; turn++) {
  const lastIndex = numbers.slice(0, -1).lastIndexOf(prev)
  prev = lastIndex === -1 ? 0 : turn - 1 - (lastIndex + 1)
  numbers.push(prev)
}
console.log(prev)
