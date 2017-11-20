import { h, render, Component } from 'preact'
import BrowserVersion from './BrowserVersion.jsx'

class Browser extends Component {
  render() {
    const {
      browsers,
      handle,
      name,
      onExpand,
      stylesheets
    } = this.props

    return (
      <div class="browser">
        <div class="browser__header">
          <p class="browser__name">{name}</p>
        </div>
        <ol class="browser__versions">
          {browsers[handle].map(version => (
            <BrowserVersion
              issues={stylesheets.issues[handle] && stylesheets.issues[handle][version]}
              name={name}
              onExpand={onExpand}
              version={version}
            />
          ))}
        </ol>
      </div>
    )
  }
}

export default Browser
