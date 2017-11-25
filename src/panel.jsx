import { h, render, Component } from 'preact'
import Browser from './components/Browser.jsx'
import DetailsPanel from './components/DetailsPanel.jsx'
import compatData from './data.json'
import semverCompare from 'semver-compare'
import StyleSheet from './StyleSheet'

class Panel extends Component {
  constructor () {
    super()

    this.state = {
      browserVersions: 10,
      expandedItem: null,
      isLoading: false,
      stylesheets: null
    }

    this.state.browsers = this._buildBrowserList(this.state.browserVersions)
  }

  _buildBrowserList (maxVersions) {
    return Object.keys(compatData.browsers).reduce((browsers, browser) => {
      browsers[browser] = Object.keys(compatData.browsers[browser].releases)
        .sort(semverCompare)
        .slice(-maxVersions)
        .reverse()

      return browsers
    }, {})
  }

  _expandItem (issues, browser, version) {
    this.setState({
      expandedItem: {
        issues,
        browser,
        version
      }
    })
  }

  _fetchStylesheets () {
    const getSyleSheetNodesFn = '(' + this._getCSSNodes.toString() + ')()'

    this.setState({
      isLoading: true,
      stylesheets: []
    })

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
      }).then(items => {
        const stylesheets = new StyleSheet(this.state.browsers)

        items.forEach(item => {
          stylesheets.add(item.content, item.url)
        })

        const processedStylesheets = stylesheets.parse()

        this.setState({
          isLoading: false,
          stylesheets: processedStylesheets
        })

        return items
      })
  }

  _getCSSNodes () {
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

  _setMaxBrowserVersions (versions) {
    this.setState({
      browsers: this._buildBrowserList(versions),
      browserVersions: versions
    })
  }

  componentDidMount () {
    this._fetchStylesheets()
  }

  render () {
    const {
      browsers,
      browserVersions,
      expandedItem,
      isLoading,
      stylesheets
    } = this.state

    if (isLoading) {
      return (
        <div>Loading...</div>
      )
    }

    if (stylesheets === null) {
      return null
    }

    return (
      <div class='panel'>
        <div class='browsers'>
          <Browser
            browsers={browsers}
            handle='chrome'
            name='Chrome'
            onExpand={this._expandItem.bind(this)}
            stylesheets={stylesheets}
          />

          <Browser
            browsers={browsers}
            handle='opera'
            name='Opera'
            onExpand={this._expandItem.bind(this)}
            stylesheets={stylesheets}
          />

          <Browser
            browsers={browsers}
            handle='firefox'
            name='Firefox'
            onExpand={this._expandItem.bind(this)}
            stylesheets={stylesheets}
          />

          <Browser
            browsers={browsers}
            handle='ie'
            name='IE'
            onExpand={this._expandItem.bind(this)}
            stylesheets={stylesheets}
          />

          <Browser
            browsers={browsers}
            handle='edge'
            name='Edge'
            onExpand={this._expandItem.bind(this)}
            stylesheets={stylesheets}
          />
        </div>

        <DetailsPanel
          browserVersions={browserVersions}
          data={expandedItem}
          issuesMap={stylesheets.issuesMap}
          onSetBrowserVersions={this._setMaxBrowserVersions.bind(this)}
        />
      </div>
    )
  }
}

render(<Panel />, document.getElementById('app'))
