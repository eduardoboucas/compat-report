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

module.exports = new Helpers()
