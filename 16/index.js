const fs = require("fs")

/*
const input = `
class: 0-1 or 4-19
row: 0-5 or 8-19
seat: 0-13 or 16-19

your ticket:
11,12,13

nearby tickets:
3,9,18
15,1,5
5,14,9
`
/*/
const input = fs.readFileSync(__dirname + "/input.txt", "utf8")
//*/

const data = input.trim().split("\n\n")
const rules = data[0].split("\n")
const mine = data[1].split("\n")[1].split(",").map(Number)
const allnearby = data[2].split("\n").slice(1)

const range = (from, to) => [...new Array(to - from + 1)].map((_, i) => from + i)

const rulemap = []
const validnums = new Set()
for (const rule of rules) {
  const [field, values] = rule.split(": ")
  const parsed = values.split(" or ").map((r) => r.split("-").map(Number))
  const ruleset = new Set(parsed.map(([from, to]) => range(from, to)).flat())
  ruleset.forEach((n) => validnums.add(n))
  rulemap.push([field, ruleset])
}

const invalidnums = []
const nearby = []
for (const near of allnearby) {
  const numbers = near.split(",").map(Number)
  const invalids = numbers.filter((v) => !validnums.has(v))
  invalids.forEach((n) => invalidnums.push(n))
  if (invalids.length === 0) nearby.push(numbers)
}

// Part 1
// console.log(invalidnums.reduce((sum, n) => sum + n, 0))

// Part 2
const tickets = nearby.concat([mine])

const mapped = []
for (let i = 0; i < tickets.length; i++) {
  const ticket = tickets[i]
  const rules = []
  for (let j = 0; j < ticket.length; j++) {
    const prevFields = mapped[i - 1]
    const settledRules = rules.reduce(
      (acc, fields) => (fields.length === 1 ? acc.concat(fields) : acc),
      []
    )
    const fields = rulemap
      .filter(([field, ruleset]) => {
        if (!ruleset.has(ticket[j])) return false
        if (prevFields && !prevFields[j].includes(field)) return false
        if (settledRules.includes(field)) return false
        return true
      })
      .map(([field]) => field)
    rules.push(fields)
  }
  mapped.push(rules)
}

const settled = [...new Array(mine.length)]
while (settled.some((item) => !item)) {
  for (const rules of mapped) {
    for (let i = 0; i < rules.length; i++) {
      const fields = rules[i]
      if (fields.length === 1) settled[i] = fields[0]
      else rules[i] = fields.filter((field) => !settled.includes(field))
    }
  }
}

const result = settled.reduce((p, f, i) => (f.startsWith("departure") ? p * mine[i] : p), 1)
console.log(result)
