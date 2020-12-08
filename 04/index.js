const fs = require("fs")

/*
const input = `
ecl:gry pid:860033327 eyr:2020 hcl:#fffffd
byr:1937 iyr:2017 cid:147 hgt:183cm

iyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884
hcl:#cfa07d byr:1929

hcl:#ae17e1 iyr:2013
eyr:2024
ecl:brn pid:760753108 byr:1931
hgt:179cm

hcl:#cfa07d eyr:2025 pid:166559648
iyr:2011 ecl:brn hgt:59in
`
/*/
const input = fs.readFileSync(__dirname + "/input.txt", "utf8")
//*/

const passports = input
  .trim()
  .split("\n\n")
  .map((data) => data.split(/\s/))

const required = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid" /*"cid"*/]

// Part 1
// let valid = passports.length

// for (const fields of passports) {
//   if (!required.every((req) => fields.some((field) => field.startsWith(`${req}:`)))) {
//     valid--
//   }
// }

// console.log(valid)

// Part 2
const rules = {
  byr(v) {
    if (v.length !== 4) return false
    const n = parseInt(v)
    return n >= 1920 && n <= 2002
  },
  iyr(v) {
    if (v.length !== 4) return false
    const n = parseInt(v)
    return n >= 2010 && n <= 2020
  },
  eyr(v) {
    if (v.length !== 4) return false
    const n = parseInt(v)
    return n >= 2020 && n <= 2030
  },
  hgt(v) {
    if (v.endsWith("cm")) {
      const n = parseInt(v)
      return n >= 150 && n <= 193
    }
    if (v.endsWith("in")) {
      const n = parseInt(v)
      return n >= 59 && n <= 76
    }
    return false
  },
  hcl(v) {
    return /^#[0-9a-f]{6}$/.test(v)
  },
  ecl(v) {
    return ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(v)
  },
  pid(v) {
    return /^[0-9]{9}$/.test(v)
  },
  cid() {
    return true
  },
}

let valid = passports.length

for (const fields of passports) {
  if (!required.every((req) => fields.some((field) => field.startsWith(`${req}:`)))) {
    valid--
    continue
  }
  for (const field of fields) {
    const [key, value] = field.split(":")
    if (!rules[key](value)) {
      valid--
      break
    }
  }
}

console.log(valid)
