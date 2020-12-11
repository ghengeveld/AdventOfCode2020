const fs = require("fs")

/*
const input = `
L.LL.LL.LL
LLLLLLL.LL
L.L.L..L..
LLLL.LL.LL
L.LL.LL.LL
L.LLLLL.LL
..L.L.....
LLLLLLLLLL
L.LLLLLL.L
L.LLLLL.LL
`
/*/
const input = fs.readFileSync(__dirname + "/input.txt", "utf8")
//*/

let grid = input.trim()

// Part 1
const occupiedNeighbors = (lines, row, col) => {
  let n = 0
  const above = lines[row - 1]
  const aside = lines[row]
  const below = lines[row + 1]

  if (aside[col - 1] === "#") n++
  if (aside[col + 1] === "#") n++
  if (above) {
    if (above[col - 1] === "#") n++
    if (above[col] === "#") n++
    if (above[col + 1] === "#") n++
  }
  if (below) {
    if (below[col - 1] === "#") n++
    if (below[col] === "#") n++
    if (below[col + 1] === "#") n++
  }

  return n
}

while (true) {
  const lines = grid.split("\n")
  const rows = lines.length
  const cols = lines[0].split("").length

  let next = ""
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const self = lines[row][col]
      const neighbors = occupiedNeighbors(lines, row, col)
      if (self === "L" && neighbors === 0) next += "#"
      else if (self === "#" && neighbors >= 4) next += "L"
      else next += self
    }
    next += "\n"
  }
  // console.log(next)
  next = next.trim()
  if (grid === next) break
  grid = next
}

console.log(
  grid.split("\n").reduce((sum, line) => sum + line.split("").filter((c) => c === "#").length, 0)
)

// Part 2
const occupiedVisible = (lines, row, col, rows, cols) => {
  const distance = Math.max(rows, cols)
  const found = {}
  const values = {
    "#": 1,
    ".": 0,
    L: -1,
  }

  for (let d = 1; d < distance; d++) {
    const above = lines[row - d]
    const aside = lines[row]
    const below = lines[row + d]
    found.l = found.l || values[aside[col - d]]
    found.r = found.r || values[aside[col + d]]
    if (above) {
      found.tl = found.tl || values[above[col - d]]
      found.t = found.t || values[above[col]]
      found.tr = found.tr || values[above[col + d]]
    }
    if (below) {
      found.bl = found.bl || values[below[col - d]]
      found.b = found.b || values[below[col]]
      found.br = found.br || values[below[col + d]]
    }
  }

  return Object.values(found).filter((value) => value === 1).length
}

grid = input.trim()
while (true) {
  const lines = grid.split("\n")
  const rows = lines.length
  const cols = lines[0].split("").length
  let next = ""
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const self = lines[row][col]
      const neighbors = occupiedVisible(lines, row, col, rows, cols)
      // console.log(neighbors)
      if (self === "L" && neighbors === 0) next += "#"
      else if (self === "#" && neighbors >= 5) next += "L"
      else next += self
    }
    next += "\n"
  }
  // console.log(next)
  next = next.trim()
  if (grid === next) break
  grid = next
}

console.log(
  grid.split("\n").reduce((sum, line) => sum + line.split("").filter((c) => c === "#").length, 0)
)
