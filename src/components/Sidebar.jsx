import { h, render, Component } from 'preact'
import { connect } from 'preact-redux'
import { bindActionCreators } from 'redux'
import reducer from './../reducers'
import * as actions from './../actions'
import browsers from './../lib/Browsers'
import css from './Sidebar.css'
import Accordion from './Accordion.jsx'
import AccordionItem from './AccordionItem.jsx'
import Link from './Link.jsx'

class DetailsPanel extends Component {
  _handleSourceToggle (source, event) {
    const {
      toggleSource
    } = this.props

    toggleSource(source, event.target.checked)
  }

  _handleIssueSelect (issue) {
    const {
      setInspectedIssue,
      tabActive
    } = this.props

    setInspectedIssue(issue, tabActive)
  }

  _handleStylesheetSelect (stylesheetId) {
    const {
      setInspectedStylesheet,
      tabActive
    } = this.props

    setInspectedStylesheet(stylesheetId, tabActive)
  }

  _renderCssIssues () {
    const {
      data,
      tabActive,
      tabs
    } = this.props

    if (tabActive === null) return null

    const {
      browser,
      issue,
      issueInstance,
      issueCount,
      stylesheet,
      version
    } = tabs[tabActive].data
    const issues = data[browser][version]
    const issuesByStylesheet = Object.keys(issues).reduce((result, issueKey) => {
      issues[issueKey].forEach(occurrence => {
        const id = occurrence.source

        result[id] = result[id] || {}
        result[id][issueKey] = result[id][issueKey] || []
        result[id][issueKey].push(occurrence)
      })

      return result
    }, {})

    clearTimeout(this.timeout)

    return Object.keys(issuesByStylesheet).map(stylesheetId => (
      <Accordion
        onClose={this._handleStylesheetSelect.bind(this, null)}
        onOpen={this._handleStylesheetSelect.bind(this, stylesheetId)}
        open={stylesheetId === stylesheet}
        style='strong'
        text={stylesheetId}
      >
        {Object.keys(issuesByStylesheet[stylesheetId]).map(name => (
          <AccordionItem
            onClick={this._handleIssueSelect.bind(this, name)}
          >
            <code>{name}</code>

            {(name === issue) && (
              <span
                class={css.issueInstance}
                ref={el => {
                  if (!el) return

                  el.classList.remove(css.issueInstanceHidden)

                  this.timeout = setTimeout(() => {
                    if (!el) return

                    el.classList.add(css.issueInstanceHidden)
                  }, 2000)
                }}
              > {issueInstance + 1} / {issueCount}</span>
            )}
          </AccordionItem>
        ))}
      </Accordion>
    ))
  }

  render () {
    const {
      sources,
      tabActive,
      tabs
    } = this.props

    const inInspector = tabActive !== null
    const hasSources = sources && (sources.length > 0)

    return (
      <div class={css.sidebar}>
        {this._renderCssIssues()}

        {(tabActive === null) && (
          <Accordion
            initialState={true}
            text='Stylesheets'
          >
            {hasSources && sources.map(source => (
              <AccordionItem
                toggleChecked={source.enabled}
                toggleDisabled={status === 'STATUS_LOADING'}
                toggleOnChange={this._handleSourceToggle.bind(this, source.id)}
                type='toggable'
              >
                <span>
                  {!source.external && 'Inline stylesheet #'}
                  {source.id}
                </span>
              </AccordionItem>
            ))}

            {!hasSources && (
              <p class={css.sectionPlaceholder}>No stylesheets found</p>
            )}          
          </Accordion>
        )}
      </div>
    )
  }
}

export default connect(
  state => state,
  dispatch => bindActionCreators(actions, dispatch)
)(DetailsPanel)
