const fs = require("fs")

/*
const input = `
.#.
..#
###
`
/*/
const input = fs.readFileSync(__dirname + "/input.txt", "utf8")
//*/

const cycles = 6

const print = (items, neighbors = false) => {
  const rx = [Infinity, -Infinity]
  const ry = [Infinity, -Infinity]
  const rz = [Infinity, -Infinity]
  const rw = [Infinity, -Infinity]
  for (const { x, y, z, w } of items) {
    if (x < rx[0]) rx[0] = x
    if (x > rx[1]) rx[1] = x
    if (y < ry[0]) ry[0] = y
    if (y > ry[1]) ry[1] = y
    if (z < rz[0]) rz[0] = z
    if (z > rz[1]) rz[1] = z
    if (w < rw[0]) rw[0] = w
    if (w > rw[1]) rw[1] = w
  }
  for (let w = rw[0]; w <= rw[1]; w++) {
    for (let z = rz[0]; z <= rz[1]; z++) {
      console.log(`z=${z}, w=${w}`)
      for (let y = ry[0]; y <= ry[1]; y++) {
        let line = ""
        for (let x = rx[0]; x <= rx[1]; x++) {
          const v = items.find((o) => o.x === x && o.y === y && o.z === z && o.w === w)
          if (neighbors) line += v ? `${v.n}` : "0"
          else line += v ? "#" : "."
        }
        console.log(line)
      }
      console.log("")
    }
  }
}

let active = input
  .trim()
  .split("\n")
  .reduce(
    (acc, line, y) =>
      acc.concat(
        line
          .split("")
          .reduce((a, c, x) => (c === "#" ? a.concat({ x, y, z: 0, w: 0, n: 0 }) : a), [])
      ),
    []
  )

console.log("Before any cycles:\n")
print(active)

for (let i = 0; i < cycles; i++) {
  const neighbors = active.reduce((acc, coords) => {
    for (let x = coords.x - 1; x <= coords.x + 1; x++) {
      for (let y = coords.y - 1; y <= coords.y + 1; y++) {
        for (let z = coords.z - 1; z <= coords.z + 1; z++) {
          for (let w = coords.w - 1; w <= coords.w + 1; w++) {
            let item = acc.find((o) => o.x === x && o.y === y && o.z === z && o.w === w)
            if (!item) {
              item = { x, y, z, w, n: 0 }
              acc.push(item)
            }
            if (x === coords.x && y === coords.y && z === coords.z && w === coords.w) item.a = true
            else item.n++
          }
        }
      }
    }
    return acc
  }, [])

  // print(neighbors, true)
  // console.log(neighbors.filter(({ z }) => z === 0))

  active = neighbors.filter((item) => (item.a ? [2, 3].includes(item.n) : item.n === 3))

  console.log(`\nAfter ${i + 1} cycles:\n`)
  print(active)
}

console.log(active.length)
