const mockData = require('./mockData.json')

jest.mock('./../../src/lib/data.json', () => mockData)

module.exports = mockData
module.exports.buildScaffold = obj => {
  Object.keys(mockData.browsers).forEach(browser => {
    obj[browser] = obj[browser] || {}

    Object.keys(mockData.browsers[browser].releases).forEach(version => {
      obj[browser][version] = []
    })
  })

  return obj
}
