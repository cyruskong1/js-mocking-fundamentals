const assert = require('assert')
const thumbWar = require('../thumb-war')
const utils = require('../utils')


const originalGetWinner = utils.getWinner
// we have to mock the utils function that the thumbWar function uses. We are not testing the utils function so we are mocking it
// this is monkeypatching -- taking the utils function that is used in our thumbWar module and making it deterministic for the test
utils.getWinner = (p1, p2) => p1

const winner = thumbWar('Kent C. Dodds', 'Ken Wheeler')
assert.strictEqual(winner, 'Kent C. Dodds')

//cleanup to avoid affecting other tests that might not want to mock this implementation
utils.getWinner = originalGetWinner
