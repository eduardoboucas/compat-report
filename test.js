const mdn = require('mdn-browser-compat-data')

Object.keys(mdn.css['at-rules']).forEach(property => {
  const compatData = mdn.css['at-rules'][property]

  if (Object.keys(compatData).length > 1) {
    console.log(`-  ${property}`)

    Object.keys(compatData).forEach(subProperty => {
      if (subProperty === '__compat') return

      console.log(`   - [ ] ${subProperty}`)
    })
  }
})