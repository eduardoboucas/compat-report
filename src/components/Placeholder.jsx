import { h, Component } from 'preact'
import css from './Placeholder.css'

class Placeholder extends Component {
  render () {
    const {
      children
    } = this.props

    return (
      <div class={css.container}>
        <p class={css.placeholder}>
          {children}
        </p>
      </div>
    )
  }
}

export default Placeholder