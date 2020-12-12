const fs = require("fs")

/*
const input = `
F10
N3
F7
R90
F11
`
/*/
const input = fs.readFileSync(__dirname + "/input.txt", "utf8")
//*/

const lines = input.trim().split("\n")

// Part 1
// const position = [0, 0] // x, y
// const directions = ["E", "S", "W", "N"]
// let direction = "E"

// const turn = (degrees) => {
//   const index = directions.indexOf(direction)
//   const delta = degrees / 90
//   let next = index + (delta % 4)
//   if (next < 0) next = 4 + next
//   if (next >= 4) next -= 4
//   direction = directions[next]
// }

// for (const line of lines) {
//   const action = line[0]
//   const value = parseInt(line.slice(1))

//   if (action === "N") position[1] -= value
//   if (action === "E") position[0] += value
//   if (action === "S") position[1] += value
//   if (action === "W") position[0] -= value

//   if (action === "L") turn(-value)
//   if (action === "R") turn(value)

//   if (action === "F") {
//     if (direction === "N") position[1] -= value
//     if (direction === "E") position[0] += value
//     if (direction === "S") position[1] += value
//     if (direction === "W") position[0] -= value
//   }
// }
// console.log(position[0] + position[1])

// Part 2
const position = [0, 0] // x, y
const waypoint = [10, -1]

const rotate = (direction, degrees) => {
  const [x, y] = waypoint
  if (degrees === 90) {
    waypoint[0] = y * (direction === "R" ? -1 : 1)
    waypoint[1] = x * (direction === "R" ? 1 : -1)
  }
  if (degrees === 180) {
    waypoint[0] = x * -1
    waypoint[1] = y * -1
  }
  if (degrees === 270) {
    waypoint[0] = y * (direction === "L" ? -1 : 1)
    waypoint[1] = x * (direction === "L" ? 1 : -1)
  }
}

for (const line of lines) {
  const action = line[0]
  const value = parseInt(line.slice(1))

  if (action === "N") waypoint[1] -= value
  if (action === "E") waypoint[0] += value
  if (action === "S") waypoint[1] += value
  if (action === "W") waypoint[0] -= value

  if (action === "L" || action === "R") rotate(action, value)

  if (action === "F") {
    for (let i = 0; i < value; i++) {
      position[0] += waypoint[0]
      position[1] += waypoint[1]
    }
  }
}
console.log(position[0] + position[1])
