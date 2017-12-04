import { h, render, Component } from 'preact'
import { connect } from 'preact-redux'
import { bindActionCreators } from 'redux'
import reducer from './../reducers'
import * as actions from './../actions'
import browsers from './../lib/Browsers'
import css from './Browser.css'

class Browser extends Component {
  _getSeverityStyles (browser, version) {
    const {
      data
    } = this.props

    const numIssues = Object.keys(data[browser][version]).length

    let color

    if (numIssues > 0) {
      color = '#fff3c3'
    }

    if (numIssues > 8) {
      color = '#ffcfc3'
    }

    if (color) {
      return `background-color: ${color};`
    }
  }

  render () {
    const {
      activeBrowser,
      activeVersion,
      browser,
      data,
      name,
      openBrowserVersion
    } = this.props

    if (!data) return null

    const severity = 1

    return (
      <div class={css.browser}>
        <div>
          <p class={css.browserName}>{browsers.getName(browser)}</p>
        </div>
        <ol class={css.versions}>
          {browsers.get(browser).map(version => {
            const hasIssues = Object.keys(data[browser][version]).length > 0

            let versionClasses = [css.version]

            if (browser === activeBrowser && version === activeVersion) {
              versionClasses.push(css.versionActive)
            }

            if (hasIssues) {
              versionClasses.push(css.versionClickable)
            }

            return (
              <li
                class={versionClasses.join(' ')}
                style={this._getSeverityStyles(browser, version)}
              >
                <button
                  class={css.versionButton}
                  onClick={hasIssues && openBrowserVersion.bind(this, browser, version)}
                  title={hasIssues ? 'Click to see compatibility issues' : 'No compatibility issues'}
                >{version}</button>
              </li>
            )
          })}
        </ol>
      </div>
    )
  }
}

export default connect(
  state => state,
  dispatch => bindActionCreators(actions, dispatch)
)(Browser)
