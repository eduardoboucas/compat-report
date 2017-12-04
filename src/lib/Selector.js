const browsers = require('./Browsers')
const compatData = require('./data.json')
const Helpers = require('./Helpers')
const objectPath = require('object-path')
const postcssSelectorParser = require('postcss-selector-parser')

const Selector = function (selectorString, source, rule) {
  this.selectorString = selectorString
  this.source = source
  this.rule = rule
}

Selector.prototype.process = function (issues) {
  let selectorIssues = {}
  let selectorIssueTitle

  postcssSelectorParser(selectors => {
    selectors.walk(selector => {
      switch (selector.type) {
        case 'attribute':
          selectorIssues['attribute'] = compatData.css.selectors.attribute
          selectorIssueTitle = 'Attribute'

          if (selector.insensitive) {
            selectorIssues['attribute.case_sensitive_modifier'] = compatData.css.selectors.attribute.case_sensitive_modifier
            selectorIssueTitle += ' (case insensitive)'
          }

          break

        case 'class':
          selectorIssues['class'] = compatData.css.selectors.class
          selectorIssueTitle = 'Class'

          break

        case 'combinator':
          switch (selector.value) {
            case ' ':
              selectorIssues['descendant'] = compatData.css.selectors.descendant
              selectorIssueTitle = 'Descendant'

              break

            case '>>':
              selectorIssues['descendant.two_greater_than_syntax'] = compatData.css.selectors.descendant.two_greater_than_syntax
              selectorIssueTitle = 'Descendant (>>)'

              break

            case '+':
              selectorIssues['adjacent_sibling'] = compatData.css.selectors.adjacent_sibling
              selectorIssueTitle = 'Adjacent sibling'

              break

            case '>':
              selectorIssues['child'] = compatData.css.selectors.child
              selectorIssueTitle = 'Child'

              break

            case '~':
              selectorIssues['general_sibling'] = compatData.css.selectors.general_sibling
              selectorIssueTitle = 'General sibling'

              break
          }

        case 'id':
          selectorIssues['id'] = compatData.css.selectors.id
          selectorIssueTitle = 'ID'

          break

        case 'pseudo':
          switch (selector.value) {
            case '::cue':
              selectorIssues['cue'] = compatData.css.selectors.cue
              selectorIssueTitle = '::cue'

              break
          }

          break

        case 'tag':
          selectorIssues['type'] = compatData.css.selectors.type
          selectorIssueTitle = 'Tag'

          if (selector._namespace) {
            selectorIssues['type.namespaces'] = compatData.css.selectors.type.namespaces
            selectorIssueTitle += ' (namespaced)'
          }

          break

        case 'universal':
          selectorIssues['universal'] = compatData.css.selectors.universal
          selectorIssueTitle = 'Universal'

          if (selector._namespace) {
            selectorIssues['universal.namespaces'] = compatData.css.selectors.universal.namespaces
            selectorIssueTitle += ' (namespaced)'
          }

          break
      }
    })
  }).processSync(this.selectorString)

  Object.keys(selectorIssues).forEach(issueKey => {
    const issueSupport = objectPath.get(
      selectorIssues,
      issueKey
    )

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
            start: this.rule.source.start,
            end: this.rule.source.end
          },
          source: this.source.id,
          subType: 'selector',
          title: `${selectorIssueTitle} selector`,
          type: 'CSS'
        })
      })
    })
  })
}

module.exports = Selector
