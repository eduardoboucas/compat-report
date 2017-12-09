const valueParser = require('postcss-value-parser')

const FUNCTIONS_3D = [
  'matrix3d',
  'rotate3d',
  'scale3d',
  'translate3d'
]

module.exports = (paths, {compatPathData, declaration, rule}) => {
  const value = valueParser(declaration.value)
  const has3dFunction = value.nodes.some(node => {
    return node.type === 'function' && FUNCTIONS_3D.includes(node.value)
  })

  if (has3dFunction) {
    paths['transform.3d'] = {
      subType: 'property',
      title: 'transform (3D)',
      type: 'CSS'
    }
  }

  return paths
}
