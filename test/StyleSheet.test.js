const StyleSheet = require('./../src/lib/StyleSheet')

describe('StyleSheet', () => {
  describe('constructor', () => {
    test('creates the scaffolding for the browser versions provided', () => {
      const mockBrowserList = {
        chrome: ['1.0', '2.0', '3.0'],
        safari: ['1.1', '2.2', '3.3']
      }
      const stylesheet = new StyleSheet(mockBrowserList)

      Object.keys(mockBrowserList).forEach(browser => {
        mockBrowserList[browser].forEach(version => {
          //expect(stylesheet.issues[browser][version]).toEqual([])
        })
      })
    })
  })
})
