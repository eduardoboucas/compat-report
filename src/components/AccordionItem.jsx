import { h, Component } from 'preact'
import css from './AccordionItem.css'

class AccordionItem extends Component {
  render () {
    const {
      checked,
      children,
      onClick,
      toggleChecked,
      toggleDisabled,
      toggleOnChange,
      type
    } = this.props

    const containerClasses = [
      css.container,
      css[`container-${type}`]
    ]

    if (type === 'toggable') {
      return (
        <label class={containerClasses.join(' ')}>
          <input
            checked={toggleChecked}
            class={css.toggle}
            disabled={toggleDisabled}
            onChange={toggleOnChange}
            type='checkbox'
          />

          {children}
        </label>
      )
    }

    return (
      <div
        class={css.container}
        onClick={onClick}
      >
        {children}
      </div>
    )
  }
}

export default AccordionItem