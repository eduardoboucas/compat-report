function handleMessage(request, sender, sendResponse) {
  switch (request.type) {
    case 'OPEN_LINK':
      browser.tabs.create({
        url: request.url
      })

      break
  }
}

browser.runtime.onMessage.addListener(handleMessage)
