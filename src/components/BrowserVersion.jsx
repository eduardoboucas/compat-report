import { h, render, Component } from 'preact'

class BrowserVersion extends Component {
  render() {
    const {
      issues,
      name,
      onExpand,
      version
    } = this.props

    let severity = 1

    if (issues && issues.length > 0) {
      severity = 2

      if (issues.length > 5) {
        severity = 3
      }
    }

    return (
      <li class={`browser-version severity--${severity}`}>
        <button
          class="browser-version__button"
          onClick={event => onExpand(issues, name, version)}
        >{version}</button>
      </li>
    )    
  }
}

export default BrowserVersion
