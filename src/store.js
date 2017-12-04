import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import browsers from './lib/Browsers'

const initialState = {
  activeBrowser: null,
  activeVersion: null,
  data: null,
  sources: null,
  status: 'STATUS_IDLE',
  stylesheets: {},
  tabActive: null,
  tabs: []
}

const actions = {
  OPEN_BROWSER_VERSION: (state, { browser, version }) => {
    const tabs = Array.from(state.tabs)
    const existingTab = tabs.findIndex(tab => {
      return tab.data
        && tab.data.browser === browser
        && tab.data.version === version
    })
    const firstIssueKey = Object.keys(state.data[browser][version])[0]
    const defaultStylesheet = state.data[browser][version][firstIssueKey][0].source

    let newActiveTab

    if (existingTab === -1) {
      newActiveTab = tabs.length

      tabs.push({
        data: {
          browser,
          issue: null,
          issueInstance: 0,
          issueCount: 0,
          stylesheet: null,
          version
        },
        title: `${browsers.getName(browser)} ${version}`,
        type: 'BROWSER_VERSION'
      })
    } else {
      newActiveTab = existingTab
    }

    return Object.assign({}, state, {
      tabActive: newActiveTab,
      tabs
    })
  },

  SET_DATA: (state, { data, sources, status, stylesheets }) => {
    let newState = {
      status
    }

    if (status === 'STATUS_SUCCESS') {
      newState.data = data
      newState.sources = sources
      newState.stylesheets = stylesheets
    } else if (status === 'STATUS_ERROR') {
      newState.data = initialState.data,
      newState.sources = initialState.sources
      newState.stylesheets = initialState.stylesheets
    }

    return Object.assign({}, state, newState)
  },

  SET_INSPECTED_ISSUE: (state, { issue, stylesheet, tab: tabIndex = state.tabActive }) => {
    const tabs = Array.from(state.tabs)
    const tab = tabs[tabIndex]
    const issues = state.data[tab.data.browser][tab.data.version][issue]
      .filter(item => {
        return item.source === tab.data.stylesheet
      })
    const issueInstance = tabs[tabIndex].data.issue === issue
      ? (tabs[tabIndex].data.issueInstance + 1) % issues.length
      : 0

    tabs[tabIndex] = Object.assign({}, tab, {
      data: Object.assign({}, tab.data, {
        issue: issue !== undefined
          ? issue
          : tabs[tabIndex].data.issue,
        issueInstance,
        issueCount: issues.length
      })
    })

    return Object.assign({}, state, {
      tabs
    })
  },

  SET_INSPECTED_STYLESHEET: (state, { issue, stylesheet, tab }) => {
    const tabs = Array.from(state.tabs)
    const tabIndex = tab !== undefined
      ? tab
      : state.tabActive

    tabs[tabIndex] = Object.assign({}, tabs[tab], {
      data: Object.assign({}, tabs[tab].data, {
        stylesheet: stylesheet !== undefined
          ? stylesheet
          : tabs[tab].data.stylesheet
      })
    })

    return Object.assign({}, state, {
      tabs
    })
  },

  TAB_CLOSE: (state, { index = null }) => {
    const tabs = Array.from(state.tabs)

    if (index !== null) {
      tabs.splice(index, 1)
    }

    return Object.assign({}, state, {
      tabActive: (state.tabActive !== index) ? state.tabActive : null,
      tabs
    })
  },

  TAB_SELECT: (state, { index = null }) => {
    const tabs = Array.from(state.tabs)

    return Object.assign({}, state, {
      tabActive: index
    })
  }
}

export default createStore((state, action) => (
  action && actions[action.type]
    ? actions[action.type](state, action)
    : state
), initialState, applyMiddleware(thunk))
