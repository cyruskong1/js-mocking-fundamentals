const assert = require('assert')
const thumbWar = require('../thumb-war')
const utils = require('../utils')

function fn(implementation) {
  const mockFn = (...args) => {
    mockFn.mock.calls.push(args)
    return implementation(...args)
  }
  mockFn.mock = {calls: []}
  return mockFn
}

const originalGetWinner = utils.getWinner
utils.getWinner = (p1, p2) => p1

const winner = thumbWar('Kent C. Dodds', 'Ken Wheeler')
assert.strictEqual(winner, 'Kent C. Dodds')
assert.deepStrictEqual(utils.getWinner.mock.calls, [
  [ 'Kent C. Dodds', 'Ken Wheeler' ],
  [ 'Kent C. Dodds', 'Ken Wheeler' ]
])

// cleanup
utils.getWinner = originalGetWinner
