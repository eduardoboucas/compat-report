import { h, Component } from 'preact'
import css from './Overview.css'
import Browser from './Browser.jsx'

class Overview extends Component {
  render () {
    const {
      active,
      children,
      fixed
    } = this.props

    return (
      <div class={css.container}>
        <Browser
          browser='chrome'
        />

        <Browser
          browser='opera'
        />

        <Browser
          browser='firefox'
        />

        <Browser
          browser='ie'
        />

        <Browser
          browser='edge'
        />
      </div>      
    )
  }
}

export default Overview