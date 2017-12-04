import { h, Component } from 'preact'
import css from './Link.css'

class Link extends Component {
  _openUrl (url) {
    browser.runtime.sendMessage({
      type: 'OPEN_LINK',
      url
    })
  }

  render () {
    const {
      children,
      href
    } = this.props

    return (
      <button
        class={css.link}
        onClick={this._openUrl.bind(this, href)}
      >{children}</button>
    )
  }
}

export default Link