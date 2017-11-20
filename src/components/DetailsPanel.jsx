import { h, render, Component } from 'preact'
import BrowserVersionsPicker from './BrowserVersionsPicker.jsx'
import IssuesTable from './IssuesTable.jsx'

class DetailsPanel extends Component {
  _renderIssuesTable() {
    const {
      data,
      issuesMap
    } = this.props

    if (data) {
      if (data.issues) {
        return (
          <div>
            <p class="details-panel__header">
              <strong>{data.browser} {data.version}</strong> ({data.issues.length} issues)
            </p>

            <IssuesTable
              browser={data.browser}
              data={data.issues}
              issuesMap={issuesMap}
              version={data.version}
            />
          </div>
        )
      } else {
        return (
          <div>
            <p class="details-panel__header">
              <strong>{data.browser} {data.version}</strong>
            </p>

            <p class="details-panel__info">No compatibility issues found</p>
          </div>
        )
      }
    } else {
      return (
        <div>
          <p class="details-panel__info">Click on a version to see a list of compatibility issues</p>
        </div>
      )
    }
  }

  render() {
    const {
      browserVersions,
      data,
      issuesMap,
      onSetBrowserVersions,
    } = this.props

    return (
      <div class="details-panel">
        {this._renderIssuesTable()}

        <BrowserVersionsPicker
          browserVersions={browserVersions}
          onSetBrowserVersions={onSetBrowserVersions}
        />
      </div>
    )
  }
}

export default DetailsPanel
