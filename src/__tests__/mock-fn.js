const thumbWar = require('../thumb-war')
const utils = require('../utils')

test('returns winner', () => {
  const originalGetWinner = utils.getWinner
  // fn is jest's function method, it mocks an implementation and remembers the arguments called with it
  utils.getWinner = jest.fn((p1, p2) => p1)
  const winner = thumbWar('Kent C. Dodds', 'Ken Wheeler')
  expect(winner).toBe('Kent C. Dodds')
  expect(utils.getWinner.mock.calls).toEqual([
    [ 'Kent C. Dodds', 'Ken Wheeler' ],
    [ 'Kent C. Dodds', 'Ken Wheeler' ]
  ])
  // cleanup
  utils.getWinner = originalGetWinner
})
