const fs = require('fs')
const path = require('path')
const index = require('../index')

const code = fs.readFileSync(path.join('index.js'), {encoding: 'utf8'})

test('returns 0', () => expect(index.invoke()).toBe(0))

test('says "Hello World"', () =>
  expect(index.helloWorld()).toBe('Hello World'))

test('is identical to void 0', () => expect(index.whatIsIt()).toBe(true))

test('returns 7', () => expect(index.commaFTW()).toBe(7))

test("returns a non-empty string", () => {
  const value = index.writeAFunction()
  expect(typeof value).toBe('string')
  expect(value.length).toBeGreaterThan(0)
})

test("function body probably contains a function", () => {
  const match = code.match(/writeAFunction = \(\) => \(([\s\S]+?)const/)
  expect(match[1]).toContain('=>')
})

test('passes like a boss', () =>
  expect(index.buildingBlocks()).toBe('passing this test like a boss'))

test('uses block syntax', () => {
  const substring = `constbuildingBlocks=()=>(//changethenextlinetouseblocksyntax()=>{return'passingthistestlikeaboss'})()`
  const result = code.replace(/\s/g, '').includes(substring)
  expect(result).toBe(true)
})

test('knows what it does', () =>
  expect(index.whatDoesItDo()).toBe(true))

test('returns something', () =>
  expect(index.returnSomething()).toBeDefined())

test('is an inline commenting pro', () =>
  expect(index.inlineComment()).toBe('uncomment this line'))

test('is a multiline commenting pro', () => {
  const match = code.match(/multiLineNoInline([\s\S]+?)}/)
  expect(match[1]).not.toContain('//')
  expect(index.multiLineNoInline()).toBeDefined()
})