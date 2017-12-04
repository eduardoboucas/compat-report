import StyleSheet from './lib/StyleSheet'

export function closeTab(index) {
  return {
    type: 'TAB_CLOSE',
    index
  }
}

export function fetchStylesheets(activeSources) {
  const getExternalStyles = () => {
    return Array.from(
      document.getElementsByTagName('link')
    ).filter(node => {
      return node.getAttribute('rel') === 'stylesheet'
    }).map(node => {
      let href = node.getAttribute('href')

      if (href.indexOf('//') === 0) {
        return window.location.protocol + href
      }

      if (href.indexOf('/') === 0) {
        return window.location.origin + href
      }

      return href
    })
  }

  const getInlineStyles = () => {
    return Array.from(
      document.getElementsByTagName('style')
    ).map(node => {
      return node.innerText
    }).filter(content => {
      return content.length > 0
    })
  }

  return (dispatch, getState) => {
    dispatch({
      type: 'SET_DATA',
      status: 'STATUS_LOADING'
    })

    const getExternalStylesFn = '(' + getExternalStyles.toString() + ')()'
    const getInlineStylesFn = '(' + getInlineStyles.toString() + ')()'
    const stylesheets = new StyleSheet()

    let failedSources = []
    let sourcesArray = []

    return browser.devtools.inspectedWindow
      .eval(getExternalStylesFn)
      .then(response => {
        // Check is for compatibility with Chrome and Firefox.
        const stylesheetUrls = Array.isArray(response[0])
          ? response[0]
          : response
        const queue = stylesheetUrls.map(url => {
          return fetch(url)
            .then(response => response.text())
            .then(response => ({
              url,
              content: response
            }))
            .catch(err => {
              console.log('Could not fetch source:', url)

              failedSources.push(url)
            })
        })

        return Promise.all(queue).then(results => {
          return results.filter(Boolean)
        })
      }).then(sources => {
        const stylesheets = new StyleSheet()

        sources.forEach(source => {
          if (activeSources && !activeSources.includes(source.url)) {
            return
          }

          stylesheets.add({
            id: source.url,
            content: source.content,
            external: true
          })
        })

        return browser.devtools.inspectedWindow
          .eval(getInlineStylesFn)
          .then(inlineStylesheets => {
            inlineStylesheets.forEach((content, index) => {
              if (typeof content !== 'string' || content.length === 0) {
                return
              }

              const index1 = index + 1
              const isEnabled = !activeSources || activeSources.includes(index1)

              sourcesArray.push({
                enabled: isEnabled,
                external: false,
                id: index1
              })

              if (!isEnabled) {
                return
              }

              stylesheets.add({
                id: index1,
                content,
                external: false
              })
            })
          }).then(() => {
            return stylesheets.parse()
          }).then(({data, failedSources, stylesheets}) => {
            sourcesArray = sourcesArray.concat(sources.filter(source => {
              return !failedSources.includes(source.url)
            }).map(source => ({
              enabled: !activeSources || activeSources.includes(source.url),
              external: true,
              id: source.url
            })))

            dispatch({
              data,
              sources: sourcesArray,
              status: 'STATUS_SUCCESS',
              stylesheets,
              type: 'SET_DATA'
            })
          })
      }).catch(err => {
        console.log(err)

        dispatch({
          type: 'SET_DATA',
          status: 'STATUS_ERROR'
        })
      })
  }
}

export function openBrowserVersion(browser, version) {
  return {
    type: 'OPEN_BROWSER_VERSION',
    browser,
    version
  }
}

export function selectTab(index) {
  return {
    type: 'TAB_SELECT',
    index
  }
}

export function setInspectedIssue(issue, tab) {
  return {
    type: 'SET_INSPECTED_ISSUE',
    issue,
    tab
  }
}

export function setInspectedStylesheet(stylesheet, tab) {
  return {
    type: 'SET_INSPECTED_STYLESHEET',
    stylesheet,
    tab
  }
}

export function toggleSource(source, activate) {
  return (dispatch, getState) => {
    let enabledSources = getState().sources
      .filter(source => source.enabled)
      .map(source => source.id)
      .filter(sourceId => {
        return activate || source !== sourceId
      })

    if (activate) {
      enabledSources.push(source)
    }

    dispatch(fetchStylesheets(enabledSources))
  }
}
