import { h, Component } from 'preact'
import { connect } from 'preact-redux'
import { bindActionCreators } from 'redux'
import reducer from './../reducers'
import * as actions from './../actions'
import Browser from './../components/Browser.jsx'
import Sidebar from './../components/Sidebar.jsx'
import Placeholder from './../components/Placeholder.jsx'
import Tabs from './../components/Tabs.jsx'
import compatData from './../lib/data.json'
import semverCompare from 'semver-compare'
import css from './Panel.css'

class Panel extends Component {
  componentDidMount () {
    const {
      fetchStylesheets
    } = this.props

    fetchStylesheets()

    this.onNavigatedHandler = (url => {
      fetchStylesheets()
    }).bind(this)

    browser.devtools.network.onNavigated.addListener(this.onNavigatedHandler)
  }

  componentWillUnmount () {
    browser.devtools.network.onNavigated.removeListener(this.onNavigatedHandler) 
  }

  render () {
    const {
      data,
      status,
      tabs
    } = this.props

    if (status === 'STATUS_LOADING') {
      return (
        <div class={css.panel}>
          <Placeholder>Loading...</Placeholder>
        </div>
      )
    }

    if (!data) return null

    return (
      <div class={css.panel}>
        <Tabs />
        <Sidebar />
      </div>
    )
  }
}

export default connect(
  state => state,
  dispatch => bindActionCreators(actions, dispatch)
)(Panel)
