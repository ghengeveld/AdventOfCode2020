const fs = require("fs")

/*
const input = `
abc

a
b
c

ab
ac

a
a
a
a

b
`
/*/
const input = fs.readFileSync(__dirname + "/input.txt", "utf8")
//*/

const groups = input.trim().split("\n\n")

// Part 1
{
  let total = 0
  for (const group of groups) {
    total += new Set(group.replace(/\s/g, "")).size
  }
  console.log({ total })
}

// Part 2
let total = 0
for (const group of groups) {
  total += group
    .split("\n")
    .map((member) => member.split(""))
    .reduce((isect, q) => isect.filter((x) => q.includes(x))).length
}
console.log({ total })
