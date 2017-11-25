import { h, render, Component } from 'preact'

class IssuesTable extends Component {
  _openLink (issue) {
    console.log('--> b:', browser.tabs)
    console.log('--> c:', chrome)
    // var creating = chrome.tabs.create({
    //   url:"https://example.org"
    // })
  }

  _renderIssue (key) {
    const {
      issuesMap
    } = this.props

    if (key.indexOf('css/p/') === 0) {
      return key.slice(6)
    }
  }

  render () {
    const {
      browser,
      data,
      issuesMap,
      version
    } = this.props

    const issues = data.sort((a, b) => {
      const diff = issuesMap[b].occurrences.length - issuesMap[a].occurrences.length

      return Math.max(-1, Math.min(1, diff))
    })

    return (
      <div class='issues-table'>
        <table class='issues-table__table'>
          <tbody>
            {issues.map(issue => (
              <tr>
                <td class='issues-table__key'>
                  <button
                    onClick={this._openLink.bind(this, issue)}
                  >{this._renderIssue(issue)}</button>
                </td>
                <td class='issues-table__value'>×{issuesMap[issue].occurrences.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    )
  }
}

export default IssuesTable
