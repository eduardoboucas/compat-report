import { h, render, Component } from 'preact'

class BrowserVersionsPicker extends Component {
  _handleChange(event) {
    const {
      onSetBrowserVersions
    } = this.props

    if (event.target.value === 'All') {
      onSetBrowserVersions(Infinity)
    } else {
      onSetBrowserVersions(parseInt(event.target.value))
    }
  }

  render () {
    const {
      browserVersions,
      onSetBrowserVersions
    } = this.props

    return (
      <div>
        <p style="margin-top: 0;">
          <strong>Browser versions</strong>
        </p>
        <div class="browser-versions">
          <label>
            <input
              type="radio"
              name="browser-versions"
              checked={browserVersions === 10}
              onChange={this._handleChange.bind(this)}
              value="10"
            />
            Newest 10
          </label>
          <label>
            <input
              type="radio"
              name="browser-versions"
              checked={browserVersions === Infinity}
              onChange={this._handleChange.bind(this)}
              value="All"
            />
            All
          </label>
        </div>
      </div>
    )
  }
}

export default BrowserVersionsPicker
