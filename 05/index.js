const fs = require("fs")

/*
const input = `
FBFBBFFRLR
BBFFBBFRLL
`
/*/
const input = fs.readFileSync(__dirname + "/input.txt", "utf8")
//*/

const lines = input.trim().split("\n")
const ids = []
let lowest = Infinity
let highest = 0

// Part 1
for (const line of lines) {
  let fromRow = 0
  let toRow = 127
  let fromCol = 0
  let toCol = 7
  for (const char of line) {
    if (char === "F") toRow = Math.floor(toRow - (toRow - fromRow) / 2)
    if (char == "B") fromRow = Math.ceil(fromRow + (toRow - fromRow) / 2)
    if (char == "L") toCol = Math.floor(toCol - (toCol - fromCol) / 2)
    if (char == "R") fromCol = Math.ceil(fromCol + (toCol - fromCol) / 2)
  }
  const id = fromRow * 8 + fromCol
  // console.log(fromRow, toRow, fromCol, toCol, id)
  if (id < lowest) lowest = id
  if (id > highest) highest = id
  ids.push(id)
}
console.log({ lowest, highest })

// Part 2
for (let n = lowest + 1; n < highest; n++) {
  if (!ids.includes(n)) console.log({ n })
}
