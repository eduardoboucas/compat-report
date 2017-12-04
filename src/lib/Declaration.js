const browsers = require('./Browsers')
const compatData = require('./data.json')
const Helpers = require('./Helpers')
const postcss = require('postcss')

const Declaration = function (node, source, rule, ruleCache) {
  this.node = node
  this.source = source
  this.rule = rule
  this.ruleCache = ruleCache
}

Declaration.prototype.process = function (issues) {
  const unprefixedProperty = postcss.vendor.unprefixed(this.node.prop)
  const propertyCompatData = compatData.css.properties[unprefixedProperty]

  if (!propertyCompatData || this.ruleCache[unprefixedProperty]) return

  const propertySuppport = propertyCompatData.__compat.support

  Object.keys(propertySuppport).forEach(browser => {
    if (!browsers.get(browser)) return

    let missingPrefixesForVersion = {}
    let unsupportedVersions = []

    if (Array.isArray(propertySuppport[browser])) {
      let variantsInRule = []

      this.rule.walkDecls(secondaryDeclaration => {
        const unprefixedSecondaryProperty = postcss.vendor.unprefixed(secondaryDeclaration.prop)

        if (unprefixedSecondaryProperty === unprefixedProperty) {
          variantsInRule.push(postcss.vendor.prefix(secondaryDeclaration.prop))
        }
      })

      // So that we don't process the same property multiple times
      // within this rule.
      this.ruleCache[unprefixedProperty] = true

      propertySuppport[browser].forEach(variant => {
        const variantSupport = Helpers.getUnsupportedVersions({
          browser,
          added: variant.version_added,
          removed: variant.version_removed
        })

        if (variant.prefix) {
          // The prefix is included, extending the versions supported.
          if (variantsInRule.includes(variant.prefix)) {
            unsupportedVersions = unsupportedVersions.length > 0
              ? unsupportedVersions.filter(version => variantSupport.includes(version))
              : variantSupport
          } else {
            // The prefix is not included, we can flag as a suggestion.
            variantSupport.forEach(version => {
              missingPrefixesForVersion[version] = missingPrefixesForVersion[version] || {}
              missingPrefixesForVersion[version][variant.prefix] = true
            })
          }
        } else {
          // The main variant is the one that doesn't contain any keys other than
          // `version_added` and `version_removed`
          const isMainVariant = Object.keys(variant).filter(property => {
            return property !== 'version_added' && property !== 'version_removed'
          }).length > 0

          unsupportedVersions = unsupportedVersions.length > 0
            ? unsupportedVersions.filter(version => variantSupport.includes(version))
            : variantSupport
        }
      })
    } else {
      unsupportedVersions = Helpers.getUnsupportedVersions({
        browser,
        added: propertySuppport[browser].version_added,
        removed: propertySuppport[browser].version_removed
      })
    }

    unsupportedVersions.forEach(version => {
      let versionData = {
        data: propertyCompatData,
        instance: {
          start: this.node.source.start,
          end: this.node.source.end
        },
        source: this.source.id,
        subType: 'property',
        title: `${unprefixedProperty}`,
        type: 'CSS'
      }

      if (missingPrefixesForVersion[version]) {
        versionData.missingPrefixes = Object.keys(missingPrefixesForVersion[version])
      }

      issues[browser][version].push(versionData)
    })
  })
}

module.exports = Declaration
