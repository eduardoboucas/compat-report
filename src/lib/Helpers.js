const browsers = require('./Browsers')

const Helpers = function () {}

Helpers.prototype.getUnsupportedVersions = function ({
  browser,
  added,
  removed
}) {
  const browserData = browsers.get(browser)

  if (
    !browserData ||
    added === true
  ) {
    return []
  }

  const indexAdded = browserData.findIndex(key => key === added)
  const indexRemoved = browserData.findIndex(key => key === removed)

  let versions = browserData

  if (indexAdded !== -1) {
    versions = versions.slice(indexAdded + 1)
  }

  if (indexRemoved !== -1) {
    versions = browserData.slice(0, indexRemoved + 1).concat(versions)
  }

  return versions
}

Helpers.prototype.getArrayIntersection = function (arrays) {
  const head = arrays[0]
  const tail = arrays.slice(1)

  return head.filter(value => {
    return tail.every(array => array.includes(value))
  })
}

Helpers.prototype.mdnVersionToSemver = function (version) {
  switch (version) {
    case true:
      return '0.0.0'

    case false:
      return 'Infinity.0.0'

    default:
      return version
  }
}

module.exports = new Helpers()
