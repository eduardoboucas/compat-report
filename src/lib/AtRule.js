const browsers = require('./Browsers')
const compatData = require('./data.json')
const Helpers = require('./Helpers')

const AtRule = function (node, source) {
  this.node = node
  this.source = source
}

AtRule.prototype.process = function (issues) {
  let atRuleIssues = {}

  switch (this.node.name) {
    case 'counter-style':
      const counterStyleCompat = compatData.css['at-rules']['@counter-style']

      atRuleIssues['counter-style'] = counterStyleCompat

      const counterStyleProperties = [
        'additive-symbols',
        'fallback',
        'negative',
        'pad',
        'prefix',
        'range',
        'speak-as',
        'suffix',
        'symbols',
        'system'
      ]

      this.node.walkDecls(declaration => {
        if (counterStyleProperties.includes(declaration.prop)) {
          atRuleIssues[`counter-style.${declaration.prop}`] = counterStyleCompat[declaration.prop]
        }
      })

      break

    case 'font-face':
      const fontFaceCompat = compatData.css['at-rules']['font-face']

      atRuleIssues['font-face'] = fontFaceCompat

      const fontFaceProperties = [
        'font-display',
        'font-family',
        'font-feature-settings',
        'font-style',
        'font-weight',
        'src',
        'unicode-range'
      ]

      this.node.walkDecls(declaration => {
        if (fontFaceProperties.includes(declaration.prop)) {
          atRuleIssues[`font-face.${declaration.prop}`] = fontFaceCompat[declaration.prop]
        }
      })

      break
  }

  Object.keys(atRuleIssues).forEach(issueKey => {
    const issueSupport = atRuleIssues[issueKey].__compat.support

    Object.keys(issueSupport).forEach(browser => {
      if (!browsers.get(browser)) return

      const unsupportedVersions = Helpers.getUnsupportedVersions({
        browser,
        added: issueSupport[browser].version_added,
        removed: issueSupport[browser].version_removed
      })

      unsupportedVersions.forEach(version => {
        issues[browser][version].push({
          data: issueSupport,
          instance: {
            start: this.node.source.start,
            end: this.node.source.end
          },
          source: this.source.id,
          subType: 'at-rule',
          title: `@${this.node.name}`,
          type: 'CSS'
        })
      })
    })
  })
}

module.exports = AtRule
