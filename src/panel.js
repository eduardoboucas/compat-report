const StyleSheet = require('./StyleSheet.js')

const CompatReport = function () {}

CompatReport.prototype.bindEvents = function () {
  if (!document) return

  document.getElementById('button').addEventListener('click', () => {
    this.fetchStylesheets().then(items => {
      items.forEach(item => {
        const stylesheet = new StyleSheet(item.content)

        stylesheet.parse()

        const compatibility = stylesheet.process()
        console.log(compatibility)
      })
    })
  })
}

CompatReport.prototype.fetchStylesheets = function () {
  const getSyleSheetNodesFn = '(' + this.getCSSNodes.toString() + ')()'

  return browser.devtools.inspectedWindow
    .eval(getSyleSheetNodesFn)
    .then(response => {
      const stylesheetUrls = response[0]
      const queue = stylesheetUrls.map(url => {
        return fetch(url)
          .then(response => response.text())
          .then(response => ({
            url,
            content: response
          }))
      })

      return Promise.all(queue)
    })
}

CompatReport.prototype.getCSSNodes = function () {
  return Array.from(
    document.getElementsByTagName('link')
  ).filter(node => {
    return node.getAttribute('rel') === 'stylesheet'
  }).map(node => {
    return node.getAttribute('href').indexOf('/') === 0
      ? window.location.origin + node.getAttribute('href')
      : node.getAttribute('href')
  })
}

const compatReport = new CompatReport()

compatReport.bindEvents()
