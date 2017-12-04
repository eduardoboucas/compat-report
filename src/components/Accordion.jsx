import { h, Component } from 'preact'
import css from './Accordion.css'

class Accordion extends Component {
  _handleToggle () {
    const {
      initialState,
      onClose,
      onOpen,
      open
    } = this.props

    if (initialState === undefined) {
      if (open && (typeof onClose === 'function')) {
        onClose()
      } else if (!open && (typeof onOpen === 'function')) {
        onOpen()
      }
    } else {
      this.setState({
        open: !this.state.open
      })
    }
  }

  constructor (props) {
    super(props)

    this.state.open = Boolean(props.initialState)
  }

  render () {
    const {
      children,
      initialState,
      open,
      style,
      text
    } = this.props
    const isOpen = open || ((initialState !== undefined) && this.state.open)

    let classes = [css.container]

    if (style === 'strong') {
      classes.push(css.containerStrong)
    }

    if (isOpen) {
      classes.push(css.containerOpen)
    }

    return (
      <div class={classes.join(' ')}>
        <div
          class={css.head}
          onClick={this._handleToggle.bind(this)}
        >
          <span>{text}</span>
        </div>

        {isOpen && (
          <div class={css.sectionBody}>
            {children}
          </div>
        )}
      </div>
    )
  }
}

export default Accordion