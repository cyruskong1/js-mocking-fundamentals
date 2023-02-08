const assert = require('assert')
const thumbWar = require('../thumb-war')
const utils = require('../utils')

// the fn function is a factory
// returns a mockFn object
// mockFn accepts args and pushes it into a calls array inside a mock property
// mockFn returns the implementation called with args 
function fn(impl = () => {}) {
  const mockFn = (...args) => {
    mockFn.mock.calls.push(args)
    return impl(...args)
  }
  mockFn.mock = {calls: []}
  mockFn.mockImplementation = newImpl => (impl = newImpl)
  return mockFn
}

// spyOn is in charge of identifying and remembering an implementation.
// should assign an implementation to a mock implementation 
// run the mock implementation
// then restore it to its original value
function spyOn(obj, prop) {
  const originalValue = obj[prop]
  obj[prop] = fn()
  obj[prop].mockRestore = () => obj[prop] = originalValue
}

spyOn(utils, "getWinner")
utils.getWinner.mockImplementation = fn((p1, p2) =>  p2)

const winner = thumbWar('Kent C. Dodds', 'Ken Wheeler')

assert.strictEqual(winner, 'Kent C. Dodds')
assert.deepStrictEqual(utils.getWinner.mock.calls, [
  ['Kent C. Dodds', 'Ken Wheeler'],
  ['Kent C. Dodds', 'Ken Wheeler']
])

// cleanup
utils.getWinner.mockRestore()
