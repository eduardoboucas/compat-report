/**
This script is run whenever the devtools are open.
In here, we can create our panel.
*/

function handleShown () {
  console.log('panel is being shown', browser.tabs)
}

function handleHidden () {
  console.log('panel is being hidden')
}

/**
Create a panel, and add listeners for panel show/hide events.
*/
browser.devtools.panels.create(
  'Compatibility',
  'logo_48.png',
  'panel.html'
).then((newPanel) => {
  newPanel.onShown.addListener(handleShown)
  newPanel.onHidden.addListener(handleHidden)
})
