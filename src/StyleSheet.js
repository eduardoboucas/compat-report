const compatData = require('./data.json')
const postcss = require('postcss')

const StyleSheet = function (browserList) {
  this.browserList = browserList
  this.issues = {}
  this.inputs = []

  Object.keys(this.browserList).forEach(browser => {
    this.issues[browser] = {}

    this.browserList[browser].forEach(version => {
      this.issues[browser][version] = []
    })
  })
}

StyleSheet.prototype.add = function (source, reference) {
  this.inputs.push({
    source,
    reference
  })
}

StyleSheet.prototype.getBrowserVersionsFromRange = function ({
  browser,
  added,
  removed
}) {
  const indexAdded = this.browserList[browser].findIndex(key => key === added)
  const indexRemoved = this.browserList[browser].findIndex(key => key === removed)

  let versions = this.browserList[browser]

  if (indexAdded !== -1) {
    versions = versions.slice(indexAdded + 1)
  }

  if (indexRemoved !== -1) {
    versions = this.browserList[browser].slice(0, indexRemoved + 1).concat(versions)
  }

  return versions
}

StyleSheet.prototype.parse = function () {
  const queue = this.inputs.map(input => {
    return postcss([
      postcss.plugin('postcss-css-report', this.process.bind(this))
    ]).process(input.source)
  })

  return Promise.all(queue).then(stylesheets => {
    return this.issues
  })
}

StyleSheet.prototype.process = function (opts = {}) {
  return (css, result) => {
    css.walkRules(this.processRule.bind(this))
  }
}

StyleSheet.prototype.processDeclaration = function (rule, ruleCache, declaration) {
  const unprefixedProperty = postcss.vendor.unprefixed(declaration.prop)
  const propertyCompatData = compatData.css.properties[unprefixedProperty]

  if (!propertyCompatData || ruleCache[unprefixedProperty]) return

  const propertySuppport = propertyCompatData.__compat.support

  Object.keys(propertySuppport).forEach(browser => {
    if (!this.browserList[browser]) return

    let notesForVersion = {}
    let unsupportedVersions = null

    if (Array.isArray(propertySuppport[browser])) {
      let variantsInRule = []

      rule.walkDecls(secondaryDeclaration => {
        const unprefixedSecondaryProperty = postcss.vendor.unprefixed(secondaryDeclaration.prop)

        if (unprefixedSecondaryProperty === unprefixedProperty) {
          variantsInRule.push(postcss.vendor.prefix(secondaryDeclaration.prop))
        }
      })

      // So that we don't process the same property multiple times
      // within this rule.
      ruleCache[unprefixedProperty] = true

      propertySuppport[browser].forEach(variant => {
        if (variant.prefix) {
          const rangeForPrefix = this.getBrowserVersionsFromRange({
            browser,
            added: variant.version_added,
            removed: variant.version_removed
          })

          // The prefix is included, extending the versions supported.
          if (variantsInRule.includes(variant.prefix)) {
            if (unsupportedVersions) {
              // We do an array intersect. Only versions that don't support
              // neither the prefixed and unprefixed properties are left in
              // the array of unsupported versions.
              unsupportedVersions = unsupportedVersions
                .filter(version => rangeForPrefix.includes(version))
            } else {
              unsupportedVersions = rangeForPrefix
            }
          } else {
            // The prefix is not included, we can flag as a suggestion.
            rangeForPrefix.forEach(version => {
              notesForVersion[version] = notesForVersion[version] || []
              notesForVersion[version].push(`Needs vendor prefix: ${variant.prefix}`)
            })
          }
        }
      })
    } else {
      unsupportedVersions = this.getBrowserVersionsFromRange({
        browser,
        added: propertySuppport[browser].version_added,
        removed: propertySuppport[browser].version_removed
      })
    }

    unsupportedVersions.forEach(version => {
      this.issues[browser][version].push({
        instance: declaration,
        data: propertyCompatData,
        notes: notesForVersion[version] || []
      })
    })
  })
}

StyleSheet.prototype.processRule = function (rule) {
  let ruleCache = {}

  rule.walkDecls(this.processDeclaration.bind(this, rule, ruleCache))
}

module.exports = StyleSheet
