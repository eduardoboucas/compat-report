const AtRule = require('./AtRule')
const cssBeautify = require('cssbeautify')
const Declaration = require('./Declaration')
const browsers = require('./Browsers')
const compatData = require('./data.json')
const Helpers = require('./Helpers')
const postcss = require('postcss')
const Prism = require('prismjs')
const Selector = require('./Selector')

const StyleSheet = function () {
  this.issues = {}
  this.sources = []

  browsers.list().forEach(browser => {
    this.issues[browser] = {}

    browsers.get(browser).forEach(version => {
      this.issues[browser][version] = []
    })
  })
}

StyleSheet.prototype.add = function ({id, content, external}) {
  this.sources.push({
    id,
    content,
    external
  })
}

StyleSheet.prototype.groupIssues = function (issues, property) {
  let groupedIssues = {}

  Object.keys(issues).forEach(browser => {
    groupedIssues[browser] = groupedIssues[browser] || {}

    Object.keys(issues[browser]).forEach(version => {
      groupedIssues[browser][version] = issues[browser][version].reduce((issues, issue) => {
        const key = issue[property]

        issues[key] = issues[key] || []
        issues[key].push(issue)

        return issues
      }, {})
    })
  })

  return groupedIssues
}

StyleSheet.prototype.parse = function () {
  let failedSources = []
  let processedSources = {}

  const queue = this.sources.map(source => {
    const plugin = postcss.plugin('postcss-css-report', this.process.bind(this, source))
    const formattedCss = cssBeautify(source.content)

    return postcss([plugin])
      .process(formattedCss)
      .then(result => {
        processedSources[source.id] = Prism
          .highlight(result.css, Prism.languages.css)
          .split('\n')

        return result
      })
      .catch(err => {
        console.log('** CSS parse error:', err)

        failedSources.push(source.id)  
      })
  })

  return Promise.all(queue).then(stylesheets => {
    return {
      data: this.groupIssues(this.issues, 'title'),
      failedSources,
      stylesheets: processedSources
    }
  })
}

StyleSheet.prototype.process = function (source, opts = {}) {
  return (css, result) => {
    css.walkRules(this.processRule.bind(this, source))
    css.walkAtRules(this.processAtRule.bind(this, source))
  }
}

StyleSheet.prototype.processAtRule = function (source, node) {
  const atRule = new AtRule(node, source)
  
  atRule.process(this.issues)
}

StyleSheet.prototype.processRule = function (source, rule) {
  let ruleCache = {}

  // Process selector
  if (rule.selector) {
    const selector = new Selector(
      rule.selector,
      source,
      rule
    )

    selector.process(this.issues)
  }

  // Process declarations
  rule.walkDecls(declarationNode => {
    const declaration = new Declaration(
      declarationNode,
      source,
      rule,
      ruleCache
    )

    declaration.process(this.issues)
  })
}

module.exports = StyleSheet
