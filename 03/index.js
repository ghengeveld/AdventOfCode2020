const fs = require("fs")

// const input = `
// ..##.......
// #...#...#..
// .#....#..#.
// ..#.#...#.#
// .#...##..#.
// ..#.##.....
// .#.#.#....#
// .#........#
// #.##...#...
// #...##....#
// .#..#...#.#
// `
const input = fs.readFileSync(__dirname + "/input.txt", "utf8")
const lines = input.split("\n").filter(Boolean)

const run = (slope) => {
  let [right, down] = [0, 0]
  let trees = 0

  while (down < lines.length) {
    const line = lines[down]
    const x = right % line.length
    right += slope.right
    down += slope.down
    if (line[x] === "#") trees++
  }

  return trees
}

console.log(
  run({ right: 1, down: 1 }) *
    run({ right: 3, down: 1 }) *
    run({ right: 5, down: 1 }) *
    run({ right: 7, down: 1 }) *
    run({ right: 1, down: 2 })
)
