const TransformProcessor = function () {
  this.transforms = [
    require('./transforms/transform-3d')
  ]
}

TransformProcessor.prototype.run = function (paths, data) {
  return this.transforms.reduce((result, transform) => {
    return transform(result, data)
  }, paths)
}

module.exports = new TransformProcessor()
