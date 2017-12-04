const compatData = require('./data.json')
const semverCompare = require('semver-compare')

const BrowserList = function () {
  this.browsers = Object.keys(compatData.browsers).reduce((browsers, browser) => {
    browsers[browser] = Object.keys(compatData.browsers[browser].releases)
      .sort(semverCompare)
      //.slice(-maxVersions)
      .reverse()

    return browsers
  }, {})

  this.browserNames = {
    chrome: 'Chrome',
    opera: 'Opera',
    firefox: 'Firefox',
    ie: 'IE',
    edge: 'Edge'
  }
}

BrowserList.prototype.get = function (handle) {
  return this.browsers[handle]
}

BrowserList.prototype.getName = function (handle) {
  return this.browserNames[handle]
}

BrowserList.prototype.list = function () {
  return Object.keys(this.browsers)
}

let instance

module.exports = (() => {
  if (!instance) {
    instance = new BrowserList()
  }

  return instance
})()
