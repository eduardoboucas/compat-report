const compatData = require('./data.json')
//const parseCss = require('./../node_modules/css/lib/parse')
const parseCss = require('css').parse
const semverCompare = require('semver-compare')

class StyleSheet {
  constructor(browserList) {
    this.browserList = browserList
    this.cssMatches = {}
    this.issues = {}
    this.inputs = []
  }

  add(source, reference) {
    this.inputs.push({
      source,
      reference
    })
  }

  parse() {
    this.inputs.forEach(input => {
      try {
        const parsedCss = parseCss(input.source, {inputSourcemaps: false})

        this.process(
          parsedCss.stylesheet,
          input.reference
        )  
      } catch (err) {
        console.log('Error whilst parsing CSS:', err)
      }
    })

    return {
      issues: this.issues,
      issuesMap: this.cssMatches
    }
  }

  process(stylesheet, reference) {
    stylesheet.rules.forEach(this.processRule.bind(this, reference))

    Object.keys(this.cssMatches).forEach(key => {
      const matchData = this.cssMatches[key].data

      Object.keys(matchData.support).forEach(browser => {
        if (!this.browserList[browser]) return

        this.issues[browser] = this.issues[browser] || {}

        const versionIndex = this.browserList[browser]
          .findIndex(key => key === matchData.support[browser].version_added)

        if (versionIndex >= 0) {
          for (let i = versionIndex + 1; i < this.browserList[browser].length; i++) {
            const versionForIndex = this.browserList[browser][i]

            this.issues[browser][versionForIndex] = this.issues[browser][versionForIndex] || []

            if (!this.issues[browser][versionForIndex].includes(key)) {
              this.issues[browser][versionForIndex].push(key)
            }
          }
        }
      })
    })
  }

  processDeclaration(reference, declaration) {
    const property = declaration.property && compatData.css.properties[declaration.property]

    if (!property) return

    const hashKey = `css/p/${declaration.property}`

    this.cssMatches[hashKey] = this.cssMatches[hashKey] || {
      data: property.__compat,
      occurrences: []
    }
    this.cssMatches[hashKey].occurrences.push({
      stylesheet: reference,
      position: declaration.position
    })
  }

  processRule(reference, rule) {
    if (rule.type !== 'rule') return

    // Processing declarations
    rule.declarations.forEach(this.processDeclaration.bind(this, reference))
  }
}

export default StyleSheet
