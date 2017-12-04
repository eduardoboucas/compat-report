import { h, Component } from 'preact'
import { connect } from 'preact-redux'
import { bindActionCreators } from 'redux'
import reducer from './../reducers'
import * as actions from './../actions'
import css from './Tabs.css'
import Inspector from './Inspector.jsx'
import TabButton from './TabButton.jsx'
import Overview from './Overview.jsx'

class Tabs extends Component {
  _handleTabClose (index) {
    this.props.closeTab(index)
  }

  _handleTabSelect (index) {
    this.props.selectTab(index)
  }

  render () {
    const {
      children,
      status,
      tabActive,
      tabs
    } = this.props

    return (
      <div class={css.container}>
        <nav class={css.nav}>
          <TabButton
            active={tabActive === null}
            fixed={true}
            onClick={this._handleTabSelect.bind(this, null)}
          >
            <strong>Overview</strong>
          </TabButton>

          {tabs.map((tab, index) => (
            <TabButton
              active={index === tabActive}
              onClick={this._handleTabSelect.bind(this, index)}
              onClose={this._handleTabClose.bind(this, index)}
            >{tab.title}</TabButton>
          ))}
        </nav>

        <div class={css.content}>
          {(tabActive === null) && (
            <Overview />
          )}

          {(tabActive !== null) && (
            <Inspector />
          )}
        </div>
      </div>
    )
  }
}

export default connect(
  state => state,
  dispatch => bindActionCreators(actions, dispatch)
)(Tabs)