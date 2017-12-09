const mockData = require('./utils/mockData')
const postcss = require('postcss')

let Declaration

describe('Declaration', () => {
  beforeEach(() => {
    jest.resetModules()

    Declaration = require('./../src/lib/Declaration')
  })

  test('adds a property issue to non-supported versions', () => {
    const mockCss = `
      .foo {
        transform: translateY(-100%);
      }
    `

    return postcss().process(mockCss).then(result => {
      const ruleNode = result.root.nodes[0]
      const declarationNode = ruleNode.nodes[0]
      const source = {
        id: 'https://my-site.com/test.css'
      }
      const declaration = new Declaration(declarationNode, source, ruleNode, {})

      let issues = mockData.buildScaffold({})

      declaration.process(issues)

      expect(issues.firefox['15'][0].type).toBe('CSS')
      expect(issues.firefox['15'][0].subType).toBe('property')
      expect(issues.firefox['16']).toEqual([])
    })
  })

  test('adds a missing prefix suggestion if the prefix would extend the version range', () => {
    const mockCss = `
      .foo {
        transform: translateY(-100%);
      }
    `

    return postcss().process(mockCss).then(result => {
      const ruleNode = result.root.nodes[0]
      const declarationNode = ruleNode.nodes[0]
      const source = {
        id: 'https://my-site.com/test.css'
      }
      const declaration = new Declaration(declarationNode, source, ruleNode, {})

      let issues = mockData.buildScaffold({})

      declaration.process(issues)

      expect(issues.opera['10.1'][0].missingPrefixes).not.toBeDefined()
      expect(issues.opera['10.5'][0].missingPrefixes).toEqual(['-o-'])
      expect(issues.firefox['15'][0].missingPrefixes).not.toBeDefined()
    })
  })

  test('adjusts the support range if a browser prefix is found', () => {
    const mockCss = `
      .foo {
        -o-transform: translateY(-100%);
        transform: translateY(-100%);
      }
    `

    return postcss().process(mockCss).then(result => {
      const ruleNode = result.root.nodes[0]
      const declarationNode = ruleNode.nodes[0]
      const source = {
        id: 'https://my-site.com/test.css'
      }
      const declaration = new Declaration(declarationNode, source, ruleNode, {})

      let issues = mockData.buildScaffold({})

      declaration.process(issues)

      expect(issues.opera['10.5']).toEqual([])
    })
  })

  test('saves the position of the unprefixed property, if present, even if a prefixed one comes first', () => {
    const mockCss = `
      .foo {
        -o-transform: translateY(-100%);
        transform: translateY(-100%);
      }
    `

    return postcss().process(mockCss).then(result => {
      const ruleNode = result.root.nodes[0]
      const declarationNode = ruleNode.nodes[0]
      const source = {
        id: 'https://my-site.com/test.css'
      }
      const declaration = new Declaration(declarationNode, source, ruleNode, {})

      let issues = mockData.buildScaffold({})

      declaration.process(issues)

      expect(issues.opera['10.1'][0].instance.start.line).toBe(3)
      expect(issues.opera['10.1'][0].instance.end.line).toBe(3)
    })
  })

  test('adds issues as a result of running the transforms', () => {
    const mockCss = `
      .foo {
        transform: perspective(500px) translate3d(10px, 0, 0px);
      }
    `

    return postcss().process(mockCss).then(result => {
      const ruleNode = result.root.nodes[0]
      const declarationNode = ruleNode.nodes[0]
      const source = {
        id: 'https://my-site.com/test.css'
      }
      const declaration = new Declaration(declarationNode, source, ruleNode, {})

      let issues = mockData.buildScaffold({})

      declaration.process(issues)

      expect(issues.opera['12.1'][0].title).toBe('transform (3D)')
      expect(issues.opera['12.1'][0].type).toBe('CSS')
      expect(issues.opera['12.1'][0].subType).toBe('property')
      expect(issues.opera['15']).toEqual([])
    })
  })
})
