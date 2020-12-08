const fs = require("fs")

/*
const input = `
light red bags contain 1 bright white bag, 2 muted yellow bags.
dark orange bags contain 3 bright white bags, 4 muted yellow bags.
bright white bags contain 1 shiny gold bag.
muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.
shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.
dark olive bags contain 3 faded blue bags, 4 dotted black bags.
vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.
faded blue bags contain no other bags.
dotted black bags contain no other bags.
`
/*/
const input = fs.readFileSync(__dirname + "/input.txt", "utf8")
//*/

const lines = input.trim().split("\n")

// Part 1
const findParents = (type) => {
  const regex = new RegExp(` contain .* ${type} `)
  return lines
    .filter((line) => regex.test(line))
    .map((match) => match.match(/(.+) bags contain/)[1])
}

const getBags = (type) => {
  const parents = findParents(type)
  if (!parents.length) return []
  return parents.concat(...parents.map(getBags))
}

// console.log(new Set(getBags("shiny gold")).size)

// Part 2
const rules = lines.reduce((acc, line) => {
  const [, type, contents] = line.match(/^(.+) bags contain (.+)\.$/)
  acc[type] = contents.split(", ").reduce((a, c) => {
    if (c === "no other bags") return a
    const [, num, typ] = c.match(/(\d+) (.+) bags?/)
    return [...a, [typ, parseInt(num)]]
  }, [])
  return acc
}, {})

const walk = (type) => {
  let total = 0
  const contents = rules[type]
  for (const [t, n] of contents) {
    total += n + n * walk(t)
  }
  return total
}

console.log(walk("shiny gold"))
