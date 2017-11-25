/******/ (function (modules) { // webpackBootstrap
/******/ 	// The module cache
  /******/ 	var installedModules = {}
/******/
/******/ 	// The require function
  /******/ 	function __webpack_require__ (moduleId) {
/******/
/******/ 		// Check if module is in cache
    /******/ 		if (installedModules[moduleId]) {
      /******/ 			return installedModules[moduleId].exports
    /******/ 		}
/******/ 		// Create a new module (and put it into the cache)
    /******/ 		var module = installedModules[moduleId] = {
      /******/ 			i: moduleId,
      /******/ 			l: false,
      /******/ 			exports: {}
    /******/ 		}
/******/
/******/ 		// Execute the module function
    /******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__)
/******/
/******/ 		// Flag the module as loaded
    /******/ 		module.l = true
/******/
/******/ 		// Return the exports of the module
    /******/ 		return module.exports
  /******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
  /******/ 	__webpack_require__.m = modules
/******/
/******/ 	// expose the module cache
  /******/ 	__webpack_require__.c = installedModules
/******/
/******/ 	// define getter function for harmony exports
  /******/ 	__webpack_require__.d = function (exports, name, getter) {
    /******/ 		if (!__webpack_require__.o(exports, name)) {
      /******/ 			Object.defineProperty(exports, name, {
        /******/ 				configurable: false,
        /******/ 				enumerable: true,
        /******/ 				get: getter
      /******/ 			})
    /******/ 		}
  /******/ 	}
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
  /******/ 	__webpack_require__.n = function (module) {
    /******/ 		var getter = module && module.__esModule
/******/ 			? function getDefault () { return module['default'] }
/******/ 			: function getModuleExports () { return module }
    /******/ 		__webpack_require__.d(getter, 'a', getter)
    /******/ 		return getter
  /******/ 	}
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
  /******/ 	__webpack_require__.o = function (object, property) { return Object.prototype.hasOwnProperty.call(object, property) }
/******/
/******/ 	// __webpack_public_path__
  /******/ 	__webpack_require__.p = ''
/******/
/******/ 	// Load entry module and return exports
  /******/ 	return __webpack_require__(__webpack_require__.s = 11)
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
  /***/ function (module, __webpack_exports__, __webpack_require__) {
    'use strict'
    Object.defineProperty(__webpack_exports__, '__esModule', { value: true })
    /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, 'h', function () { return h })
    /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, 'createElement', function () { return h })
    /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, 'cloneElement', function () { return cloneElement })
    /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, 'Component', function () { return Component })
    /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, 'render', function () { return render })
    /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, 'rerender', function () { return rerender })
    /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, 'options', function () { return options })
/** Virtual DOM Node */
    function VNode () {}

/** Global options
 *	@public
 *	@namespace options {Object}
 */
    var options = {

	/** If `true`, `prop` changes trigger synchronous component updates.
  *	@name syncComponentUpdates
  *	@type Boolean
  *	@default true
  */
	// syncComponentUpdates: true,

	/** Processes all created VNodes.
  *	@param {VNode} vnode	A newly-created VNode to normalize/process
  */
	// vnode(vnode) { }

	/** Hook invoked after a component is mounted. */
	// afterMount(component) { }

	/** Hook invoked after the DOM is updated with a component's latest render. */
	// afterUpdate(component) { }

	/** Hook invoked immediately before a component is unmounted. */
	// beforeUnmount(component) { }
    }

    var stack = []

    var EMPTY_CHILDREN = []

/** JSX/hyperscript reviver
*	Benchmarks: https://esbench.com/bench/57ee8f8e330ab09900a1a1a0
 *	@see http://jasonformat.com/wtf-is-jsx
 *	@public
 */
    function h (nodeName, attributes) {
      var children = EMPTY_CHILDREN,
	    lastSimple,
	    child,
	    simple,
	    i
      for (i = arguments.length; i-- > 2;) {
        stack.push(arguments[i])
      }
      if (attributes && attributes.children != null) {
        if (!stack.length) stack.push(attributes.children)
        delete attributes.children
      }
      while (stack.length) {
        if ((child = stack.pop()) && child.pop !== undefined) {
          for (i = child.length; i--;) {
            stack.push(child[i])
          }
        } else {
          if (typeof child === 'boolean') child = null

          if (simple = typeof nodeName !== 'function') {
            if (child == null) child = ''; else if (typeof child === 'number') child = String(child); else if (typeof child !== 'string') simple = false
          }

          if (simple && lastSimple) {
            children[children.length - 1] += child
          } else if (children === EMPTY_CHILDREN) {
            children = [child]
          } else {
            children.push(child)
          }

          lastSimple = simple
        }
      }

      var p = new VNode()
      p.nodeName = nodeName
      p.children = children
      p.attributes = attributes == null ? undefined : attributes
      p.key = attributes == null ? undefined : attributes.key

	// if a "vnode hook" is defined, pass every created VNode to it
      if (options.vnode !== undefined) options.vnode(p)

      return p
    }

/** Copy own-properties from `props` onto `obj`.
 *	@returns obj
 *	@private
 */
    function extend (obj, props) {
      for (var i in props) {
        obj[i] = props[i]
      } return obj
    }

/** Call a function asynchronously, as soon as possible.
 *	@param {Function} callback
 */
    var defer = typeof Promise === 'function' ? Promise.resolve().then.bind(Promise.resolve()) : setTimeout

    function cloneElement (vnode, props) {
      return h(vnode.nodeName, extend(extend({}, vnode.attributes), props), arguments.length > 2 ? [].slice.call(arguments, 2) : vnode.children)
    }

// DOM properties that should NOT have "px" added when numeric
    var IS_NON_DIMENSIONAL = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i

/** Managed queue of dirty components to be re-rendered */

    var items = []

    function enqueueRender (component) {
      if (!component._dirty && (component._dirty = true) && items.push(component) == 1) {
        (options.debounceRendering || defer)(rerender)
      }
    }

    function rerender () {
      var p,
	    list = items
      items = []
      while (p = list.pop()) {
        if (p._dirty) renderComponent(p)
      }
    }

/** Check if two nodes are equivalent.
 *	@param {Element} node
 *	@param {VNode} vnode
 *	@private
 */
    function isSameNodeType (node, vnode, hydrating) {
      if (typeof vnode === 'string' || typeof vnode === 'number') {
        return node.splitText !== undefined
      }
      if (typeof vnode.nodeName === 'string') {
        return !node._componentConstructor && isNamedNode(node, vnode.nodeName)
      }
      return hydrating || node._componentConstructor === vnode.nodeName
    }

/** Check if an Element has a given normalized name.
*	@param {Element} node
*	@param {String} nodeName
 */
    function isNamedNode (node, nodeName) {
      return node.normalizedNodeName === nodeName || node.nodeName.toLowerCase() === nodeName.toLowerCase()
    }

/**
 * Reconstruct Component-style `props` from a VNode.
 * Ensures default/fallback values from `defaultProps`:
 * Own-properties of `defaultProps` not present in `vnode.attributes` are added.
 * @param {VNode} vnode
 * @returns {Object} props
 */
    function getNodeProps (vnode) {
      var props = extend({}, vnode.attributes)
      props.children = vnode.children

      var defaultProps = vnode.nodeName.defaultProps
      if (defaultProps !== undefined) {
        for (var i in defaultProps) {
          if (props[i] === undefined) {
            props[i] = defaultProps[i]
          }
        }
      }

      return props
    }

/** Create an element with the given nodeName.
 *	@param {String} nodeName
 *	@param {Boolean} [isSvg=false]	If `true`, creates an element within the SVG namespace.
 *	@returns {Element} node
 */
    function createNode (nodeName, isSvg) {
      var node = isSvg ? document.createElementNS('http://www.w3.org/2000/svg', nodeName) : document.createElement(nodeName)
      node.normalizedNodeName = nodeName
      return node
    }

/** Remove a child node from its parent if attached.
 *	@param {Element} node		The node to remove
 */
    function removeNode (node) {
      var parentNode = node.parentNode
      if (parentNode) parentNode.removeChild(node)
    }

/** Set a named attribute on the given Node, with special behavior for some names and event handlers.
 *	If `value` is `null`, the attribute/handler will be removed.
 *	@param {Element} node	An element to mutate
 *	@param {string} name	The name/key to set, such as an event or attribute name
 *	@param {any} old	The last value that was set for this name/node pair
 *	@param {any} value	An attribute value, such as a function to be used as an event handler
 *	@param {Boolean} isSvg	Are we currently diffing inside an svg?
 *	@private
 */
    function setAccessor (node, name, old, value, isSvg) {
      if (name === 'className') name = 'class'

      if (name === 'key') {
		// ignore
      } else if (name === 'ref') {
        if (old) old(null)
        if (value) value(node)
      } else if (name === 'class' && !isSvg) {
        node.className = value || ''
      } else if (name === 'style') {
        if (!value || typeof value === 'string' || typeof old === 'string') {
          node.style.cssText = value || ''
        }
        if (value && typeof value === 'object') {
          if (typeof old !== 'string') {
            for (var i in old) {
            if (!(i in value)) node.style[i] = ''
          }
          }
          for (var i in value) {
            node.style[i] = typeof value[i] === 'number' && IS_NON_DIMENSIONAL.test(i) === false ? value[i] + 'px' : value[i]
          }
        }
      } else if (name === 'dangerouslySetInnerHTML') {
        if (value) node.innerHTML = value.__html || ''
      } else if (name[0] == 'o' && name[1] == 'n') {
        var useCapture = name !== (name = name.replace(/Capture$/, ''))
        name = name.toLowerCase().substring(2)
        if (value) {
        if (!old) node.addEventListener(name, eventProxy, useCapture)
      } else {
        node.removeEventListener(name, eventProxy, useCapture)
      }
        (node._listeners || (node._listeners = {}))[name] = value
      } else if (name !== 'list' && name !== 'type' && !isSvg && name in node) {
      setProperty(node, name, value == null ? '' : value)
      if (value == null || value === false) node.removeAttribute(name)
    } else {
      var ns = isSvg && name !== (name = name.replace(/^xlink\:?/, ''))
      if (value == null || value === false) {
    if (ns) node.removeAttributeNS('http://www.w3.org/1999/xlink', name.toLowerCase()); else node.removeAttribute(name)
  } else if (typeof value !== 'function') {
    if (ns) node.setAttributeNS('http://www.w3.org/1999/xlink', name.toLowerCase(), value); else node.setAttribute(name, value)
  }
    }
    }

/** Attempt to set a DOM property to the given value.
 *	IE & FF throw for certain property-value combinations.
 */
    function setProperty (node, name, value) {
      try {
        node[name] = value
      } catch (e) {}
    }

/** Proxy an event to hooked event handlers
 *	@private
 */
    function eventProxy (e) {
      return this._listeners[e.type](options.event && options.event(e) || e)
    }

/** Queue of components that have been mounted and are awaiting componentDidMount */
    var mounts = []

/** Diff recursion count, used to track the end of the diff cycle. */
    var diffLevel = 0

/** Global flag indicating if the diff is currently within an SVG */
    var isSvgMode = false

/** Global flag indicating if the diff is performing hydration */
    var hydrating = false

/** Invoke queued componentDidMount lifecycle methods */
    function flushMounts () {
      var c
      while (c = mounts.pop()) {
        if (options.afterMount) options.afterMount(c)
        if (c.componentDidMount) c.componentDidMount()
      }
    }

/** Apply differences in a given vnode (and it's deep children) to a real DOM Node.
 *	@param {Element} [dom=null]		A DOM node to mutate into the shape of the `vnode`
 *	@param {VNode} vnode			A VNode (with descendants forming a tree) representing the desired DOM structure
 *	@returns {Element} dom			The created/mutated element
 *	@private
 */
    function diff (dom, vnode, context, mountAll, parent, componentRoot) {
	// diffLevel having been 0 here indicates initial entry into the diff (not a subdiff)
      if (!diffLevel++) {
		// when first starting the diff, check if we're diffing an SVG or within an SVG
        isSvgMode = parent != null && parent.ownerSVGElement !== undefined

		// hydration is indicated by the existing element to be diffed not having a prop cache
        hydrating = dom != null && !('__preactattr_' in dom)
      }

      var ret = idiff(dom, vnode, context, mountAll, componentRoot)

	// append the element if its a new parent
      if (parent && ret.parentNode !== parent) parent.appendChild(ret)

	// diffLevel being reduced to 0 means we're exiting the diff
      if (!--diffLevel) {
        hydrating = false
		// invoke queued componentDidMount lifecycle methods
        if (!componentRoot) flushMounts()
      }

      return ret
    }

/** Internals of `diff()`, separated to allow bypassing diffLevel / mount flushing. */
    function idiff (dom, vnode, context, mountAll, componentRoot) {
      var out = dom,
	    prevSvgMode = isSvgMode

	// empty values (null, undefined, booleans) render as empty Text nodes
      if (vnode == null || typeof vnode === 'boolean') vnode = ''

	// Fast case: Strings & Numbers create/update Text nodes.
      if (typeof vnode === 'string' || typeof vnode === 'number') {
		// update if it's already a Text node:
        if (dom && dom.splitText !== undefined && dom.parentNode && (!dom._component || componentRoot)) {
			/* istanbul ignore if */ /* Browser quirk that can't be covered: https://github.com/developit/preact/commit/fd4f21f5c45dfd75151bd27b4c217d8003aa5eb9 */
          if (dom.nodeValue != vnode) {
            dom.nodeValue = vnode
          }
        } else {
			// it wasn't a Text node: replace it with one and recycle the old Element
          out = document.createTextNode(vnode)
          if (dom) {
            if (dom.parentNode) dom.parentNode.replaceChild(out, dom)
            recollectNodeTree(dom, true)
          }
        }

        out['__preactattr_'] = true

        return out
      }

	// If the VNode represents a Component, perform a component diff:
      var vnodeName = vnode.nodeName
      if (typeof vnodeName === 'function') {
        return buildComponentFromVNode(dom, vnode, context, mountAll)
      }

	// Tracks entering and exiting SVG namespace when descending through the tree.
      isSvgMode = vnodeName === 'svg' ? true : vnodeName === 'foreignObject' ? false : isSvgMode

	// If there's no existing element or it's the wrong type, create a new one:
      vnodeName = String(vnodeName)
      if (!dom || !isNamedNode(dom, vnodeName)) {
        out = createNode(vnodeName, isSvgMode)

        if (dom) {
			// move children into the replacement node
          while (dom.firstChild) {
            out.appendChild(dom.firstChild)
          } // if the previous Element was mounted into the DOM, replace it inline
          if (dom.parentNode) dom.parentNode.replaceChild(out, dom)

			// recycle the old element (skips non-Element node types)
          recollectNodeTree(dom, true)
        }
      }

      var fc = out.firstChild,
	    props = out['__preactattr_'],
	    vchildren = vnode.children

      if (props == null) {
        props = out['__preactattr_'] = {}
        for (var a = out.attributes, i = a.length; i--;) {
          props[a[i].name] = a[i].value
        }
      }

	// Optimization: fast-path for elements containing a single TextNode:
      if (!hydrating && vchildren && vchildren.length === 1 && typeof vchildren[0] === 'string' && fc != null && fc.splitText !== undefined && fc.nextSibling == null) {
        if (fc.nodeValue != vchildren[0]) {
          fc.nodeValue = vchildren[0]
        }
      }
	// otherwise, if there are existing or new children, diff them:
      else if (vchildren && vchildren.length || fc != null) {
        innerDiffNode(out, vchildren, context, mountAll, hydrating || props.dangerouslySetInnerHTML != null)
      }

	// Apply attributes/props from VNode to the DOM Element:
      diffAttributes(out, vnode.attributes, props)

	// restore previous SVG mode: (in case we're exiting an SVG namespace)
      isSvgMode = prevSvgMode

      return out
    }

/** Apply child and attribute changes between a VNode and a DOM Node to the DOM.
 *	@param {Element} dom			Element whose children should be compared & mutated
 *	@param {Array} vchildren		Array of VNodes to compare to `dom.childNodes`
 *	@param {Object} context			Implicitly descendant context object (from most recent `getChildContext()`)
 *	@param {Boolean} mountAll
 *	@param {Boolean} isHydrating	If `true`, consumes externally created elements similar to hydration
 */
    function innerDiffNode (dom, vchildren, context, mountAll, isHydrating) {
      var originalChildren = dom.childNodes,
	    children = [],
	    keyed = {},
	    keyedLen = 0,
	    min = 0,
	    len = originalChildren.length,
	    childrenLen = 0,
	    vlen = vchildren ? vchildren.length : 0,
	    j,
	    c,
	    f,
	    vchild,
	    child

	// Build up a map of keyed children and an Array of unkeyed children:
      if (len !== 0) {
        for (var i = 0; i < len; i++) {
          var _child = originalChildren[i],
			    props = _child['__preactattr_'],
			    key = vlen && props ? _child._component ? _child._component.__key : props.key : null
          if (key != null) {
            keyedLen++
            keyed[key] = _child
          } else if (props || (_child.splitText !== undefined ? isHydrating ? _child.nodeValue.trim() : true : isHydrating)) {
            children[childrenLen++] = _child
          }
        }
      }

      if (vlen !== 0) {
        for (var i = 0; i < vlen; i++) {
          vchild = vchildren[i]
          child = null

			// attempt to find a node based on key matching
          var key = vchild.key
          if (key != null) {
            if (keyedLen && keyed[key] !== undefined) {
              child = keyed[key]
              keyed[key] = undefined
              keyedLen--
            }
          }
			// attempt to pluck a node of the same type from the existing children
          else if (!child && min < childrenLen) {
            for (j = min; j < childrenLen; j++) {
              if (children[j] !== undefined && isSameNodeType(c = children[j], vchild, isHydrating)) {
                child = c
                children[j] = undefined
                if (j === childrenLen - 1) childrenLen--
                if (j === min) min++
                break
              }
            }
          }

			// morph the matched/found/created DOM child to match vchild (deep)
          child = idiff(child, vchild, context, mountAll)

          f = originalChildren[i]
          if (child && child !== dom && child !== f) {
            if (f == null) {
              dom.appendChild(child)
            } else if (child === f.nextSibling) {
              removeNode(f)
            } else {
              dom.insertBefore(child, f)
            }
          }
        }
      }

	// remove unused keyed children:
      if (keyedLen) {
        for (var i in keyed) {
          if (keyed[i] !== undefined) recollectNodeTree(keyed[i], false)
        }
      }

	// remove orphaned unkeyed children:
      while (min <= childrenLen) {
        if ((child = children[childrenLen--]) !== undefined) recollectNodeTree(child, false)
      }
    }

/** Recursively recycle (or just unmount) a node and its descendants.
 *	@param {Node} node						DOM node to start unmount/removal from
 *	@param {Boolean} [unmountOnly=false]	If `true`, only triggers unmount lifecycle, skips removal
 */
    function recollectNodeTree (node, unmountOnly) {
      var component = node._component
      if (component) {
		// if node is owned by a Component, unmount that component (ends up recursing back here)
        unmountComponent(component)
      } else {
		// If the node's VNode had a ref function, invoke it with null here.
		// (this is part of the React spec, and smart for unsetting references)
        if (node['__preactattr_'] != null && node['__preactattr_'].ref) node['__preactattr_'].ref(null)

        if (unmountOnly === false || node['__preactattr_'] == null) {
          removeNode(node)
        }

        removeChildren(node)
      }
    }

/** Recollect/unmount all children.
 *	- we use .lastChild here because it causes less reflow than .firstChild
 *	- it's also cheaper than accessing the .childNodes Live NodeList
 */
    function removeChildren (node) {
      node = node.lastChild
      while (node) {
        var next = node.previousSibling
        recollectNodeTree(node, true)
        node = next
      }
    }

/** Apply differences in attributes from a VNode to the given DOM Element.
 *	@param {Element} dom		Element with attributes to diff `attrs` against
 *	@param {Object} attrs		The desired end-state key-value attribute pairs
 *	@param {Object} old			Current/previous attributes (from previous VNode or element's prop cache)
 */
    function diffAttributes (dom, attrs, old) {
      var name

	// remove attributes no longer present on the vnode by setting them to undefined
      for (name in old) {
        if (!(attrs && attrs[name] != null) && old[name] != null) {
          setAccessor(dom, name, old[name], old[name] = undefined, isSvgMode)
        }
      }

	// add new & update changed attributes
      for (name in attrs) {
        if (name !== 'children' && name !== 'innerHTML' && (!(name in old) || attrs[name] !== (name === 'value' || name === 'checked' ? dom[name] : old[name]))) {
          setAccessor(dom, name, old[name], old[name] = attrs[name], isSvgMode)
        }
      }
    }

/** Retains a pool of Components for re-use, keyed on component name.
 *	Note: since component names are not unique or even necessarily available, these are primarily a form of sharding.
 *	@private
 */
    var components = {}

/** Reclaim a component for later re-use by the recycler. */
    function collectComponent (component) {
      var name = component.constructor.name;
      (components[name] || (components[name] = [])).push(component)
    }

/** Create a component. Normalizes differences between PFC's and classful Components. */
    function createComponent (Ctor, props, context) {
      var list = components[Ctor.name],
	    inst

      if (Ctor.prototype && Ctor.prototype.render) {
        inst = new Ctor(props, context)
        Component.call(inst, props, context)
      } else {
        inst = new Component(props, context)
        inst.constructor = Ctor
        inst.render = doRender
      }

      if (list) {
        for (var i = list.length; i--;) {
          if (list[i].constructor === Ctor) {
            inst.nextBase = list[i].nextBase
            list.splice(i, 1)
            break
          }
        }
      }
      return inst
    }

/** The `.render()` method for a PFC backing instance. */
    function doRender (props, state, context) {
      return this.constructor(props, context)
    }

/** Set a component's `props` (generally derived from JSX attributes).
 *	@param {Object} props
 *	@param {Object} [opts]
 *	@param {boolean} [opts.renderSync=false]	If `true` and {@link options.syncComponentUpdates} is `true`, triggers synchronous rendering.
 *	@param {boolean} [opts.render=true]			If `false`, no render will be triggered.
 */
    function setComponentProps (component, props, opts, context, mountAll) {
      if (component._disable) return
      component._disable = true

      if (component.__ref = props.ref) delete props.ref
      if (component.__key = props.key) delete props.key

      if (!component.base || mountAll) {
        if (component.componentWillMount) component.componentWillMount()
      } else if (component.componentWillReceiveProps) {
        component.componentWillReceiveProps(props, context)
      }

      if (context && context !== component.context) {
        if (!component.prevContext) component.prevContext = component.context
        component.context = context
      }

      if (!component.prevProps) component.prevProps = component.props
      component.props = props

      component._disable = false

      if (opts !== 0) {
        if (opts === 1 || options.syncComponentUpdates !== false || !component.base) {
          renderComponent(component, 1, mountAll)
        } else {
          enqueueRender(component)
        }
      }

      if (component.__ref) component.__ref(component)
    }

/** Render a Component, triggering necessary lifecycle events and taking High-Order Components into account.
 *	@param {Component} component
 *	@param {Object} [opts]
 *	@param {boolean} [opts.build=false]		If `true`, component will build and store a DOM node if not already associated with one.
 *	@private
 */
    function renderComponent (component, opts, mountAll, isChild) {
      if (component._disable) return

      var props = component.props,
	    state = component.state,
	    context = component.context,
	    previousProps = component.prevProps || props,
	    previousState = component.prevState || state,
	    previousContext = component.prevContext || context,
	    isUpdate = component.base,
	    nextBase = component.nextBase,
	    initialBase = isUpdate || nextBase,
	    initialChildComponent = component._component,
	    skip = false,
	    rendered,
	    inst,
	    cbase

	// if updating
      if (isUpdate) {
        component.props = previousProps
        component.state = previousState
        component.context = previousContext
        if (opts !== 2 && component.shouldComponentUpdate && component.shouldComponentUpdate(props, state, context) === false) {
          skip = true
        } else if (component.componentWillUpdate) {
          component.componentWillUpdate(props, state, context)
        }
        component.props = props
        component.state = state
        component.context = context
      }

      component.prevProps = component.prevState = component.prevContext = component.nextBase = null
      component._dirty = false

      if (!skip) {
        rendered = component.render(props, state, context)

		// context to pass to the child, can be updated via (grand-)parent component
        if (component.getChildContext) {
          context = extend(extend({}, context), component.getChildContext())
        }

        var childComponent = rendered && rendered.nodeName,
		    toUnmount,
		    base

        if (typeof childComponent === 'function') {
			// set up high order component link

          var childProps = getNodeProps(rendered)
          inst = initialChildComponent

          if (inst && inst.constructor === childComponent && childProps.key == inst.__key) {
            setComponentProps(inst, childProps, 1, context, false)
          } else {
            toUnmount = inst

            component._component = inst = createComponent(childComponent, childProps, context)
            inst.nextBase = inst.nextBase || nextBase
            inst._parentComponent = component
            setComponentProps(inst, childProps, 0, context, false)
            renderComponent(inst, 1, mountAll, true)
          }

          base = inst.base
        } else {
          cbase = initialBase

			// destroy high order component link
          toUnmount = initialChildComponent
          if (toUnmount) {
            cbase = component._component = null
          }

          if (initialBase || opts === 1) {
            if (cbase) cbase._component = null
            base = diff(cbase, rendered, context, mountAll || !isUpdate, initialBase && initialBase.parentNode, true)
          }
        }

        if (initialBase && base !== initialBase && inst !== initialChildComponent) {
          var baseParent = initialBase.parentNode
          if (baseParent && base !== baseParent) {
            baseParent.replaceChild(base, initialBase)

            if (!toUnmount) {
              initialBase._component = null
              recollectNodeTree(initialBase, false)
            }
          }
        }

        if (toUnmount) {
          unmountComponent(toUnmount)
        }

        component.base = base
        if (base && !isChild) {
          var componentRef = component,
			    t = component
          while (t = t._parentComponent) {
            (componentRef = t).base = base
          }
          base._component = componentRef
          base._componentConstructor = componentRef.constructor
        }
      }

      if (!isUpdate || mountAll) {
        mounts.unshift(component)
      } else if (!skip) {
		// Ensure that pending componentDidMount() hooks of child components
		// are called before the componentDidUpdate() hook in the parent.
		// Note: disabled as it causes duplicate hooks, see https://github.com/developit/preact/issues/750
		// flushMounts();

        if (component.componentDidUpdate) {
          component.componentDidUpdate(previousProps, previousState, previousContext)
        }
        if (options.afterUpdate) options.afterUpdate(component)
      }

      if (component._renderCallbacks != null) {
        while (component._renderCallbacks.length) {
          component._renderCallbacks.pop().call(component)
        }
      }

      if (!diffLevel && !isChild) flushMounts()
    }

/** Apply the Component referenced by a VNode to the DOM.
 *	@param {Element} dom	The DOM node to mutate
 *	@param {VNode} vnode	A Component-referencing VNode
 *	@returns {Element} dom	The created/mutated element
 *	@private
 */
    function buildComponentFromVNode (dom, vnode, context, mountAll) {
      var c = dom && dom._component,
	    originalComponent = c,
	    oldDom = dom,
	    isDirectOwner = c && dom._componentConstructor === vnode.nodeName,
	    isOwner = isDirectOwner,
	    props = getNodeProps(vnode)
      while (c && !isOwner && (c = c._parentComponent)) {
        isOwner = c.constructor === vnode.nodeName
      }

      if (c && isOwner && (!mountAll || c._component)) {
        setComponentProps(c, props, 3, context, mountAll)
        dom = c.base
      } else {
        if (originalComponent && !isDirectOwner) {
          unmountComponent(originalComponent)
          dom = oldDom = null
        }

        c = createComponent(vnode.nodeName, props, context)
        if (dom && !c.nextBase) {
          c.nextBase = dom
			// passing dom/oldDom as nextBase will recycle it if unused, so bypass recycling on L229:
          oldDom = null
        }
        setComponentProps(c, props, 1, context, mountAll)
        dom = c.base

        if (oldDom && dom !== oldDom) {
          oldDom._component = null
          recollectNodeTree(oldDom, false)
        }
      }

      return dom
    }

/** Remove a component from the DOM and recycle it.
 *	@param {Component} component	The Component instance to unmount
 *	@private
 */
    function unmountComponent (component) {
      if (options.beforeUnmount) options.beforeUnmount(component)

      var base = component.base

      component._disable = true

      if (component.componentWillUnmount) component.componentWillUnmount()

      component.base = null

	// recursively tear down & recollect high-order component children:
      var inner = component._component
      if (inner) {
        unmountComponent(inner)
      } else if (base) {
        if (base['__preactattr_'] && base['__preactattr_'].ref) base['__preactattr_'].ref(null)

        component.nextBase = base

        removeNode(base)
        collectComponent(component)

        removeChildren(base)
      }

      if (component.__ref) component.__ref(null)
    }

/** Base Component class.
 *	Provides `setState()` and `forceUpdate()`, which trigger rendering.
 *	@public
 *
 *	@example
 *	class MyFoo extends Component {
 *		render(props, state) {
 *			return <div />;
 *		}
 *	}
 */
    function Component (props, context) {
      this._dirty = true

	/** @public
  *	@type {object}
  */
      this.context = context

	/** @public
  *	@type {object}
  */
      this.props = props

	/** @public
  *	@type {object}
  */
      this.state = this.state || {}
    }

    extend(Component.prototype, {

	/** Returns a `boolean` indicating if the component should re-render when receiving the given `props` and `state`.
  *	@param {object} nextProps
  *	@param {object} nextState
  *	@param {object} nextContext
  *	@returns {Boolean} should the component re-render
  *	@name shouldComponentUpdate
  *	@function
  */

	/** Update component state by copying properties from `state` to `this.state`.
  *	@param {object} state		A hash of state properties to update with new values
  *	@param {function} callback	A function to be called once component state is updated
  */
      setState: function setState (state, callback) {
        var s = this.state
        if (!this.prevState) this.prevState = extend({}, s)
        extend(s, typeof state === 'function' ? state(s, this.props) : state)
        if (callback) (this._renderCallbacks = this._renderCallbacks || []).push(callback)
        enqueueRender(this)
      },

	/** Immediately perform a synchronous re-render of the component.
  *	@param {function} callback		A function to be called after component is re-rendered.
  *	@private
  */
      forceUpdate: function forceUpdate (callback) {
        if (callback) (this._renderCallbacks = this._renderCallbacks || []).push(callback)
        renderComponent(this, 2)
      },

	/** Accepts `props` and `state`, and returns a new Virtual DOM tree to build.
  *	Virtual DOM is generally constructed via [JSX](http://jasonformat.com/wtf-is-jsx).
  *	@param {object} props		Props (eg: JSX attributes) received from parent element/component
  *	@param {object} state		The component's current state
  *	@param {object} context		Context object (if a parent component has provided context)
  *	@returns VNode
  */
      render: function render () {}
    })

/** Render JSX into a `parent` Element.
 *	@param {VNode} vnode		A (JSX) VNode to render
 *	@param {Element} parent		DOM element to render into
 *	@param {Element} [merge]	Attempt to re-use an existing DOM tree rooted at `merge`
 *	@public
 *
 *	@example
 *	// render a div into <body>:
 *	render(<div id="hello">hello!</div>, document.body);
 *
 *	@example
 *	// render a "Thing" component into #foo:
 *	const Thing = ({ name }) => <span>{ name }</span>;
 *	render(<Thing name="one" />, document.querySelector('#foo'));
 */
    function render (vnode, parent, merge) {
      return diff(merge, vnode, {}, false, parent, false)
    }

    var preact = {
      h: h,
      createElement: h,
      cloneElement: cloneElement,
      Component: Component,
      render: render,
      rerender: rerender,
      options: options
    }

    /* harmony default export */ __webpack_exports__['default'] = (preact)
// # sourceMappingURL=preact.esm.js.map
  /***/ },
/* 1 */
  /***/ function (module, exports) {
    module.exports = function (module) {
      if (!module.webpackPolyfill) {
        module.deprecate = function () {}
        module.paths = []
		// module.parent = undefined by default
        if (!module.children) module.children = []
        Object.defineProperty(module, 'loaded', {
          enumerable: true,
          get: function () {
            return module.l
          }
        })
        Object.defineProperty(module, 'id', {
          enumerable: true,
          get: function () {
            return module.i
          }
        })
        module.webpackPolyfill = 1
      }
      return module
    }
  /***/ },
/* 2 */
  /***/ function (module, exports) {
    module.exports = function () {
      throw new Error('define cannot be used indirect')
    }
  /***/ },
/* 3 */
  /***/ function (module, exports) {
    function webpackEmptyContext (req) {
      throw new Error("Cannot find module '" + req + "'.")
    }
    webpackEmptyContext.keys = function () { return [] }
    webpackEmptyContext.resolve = webpackEmptyContext
    module.exports = webpackEmptyContext
    webpackEmptyContext.id = 3
  /***/ },
/* 4 */
  /***/ function (module, exports) {
    module.exports = {'browsers': {'chrome': {'releases': {'1': {'release_date': '2008-12-11', 'status': 'retired'}, '2': {'release_date': '2009-05-24', 'status': 'retired'}, '3': {'release_date': '2009-10-12', 'status': 'retired'}, '4': {'release_date': '2010-01-25', 'status': 'retired'}, '5': {'release_date': '2010-05-21', 'status': 'retired'}, '6': {'release_date': '2010-09-02', 'status': 'retired'}, '7': {'release_date': '2010-10-21', 'status': 'retired'}, '8': {'release_date': '2010-12-02', 'status': 'retired'}, '9': {'release_date': '2011-02-03', 'status': 'retired'}, '10': {'release_date': '2011-03-08', 'status': 'retired'}, '11': {'release_date': '2011-04-27', 'status': 'retired'}, '12': {'release_date': '2011-06-07', 'status': 'retired'}, '13': {'release_date': '2011-08-02', 'status': 'retired'}, '14': {'release_date': '2011-09-16', 'status': 'retired'}, '15': {'release_date': '2011-10-25', 'status': 'retired'}, '16': {'release_date': '2011-12-13', 'status': 'retired'}, '17': {'release_date': '2012-02-08', 'status': 'retired'}, '18': {'release_date': '2012-03-28', 'status': 'retired'}, '19': {'release_date': '2012-05-15', 'status': 'retired'}, '20': {'release_date': '2012-06-26', 'status': 'retired'}, '21': {'release_date': '2012-07-31', 'status': 'retired'}, '22': {'release_date': '2012-09-25', 'status': 'retired'}, '23': {'release_date': '2012-11-06', 'status': 'retired'}, '24': {'release_date': '2013-01-10', 'status': 'retired'}, '25': {'release_date': '2013-02-21', 'status': 'retired'}, '26': {'release_date': '2013-03-26', 'status': 'retired'}, '27': {'release_date': '2013-05-21', 'status': 'retired'}, '28': {'release_date': '2013-07-09', 'status': 'retired'}, '29': {'release_date': '2013-08-20', 'status': 'retired'}, '30': {'release_date': '2013-10-01', 'status': 'retired'}, '31': {'release_date': '2013-11-12', 'status': 'retired'}, '32': {'release_date': '2014-01-14', 'status': 'retired'}, '33': {'release_date': '2014-02-20', 'status': 'retired'}, '34': {'release_date': '2014-04-08', 'status': 'retired'}, '35': {'release_date': '2014-05-20', 'status': 'retired'}, '36': {'release_date': '2014-07-16', 'status': 'retired'}, '37': {'release_date': '2014-08-26', 'status': 'retired'}, '38': {'release_date': '2014-10-07', 'status': 'retired'}, '39': {'release_date': '2014-11-18', 'status': 'retired'}, '40': {'release_date': '2015-01-21', 'status': 'retired'}, '41': {'release_date': '2015-03-03', 'status': 'retired'}, '42': {'release_date': '2015-04-14', 'status': 'retired'}, '43': {'release_date': '2015-05-19', 'status': 'retired'}, '44': {'release_date': '2015-07-21', 'status': 'retired'}, '45': {'release_date': '2015-09-01', 'status': 'retired'}, '46': {'release_date': '2015-10-13', 'status': 'retired'}, '47': {'release_date': '2015-12-01', 'status': 'retired'}, '48': {'release_date': '2016-01-20', 'status': 'retired'}, '49': {'release_date': '2016-03-02', 'status': 'retired'}, '50': {'release_date': '2016-04-13', 'status': 'retired'}, '51': {'release_date': '2016-05-25', 'status': 'retired'}, '52': {'release_date': '2016-07-20', 'status': 'retired'}, '53': {'release_date': '2016-08-31', 'status': 'retired'}, '54': {'release_date': '2016-10-12', 'status': 'retired'}, '55': {'release_date': '2016-12-01', 'status': 'retired'}, '56': {'release_date': '2017-01-25', 'status': 'retired'}, '57': {'release_date': '2017-03-09', 'status': 'retired'}, '58': {'release_date': '2017-04-19', 'status': 'retired'}, '59': {'release_date': '2017-06-05', 'status': 'retired'}, '60': {'release_date': '2017-07-25', 'status': 'retired'}, '61': {'release_date': '2017-09-05', 'status': 'retired'}, '62': {'release_date': '2017-10-17', 'status': 'current'}, '63': {'status': 'beta'}, '64': {'status': 'nightly'}}}, 'edge': {'releases': {'12': {'release_date': '2015-07-15', 'status': 'retired'}, '13': {'release_date': '2015-11-05', 'status': 'retired'}, '14': {'release_date': '2016-08-02', 'status': 'retired'}, '15': {'release_date': '2017-04-11', 'status': 'current'}, '16': {'status': 'nightly'}}}, 'edge_mobile': {'releases': {'12': {'status': 'retired'}, '13': {'status': 'retired'}, '14': {'status': 'retired'}, '15': {'status': 'current'}, '16': {'status': 'nightly'}}}, 'firefox': {'releases': {'1': {'release_date': '2004-11-09', 'release_notes': 'http://website-archive.mozilla.org/www.mozilla.org/firefox_releasenotes/en-US/firefox/releases/1.0.html', 'status': 'retired'}, '2': {'release_date': '2006-10-24', 'release_notes': 'https://developer.mozilla.org/Firefox/Releases/2', 'status': 'retired'}, '3': {'release_date': '2008-06-17', 'release_notes': 'https://developer.mozilla.org/Firefox/Releases/3', 'status': 'retired'}, '4': {'release_date': '2011-03-22', 'release_notes': 'https://developer.mozilla.org/Firefox/Releases/4', 'status': 'retired'}, '5': {'release_date': '2011-06-21', 'release_notes': 'https://developer.mozilla.org/Firefox/Releases/5', 'status': 'retired'}, '6': {'release_date': '2011-08-16', 'release_notes': 'https://developer.mozilla.org/Firefox/Releases/6', 'status': 'retired'}, '7': {'release_date': '2011-09-27', 'release_notes': 'https://developer.mozilla.org/Firefox/Releases/7', 'status': 'retired'}, '8': {'release_date': '2011-11-08', 'release_notes': 'https://developer.mozilla.org/Firefox/Releases/8', 'status': 'retired'}, '9': {'release_date': '2011-12-20', 'release_notes': 'https://developer.mozilla.org/Firefox/Releases/9', 'status': 'retired'}, '10': {'release_date': '2012-01-31', 'release_notes': 'https://developer.mozilla.org/Firefox/Releases/10', 'status': 'retired'}, '11': {'release_date': '2012-03-13', 'release_notes': 'https://developer.mozilla.org/Firefox/Releases/11', 'status': 'retired'}, '12': {'release_date': '2012-04-24', 'release_notes': 'https://developer.mozilla.org/Firefox/Releases/12', 'status': 'retired'}, '13': {'release_date': '2012-06-05', 'release_notes': 'https://developer.mozilla.org/Firefox/Releases/13', 'status': 'retired'}, '14': {'release_date': '2012-07-17', 'release_notes': 'https://developer.mozilla.org/Firefox/Releases/14', 'status': 'retired'}, '15': {'release_date': '2012-08-28', 'release_notes': 'https://developer.mozilla.org/Firefox/Releases/15', 'status': 'retired'}, '16': {'release_date': '2012-10-09', 'release_notes': 'https://developer.mozilla.org/Firefox/Releases/16', 'status': 'retired'}, '17': {'release_date': '2012-11-20', 'release_notes': 'https://developer.mozilla.org/Firefox/Releases/17', 'status': 'retired'}, '18': {'release_date': '2013-01-08', 'release_notes': 'https://developer.mozilla.org/Firefox/Releases/18', 'status': 'retired'}, '19': {'release_date': '2013-02-19', 'release_notes': 'https://developer.mozilla.org/Firefox/Releases/19', 'status': 'retired'}, '20': {'release_date': '2013-04-02', 'release_notes': 'https://developer.mozilla.org/Firefox/Releases/20', 'status': 'retired'}, '21': {'release_date': '2013-05-14', 'release_notes': 'https://developer.mozilla.org/Firefox/Releases/21', 'status': 'retired'}, '22': {'release_date': '2013-06-25', 'release_notes': 'https://developer.mozilla.org/Firefox/Releases/22', 'status': 'retired'}, '23': {'release_date': '2013-08-06', 'release_notes': 'https://developer.mozilla.org/Firefox/Releases/23', 'status': 'retired'}, '24': {'release_date': '2013-09-17', 'release_notes': 'https://developer.mozilla.org/Firefox/Releases/24', 'status': 'retired'}, '25': {'release_date': '2013-10-29', 'release_notes': 'https://developer.mozilla.org/Firefox/Releases/25', 'status': 'retired'}, '26': {'release_date': '2013-12-10', 'release_notes': 'https://developer.mozilla.org/Firefox/Releases/26', 'status': 'retired'}, '27': {'release_date': '2014-02-04', 'release_notes': 'https://developer.mozilla.org/Firefox/Releases/27', 'status': 'retired'}, '28': {'release_date': '2014-03-18', 'release_notes': 'https://developer.mozilla.org/Firefox/Releases/28', 'status': 'retired'}, '29': {'release_date': '2014-04-29', 'release_notes': 'https://developer.mozilla.org/Firefox/Releases/29', 'status': 'retired'}, '30': {'release_date': '2014-06-10', 'release_notes': 'https://developer.mozilla.org/Firefox/Releases/30', 'status': 'retired'}, '31': {'release_date': '2014-07-22', 'release_notes': 'https://developer.mozilla.org/Firefox/Releases/31', 'status': 'retired'}, '32': {'release_date': '2014-09-02', 'release_notes': 'https://developer.mozilla.org/Firefox/Releases/32', 'status': 'retired'}, '33': {'release_date': '2014-10-14', 'release_notes': 'https://developer.mozilla.org/Firefox/Releases/33', 'status': 'retired'}, '34': {'release_date': '2014-12-01', 'release_notes': 'https://developer.mozilla.org/Firefox/Releases/34', 'status': 'retired'}, '35': {'release_date': '2015-01-13', 'release_notes': 'https://developer.mozilla.org/Firefox/Releases/35', 'status': 'retired'}, '36': {'release_date': '2015-02-24', 'release_notes': 'https://developer.mozilla.org/Firefox/Releases/36', 'status': 'retired'}, '37': {'release_date': '2015-03-31', 'release_notes': 'https://developer.mozilla.org/Firefox/Releases/37', 'status': 'retired'}, '38': {'release_date': '2015-05-12', 'release_notes': 'https://developer.mozilla.org/Firefox/Releases/38', 'status': 'retired'}, '39': {'release_date': '2015-07-02', 'release_notes': 'https://developer.mozilla.org/Firefox/Releases/39', 'status': 'retired'}, '40': {'release_date': '2015-08-11', 'release_notes': 'https://developer.mozilla.org/Firefox/Releases/40', 'status': 'retired'}, '41': {'release_date': '2015-09-22', 'release_notes': 'https://developer.mozilla.org/Firefox/Releases/41', 'status': 'retired'}, '42': {'release_date': '2015-11-03', 'release_notes': 'https://developer.mozilla.org/Firefox/Releases/42', 'status': 'retired'}, '43': {'release_date': '2015-12-15', 'release_notes': 'https://developer.mozilla.org/Firefox/Releases/43', 'status': 'retired'}, '44': {'release_date': '2016-01-26', 'release_notes': 'https://developer.mozilla.org/Firefox/Releases/44', 'status': 'retired'}, '45': {'release_date': '2016-03-08', 'release_notes': 'https://developer.mozilla.org/Firefox/Releases/45', 'status': 'retired'}, '46': {'release_date': '2016-04-26', 'release_notes': 'https://developer.mozilla.org/Firefox/Releases/46', 'status': 'retired'}, '47': {'release_date': '2016-06-07', 'release_notes': 'https://developer.mozilla.org/Firefox/Releases/47', 'status': 'retired'}, '48': {'release_date': '2016-08-02', 'release_notes': 'https://developer.mozilla.org/Firefox/Releases/48', 'status': 'retired'}, '49': {'release_date': '2016-09-20', 'release_notes': 'https://developer.mozilla.org/Firefox/Releases/49', 'status': 'retired'}, '50': {'release_date': '2016-11-15', 'release_notes': 'https://developer.mozilla.org/Firefox/Releases/50', 'status': 'retired'}, '51': {'release_date': '2017-01-24', 'release_notes': 'https://developer.mozilla.org/Firefox/Releases/51', 'status': 'retired'}, '52': {'release_date': '2017-03-07', 'release_notes': 'https://developer.mozilla.org/Firefox/Releases/52', 'status': 'esr'}, '53': {'release_date': '2017-04-19', 'release_notes': 'https://developer.mozilla.org/Firefox/Releases/53', 'status': 'retired'}, '54': {'release_date': '2017-06-13', 'release_notes': 'https://developer.mozilla.org/Firefox/Releases/54', 'status': 'retired'}, '55': {'release_date': '2017-08-08', 'release_notes': 'https://developer.mozilla.org/Firefox/Releases/55', 'status': 'retired'}, '56': {'release_date': '2017-09-28', 'release_notes': 'https://developer.mozilla.org/Firefox/Releases/56', 'status': 'current'}, '57': {'release_date': '2017-11-28', 'release_notes': 'https://developer.mozilla.org/Firefox/Releases/57', 'status': 'beta'}, '58': {'release_date': '2018-01-22', 'release_notes': 'https://developer.mozilla.org/Firefox/Releases/58', 'status': 'nightly'}, '1.5': {'release_date': '2005-11-29', 'release_notes': 'https://developer.mozilla.org/Firefox/Releases/1.5', 'status': 'retired'}, '3.5': {'release_date': '2009-06-30', 'release_notes': 'https://developer.mozilla.org/Firefox/Releases/3.5', 'status': 'retired'}, '3.6': {'release_date': '2010-01-21', 'release_notes': 'https://developer.mozilla.org/Firefox/Releases/3.6', 'status': 'retired'}, '3.6.9': {'release_date': '2010-09-07', 'release_notes': 'https://website-archive.mozilla.org/www.mozilla.org/firefox_releasenotes/en-US/firefox/3.6.9/releasenotes/', 'status': 'retired'}, '50.0.1': {'release_date': '2016-11-28', 'status': 'retired'}}}, 'firefox_android': {'releases': {'4': {'release_date': '2011-03-29', 'release_notes': 'https://developer.mozilla.org/Firefox/Releases/4', 'status': 'retired'}, '5': {'release_date': '2011-06-21', 'release_notes': 'https://developer.mozilla.org/Firefox/Releases/5', 'status': 'retired'}, '6': {'release_date': '2011-08-16', 'release_notes': 'https://developer.mozilla.org/Firefox/Releases/6', 'status': 'retired'}, '7': {'release_date': '2011-09-27', 'release_notes': 'https://developer.mozilla.org/Firefox/Releases/7', 'status': 'retired'}, '8': {'release_date': '2011-11-08', 'release_notes': 'https://developer.mozilla.org/Firefox/Releases/8', 'status': 'retired'}, '9': {'release_date': '2011-12-21', 'release_notes': 'https://developer.mozilla.org/Firefox/Releases/9', 'status': 'retired'}, '10': {'release_date': '2012-01-31', 'release_notes': 'https://developer.mozilla.org/Firefox/Releases/10', 'status': 'retired'}, '14': {'release_date': '2012-06-26', 'release_notes': 'https://developer.mozilla.org/Firefox/Releases/14', 'status': 'retired'}, '15': {'release_date': '2012-08-28', 'release_notes': 'https://developer.mozilla.org/Firefox/Releases/15', 'status': 'retired'}, '16': {'release_date': '2012-10-09', 'release_notes': 'https://developer.mozilla.org/Firefox/Releases/16', 'status': 'retired'}, '17': {'release_date': '2012-11-20', 'release_notes': 'https://developer.mozilla.org/Firefox/Releases/17', 'status': 'retired'}, '18': {'release_date': '2013-01-08', 'release_notes': 'https://developer.mozilla.org/Firefox/Releases/18', 'status': 'retired'}, '19': {'release_date': '2013-02-19', 'release_notes': 'https://developer.mozilla.org/Firefox/Releases/19', 'status': 'retired'}, '20': {'release_date': '2013-04-02', 'release_notes': 'https://developer.mozilla.org/Firefox/Releases/20', 'status': 'retired'}, '21': {'release_date': '2013-05-14', 'release_notes': 'https://developer.mozilla.org/Firefox/Releases/21', 'status': 'retired'}, '22': {'release_date': '2013-06-25', 'release_notes': 'https://developer.mozilla.org/Firefox/Releases/22', 'status': 'retired'}, '23': {'release_date': '2013-08-06', 'release_notes': 'https://developer.mozilla.org/Firefox/Releases/23', 'status': 'retired'}, '24': {'release_date': '2013-09-17', 'release_notes': 'https://developer.mozilla.org/Firefox/Releases/24', 'status': 'retired'}, '25': {'release_date': '2013-10-29', 'release_notes': 'https://developer.mozilla.org/Firefox/Releases/25', 'status': 'retired'}, '26': {'release_date': '2013-12-10', 'release_notes': 'https://developer.mozilla.org/Firefox/Releases/26', 'status': 'retired'}, '27': {'release_date': '2014-02-04', 'release_notes': 'https://developer.mozilla.org/Firefox/Releases/27', 'status': 'retired'}, '28': {'release_date': '2014-03-18', 'release_notes': 'https://developer.mozilla.org/Firefox/Releases/28', 'status': 'retired'}, '29': {'release_date': '2014-04-29', 'release_notes': 'https://developer.mozilla.org/Firefox/Releases/29', 'status': 'retired'}, '30': {'release_date': '2014-06-10', 'release_notes': 'https://developer.mozilla.org/Firefox/Releases/30', 'status': 'retired'}, '31': {'release_date': '2014-07-22', 'release_notes': 'https://developer.mozilla.org/Firefox/Releases/31', 'status': 'retired'}, '32': {'release_date': '2014-09-02', 'release_notes': 'https://developer.mozilla.org/Firefox/Releases/32', 'status': 'retired'}, '33': {'release_date': '2014-10-14', 'release_notes': 'https://developer.mozilla.org/Firefox/Releases/33', 'status': 'retired'}, '34': {'release_date': '2014-12-01', 'release_notes': 'https://developer.mozilla.org/Firefox/Releases/34', 'status': 'retired'}, '35': {'release_date': '2015-01-13', 'release_notes': 'https://developer.mozilla.org/Firefox/Releases/35', 'status': 'retired'}, '36': {'release_date': '2015-02-27', 'release_notes': 'https://developer.mozilla.org/Firefox/Releases/36', 'status': 'retired'}, '37': {'release_date': '2015-03-31', 'release_notes': 'https://developer.mozilla.org/Firefox/Releases/37', 'status': 'retired'}, '38': {'release_date': '2015-05-12', 'release_notes': 'https://developer.mozilla.org/Firefox/Releases/38', 'status': 'retired'}, '39': {'release_date': '2015-07-02', 'release_notes': 'https://developer.mozilla.org/Firefox/Releases/39', 'status': 'retired'}, '40': {'release_date': '2015-08-11', 'release_notes': 'https://developer.mozilla.org/Firefox/Releases/40', 'status': 'retired'}, '41': {'release_date': '2015-09-22', 'release_notes': 'https://developer.mozilla.org/Firefox/Releases/41', 'status': 'retired'}, '42': {'release_date': '2015-11-03', 'release_notes': 'https://developer.mozilla.org/Firefox/Releases/42', 'status': 'retired'}, '43': {'release_date': '2015-12-15', 'release_notes': 'https://developer.mozilla.org/Firefox/Releases/43', 'status': 'retired'}, '44': {'release_date': '2016-01-26', 'release_notes': 'https://developer.mozilla.org/Firefox/Releases/44', 'status': 'retired'}, '45': {'release_date': '2016-03-08', 'release_notes': 'https://developer.mozilla.org/Firefox/Releases/45', 'status': 'retired'}, '46': {'release_date': '2016-04-26', 'release_notes': 'https://developer.mozilla.org/Firefox/Releases/46', 'status': 'retired'}, '47': {'release_date': '2016-06-07', 'release_notes': 'https://developer.mozilla.org/Firefox/Releases/47', 'status': 'retired'}, '48': {'release_date': '2016-08-02', 'release_notes': 'https://developer.mozilla.org/Firefox/Releases/48', 'status': 'retired'}, '49': {'release_date': '2016-09-20', 'release_notes': 'https://developer.mozilla.org/Firefox/Releases/49', 'status': 'retired'}, '50': {'release_date': '2016-11-15', 'release_notes': 'https://developer.mozilla.org/Firefox/Releases/50', 'status': 'retired'}, '51': {'release_date': '2017-01-24', 'release_notes': 'https://developer.mozilla.org/Firefox/Releases/51', 'status': 'retired'}, '52': {'release_date': '2017-03-07', 'release_notes': 'https://developer.mozilla.org/Firefox/Releases/52', 'status': 'esr'}, '53': {'release_date': '2017-04-19', 'release_notes': 'https://developer.mozilla.org/Firefox/Releases/53', 'status': 'retired'}, '54': {'release_date': '2017-06-13', 'release_notes': 'https://developer.mozilla.org/Firefox/Releases/54', 'status': 'retired'}, '55': {'release_date': '2017-08-08', 'release_notes': 'https://developer.mozilla.org/Firefox/Releases/55', 'status': 'retired'}, '56': {'release_date': '2017-09-28', 'release_notes': 'https://developer.mozilla.org/Firefox/Releases/56', 'status': 'current'}, '57': {'release_date': '2017-11-28', 'release_notes': 'https://developer.mozilla.org/Firefox/Releases/57', 'status': 'beta'}, '58': {'release_date': '2018-01-22', 'release_notes': 'https://developer.mozilla.org/Firefox/Releases/58', 'status': 'nightly'}}}, 'ie': {'releases': {'1': {'release_date': '1995-08-16', 'status': 'retired'}, '2': {'release_date': '1995-11-22', 'status': 'retired'}, '3': {'release_date': '1996-08-13', 'status': 'retired'}, '4': {'release_date': '1997-09-30', 'status': 'retired'}, '5': {'release_date': '1999-03-18', 'status': 'retired'}, '6': {'release_date': '2001-08-27', 'status': 'retired'}, '7': {'release_date': '2006-10-18', 'status': 'retired'}, '8': {'release_date': '2009-03-19', 'status': 'retired'}, '9': {'release_date': '2011-03-14', 'status': 'retired'}, '10': {'release_date': '2012-10-26', 'status': 'retired'}, '11': {'release_date': '2013-10-17', 'status': 'current'}, '1.5': {'status': 'retired'}, '5.5': {'release_date': '2000-07-06', 'status': 'retired'}}}, 'nodejs': {'releases': {'4': {'release_date': '2015-09-08', 'status': 'current'}, '5': {'release_date': '2015-10-29', 'status': 'retired'}, '6': {'release_date': '2016-04-26', 'status': 'current'}, '7': {'release_date': '2016-10-25', 'status': 'retired'}, '8': {'release_date': '2017-05-30', 'status': 'current'}, '9': {'release_date': '2017-10-31', 'status': 'current'}, '10': {'status': 'planned'}, '0.10': {'release_date': '2013-03-11', 'status': 'retired'}, '0.12': {'release_date': '2015-02-06', 'status': 'retired'}}}, 'opera': {'releases': {'2': {'release_date': '1996-07-14', 'status': 'retired'}, '3': {'release_date': '1997-12-01', 'status': 'retired'}, '4': {'release_date': '2000-06-28', 'status': 'retired'}, '5': {'release_date': '2000-12-06', 'status': 'retired'}, '6': {'release_date': '2001-12-18', 'status': 'retired'}, '7': {'release_date': '2003-01-28', 'status': 'retired'}, '8': {'release_date': '2005-04-19', 'status': 'retired'}, '9': {'release_date': '2006-06-20', 'status': 'retired'}, '10': {'release_date': '2009-09-01', 'status': 'retired'}, '11': {'release_date': '2010-12-16', 'status': 'retired'}, '12': {'release_date': '2012-06-14', 'status': 'retired'}, '15': {'release_date': '2013-07-02', 'status': 'retired'}, '16': {'release_date': '2013-08-27', 'status': 'retired'}, '17': {'release_date': '2013-10-08', 'status': 'retired'}, '18': {'release_date': '2013-11-19', 'status': 'retired'}, '19': {'release_date': '2014-01-28', 'release_notes': 'https://dev.opera.com/blog/opera-19/', 'status': 'retired'}, '20': {'release_date': '2014-03-04', 'release_notes': 'https://dev.opera.com/blog/opera-20/', 'status': 'retired'}, '21': {'release_date': '2014-05-06', 'release_notes': 'https://dev.opera.com/blog/opera-21/', 'status': 'retired'}, '22': {'release_date': '2014-06-03', 'release_notes': 'https://dev.opera.com/blog/opera-22/', 'status': 'retired'}, '23': {'release_date': '2014-07-22', 'release_notes': 'https://dev.opera.com/blog/opera-23/', 'status': 'retired'}, '24': {'release_date': '2014-09-02', 'release_notes': 'https://dev.opera.com/blog/opera-24/', 'status': 'retired'}, '25': {'release_date': '2014-10-15', 'release_notes': 'https://dev.opera.com/blog/opera-25/', 'status': 'retired'}, '26': {'release_date': '2014-12-03', 'release_notes': 'https://dev.opera.com/blog/opera-26/', 'status': 'retired'}, '27': {'release_date': '2015-01-27', 'release_notes': 'https://dev.opera.com/blog/opera-27/', 'status': 'retired'}, '28': {'release_date': '2015-03-10', 'release_notes': 'https://dev.opera.com/blog/opera-28/', 'status': 'retired'}, '29': {'release_date': '2015-04-28', 'release_notes': 'https://dev.opera.com/blog/opera-29/', 'status': 'retired'}, '30': {'release_date': '2015-06-09', 'release_notes': 'https://dev.opera.com/blog/opera-30/', 'status': 'retired'}, '31': {'release_date': '2015-08-04', 'release_notes': 'https://dev.opera.com/blog/opera-31/', 'status': 'retired'}, '32': {'release_date': '2015-09-15', 'release_notes': 'https://dev.opera.com/blog/opera-32/', 'status': 'retired'}, '33': {'release_date': '2015-10-27', 'release_notes': 'https://dev.opera.com/blog/opera-33/', 'status': 'retired'}, '34': {'release_date': '2015-12-08', 'release_notes': 'https://dev.opera.com/blog/opera-34/', 'status': 'retired'}, '35': {'release_date': '2016-02-02', 'release_notes': 'https://dev.opera.com/blog/opera-35/', 'status': 'retired'}, '36': {'release_date': '2016-03-15', 'release_notes': 'https://dev.opera.com/blog/opera-36/', 'status': 'retired'}, '37': {'release_date': '2016-05-04', 'release_notes': 'https://dev.opera.com/blog/opera-37/', 'status': 'retired'}, '38': {'release_date': '2016-06-08', 'release_notes': 'https://dev.opera.com/blog/opera-38/', 'status': 'retired'}, '39': {'release_date': '2016-08-02', 'release_notes': 'https://dev.opera.com/blog/opera-39/', 'status': 'retired'}, '40': {'release_date': '2016-09-20', 'release_notes': 'https://dev.opera.com/blog/opera-40/', 'status': 'retired'}, '41': {'release_date': '2016-10-25', 'release_notes': 'https://dev.opera.com/blog/opera-41/', 'status': 'retired'}, '42': {'release_date': '2016-12-13', 'release_notes': 'https://dev.opera.com/blog/opera-42/', 'status': 'retired'}, '43': {'release_date': '2017-02-07', 'release_notes': 'https://dev.opera.com/blog/opera-43/', 'status': 'retired'}, '44': {'release_date': '2017-03-21', 'release_notes': 'https://dev.opera.com/blog/opera-44/', 'status': 'retired'}, '45': {'release_date': '2017-05-10', 'release_notes': 'https://dev.opera.com/blog/opera-45/', 'status': 'retired'}, '46': {'release_date': '2017-06-22', 'release_notes': 'https://dev.opera.com/blog/opera-46/', 'status': 'retired'}, '47': {'release_date': '2017-08-09', 'release_notes': 'https://dev.opera.com/blog/opera-47/', 'status': 'retired'}, '48': {'release_date': '2017-09-27', 'status': 'current'}, '49': {'status': 'planned'}, '50': {'status': 'planned'}, '3.5': {'release_date': '1998-11-18', 'status': 'retired'}, '3.6': {'release_date': '1999-05-06', 'status': 'retired'}, '5.1': {'release_date': '2001-04-10', 'status': 'retired'}, '7.1': {'release_date': '2003-04-11', 'status': 'retired'}, '7.2': {'release_date': '2003-09-23', 'status': 'retired'}, '7.5': {'release_date': '2004-05-12', 'status': 'retired'}, '8.5': {'release_date': '2005-09-20', 'status': 'retired'}, '9.1': {'release_date': '2006-12-18', 'status': 'retired'}, '9.2': {'release_date': '2007-04-11', 'status': 'retired'}, '9.5': {'release_date': '2008-06-12', 'status': 'retired'}, '9.6': {'release_date': '2008-10-08', 'status': 'retired'}, '10.1': {'release_date': '2009-11-23', 'status': 'retired'}, '10.5': {'release_date': '2010-03-02', 'status': 'retired'}, '10.6': {'release_date': '2010-07-01', 'status': 'retired'}, '11.1': {'release_date': '2011-04-12', 'status': 'retired'}, '11.5': {'release_date': '2011-06-28', 'status': 'retired'}, '11.6': {'release_date': '2011-12-06', 'status': 'retired'}, '12.1': {'release_date': '2012-11-20', 'status': 'retired'}}}, 'safari': {'releases': {'1': {'release_date': '2003-06-23', 'status': 'retired'}, '2': {'release_date': '2005-04-29', 'status': 'retired'}, '3': {'release_date': '2007-11-14', 'status': 'retired'}, '4': {'release_date': '2009-06-08', 'release_notes': 'https://developer.apple.com/library/content/releasenotes/General/WhatsNewInSafari/Articles/Safari_4_0.html', 'status': 'retired'}, '5': {'release_date': '2010-06-07', 'status': 'retired'}, '6': {'release_date': '2012-07-25', 'release_notes': 'https://developer.apple.com/library/content/releasenotes/General/WhatsNewInSafari/Articles/Safari_6_0.html', 'status': 'retired'}, '7': {'release_date': '2013-10-22', 'release_notes': 'https://developer.apple.com/library/content/releasenotes/General/WhatsNewInSafari/Articles/Safari_7_0.html', 'status': 'retired'}, '8': {'release_date': '2014-10-16', 'release_notes': 'https://developer.apple.com/library/content/releasenotes/General/WhatsNewInSafari/Articles/Safari_8_0.html', 'status': 'retired'}, '9': {'release_date': '2015-09-30', 'release_notes': 'https://developer.apple.com/library/content/releasenotes/General/WhatsNewInSafari/Articles/Safari_9_0.html', 'status': 'retired'}, '10': {'release_date': '2016-09-20', 'release_notes': 'https://developer.apple.com/library/content/releasenotes/General/WhatsNewInSafari/Articles/Safari_10_0.html', 'status': 'retired'}, '11': {'release_date': '2017-09-19', 'release_notes': 'https://developer.apple.com/library/content/releasenotes/General/WhatsNewInSafari/Safari_11_0/Safari_11_0.html', 'status': 'current'}, '1.1': {'release_date': '2003-10-24', 'status': 'retired'}, '1.2': {'release_date': '2004-02-02', 'status': 'retired'}, '1.3': {'release_date': '2005-04-15', 'status': 'retired'}, '3.1': {'release_date': '2008-03-18', 'status': 'retired'}, '3.2': {'release_date': '2008-11-13', 'status': 'retired'}, '4.1': {'release_date': '2010-06-07', 'status': 'retired'}, '5.1': {'release_date': '2011-07-20', 'status': 'retired'}, '6.1': {'release_date': '2013-06-11', 'status': 'retired'}, '9.1': {'release_date': '2016-03-21', 'release_notes': 'https://developer.apple.com/library/content/releasenotes/General/WhatsNewInSafari/Articles/Safari_9_1.html', 'status': 'retired'}, '10.1': {'release_date': '2017-03-27', 'release_notes': 'https://developer.apple.com/library/content/releasenotes/General/WhatsNewInSafari/Articles/Safari_10_1.html', 'status': 'retired'}}}}, 'css': {'at-rules': {'font-face': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/@font-face', 'support': {'webview_android': {'version_added': true}, 'chrome': {'version_added': '4'}, 'chrome_android': {'version_added': true}, 'edge': {'version_added': '12'}, 'edge_mobile': {'version_added': '12'}, 'firefox': {'version_added': '3.5'}, 'firefox_android': {'version_added': '4'}, 'ie': {'version_added': '4'}, 'ie_mobile': {'version_added': true}, 'opera': {'version_added': '10'}, 'opera_android': {'version_added': '10'}, 'safari': {'version_added': '3.1'}, 'safari_ios': {'version_added': true}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}, 'WOFF': {'__compat': {'description': 'WOFF', 'support': {'webview_android': {'version_added': '4.4'}, 'chrome': {'version_added': '6'}, 'chrome_android': {'version_added': true}, 'edge': {'version_added': true}, 'edge_mobile': {'version_added': true}, 'firefox': {'version_added': '3.5'}, 'firefox_android': {'version_added': '4'}, 'ie': {'version_added': '9'}, 'ie_mobile': {'version_added': '10'}, 'opera': {'version_added': '11.1'}, 'opera_android': {'version_added': '11'}, 'safari': {'version_added': '5.1'}, 'safari_ios': {'version_added': '5'}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}, 'WOFF_2': {'__compat': {'description': 'WOFF 2', 'support': {'webview_android': {'version_added': '36'}, 'chrome': {'version_added': '36'}, 'chrome_android': {'version_added': '36'}, 'edge': {'version_added': '14'}, 'edge_mobile': {'version_added': '14'}, 'firefox': [{'version_added': '39'}, {'version_added': '35', 'flag': {'type': 'preference', 'name': 'gfx.downloadable_fonts.woff2.enabled', 'value_to_set': 'true'}}], 'firefox_android': [{'version_added': '39'}, {'version_added': '35', 'flag': {'type': 'preference', 'name': 'gfx.downloadable_fonts.woff2.enabled', 'value_to_set': 'true'}}], 'ie': {'version_added': false}, 'ie_mobile': {'version_added': false}, 'opera': {'version_added': '23'}, 'opera_android': {'version_added': '23'}, 'safari': {'version_added': '10', 'notes': 'Supported only on macOS 10.12 (Sierra) and later.'}, 'safari_ios': {'version_added': '10'}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}, 'SVG_fonts': {'__compat': {'description': 'SVG fonts', 'support': {'webview_android': {'version_added': false}, 'chrome': {'version_added': false}, 'chrome_android': {'version_added': false}, 'edge': {'version_added': false}, 'edge_mobile': {'version_added': false}, 'firefox': {'version_added': false}, 'firefox_android': {'version_added': false}, 'ie': {'version_added': false}, 'ie_mobile': {'version_added': false}, 'opera': {'version_added': false}, 'opera_android': {'version_added': false}, 'safari': {'version_added': true}, 'safari_ios': {'version_added': true}}, 'status': {'experimental': false, 'standard_track': false, 'deprecated': true}}}, 'font-display': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/@font-face/font-display', 'support': {'webview_android': {'version_added': '60'}, 'chrome': {'version_added': '60'}, 'chrome_android': {'version_added': '60'}, 'edge': {'version_added': false}, 'edge_mobile': {'version_added': false}, 'firefox': {'version_added': '58'}, 'firefox_android': {'version_added': '58'}, 'ie': {'version_added': false}, 'ie_mobile': {'version_added': false}, 'opera': {'version_added': '47'}, 'opera_android': {'version_added': '47'}, 'safari': {'version_added': true}, 'safari_ios': {'version_added': true}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}, 'font-family': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/@font-face/font-family', 'support': {'webview_android': {'version_added': '2.2'}, 'chrome': {'version_added': '4'}, 'chrome_android': {'version_added': null}, 'edge': {'version_added': '12'}, 'edge_mobile': {'version_added': '12'}, 'firefox': {'version_added': '3.5'}, 'firefox_android': {'version_added': '4'}, 'ie': {'version_added': '6'}, 'ie_mobile': {'version_added': '10'}, 'opera': {'version_added': '9'}, 'opera_android': {'version_added': '12'}, 'safari': {'version_added': '3.1'}, 'safari_ios': {'version_added': '3.1'}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}, 'font-feature-settings': {'__compat': {'support': {'webview_android': {'version_added': false}, 'chrome': {'version_added': false}, 'chrome_android': {'version_added': false}, 'edge': {'version_added': false}, 'edge_mobile': {'version_added': false}, 'firefox': [{'version_added': '34', 'notes': ["The <a href='http://mpeg.chiariglione.org/standards/mpeg-4/open-font-format/text-isoiec-cd-14496-22-3rd-edition' >ISO/IEC CD 14496-22 3rd edition</a> suggests using the <code>ssty</code> feature to provide glyph variants more suitable for use in scripts (for example primes used as superscripts). Starting with Firefox 29, this is done automatically by the <a href='https://developer.mozilla.org/docs/Web/MathML'>MathML</a> rendering engine. The ISO/IEC CD 14496-22 3rd edition also suggests applying the <code>dtls</code> feature to letters when placing mathematical accents to get dotless forms (for example dotless i, j with a hat). Starting with Firefox 35, this is done automatically by the MathML rendering engine. You can override the default values determined by the MathML rendering engine with CSS."]}, {'prefix': '-moz-', 'version_added': '15', 'notes': "From Firefox 4 to Firefox 14 (inclusive), Firefox supported an older, slightly different syntax. See <a href='http://hacks.mozilla.org/2010/11/firefox-4-font-feature-support/'>OpenType Font Feature support in Firefox 4</a>."}], 'firefox_android': [{'version_added': '34', 'notes': ["The <a href='http://mpeg.chiariglione.org/standards/mpeg-4/open-font-format/text-isoiec-cd-14496-22-3rd-edition' >ISO/IEC CD 14496-22 3rd edition</a> suggests using the <code>ssty</code> feature to provide glyph variants more suitable for use in scripts (for example primes used as superscripts). Starting with Firefox 29, this is done automatically by the <a href='https://developer.mozilla.org/docs/Web/MathML'>MathML</a> rendering engine. The ISO/IEC CD 14496-22 3rd edition also suggests applying the <code>dtls</code> feature to letters when placing mathematical accents to get dotless forms (for example dotless i, j with a hat). Starting with Firefox 35, this is done automatically by the MathML rendering engine. You can override the default values determined by the MathML rendering engine with CSS."]}, {'prefix': '-moz-', 'version_added': '15', 'notes': "From Firefox 4 to Firefox 14 (inclusive), Firefox supported an older, slightly different syntax. See <a href='http://hacks.mozilla.org/2010/11/firefox-4-font-feature-support/'>OpenType Font Feature support in Firefox 4</a>."}], 'ie': {'version_added': false}, 'ie_mobile': {'version_added': false}, 'opera': {'version_added': false}, 'opera_android': {'version_added': false}, 'safari': {'version_added': false}, 'safari_ios': {'version_added': false}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}, 'font-style': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/@font-face/font-style', 'support': {'webview_android': {'version_added': true}, 'chrome': {'version_added': '4'}, 'chrome_android': {'version_added': null}, 'edge': {'version_added': null}, 'edge_mobile': {'version_added': null}, 'firefox': {'version_added': '3.5'}, 'firefox_android': {'version_added': '4'}, 'ie': {'version_added': '4'}, 'ie_mobile': {'version_added': null}, 'opera': {'version_added': '10'}, 'opera_android': {'version_added': '10'}, 'safari': {'version_added': '3.1'}, 'safari_ios': {'version_added': true}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}, 'font-weight': {'__compat': {'support': {'webview_android': {'version_added': true}, 'chrome': {'version_added': '4'}, 'chrome_android': {'version_added': true}, 'edge': {'version_added': '12'}, 'edge_mobile': {'version_added': '12'}, 'firefox': {'version_added': '3.5'}, 'firefox_android': {'version_added': '4'}, 'ie': {'version_added': '4'}, 'ie_mobile': {'version_added': true}, 'opera': {'version_added': '10'}, 'opera_android': {'version_added': '10'}, 'safari': {'version_added': '3.1'}, 'safari_ios': {'version_added': true}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}, 'src': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/@font-face/src', 'support': {'webview_android': {'version_added': '2.2'}, 'chrome': {'version_added': '4'}, 'chrome_android': {'version_added': null}, 'edge': {'version_added': '12'}, 'edge_mobile': {'version_added': '12'}, 'firefox': {'version_added': '3.5'}, 'firefox_android': {'version_added': '4'}, 'ie': {'version_added': '6'}, 'ie_mobile': {'version_added': '10'}, 'opera': {'version_added': '9'}, 'opera_android': {'version_added': '12'}, 'safari': {'version_added': '3.1'}, 'safari_ios': {'version_added': '3.1'}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}, 'unicode-range': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/@font-face/unicode-range', 'support': {'webview_android': {'version_added': null}, 'chrome': {'version_added': true}, 'chrome_android': {'version_added': null}, 'edge': {'version_added': true}, 'edge_mobile': {'version_added': true}, 'firefox': {'version_added': '36'}, 'firefox_android': {'version_added': '36'}, 'ie': {'version_added': '9'}, 'ie_mobile': {'version_added': null}, 'opera': {'version_added': true}, 'opera_android': {'version_added': null}, 'safari': {'version_added': true}, 'safari_ios': {'version_added': true}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}}, 'font-feature-values': {'__compat': {'description': '<code>@font-feature-values</code>', 'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/@font-feature-values', 'support': {'webview_android': {'version_added': false}, 'chrome': {'version_added': false}, 'chrome_android': {'version_added': false}, 'edge': {'version_added': false}, 'edge_mobile': {'version_added': false}, 'firefox': [{'version_added': '34'}, {'version_added': '24', 'flag': {'type': 'preference', 'name': 'layout.css.font-features.enabled', 'value_to_set': 'true'}}], 'firefox_android': [{'version_added': '34'}, {'version_added': '24', 'flag': {'type': 'preference', 'name': 'layout.css.font-features.enabled', 'value_to_set': 'true'}}], 'ie': {'version_added': false}, 'ie_mobile': {'version_added': false}, 'opera': {'version_added': false}, 'opera_android': {'version_added': false}, 'safari': {'version_added': '9.1'}, 'safari_ios': {'version_added': '9.3'}}, 'status': {'experimental': true, 'standard_track': true, 'deprecated': false}}, 'annotation': {'__compat': {'description': '<code>@annotation</code>', 'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/@font-feature-values#@annotation', 'support': {'webview_android': {'version_added': false}, 'chrome': {'version_added': false}, 'chrome_android': {'version_added': false}, 'edge': {'version_added': false}, 'edge_mobile': {'version_added': false}, 'firefox': [{'version_added': '34'}, {'version_added': '24', 'flag': {'type': 'preference', 'name': 'layout.css.font-features.enabled', 'value_to_set': 'true'}}], 'firefox_android': [{'version_added': '34'}, {'version_added': '24', 'flag': {'type': 'preference', 'name': 'layout.css.font-features.enabled', 'value_to_set': 'true'}}], 'ie': {'version_added': false}, 'ie_mobile': {'version_added': false}, 'opera': {'version_added': false}, 'opera_android': {'version_added': false}, 'safari': {'version_added': '9.1'}, 'safari_ios': {'version_added': '9.3'}}, 'status': {'experimental': true, 'standard_track': true, 'deprecated': false}}}, 'character-variant': {'__compat': {'description': '<code>@character-variant</code>', 'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/@font-feature-values#@character-variant', 'support': {'webview_android': {'version_added': false}, 'chrome': {'version_added': false}, 'chrome_android': {'version_added': false}, 'edge': {'version_added': false}, 'edge_mobile': {'version_added': false}, 'firefox': [{'version_added': '34'}, {'version_added': '24', 'flag': {'type': 'preference', 'name': 'layout.css.font-features.enabled', 'value_to_set': 'true'}}], 'firefox_android': [{'version_added': '34'}, {'version_added': '24', 'flag': {'type': 'preference', 'name': 'layout.css.font-features.enabled', 'value_to_set': 'true'}}], 'ie': {'version_added': false}, 'ie_mobile': {'version_added': false}, 'opera': {'version_added': false}, 'opera_android': {'version_added': false}, 'safari': {'version_added': '9.1'}, 'safari_ios': {'version_added': '9.3'}}, 'status': {'experimental': true, 'standard_track': true, 'deprecated': false}}}, 'historical-forms': {'__compat': {'description': '<code>@historical-forms</code>', 'support': {'webview_android': {'version_added': false}, 'chrome': {'version_added': false}, 'chrome_android': {'version_added': false}, 'edge': {'version_added': false}, 'edge_mobile': {'version_added': false}, 'firefox': [{'version_added': '34'}, {'version_added': '24', 'flag': {'type': 'preference', 'name': 'layout.css.font-features.enabled', 'value_to_set': 'true'}}], 'firefox_android': [{'version_added': '34'}, {'version_added': '24', 'flag': {'type': 'preference', 'name': 'layout.css.font-features.enabled', 'value_to_set': 'true'}}], 'ie': {'version_added': false}, 'ie_mobile': {'version_added': false}, 'opera': {'version_added': false}, 'opera_android': {'version_added': false}, 'safari': {'version_added': '9.1'}, 'safari_ios': {'version_added': '9.3'}}, 'status': {'experimental': true, 'standard_track': true, 'deprecated': false}}}, 'ornaments': {'__compat': {'description': '<code>@ornaments</code>', 'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/@font-feature-values#@ornaments', 'support': {'webview_android': {'version_added': false}, 'chrome': {'version_added': false}, 'chrome_android': {'version_added': false}, 'edge': {'version_added': false}, 'edge_mobile': {'version_added': false}, 'firefox': [{'version_added': '34'}, {'version_added': '24', 'flag': {'type': 'preference', 'name': 'layout.css.font-features.enabled', 'value_to_set': 'true'}}], 'firefox_android': [{'version_added': '34'}, {'version_added': '24', 'flag': {'type': 'preference', 'name': 'layout.css.font-features.enabled', 'value_to_set': 'true'}}], 'ie': {'version_added': false}, 'ie_mobile': {'version_added': false}, 'opera': {'version_added': false}, 'opera_android': {'version_added': false}, 'safari': {'version_added': '9.1'}, 'safari_ios': {'version_added': '9.3'}}, 'status': {'experimental': true, 'standard_track': true, 'deprecated': false}}}, 'styleset': {'__compat': {'description': '<code>@styleset</code>', 'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/@font-feature-values#@styleset', 'support': {'webview_android': {'version_added': false}, 'chrome': {'version_added': false}, 'chrome_android': {'version_added': false}, 'edge': {'version_added': false}, 'edge_mobile': {'version_added': false}, 'firefox': [{'version_added': '34'}, {'version_added': '24', 'flag': {'type': 'preference', 'name': 'layout.css.font-features.enabled', 'value_to_set': 'true'}}], 'firefox_android': [{'version_added': '34'}, {'version_added': '24', 'flag': {'type': 'preference', 'name': 'layout.css.font-features.enabled', 'value_to_set': 'true'}}], 'ie': {'version_added': false}, 'ie_mobile': {'version_added': false}, 'opera': {'version_added': false}, 'opera_android': {'version_added': false}, 'safari': {'version_added': '9.1'}, 'safari_ios': {'version_added': '9.3'}}, 'status': {'experimental': true, 'standard_track': true, 'deprecated': false}}}, 'stylistic': {'__compat': {'description': '<code>@stylistic</code>', 'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/@font-feature-values#@stylistic', 'support': {'webview_android': {'version_added': false}, 'chrome': {'version_added': false}, 'chrome_android': {'version_added': false}, 'edge': {'version_added': false}, 'edge_mobile': {'version_added': false}, 'firefox': [{'version_added': '34'}, {'version_added': '24', 'flag': {'type': 'preference', 'name': 'layout.css.font-features.enabled', 'value_to_set': 'true'}}], 'firefox_android': [{'version_added': '34'}, {'version_added': '24', 'flag': {'type': 'preference', 'name': 'layout.css.font-features.enabled', 'value_to_set': 'true'}}], 'ie': {'version_added': false}, 'ie_mobile': {'version_added': false}, 'opera': {'version_added': false}, 'opera_android': {'version_added': false}, 'safari': {'version_added': '9.1'}, 'safari_ios': {'version_added': '9.3'}}, 'status': {'experimental': true, 'standard_track': true, 'deprecated': false}}}, 'swash': {'__compat': {'description': '<code>@swash</code>', 'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/@font-feature-values#@swash', 'support': {'webview_android': {'version_added': false}, 'chrome': {'version_added': false}, 'chrome_android': {'version_added': false}, 'edge': {'version_added': false}, 'edge_mobile': {'version_added': false}, 'firefox': [{'version_added': '34'}, {'version_added': '24', 'flag': {'type': 'preference', 'name': 'layout.css.font-features.enabled', 'value_to_set': 'true'}}], 'firefox_android': [{'version_added': '34'}, {'version_added': '24', 'flag': {'type': 'preference', 'name': 'layout.css.font-features.enabled', 'value_to_set': 'true'}}], 'ie': {'version_added': false}, 'ie_mobile': {'version_added': false}, 'opera': {'version_added': false}, 'opera_android': {'version_added': false}, 'safari': {'version_added': '9.1'}, 'safari_ios': {'version_added': '9.3'}}, 'status': {'experimental': true, 'standard_track': true, 'deprecated': false}}}}, '@keyframes': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/@keyframes', 'support': {'webview_android': [{'version_added': '43'}, {'prefix': '-webkit-', 'version_added': true}], 'chrome': [{'version_added': '43'}, {'prefix': '-webkit-', 'version_added': true}], 'chrome_android': [{'version_added': '43'}, {'prefix': '-webkit-', 'version_added': true}], 'edge': {'version_added': true}, 'edge_mobile': {'version_added': true}, 'firefox': [{'version_added': '16', 'notes': "<code>@keyframes</code> is unsupported in scoped stylesheets in Firefox (<a href='https://bugzil.la/830056'>bug 830056</a>)."}, {'version_added': '49', 'prefix': '-webkit-'}, {'version_added': '44', 'prefix': '-webkit-', 'flag': {'type': 'preference', 'name': 'layout.css.prefixes.webkit', 'value_to_set': 'true'}}, {'prefix': '-moz-', 'version_added': '5'}], 'firefox_android': [{'version_added': '16'}, {'version_added': '49', 'prefix': '-webkit-'}, {'version_added': '44', 'prefix': '-webkit-', 'flag': {'type': 'preference', 'name': 'layout.css.prefixes.webkit', 'value_to_set': 'true'}}, {'prefix': '-moz-', 'version_added': '5'}], 'ie': {'version_added': '10'}, 'ie_mobile': {'version_added': true}, 'opera': [{'version_added': '12.1', 'version_removed': '15'}, {'prefix': '-webkit-', 'version_added': '15'}, {'prefix': '-o-', 'version_added': '12', 'version_removed': '15'}], 'opera_android': [{'version_added': '12.1'}, {'prefix': '-webkit-', 'version_added': '15'}, {'prefix': '-o-', 'version_added': '12', 'version_removed': '15'}], 'safari': [{'version_added': '9'}, {'prefix': '-webkit-', 'version_added': '4'}], 'safari_ios': [{'version_added': true}, {'prefix': '-webkit-', 'version_added': true}]}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}, 'ignore_important_declarations': {'__compat': {'description': 'Ignore <code>!important</code> declarations', 'support': {'webview_android': {'version_added': null}, 'chrome': {'version_added': null}, 'chrome_android': {'version_added': null}, 'edge': {'version_added': null}, 'edge_mobile': {'version_added': null}, 'firefox': {'version_added': '19'}, 'firefox_android': {'version_added': '19'}, 'ie': {'version_added': null}, 'ie_mobile': {'version_added': null}, 'opera': {'version_added': null}, 'opera_android': {'version_added': null}, 'safari': {'version_added': null}, 'safari_ios': {'version_added': null}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}}}, 'properties': {'animation-delay': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/animation-delay', 'support': {'webview_android': [{'version_added': '43'}, {'prefix': '-webkit-', 'version_added': true}], 'chrome': [{'version_added': '43'}, {'prefix': '-webkit-', 'version_added': true}], 'chrome_android': {'version_added': null}, 'edge': {'version_added': true}, 'edge_mobile': [{'version_added': true}, {'prefix': '-webkit-', 'version_added': true}], 'firefox': [{'version_added': '16', 'notes': 'Before Firefox 57, Firefox does not repaint elements outside the viewport that are animated into the viewport with a delay. This bug affects only some platforms, such as Windows.'}, {'version_added': '49', 'prefix': '-webkit-'}, {'version_added': '44', 'prefix': '-webkit-', 'flag': {'type': 'preference', 'name': 'layout.css.prefixes.webkit', 'value_to_set': 'true'}}, {'prefix': '-moz-', 'version_added': '5'}], 'firefox_android': [{'version_added': '16'}, {'prefix': '-webkit-', 'version_added': '49'}, {'prefix': '-webkit-', 'version_added': '44', 'flag': {'type': 'preference', 'name': 'layout.css.prefixes.webkit', 'value_to_set': 'true'}}, {'prefix': '-moz-', 'version_added': '5'}], 'ie': {'version_added': '10'}, 'ie_mobile': {'version_added': true}, 'opera': [{'version_added': '12.1', 'version_removed': '15'}, {'prefix': '-webkit-', 'version_added': '15'}, {'prefix': '-o-', 'version_added': '12', 'version_removed': '15'}], 'opera_android': [{'version_added': '12.1', 'version_removed': '15'}, {'prefix': '-webkit-', 'version_added': '15'}, {'prefix': '-o-', 'version_added': '12', 'version_removed': '15'}], 'safari': [{'version_added': '9'}, {'prefix': '-webkit-', 'version_added': '4'}], 'safari_ios': [{'version_added': true}, {'prefix': '-webkit-', 'version_added': true}]}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}, 'animation-direction': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/animation-direction', 'support': {'webview_android': [{'version_added': '43'}, {'prefix': '-webkit-', 'version_added': true}], 'chrome': [{'version_added': '43'}, {'prefix': '-webkit-', 'version_added': true}], 'chrome_android': [{'version_added': '43'}, {'prefix': '-webkit-', 'version_added': true}], 'edge': [{'version_added': true}, {'prefix': '-webkit-', 'version_added': true}], 'edge_mobile': [{'version_added': true}, {'prefix': '-webkit-', 'version_added': true}], 'firefox': [{'version_added': '16'}, {'version_added': '49', 'prefix': '-webkit-'}, {'version_added': '44', 'prefix': '-webkit-', 'flag': {'type': 'preference', 'name': 'layout.css.prefixes.webkit', 'value_to_set': 'true'}}, {'prefix': '-moz-', 'version_added': '5'}], 'firefox_android': [{'version_added': '16'}, {'prefix': '-webkit-', 'version_added': '49'}, {'prefix': '-webkit-', 'version_added': '44', 'flag': {'type': 'preference', 'name': 'layout.css.prefixes.webkit', 'value_to_set': 'true'}}, {'prefix': '-moz-', 'version_added': '5'}], 'ie': {'version_added': '10'}, 'ie_mobile': {'version_added': true}, 'opera': [{'version_added': '12.1', 'version_removed': '15'}, {'prefix': '-webkit-', 'version_added': '15'}, {'prefix': '-o-', 'version_added': '12', 'version_removed': '15'}], 'opera_android': [{'version_added': '12.1', 'version_removed': '15'}, {'prefix': '-webkit-', 'version_added': '15'}, {'prefix': '-o-', 'version_added': '12', 'version_removed': '15'}], 'safari': [{'version_added': true}, {'prefix': '-webkit-', 'version_added': '4'}], 'safari_ios': [{'version_added': true}, {'prefix': '-webkit-', 'version_added': true}]}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}, 'reverse': {'__compat': {'description': '<code>reverse</code>', 'support': {'webview_android': {'version_added': false}, 'chrome': {'version_added': '19'}, 'chrome_android': {'version_added': true}, 'edge': {'version_added': true}, 'edge_mobile': {'version_added': true}, 'firefox': {'version_added': '16'}, 'firefox_android': {'version_added': '16'}, 'ie': {'version_added': '10'}, 'opera': {'version_added': true}, 'safari': {'version_added': true}, 'safari_ios': {'version_added': false}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}, 'alternate-reverse': {'__compat': {'description': '<code>alternate-reverse</code>', 'support': {'chrome': {'version_added': '19'}, 'chrome_android': {'version_added': true}, 'edge': {'version_added': true}, 'edge_mobile': {'version_added': true}, 'firefox': {'version_added': '16'}, 'firefox_android': {'version_added': '16'}, 'ie': {'version_added': '10'}, 'ie_mobile': {'version_added': true}, 'opera': {'version_added': true}, 'safari': {'version_added': true}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}}, 'animation-duration': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/animation-duration', 'support': {'webview_android': [{'version_added': true}, {'prefix': '-webkit-', 'version_added': '2'}], 'chrome': [{'version_added': '43'}, {'prefix': '-webkit-', 'version_added': '3'}], 'chrome_android': [{'version_added': '43'}, {'prefix': '-webkit-', 'version_added': true}], 'edge': [{'version_added': true}, {'prefix': '-webkit-', 'version_added': true}], 'edge_mobile': [{'version_added': true}, {'prefix': '-webkit-', 'version_added': true}], 'firefox': [{'version_added': '16'}, {'version_added': '49', 'prefix': '-webkit-'}, {'version_added': '44', 'prefix': '-webkit-', 'flag': {'type': 'preference', 'name': 'layout.css.prefixes.webkit', 'value_to_set': 'true'}}, {'prefix': '-moz-', 'version_added': '5'}], 'firefox_android': [{'version_added': '16'}, {'prefix': '-webkit-', 'version_added': '49'}, {'prefix': '-webkit-', 'version_added': '44', 'flag': {'type': 'preference', 'name': 'layout.css.prefixes.webkit', 'value_to_set': 'true'}}, {'prefix': '-moz-', 'version_added': '5'}], 'ie': {'version_added': '10'}, 'ie_mobile': {'version_added': true}, 'opera': [{'version_added': '12.1', 'version_removed': '15'}, {'prefix': '-webkit-', 'version_added': '15'}, {'prefix': '-o-', 'version_added': '12', 'version_removed': '15'}], 'opera_android': [{'version_added': '12.1', 'version_removed': '15'}, {'prefix': '-webkit-', 'version_added': '15'}, {'prefix': '-o-', 'version_added': '12', 'version_removed': '15'}], 'safari': {'prefix': '-webkit-', 'version_added': '4'}, 'safari_ios': {'prefix': '-webkit-', 'version_added': '4.2'}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}, 'animation-fill-mode': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/animation-fill-mode', 'support': {'webview_android': [{'version_added': '43'}, {'prefix': '-webkit-', 'version_added': true}], 'chrome': [{'version_added': '43'}, {'prefix': '-webkit-', 'version_added': true}], 'chrome_android': [{'version_added': '43'}, {'prefix': '-webkit-', 'version_added': true}], 'edge': [{'version_added': true}, {'prefix': '-webkit-', 'version_added': true}], 'edge_mobile': [{'version_added': true}, {'prefix': '-webkit-', 'version_added': true}], 'firefox': [{'version_added': '16'}, {'version_added': '49', 'prefix': '-webkit-'}, {'version_added': '44', 'prefix': '-webkit-', 'flag': {'type': 'preference', 'name': 'layout.css.prefixes.webkit', 'value_to_set': 'true'}}, {'prefix': '-moz-', 'version_added': '5'}], 'firefox_android': [{'version_added': '16'}, {'prefix': '-webkit-', 'version_added': '49'}, {'prefix': '-webkit-', 'version_added': '44', 'flag': {'type': 'preference', 'name': 'layout.css.prefixes.webkit', 'value_to_set': 'true'}}, {'prefix': '-moz-', 'version_added': '5'}], 'ie': {'version_added': '10'}, 'ie_mobile': {'version_added': true}, 'opera': [{'version_added': '12.1', 'version_removed': '15'}, {'prefix': '-webkit-', 'version_added': '15'}, {'prefix': '-o-', 'version_added': '12', 'version_removed': '15'}], 'opera_android': [{'version_added': '12.1', 'version_removed': '15'}, {'prefix': '-webkit-', 'version_added': '15'}, {'prefix': '-o-', 'version_added': '12', 'version_removed': '15'}], 'safari': [{'version_added': true}, {'prefix': '-webkit-', 'version_added': '4'}], 'safari_ios': [{'version_added': true}, {'prefix': '-webkit-', 'version_added': true}]}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}, 'animation-iteration-count': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/animation-iteration-count', 'support': {'webview_android': [{'version_added': '43'}, {'prefix': '-webkit-', 'version_added': true}], 'chrome': [{'version_added': '43'}, {'prefix': '-webkit-', 'version_added': true}], 'chrome_android': [{'version_added': '43'}, {'prefix': '-webkit-', 'version_added': true}], 'edge': [{'version_added': true}, {'prefix': '-webkit-', 'version_added': true}], 'edge_mobile': [{'version_added': true}, {'prefix': '-webkit-', 'version_added': true}], 'firefox': [{'version_added': '16'}, {'version_added': '49', 'prefix': '-webkit-'}, {'version_added': '44', 'prefix': '-webkit-', 'flag': {'type': 'preference', 'name': 'layout.css.prefixes.webkit', 'value_to_set': 'true'}}, {'prefix': '-moz-', 'version_added': '5'}], 'firefox_android': [{'version_added': '16'}, {'prefix': '-webkit-', 'version_added': '49'}, {'prefix': '-webkit-', 'version_added': '44', 'flag': {'type': 'preference', 'name': 'layout.css.prefixes.webkit', 'value_to_set': 'true'}}, {'prefix': '-moz-', 'version_added': '5'}], 'ie': {'version_added': '10'}, 'ie_mobile': {'version_added': true}, 'opera': [{'version_added': '12.1', 'version_removed': '15'}, {'prefix': '-webkit-', 'version_added': '15'}, {'prefix': '-o-', 'version_added': '12', 'version_removed': '15'}], 'opera_android': [{'version_added': '12.1', 'version_removed': '15'}, {'prefix': '-webkit-', 'version_added': '15'}, {'prefix': '-o-', 'version_added': '12', 'version_removed': '15'}], 'safari': [{'version_added': true}, {'prefix': '-webkit-', 'version_added': '4'}], 'safari_ios': [{'version_added': true}, {'prefix': '-webkit-', 'version_added': true}]}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}, 'animation-name': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/animation-name', 'support': {'webview_android': [{'version_added': '43'}, {'prefix': '-webkit-', 'version_added': true}], 'chrome': [{'version_added': '43'}, {'prefix': '-webkit-', 'version_added': true}], 'chrome_android': [{'version_added': '43'}, {'prefix': '-webkit-', 'version_added': true}], 'edge': [{'version_added': true}, {'prefix': '-webkit-', 'version_added': true}], 'edge_mobile': [{'version_added': true}, {'prefix': '-webkit-', 'version_added': true}], 'firefox': [{'version_added': '16'}, {'prefix': '-webkit-', 'version_added': '49'}, {'prefix': '-webkit-', 'version_added': '44', 'flag': {'type': 'preference', 'name': 'layout.css.prefixes.webkit', 'value_to_set': 'true'}}, {'prefix': '-moz-', 'version_added': '5'}], 'firefox_android': [{'version_added': '16'}, {'version_added': '49', 'prefix': '-webkit-'}, {'version_added': '44', 'prefix': '-webkit-', 'flag': {'type': 'preference', 'name': 'layout.css.prefixes.webkit', 'value_to_set': 'true'}}, {'prefix': '-moz-', 'version_added': '5'}], 'ie': {'version_added': '10'}, 'ie_mobile': {'version_added': true}, 'opera': [{'version_added': '12.1', 'version_removed': '15'}, {'prefix': '-webkit-', 'version_added': '15'}, {'prefix': '-o-', 'version_added': '12', 'version_removed': '15'}], 'opera_android': [{'version_added': '12.1', 'version_removed': '15'}, {'prefix': '-webkit-', 'version_added': '15'}, {'prefix': '-o-', 'version_added': '12', 'version_removed': '15'}], 'safari': [{'version_added': true}, {'prefix': '-webkit-', 'version_added': '4'}], 'safari_ios': [{'version_added': true}, {'prefix': '-webkit-', 'version_added': true}]}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}, 'animation-play-state': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/animation-play-state', 'support': {'webview_android': [{'version_added': '43'}, {'prefix': '-webkit-', 'version_added': true}], 'chrome': [{'version_added': '43'}, {'prefix': '-webkit-', 'version_added': true}], 'chrome_android': [{'version_added': '43'}, {'prefix': '-webkit-', 'version_added': true}], 'edge': [{'version_added': true}, {'prefix': '-webkit-', 'version_added': true}], 'edge_mobile': [{'version_added': true}, {'prefix': '-webkit-', 'version_added': true}], 'firefox': [{'version_added': '16'}, {'prefix': '-webkit-', 'version_added': '49'}, {'prefix': '-webkit-', 'version_added': '44', 'flag': {'type': 'preference', 'name': 'layout.css.prefixes.webkit', 'value_to_set': 'true'}}, {'prefix': '-moz-', 'version_added': '5'}], 'firefox_android': [{'version_added': '16'}, {'version_added': '49', 'prefix': '-webkit-'}, {'version_added': '44', 'prefix': '-webkit-', 'flag': {'type': 'preference', 'name': 'layout.css.prefixes.webkit', 'value_to_set': 'true'}}, {'prefix': '-moz-', 'version_added': '5'}], 'ie': {'version_added': '10'}, 'ie_mobile': {'version_added': true}, 'opera': [{'version_added': '12.1', 'version_removed': '15'}, {'prefix': '-webkit-', 'version_added': '15'}, {'prefix': '-o-', 'version_added': '12', 'version_removed': '15'}], 'opera_android': [{'version_added': '12.1', 'version_removed': '15'}, {'prefix': '-webkit-', 'version_added': '15'}, {'prefix': '-o-', 'version_added': '12', 'version_removed': '15'}], 'safari': [{'version_added': true}, {'prefix': '-webkit-', 'version_added': true}], 'safari_ios': [{'version_added': true}, {'prefix': '-webkit-', 'version_added': true}]}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}, 'animation-timing-function': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/animation-timing-function', 'support': {'webview_android': [{'version_added': true}, {'prefix': '-webkit-', 'version_added': true}], 'chrome': [{'version_added': '43'}, {'prefix': '-webkit-', 'version_added': true}], 'chrome_android': [{'version_added': '43'}, {'prefix': '-webkit-', 'version_added': true}], 'edge': [{'version_added': true}, {'prefix': '-webkit-', 'version_added': true}], 'edge_mobile': [{'version_added': true}, {'prefix': '-webkit-', 'version_added': true}], 'firefox': [{'version_added': '16'}, {'prefix': '-webkit-', 'version_added': '49'}, {'prefix': '-webkit-', 'version_added': '44', 'flag': {'type': 'preference', 'name': 'layout.css.prefixes.webkit', 'value_to_set': 'true'}}, {'prefix': '-moz-', 'version_added': '5'}], 'firefox_android': [{'version_added': '16'}, {'version_added': '49', 'prefix': '-webkit-'}, {'version_added': '44', 'prefix': '-webkit-', 'flag': {'type': 'preference', 'name': 'layout.css.prefixes.webkit', 'value_to_set': 'true'}}, {'prefix': '-moz-', 'version_added': '5'}], 'ie': {'version_added': '10'}, 'ie_mobile': {'version_added': true}, 'opera': [{'version_added': '12.1', 'version_removed': '15'}, {'prefix': '-webkit-', 'version_added': '15'}, {'prefix': '-o-', 'version_added': '12', 'version_removed': '15'}], 'opera_android': [{'version_added': '12.1', 'version_removed': '15'}, {'prefix': '-webkit-', 'version_added': '15'}, {'prefix': '-o-', 'version_added': '12', 'version_removed': '15'}], 'safari': [{'version_added': true}, {'prefix': '-webkit-', 'version_added': '4'}], 'safari_ios': [{'version_added': true}, {'prefix': '-webkit-', 'version_added': true}]}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}, 'animation': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/animation', 'support': {'webview_android': [{'version_added': true}, {'prefix': '-webkit-', 'version_added': '2.1', 'notes': "The <a href='https://developer.mozilla.org/docs/Web/CSS/animation-fill-mode'><code>animation-fill-mode</code></a> property is not supported in Android browsers below 2.3."}], 'chrome': [{'version_added': '43'}, {'prefix': '-webkit-', 'version_added': true}], 'chrome_android': [{'version_added': '43'}, {'prefix': '-webkit-', 'version_added': true}], 'edge': [{'version_added': true}, {'prefix': '-webkit-', 'version_added': true}], 'edge_mobile': [{'version_added': true}, {'prefix': '-webkit-', 'version_added': true}], 'firefox': [{'version_added': '16'}, {'prefix': '-webkit-', 'version_added': '49'}, {'prefix': '-webkit-', 'version_added': '44', 'flag': {'type': 'preference', 'name': 'layout.css.prefixes.webkit', 'value_to_set': 'true'}}, {'prefix': '-moz-', 'version_added': '5'}], 'firefox_android': [{'version_added': '16'}, {'version_added': '49', 'prefix': '-webkit-'}, {'version_added': '44', 'prefix': '-webkit-', 'flag': {'type': 'preference', 'name': 'layout.css.prefixes.webkit', 'value_to_set': 'true'}}, {'prefix': '-moz-', 'version_added': '5'}], 'ie': {'version_added': '10'}, 'opera': [{'version_added': '12'}, {'prefix': '-o-', 'version_added': true, 'version_removed': '12.50', 'notes': "See the <a href='http://my.opera.com/ODIN/blog/2012/08/03/a-hot-opera-12-50-summer-time-snapshot'>Opera 12.50 release notes</a>."}], 'safari': [{'version_added': true}, {'prefix': '-webkit-', 'version_added': '4'}], 'safari_ios': [{'version_added': true}, {'prefix': '-webkit-', 'version_added': true}]}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}, 'background-attachment': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/background-attachment', 'support': {'webview_android': {'version_added': true}, 'chrome': {'version_added': '1'}, 'chrome_android': {'version_added': true}, 'edge': {'version_added': '12'}, 'edge_mobile': {'version_added': true}, 'firefox': {'version_added': '1'}, 'firefox_android': {'version_added': '4'}, 'ie': {'version_added': '4'}, 'ie_mobile': {'version_added': true}, 'opera': {'version_added': '3.5'}, 'opera_android': {'version_added': '10'}, 'safari': {'version_added': '1'}, 'safari_ios': {'version_added': '3.2'}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}, 'multiple_backgrounds': {'__compat': {'description': 'Multiple backgrounds', 'support': {'webview_android': {'version_added': true}, 'chrome': {'version_added': '1'}, 'chrome_android': {'version_added': true}, 'edge': {'version_added': '12'}, 'edge_mobile': {'version_added': true}, 'firefox': {'version_added': '3.6'}, 'firefox_android': {'version_added': true}, 'ie': {'version_added': '9'}, 'ie_mobile': {'version_added': true}, 'opera': {'version_added': '10.5'}, 'opera_android': {'version_added': '10'}, 'safari': {'version_added': '1.3'}, 'safari_ios': {'version_added': '3.2'}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}, 'local': {'__compat': {'description': '<code>local</code>', 'support': {'webview_android': {'version_added': null}, 'chrome': {'version_added': '1'}, 'chrome_android': {'version_added': true}, 'edge': {'version_added': '12'}, 'edge_mobile': {'version_added': true}, 'firefox': {'version_added': '25'}, 'firefox_android': {'version_added': '25'}, 'ie': {'version_added': '9'}, 'ie_mobile': {'version_added': true}, 'opera': {'version_added': '10.5'}, 'opera_android': {'version_added': null}, 'safari': {'version_added': '5'}, 'safari_ios': {'version_added': null}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}}, 'background-clip': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/background-clip', 'support': {'webview_android': {'version_added': '4.1'}, 'chrome': {'version_added': '1', 'notes': 'Webkit also supports the prefixed version of this property, and in that case, in addition to the current keywords, the alternative synonyms are: <code>padding</code>, <code>border</code>, and <code>content</code>.'}, 'chrome_android': {'version_added': true}, 'edge': {'version_added': '12'}, 'edge_mobile': {'version_added': true}, 'firefox': {'version_added': '4', 'notes': 'Firefox supported, from version 1 to 3.6 included, a different and prefixed syntax: <code>-moz-background-clip: padding | border</code>.'}, 'firefox_android': {'version_added': '14'}, 'ie': {'version_added': '9', 'notes': 'In IE 7 and IE 8 of Internet Explorer, this property always behaved like <code>background-clip: padding</code> when <code>overflow</code> was <code>hidden</code>, <code>auto</code>, or <code>scroll</code>.'}, 'ie_mobile': {'version_added': '7.1'}, 'opera': {'version_added': '10.5'}, 'opera_android': {'version_added': '12.1'}, 'safari': {'version_added': '3', 'notes': 'Webkit also supports the prefixed version of this property, and in that case, in addition to the current keywords, the alternative synonyms are: <code>padding</code>, <code>border</code>, and <code>content</code>.'}, 'safari_ios': {'version_added': true}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}, 'content-box': {'__compat': {'description': '<code>content-box</code>', 'support': {'webview_android': {'version_added': '4.1'}, 'chrome': {'version_added': '1'}, 'chrome_android': {'version_added': true}, 'edge': {'version_added': '12'}, 'edge_mobile': {'version_added': true}, 'firefox': {'version_added': '4', 'notes': 'Firefox supported, from version 1 to 3.6 included, a different and prefixed syntax: <code>-moz-background-clip: padding | border</code>.'}, 'firefox_android': {'version_added': '14'}, 'ie': {'version_added': '9', 'notes': 'In IE 7 and IE 9 of Internet Explorer, it always behaved like <code>background-clip: padding</code> if <code>overflow: hidden | auto | scroll</code>'}, 'ie_mobile': {'version_added': '7.1'}, 'opera': {'version_added': '10.5'}, 'opera_android': {'version_added': '12.1'}, 'safari': {'version_added': '3'}, 'safari_ios': {'version_added': true}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}, 'text': {'__compat': {'description': '<code>text</code>', 'support': {'webview_android': {'version_added': null}, 'chrome': {'version_added': true, 'prefix': '-webkit-', 'notes': "Support the prefixed version of the property only; according to the <a href='https://webkit.org/blog/164/background-clip-text/'>official blog</a>, WebKit does not include text decorations or shadows in the clipping."}, 'chrome_android': {'version_added': null}, 'edge': [{'version_added': '12', 'prefix': '-webkit-', 'notes': "Support the prefixed version of the property only; according to the <a href='https://webkit.org/blog/164/background-clip-text/'>official blog</a>, WebKit does not include text decorations or shadows in the clipping."}, {'version_added': '15'}], 'edge_mobile': {'version_added': true}, 'firefox': {'version_added': '49', 'notes': 'In Firefox 48, it was not activated by default and its support could be activated by setting <code>layout.css.background-clip-text.enabled</code> pref to <code>true</code>.'}, 'firefox_android': {'version_added': '49', 'notes': 'In Firefox 48, it was not activated by default and its support could be activated by setting <code>layout.css.background-clip-text.enabled</code> pref to <code>true</code>.'}, 'ie': {'version_added': false}, 'ie_mobile': {'version_added': false}, 'opera': {'version_added': true, 'prefix': '-webkit-', 'notes': "Support the prefixed version of the property only; according to the <a href='https://webkit.org/blog/164/background-clip-text/'>official blog</a>, WebKit does not include text decorations or shadows in the clipping."}, 'opera_android': {'version_added': true, 'prefix': '-webkit-', 'notes': "Support the prefixed version of the property only; according to the <a href='https://webkit.org/blog/164/background-clip-text/'>official blog</a>, WebKit does not include text decorations or shadows in the clipping."}, 'safari': {'version_added': true, 'prefix': '-webkit-', 'notes': "Support the prefixed version of the property only; according to the <a href='https://webkit.org/blog/164/background-clip-text/'>official blog</a>, WebKit does not include text decorations or shadows in the clipping."}, 'safari_ios': {'version_added': true, 'prefix': '-webkit-', 'notes': "Support the prefixed version of the property only; according to the <a href='https://webkit.org/blog/164/background-clip-text/'>official blog</a>, WebKit does not include text decorations or shadows in the clipping."}}, 'status': {'experimental': true, 'standard_track': true, 'deprecated': false}}}}, 'background-color': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/background-color', 'support': {'webview_android': {'version_added': true}, 'chrome': {'version_added': '1'}, 'chrome_android': {'version_added': true}, 'edge': {'version_added': '12'}, 'edge_mobile': {'version_added': true}, 'firefox': {'version_added': '1'}, 'firefox_android': {'version_added': '4'}, 'ie': {'version_added': '4', 'notes': 'In Internet Explorer 8 and 9, there is a bug where a computed <code>background-color</code> of <code>transparent</code> causes <code>click</code> events to not get fired on overlaid elements.'}, 'ie_mobile': {'version_added': true}, 'opera': {'version_added': '3.5'}, 'opera_android': {'version_added': true}, 'safari': {'version_added': '1'}, 'safari_ios': {'version_added': true}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}, 'alpha_ch_for_hex': {'__compat': {'description': 'Alpha channel for hex values', 'support': {'webview_android': {'version_added': '52'}, 'chrome': {'version_added': '52'}, 'chrome_android': {'version_added': '52'}, 'edge': {'version_added': false}, 'edge_mobile': {'version_added': false}, 'firefox': {'version_added': false}, 'firefox_android': {'version_added': false}, 'ie': {'version_added': false}, 'ie_mobile': {'version_added': false}, 'opera': {'version_added': false}, 'opera_android': {'version_added': false}, 'safari': {'version_added': false}, 'safari_ios': {'version_added': false}}, 'status': {'experimental': true, 'standard_track': true, 'deprecated': false}}}}, 'background-image': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/background-image', 'support': {'webview_android': {'version_added': true}, 'chrome': {'version_added': '1'}, 'chrome_android': {'version_added': true}, 'edge': {'version_added': '12'}, 'edge_mobile': {'version_added': true}, 'firefox': {'version_added': '1', 'notes': ['If the <code>browser.display.use_document_colors</code> user preference in <code>about:config</code> is set to <code>false</code>, background images will not be displayed.']}, 'firefox_android': {'version_added': true}, 'ie': {'version_added': '4'}, 'ie_mobile': {'version_added': true}, 'opera': {'version_added': '3.5'}, 'opera_android': {'version_added': true}, 'safari': {'version_added': '1'}, 'safari_ios': {'version_added': true}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}, 'multiple_backgrounds': {'__compat': {'description': 'Multiple backgrounds', 'support': {'webview_android': {'version_added': true}, 'chrome': {'version_added': '1'}, 'chrome_android': {'version_added': true}, 'edge': {'version_added': '12'}, 'edge_mobile': {'version_added': true}, 'firefox': {'version_added': '3.6'}, 'firefox_android': {'version_added': true}, 'ie': {'version_added': '9'}, 'ie_mobile': {'version_added': true}, 'opera': {'version_added': true}, 'opera_android': {'version_added': true}, 'safari': {'version_added': '1.3'}, 'safari_ios': {'version_added': true}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}, 'gradients': {'__compat': {'description': 'Gradients', 'support': {'webview_android': {'version_added': true}, 'chrome': {'version_added': '1', 'notes': 'Some versions support only experimental gradients prefixed with <code>-webkit</code>.'}, 'chrome_android': {'version_added': true, 'notes': 'Some versions support only experimental gradients prefixed with <code>-webkit</code>.'}, 'edge': {'version_added': '12'}, 'edge_mobile': {'version_added': true}, 'firefox': {'version_added': '3.6', 'notes': 'Some versions support only experimental gradients prefixed with <code>-moz</code>.'}, 'firefox_android': {'version_added': true, 'notes': 'Some versions support only experimental gradients prefixed with <code>-moz</code>.'}, 'ie': {'version_added': '10'}, 'ie_mobile': {'version_added': true}, 'opera': {'version_added': '11', 'notes': 'Some versions support only experimental gradients prefixed with <code>-o</code>.'}, 'opera_android': {'version_added': true, 'notes': 'Some versions support only experimental gradients prefixed with <code>-o</code>.'}, 'safari': {'version_added': '4', 'notes': 'Some versions support only experimental gradients prefixed with <code>-webkit</code>.'}, 'safari_ios': {'version_added': true, 'notes': 'Some versions support only experimental gradients prefixed with <code>-webkit</code>.'}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}, 'svg_images': {'__compat': {'description': 'SVG images', 'support': {'webview_android': {'version_added': false}, 'chrome': {'version_added': '8'}, 'chrome_android': {'version_added': true}, 'edge': {'version_added': '12'}, 'edge_mobile': {'version_added': true}, 'firefox': {'version_added': '4'}, 'firefox_android': {'version_added': true}, 'ie': {'version_added': '9'}, 'ie_mobile': {'version_added': true}, 'opera': {'version_added': '9.5'}, 'opera_android': {'version_added': true}, 'safari': {'version_added': '5', 'notes': 'Support of SVG in CSS background is incomplete.'}, 'safari_ios': {'version_added': '5', 'notes': 'Support of SVG in CSS background is incomplete.'}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}, 'element': {'__compat': {'description': '<code>element()</code>', 'support': {'webview_android': {'version_added': false}, 'chrome': {'version_added': false}, 'chrome_android': {'version_added': false}, 'edge': {'version_added': false}, 'edge_mobile': {'version_added': false}, 'firefox': {'version_added': true, 'notes': '<code>element()</code> is supported only in its <code>-moz-element()</code> prefixed version'}, 'firefox_android': {'version_added': true, 'notes': '<code>element()</code> is supported only in its <code>-moz-element()</code> prefixed version'}, 'ie': {'version_added': false}, 'ie_mobile': {'version_added': false}, 'opera': {'version_added': false}, 'opera_android': {'version_added': false}, 'safari': {'version_added': false}, 'safari_ios': {'version_added': false}}, 'status': {'experimental': true, 'standard_track': true, 'deprecated': false}}}, 'image-rect': {'__compat': {'description': '<code>image-rect()</code>', 'support': {'webview_android': {'version_added': false}, 'chrome': {'version_added': false}, 'chrome_android': {'version_added': false}, 'edge': {'version_added': false}, 'edge_mobile': {'version_added': false}, 'firefox': {'prefix': '-moz-', 'version_added': true, 'notes': '<code>image-rect()</code> is supported only in its <code>-moz-image-rect()</code> prefixed version.'}, 'firefox_android': {'prefix': '-moz-', 'version_added': true, 'notes': '<code>image-rect()</code> is supported only in its <code>-moz-image-rect()</code> prefixed version.'}, 'ie': {'version_added': false}, 'ie_mobile': {'version_added': false}, 'opera': {'version_added': false}, 'opera_android': {'version_added': false}, 'safari': {'version_added': false}, 'safari_ios': {'version_added': false}}, 'status': {'experimental': true, 'standard_track': true, 'deprecated': false}}}, 'any_image': {'__compat': {'description': 'Any <code>&lt;image&gt;</code> value', 'support': {'webview_android': {'version_added': true}, 'chrome': {'version_added': true}, 'chrome_android': {'version_added': true}, 'edge': {'version_added': null}, 'edge_mobile': {'version_added': null}, 'firefox': {'version_added': false}, 'firefox_android': {'version_added': false}, 'ie': {'version_added': null}, 'ie_mobile': {'version_added': null}, 'opera': {'version_added': null}, 'opera_android': {'version_added': null}, 'safari': {'version_added': null}, 'safari_ios': {'version_added': null}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}}, 'background-origin': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/background-origin', 'support': {'webview_android': {'version_added': '4.1'}, 'chrome': {'version_added': '1', 'notes': 'Webkit also supports the prefixed version of this property, and in that case, in addition to the current keywords, the alternative synonyms are: <code>padding</code>, <code>border</code>, and <code>content</code>.'}, 'chrome_android': {'version_added': true}, 'edge': {'version_added': '12'}, 'edge_mobile': {'version_added': true}, 'firefox': {'version_added': '4', 'notes': ['Firefox supported, from version 1 to 3.6 included, a different and prefixed syntax: <code>-moz-background-clip: padding | border</code>.', 'Since Firefox 49, also supports the <code>-webkit</code> prefixed version of the property.']}, 'firefox_android': {'version_added': '14'}, 'ie': {'version_added': '9', 'notes': 'In IE 7 and before, Internet explorer was behaving as if <code>background-origin: border-box</code> was set. In Internet Explorer 8, as if <code>background-origin: padding-box</code>, the regular default value, was set.'}, 'ie_mobile': {'version_added': '7.1'}, 'opera': {'version_added': '10.5'}, 'opera_android': {'version_added': '12.1'}, 'safari': {'version_added': '3', 'notes': 'Webkit also supports the prefixed version of this property, and in that case, in addition to the current keywords, the alternative synonyms are: <code>padding</code>, <code>border</code>, and <code>content</code>.'}, 'safari_ios': {'version_added': true}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}, 'content-box': {'__compat': {'description': '<code>content-box</code>', 'support': {'webview_android': {'version_added': '4.1'}, 'chrome': {'version_added': '1'}, 'chrome_android': {'version_added': true}, 'edge': {'version_added': '12'}, 'edge_mobile': {'version_added': true}, 'firefox': {'version_added': '4', 'notes': 'Firefox supported, from version 1 to 3.6 included, a different and prefixed syntax: <code>-moz-background-clip: padding | border</code>.'}, 'firefox_android': {'version_added': '14'}, 'ie': {'version_added': '9', 'notes': 'In IE 7 and IE 9 of Internet Explorer, it always behaved like <code>background-clip: padding</code> if <code>overflow: hidden | auto | scroll</code>.'}, 'ie_mobile': {'version_added': '7.1'}, 'opera': {'version_added': '10.5'}, 'opera_android': {'version_added': '12.1'}, 'safari': {'version_added': '3', 'notes': 'Webkit also supports the prefixed version of this property, and in that case, in addition to the current keywords, the alternative synonyms are: <code>padding</code>, <code>border</code>, and <code>content</code>.'}, 'safari_ios': {'version_added': true}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}}, 'background-position-x': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/background-position-x', 'support': {'webview_android': {'version_added': true}, 'chrome': {'version_added': true}, 'chrome_android': {'version_added': true}, 'edge': {'version_added': '12'}, 'edge_mobile': {'version_added': true}, 'firefox': {'version_added': '49'}, 'firefox_android': {'version_added': '49'}, 'ie': {'version_added': '6'}, 'ie_mobile': {'version_added': null}, 'opera': {'version_added': true}, 'opera_android': {'version_added': null}, 'safari': {'version_added': true}, 'safari_ios': {'version_added': null}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}, 'two_value_syntax': {'__compat': {'description': 'Two-value syntax (support for offsets from any edge)', 'support': {'webview_android': {'version_added': false}, 'chrome': {'version_added': false}, 'chrome_android': {'version_added': false}, 'edge': {'version_added': '12'}, 'edge_mobile': {'version_added': true}, 'firefox': {'version_added': '49'}, 'firefox_android': {'version_added': '49'}, 'ie': {'version_added': '9'}, 'ie_mobile': {'version_added': null}, 'opera': {'version_added': false}, 'opera_android': {'version_added': false}, 'safari': {'version_added': false}, 'safari_ios': {'version_added': false}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}}, 'background-position-y': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/background-position-y', 'support': {'webview_android': {'version_added': true}, 'chrome': {'version_added': true}, 'chrome_android': {'version_added': true}, 'edge': {'version_added': '12'}, 'edge_mobile': {'version_added': true}, 'firefox': {'version_added': '49'}, 'firefox_android': {'version_added': '49'}, 'ie': {'version_added': '6'}, 'ie_mobile': {'version_added': null}, 'opera': {'version_added': true}, 'opera_android': {'version_added': null}, 'safari': {'version_added': true}, 'safari_ios': {'version_added': null}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}, '2_value_syntax': {'__compat': {'description': 'Two-value syntax (support for offsets from any edge)', 'support': {'webview_android': {'version_added': false}, 'chrome': {'version_added': false}, 'chrome_android': {'version_added': false}, 'edge': {'version_added': '12'}, 'edge_mobile': {'version_added': true}, 'firefox': {'version_added': '49'}, 'firefox_android': {'version_added': '49'}, 'ie': {'version_added': '9'}, 'ie_mobile': {'version_added': null}, 'opera': {'version_added': false}, 'opera_android': {'version_added': false}, 'safari': {'version_added': false}, 'safari_ios': {'version_added': false}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}}, 'background-position': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/background-position', 'support': {'webview_android': {'version_added': true}, 'chrome': {'version_added': '1'}, 'chrome_android': {'version_added': true}, 'edge': {'version_added': '12'}, 'edge_mobile': {'version_added': true}, 'firefox': {'version_added': '1'}, 'firefox_android': {'version_added': true}, 'ie': {'version_added': '4'}, 'ie_mobile': {'version_added': true}, 'opera': {'version_added': '3.5'}, 'opera_android': {'version_added': true}, 'safari': {'version_added': '1'}, 'safari_ios': {'version_added': true}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}, 'multiple_backgrounds': {'__compat': {'description': 'Multiple backgrounds', 'support': {'webview_android': {'version_added': true}, 'chrome': {'version_added': '1'}, 'chrome_android': {'version_added': true}, 'edge': {'version_added': '12'}, 'edge_mobile': {'version_added': true}, 'firefox': {'version_added': '3.6'}, 'firefox_android': {'version_added': true}, 'ie': {'version_added': '9'}, 'ie_mobile': {'version_added': true}, 'opera': {'version_added': '10.5'}, 'opera_android': {'version_added': true}, 'safari': {'version_added': '1.3'}, 'safari_ios': {'version_added': true}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}, '4_value_syntax': {'__compat': {'description': 'Four-value syntax (support for offsets from any edge)', 'support': {'webview_android': {'version_added': true}, 'chrome': {'version_added': '25'}, 'chrome_android': {'version_added': true}, 'edge': {'version_added': '12'}, 'edge_mobile': {'version_added': true}, 'firefox': {'version_added': '13'}, 'firefox_android': {'version_added': '14'}, 'ie': {'version_added': '9'}, 'ie_mobile': {'version_added': true}, 'opera': {'version_added': '10.5'}, 'opera_android': {'version_added': true}, 'safari': {'version_added': '7'}, 'safari_ios': {'version_added': true}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}}, 'background-repeat': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/background-repeat', 'support': {'webview_android': {'version_added': null}, 'chrome': {'version_added': '1'}, 'chrome_android': {'version_added': null}, 'edge': {'version_added': '12'}, 'edge_mobile': {'version_added': true}, 'firefox': {'version_added': '1'}, 'firefox_android': {'version_added': '4'}, 'ie': {'version_added': '4'}, 'ie_mobile': {'version_added': null}, 'opera': {'version_added': '3.5'}, 'opera_android': {'version_added': null}, 'safari': {'version_added': '1'}, 'safari_ios': {'version_added': null}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}, 'multiple_backgrounds': {'__compat': {'description': 'Multiple backgrounds', 'support': {'webview_android': {'version_added': null}, 'chrome': {'version_added': '1'}, 'chrome_android': {'version_added': null}, 'edge': {'version_added': '12'}, 'edge_mobile': {'version_added': true}, 'firefox': {'version_added': '3.6'}, 'firefox_android': {'version_added': true}, 'ie': {'version_added': '9'}, 'ie_mobile': {'version_added': null}, 'opera': {'version_added': '10.5'}, 'opera_android': {'version_added': null}, 'safari': {'version_added': '1.3'}, 'safari_ios': {'version_added': null}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}, '2-value': {'__compat': {'description': 'Two-value syntax (different values for x & y directions)', 'support': {'webview_android': {'version_added': null}, 'chrome': {'version_added': true}, 'chrome_android': {'version_added': null}, 'edge': {'version_added': '12'}, 'edge_mobile': {'version_added': true}, 'firefox': {'version_added': '13'}, 'firefox_android': {'version_added': '14'}, 'ie': {'version_added': '9'}, 'ie_mobile': {'version_added': null}, 'opera': {'version_added': true}, 'opera_android': {'version_added': null}, 'safari': {'version_added': true}, 'safari_ios': {'version_added': null}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}, 'round_space': {'__compat': {'description': '<code>round</code> and <code>space</code> keywords', 'support': {'webview_android': {'version_added': null}, 'chrome': {'version_added': true}, 'chrome_android': {'version_added': null}, 'edge': {'version_added': '12'}, 'edge_mobile': {'version_added': true}, 'firefox': {'version_added': '49'}, 'firefox_android': {'version_added': '49'}, 'ie': {'version_added': '9'}, 'ie_mobile': {'version_added': null}, 'opera': {'version_added': '10.5'}, 'opera_android': {'version_added': null}, 'safari': {'version_added': true}, 'safari_ios': {'version_added': null}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}}, 'background-size': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/background-size', 'support': {'webview_android': {'version_added': '2.3'}, 'chrome': [{'prefix': '-webkit-', 'version_added': '1', 'notes': 'WebKit-based browsers originally implemented an older draft of CSS3 <code>background-size</code> in which an omitted second value is treated as duplicating the first value; this draft does not include the <code>contain</code> or <code>cover</code> keywords.'}, {'version_added': '3', 'notes': 'WebKit-based browsers originally implemented an older draft of CSS3 <code>background-size</code> in which an omitted second value is treated as duplicating the first value; this draft does not include the <code>contain</code> or <code>cover</code> keywords.'}], 'chrome_android': {'version_added': true}, 'edge': {'version_added': '12'}, 'edge_mobile': {'version_added': true}, 'firefox': [{'prefix': '-moz-', 'version_added': '3.6'}, {'prefix': '-webkit-', 'version_added': '49'}, {'version_added': '4'}], 'firefox_android': [{'prefix': '-moz-', 'version_added': '1'}, {'prefix': '-webkit-', 'version_added': '49'}, {'version_added': '4'}], 'ie': {'version_added': '9'}, 'ie_mobile': {'version_added': true}, 'opera': [{'prefix': '-o-', 'version_added': '9.5', 'notes': "Opera 9.5's computation of the background positioning area is incorrect for fixed backgrounds. Opera 9.5 also interprets the two-value form as a horizontal scaling factor and, from appearances, a vertical clipping dimension. This has been fixed in Opera 10."}, {'version_added': '10'}], 'opera_android': {'version_added': true}, 'safari': [{'prefix': '-webkit-', 'version_added': '3', 'notes': 'WebKit-based browsers originally implemented an older draft of CSS3 <code>background-size</code> in which an omitted second value is treated as duplicating the first value; this draft does not include the <code>contain</code> or <code>cover</code> keywords.'}, {'version_added': '4.1'}], 'safari_ios': {'version_added': true}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}, 'contain_and_cover': {'__compat': {'description': '<contain> and <cover>', 'support': {'webview_android': {'version_added': null}, 'chrome': {'version_added': '3'}, 'chrome_android': {'version_added': null}, 'edge': {'version_added': '12'}, 'edge_mobile': {'version_added': true}, 'firefox': {'version_added': '3.6'}, 'firefox_android': {'version_added': true}, 'ie': {'version_added': '9'}, 'ie_mobile': {'version_added': '10'}, 'opera': {'version_added': '10'}, 'opera_android': {'version_added': null}, 'safari': {'version_added': '4.1'}, 'safari_ios': {'version_added': true}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}, 'SVG_image_as_background': {'__compat': {'description': 'SVG image as background', 'support': {'webview_android': {'version_added': null}, 'chrome': {'version_added': '44'}, 'chrome_android': {'version_added': null}, 'edge': {'version_added': '12'}, 'edge_mobile': {'version_added': true}, 'firefox': {'version_added': '8'}, 'firefox_android': {'version_added': '8'}, 'ie': {'version_added': '9'}, 'ie_mobile': {'version_added': null}, 'opera': {'version_added': '31'}, 'opera_android': {'version_added': true}, 'safari': {'version_added': null}, 'safari_ios': {'version_added': null}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}}, 'background': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/background', 'support': {'webview_android': {'version_added': '2.1'}, 'chrome': {'version_added': '1'}, 'chrome_android': {'version_added': null}, 'edge': {'version_added': '12'}, 'edge_mobile': {'version_added': true}, 'firefox': {'version_added': '1'}, 'firefox_android': {'version_added': '4'}, 'ie': {'version_added': '4'}, 'ie_mobile': {'version_added': '10'}, 'opera': {'version_added': '3.5'}, 'opera_android': {'version_added': '5'}, 'safari': {'version_added': '1'}, 'safari_ios': {'version_added': '3.2'}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}, 'multiple_backgrounds': {'__compat': {'description': 'Multiple backgrounds', 'support': {'webview_android': {'version_added': '2.1'}, 'chrome': {'version_added': '1'}, 'chrome_android': {'version_added': null}, 'edge': {'version_added': '12'}, 'edge_mobile': {'version_added': true}, 'firefox': {'version_added': '3.6'}, 'firefox_android': {'version_added': '4'}, 'ie': {'version_added': '9'}, 'ie_mobile': {'version_added': '10'}, 'opera': {'version_added': '10.5'}, 'opera_android': {'version_added': null}, 'safari': {'version_added': '1.3'}, 'safari_ios': {'version_added': '3.2'}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}, 'SVG_image_as_background': {'__compat': {'description': 'SVG image as background', 'support': {'webview_android': {'version_added': '3'}, 'chrome': {'version_added': '31'}, 'chrome_android': {'version_added': null}, 'edge': {'version_added': '12'}, 'edge_mobile': {'version_added': true}, 'firefox': {'version_added': '9'}, 'firefox_android': {'version_added': '4'}, 'ie': {'version_added': '9'}, 'ie_mobile': {'version_added': '10'}, 'opera': {'version_added': '21'}, 'opera_android': {'version_added': true}, 'safari': {'version_added': '5.1'}, 'safari_ios': {'version_added': '4.2'}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}, 'background-size': {'__compat': {'description': 'Values of <code>background-size</code> longhand', 'support': {'webview_android': {'version_added': '3'}, 'chrome': {'version_added': '21'}, 'chrome_android': {'version_added': null}, 'edge': {'version_added': '12'}, 'edge_mobile': {'version_added': true}, 'firefox': {'version_added': '9'}, 'firefox_android': {'version_added': '18'}, 'ie': {'version_added': '9'}, 'ie_mobile': {'version_added': '10'}, 'opera': {'version_added': '21'}, 'opera_android': {'version_added': true}, 'safari': {'version_added': '5.1'}, 'safari_ios': {'version_added': '4'}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}, 'background-origin': {'__compat': {'description': 'Values of <code>background-origin</code> longhand', 'support': {'webview_android': {'version_added': '3'}, 'chrome': {'version_added': '21'}, 'chrome_android': {'version_added': null}, 'edge': {'version_added': '12'}, 'edge_mobile': {'version_added': true}, 'firefox': {'version_added': '22'}, 'firefox_android': {'version_added': '22'}, 'ie': {'version_added': '9'}, 'ie_mobile': {'version_added': '10'}, 'opera': {'version_added': '21'}, 'opera_android': {'version_added': false}, 'safari': {'version_added': '5.1'}, 'safari_ios': {'version_added': '4'}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}, 'background-clip': {'__compat': {'description': 'Values of <code>background-clip</code> longhand', 'support': {'webview_android': {'version_added': '3'}, 'chrome': {'version_added': '21'}, 'chrome_android': {'version_added': null}, 'edge': {'version_added': '12'}, 'edge_mobile': {'version_added': true}, 'firefox': {'version_added': '22'}, 'firefox_android': {'version_added': '22'}, 'ie': {'version_added': '9'}, 'ie_mobile': {'version_added': '10'}, 'opera': {'version_added': '21'}, 'opera_android': {'version_added': false}, 'safari': {'version_added': '5.1'}, 'safari_ios': {'version_added': '4'}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}}, 'border-block-end-color': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/border-block-end-color', 'support': {'webview_android': {'version_added': false}, 'chrome': {'version_added': false}, 'firefox': [{'version_added': '41'}, {'version_added': '38', 'version_removed': '51', 'flag': {'type': 'preference', 'name': 'layout.css.vertical-text.enabled', 'value_to_set': 'true'}}], 'firefox_android': [{'version_added': '41'}, {'version_added': '38', 'version_removed': '51', 'flag': {'type': 'preference', 'name': 'layout.css.vertical-text.enabled', 'value_to_set': 'true'}}], 'ie': {'version_added': false}, 'ie_mobile': {'version_added': false}, 'opera': {'version_added': false}, 'opera_android': {'version_added': false}, 'safari': {'version_added': false}, 'safari_ios': {'version_added': false}}, 'status': {'experimental': true, 'standard_track': true, 'deprecated': false}}}, 'border-block-end-style': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/border-block-end-style', 'support': {'webview_android': {'version_added': false}, 'chrome': {'version_added': false}, 'firefox': [{'version_added': '41'}, {'version_added': '38', 'version_removed': '51', 'flag': {'type': 'preference', 'name': 'layout.css.vertical-text.enabled', 'value_to_set': 'true'}}], 'firefox_android': [{'version_added': '41'}, {'version_added': '38', 'version_removed': '51', 'flag': {'type': 'preference', 'name': 'layout.css.vertical-text.enabled', 'value_to_set': 'true'}}], 'ie': {'version_added': false}, 'ie_mobile': {'version_added': false}, 'opera': {'version_added': false}, 'opera_android': {'version_added': false}, 'safari': {'version_added': false}, 'safari_ios': {'version_added': false}}, 'status': {'experimental': true, 'standard_track': true, 'deprecated': false}}}, 'border-block-end-width': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/border-block-end-width', 'support': {'webview_android': {'version_added': false}, 'chrome': {'version_added': false}, 'firefox': [{'version_added': '41'}, {'version_added': '38', 'version_removed': '51', 'flag': {'type': 'preference', 'name': 'layout.css.vertical-text.enabled', 'value_to_set': 'true'}}], 'firefox_android': [{'version_added': '41'}, {'version_added': '38', 'version_removed': '51', 'flag': {'type': 'preference', 'name': 'layout.css.vertical-text.enabled', 'value_to_set': 'true'}}], 'ie': {'version_added': false}, 'ie_mobile': {'version_added': false}, 'opera': {'version_added': false}, 'opera_android': {'version_added': false}, 'safari': {'version_added': false}, 'safari_ios': {'version_added': false}}, 'status': {'experimental': true, 'standard_track': true, 'deprecated': false}}}, 'border-block-end': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/border-block-end', 'support': {'webview_android': {'version_added': false}, 'chrome': {'version_added': false}, 'firefox': [{'version_added': '41'}, {'version_added': '38', 'version_removed': '51', 'flag': {'type': 'preference', 'name': 'layout.css.vertical-text.enabled', 'value_to_set': 'true'}}], 'firefox_android': [{'version_added': '41'}, {'version_added': '38', 'version_removed': '51', 'flag': {'type': 'preference', 'name': 'layout.css.vertical-text.enabled', 'value_to_set': 'true'}}], 'ie': {'version_added': false}, 'ie_mobile': {'version_added': false}, 'opera': {'version_added': false}, 'opera_android': {'version_added': false}, 'safari': {'version_added': false}, 'safari_ios': {'version_added': false}}, 'status': {'experimental': true, 'standard_track': true, 'deprecated': false}}}, 'border-block-start-color': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/border-block-start-color', 'support': {'webview_android': {'version_added': false}, 'chrome': {'version_added': false}, 'firefox': [{'version_added': '41'}, {'version_added': '38', 'version_removed': '51', 'flag': {'type': 'preference', 'name': 'layout.css.vertical-text.enabled', 'value_to_set': 'true'}}], 'firefox_android': [{'version_added': '41'}, {'version_added': '38', 'version_removed': '51', 'flag': {'type': 'preference', 'name': 'layout.css.vertical-text.enabled', 'value_to_set': 'true'}}], 'ie': {'version_added': false}, 'ie_mobile': {'version_added': false}, 'opera': {'version_added': false}, 'opera_android': {'version_added': false}, 'safari': {'version_added': false}, 'safari_ios': {'version_added': false}}, 'status': {'experimental': true, 'standard_track': true, 'deprecated': false}}}, 'border-block-start-style': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/border-block-start-style', 'support': {'webview_android': {'version_added': false}, 'chrome': {'version_added': false}, 'firefox': [{'version_added': '41'}, {'version_added': '38', 'version_removed': '51', 'flag': {'type': 'preference', 'name': 'layout.css.vertical-text.enabled', 'value_to_set': 'true'}}], 'firefox_android': [{'version_added': '41'}, {'version_added': '38', 'version_removed': '51', 'flag': {'type': 'preference', 'name': 'layout.css.vertical-text.enabled', 'value_to_set': 'true'}}], 'ie': {'version_added': false}, 'ie_mobile': {'version_added': false}, 'opera': {'version_added': false}, 'opera_android': {'version_added': false}, 'safari': {'version_added': false}, 'safari_ios': {'version_added': false}}, 'status': {'experimental': true, 'standard_track': true, 'deprecated': false}}}, 'border-block-start-width': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/border-block-start-width', 'support': {'webview_android': {'version_added': false}, 'chrome': {'version_added': false}, 'firefox': [{'version_added': '41'}, {'version_added': '38', 'version_removed': '51', 'flag': {'type': 'preference', 'name': 'layout.css.vertical-text.enabled', 'value_to_set': 'true'}}], 'firefox_android': [{'version_added': '41'}, {'version_added': '38', 'version_removed': '51', 'flag': {'type': 'preference', 'name': 'layout.css.vertical-text.enabled', 'value_to_set': 'true'}}], 'ie': {'version_added': false}, 'ie_mobile': {'version_added': false}, 'opera': {'version_added': false}, 'opera_android': {'version_added': false}, 'safari': {'version_added': false}, 'safari_ios': {'version_added': false}}, 'status': {'experimental': true, 'standard_track': true, 'deprecated': false}}}, 'border-block-start': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/border-block-start', 'support': {'webview_android': {'version_added': false}, 'chrome': {'version_added': false}, 'firefox': [{'version_added': '41'}, {'version_added': '38', 'version_removed': '51', 'flag': {'type': 'preference', 'name': 'layout.css.vertical-text.enabled', 'value_to_set': 'true'}}], 'firefox_android': [{'version_added': '41'}, {'version_added': '38', 'version_removed': '51', 'flag': {'type': 'preference', 'name': 'layout.css.vertical-text.enabled', 'value_to_set': 'true'}}], 'ie': {'version_added': false}, 'ie_mobile': {'version_added': false}, 'opera': {'version_added': false}, 'opera_android': {'version_added': false}, 'safari': {'version_added': false}, 'safari_ios': {'version_added': false}}, 'status': {'experimental': true, 'standard_track': true, 'deprecated': false}}}, 'border-bottom-color': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/border-bottom-color', 'support': {'webview_android': {'version_added': '1'}, 'chrome': {'version_added': '1'}, 'edge': {'version_added': true}, 'edge_mobile': {'version_added': true}, 'firefox': {'version_added': '1', 'notes': "Firefox also supports the non-standard <a href='https://developer.mozilla.org/docs/Web/CSS/-moz-border-bottom-colors'><code>-moz-border-bottom-colors</code></a> CSS property that sets the bottom border to multiple colors."}, 'firefox_android': {'version_added': '4', 'notes': "Firefox also supports the non-standard <a href='https://developer.mozilla.org/docs/Web/CSS/-moz-border-bottom-colors'><code>-moz-border-bottom-colors</code></a> CSS property that sets the bottom border to multiple colors."}, 'ie': {'version_added': '4'}, 'ie_mobile': {'version_added': '6.5'}, 'opera': {'version_added': '3.5'}, 'opera_android': {'version_added': '11'}, 'safari': {'version_added': '1'}, 'safari_ios': {'version_added': '1'}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}, 'border-bottom-left-radius': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/border-bottom-left-radius', 'support': {'chrome': [{'version_added': '4'}, {'prefix': '-webkit-', 'version_added': '1'}], 'edge': [{'version_added': true}, {'prefix': '-webkit-', 'version_added': true}], 'edge_mobile': [{'version_added': true}, {'prefix': '-webkit-', 'version_added': true}], 'firefox': [{'version_added': '4', 'notes': 'Prior to Firefox 50, border styles of rounded corners were always rendered as if <code>border-style</code> was solid. This has been fixed in Firefox 50.'}, {'prefix': '-webkit-', 'version_added': '49'}, {'prefix': '-webkit-', 'version_added': '44', 'flag': {'type': 'preference', 'name': 'layout.css.prefixes.webkit', 'value_to_set': 'true'}}, {'alternative_name': '-moz-border-radius-topright', 'version_added': '1', 'version_removed': '12'}], 'firefox_android': {'version_added': true, 'notes': 'Prior to Firefox 50, border styles of rounded corners were always rendered as if <code>border-style</code> was solid. This has been fixed in Firefox 50.'}, 'ie': {'version_added': '9'}, 'opera': {'version_added': '10.5'}, 'safari': [{'version_added': '5'}, {'prefix': '-webkit-', 'version_added': '3'}]}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}, 'percentages': {'__compat': {'description': 'Percentages', 'support': {'chrome': {'version_added': '4'}, 'edge': {'version_added': true}, 'edge_mobile': {'version_added': true}, 'firefox': [{'version_added': '4'}, {'version_added': '1', 'notes': "Before Firefox 4, the <a href='https://developer.mozilla.org/docs/Web/CSS/percentage'><code>&lt;percentage&gt;</code></a> was relative to the width of the box even when specifying the radius for a height. This implied that <code>-moz-border-radius-topright</code> was always drawing an arc of circle, and never an ellipse, when followed by a single value."}], 'firefox_android': {'version_added': true}, 'ie': {'version_added': '9'}, 'opera': {'version_added': '10.5'}, 'safari': {'version_added': '5'}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}, 'ellipitcal_corners': {'__compat': {'description': 'Ellipitcal corners', 'support': {'chrome': {'version_added': '1'}, 'edge': {'version_added': true}, 'edge_mobile': {'version_added': true}, 'firefox': {'version_added': '3.5'}, 'firefox_android': {'version_added': true}, 'ie': {'version_added': '9'}, 'opera': {'version_added': '10.5'}, 'safari': {'version_added': '3'}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}}, 'border-bottom-right-radius': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/border-bottom-right-radius', 'support': {'chrome': [{'version_added': '4'}, {'prefix': '-webkit-', 'version_added': '1'}], 'edge': [{'version_added': true}, {'prefix': '-webkit-', 'version_added': true}], 'edge_mobile': [{'version_added': true}, {'prefix': '-webkit-', 'version_added': true}], 'firefox': [{'version_added': '4', 'notes': 'Prior to Firefox 50, border styles of rounded corners were always rendered as if <code>border-style</code> was solid. This has been fixed in Firefox 50.'}, {'prefix': '-webkit-', 'version_added': '49'}, {'prefix': '-webkit-', 'version_added': '44', 'flag': {'type': 'preference', 'name': 'layout.css.prefixes.webkit', 'value_to_set': 'true'}}, {'alternative_name': '-moz-border-radius-topright', 'version_added': '1', 'version_removed': '12'}], 'firefox_android': {'version_added': true, 'notes': 'Prior to Firefox 50, border styles of rounded corners were always rendered as if <code>border-style</code> was solid. This has been fixed in Firefox 50.'}, 'ie': {'version_added': '9'}, 'opera': {'version_added': '10.5'}, 'safari': [{'version_added': '5'}, {'prefix': '-webkit-', 'version_added': '3'}]}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}, 'percentages': {'__compat': {'description': 'Percentages', 'support': {'chrome': {'version_added': '4'}, 'edge': {'version_added': true}, 'edge_mobile': {'version_added': true}, 'firefox': [{'version_added': '4'}, {'version_added': '1', 'notes': "Before Firefox 4, the <a href='https://developer.mozilla.org/docs/Web/CSS/percentage'><code>&lt;percentage&gt;</code></a> was relative to the width of the box even when specifying the radius for a height. This implied that <code>-moz-border-radius-topright</code> was always drawing an arc of circle, and never an ellipse, when followed by a single value."}], 'firefox_android': {'version_added': true}, 'ie': {'version_added': '9'}, 'opera': {'version_added': '10.5'}, 'safari': {'version_added': '5'}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}, 'ellipitcal_corners': {'__compat': {'description': 'Ellipitcal corners', 'support': {'chrome': {'version_added': '1'}, 'edge': {'version_added': true}, 'edge_mobile': {'version_added': true}, 'firefox': {'version_added': '3.5'}, 'firefox_android': {'version_added': true}, 'ie': {'version_added': '9'}, 'opera': {'version_added': '10.5'}, 'safari': {'version_added': '3'}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}}, 'border-bottom-style': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/border-bottom-style', 'support': {'webview_android': {'version_added': true}, 'chrome': {'version_added': '1'}, 'edge': {'version_added': true}, 'edge_mobile': {'version_added': true}, 'firefox': {'version_added': '1', 'notes': "Prior to Firefox 50, border styles of rounded corners (with <a href='https://developer.mozilla.org/docs/Web/CSS/border-radius'><code>border-radius</code></a>) were always rendered as if <code>border-bottom-style</code> was <code>solid</code>. This has been fixed in Firefox 50."}, 'firefox_android': {'version_added': true, 'notes': "Prior to Firefox 50, border styles of rounded corners (with <a href='https://developer.mozilla.org/docs/Web/CSS/border-radius'><code>border-radius</code></a>) were always rendered as if <code>border-bottom-style</code> was <code>solid</code>. This has been fixed in Firefox 50."}, 'ie': {'version_added': '5.5'}, 'ie_mobile': {'version_added': '7'}, 'opera': {'version_added': '9.2'}, 'opera_android': {'version_added': true}, 'safari': {'version_added': '1'}, 'safari_ios': {'version_added': true}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}, 'border-bottom-width': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/border-bottom-width', 'support': {'webview_android': {'version_added': '2.3'}, 'chrome': {'version_added': '1'}, 'edge': {'version_added': true}, 'edge_mobile': {'version_added': true}, 'firefox': {'version_added': '1'}, 'firefox_android': {'version_added': '4'}, 'ie': {'version_added': '4'}, 'ie_mobile': {'version_added': '6'}, 'opera': {'version_added': '3.5'}, 'opera_android': {'version_added': '11'}, 'safari': {'version_added': '1'}, 'safari_ios': {'version_added': '1'}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}, 'border-bottom': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/border-bottom', 'support': {'webview_android': {'version_added': '1'}, 'chrome': {'version_added': '1'}, 'edge': {'version_added': true}, 'edge_mobile': {'version_added': true}, 'firefox': {'version_added': '1'}, 'firefox_android': {'version_added': '4'}, 'ie': {'version_added': '4'}, 'ie_mobile': {'version_added': true}, 'opera': {'version_added': '3.5'}, 'opera_android': {'version_added': true}, 'safari': {'version_added': '1'}, 'safari_ios': {'version_added': true}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}, 'border-collapse': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/border-collapse', 'support': {'webview_android': {'version_added': '2.3'}, 'chrome': {'version_added': '1'}, 'edge': {'version_added': true}, 'edge_mobile': {'version_added': true}, 'firefox': {'version_added': '1'}, 'firefox_android': {'version_added': '4'}, 'ie': {'version_added': '5'}, 'ie_mobile': {'version_added': '7'}, 'opera': {'version_added': '4'}, 'opera_android': {'version_added': '11'}, 'safari': {'version_added': '1.2'}, 'safari_ios': {'version_added': '3'}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}, 'border-color': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/border-color', 'support': {'webview_android': {'version_added': '4'}, 'chrome': {'version_added': '1'}, 'edge': {'version_added': true}, 'edge_mobile': {'version_added': true}, 'firefox': {'version_added': '1', 'notes': "Firefox also supports the following non-standard CSS properties to set the border sides to multiple colors: <a href='https://developer.mozilla.org/docs/Web/CSS/-moz-border-top-colors'><code>-moz-border-top-colors</code></a>, <a href='https://developer.mozilla.org/docs/Web/CSS/-moz-border-right-colors'><code>-moz-border-right-colors</code></a>, <a href='https://developer.mozilla.org/docs/Web/CSS/-moz-border-bottom-colors'><code>-moz-border-bottom-colors</code></a>, <a href='https://developer.mozilla.org/docs/Web/CSS/-moz-border-left-colors'><code>-moz-border-left-colors</code></a>"}, 'firefox_android': {'version_added': '4', 'notes': "Firefox also supports the following non-standard CSS properties to set the border sides to multiple colors: <a href='https://developer.mozilla.org/docs/Web/CSS/-moz-border-top-colors'><code>-moz-border-top-colors</code></a>, <a href='https://developer.mozilla.org/docs/Web/CSS/-moz-border-right-colors'><code>-moz-border-right-colors</code></a>, <a href='https://developer.mozilla.org/docs/Web/CSS/-moz-border-bottom-colors'><code>-moz-border-bottom-colors</code></a>, <a href='https://developer.mozilla.org/docs/Web/CSS/-moz-border-left-colors'><code>-moz-border-left-colors</code></a>"}, 'ie': {'version_added': '4'}, 'ie_mobile': {'version_added': '7'}, 'opera': {'version_added': '3.5'}, 'opera_android': {'version_added': '11'}, 'safari': {'version_added': '1'}, 'safari_ios': {'version_added': '1'}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}, 'border-image-outset': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/border-image-outset', 'support': {'chrome': {'version_added': '15'}, 'edge': {'version_added': true}, 'edge_mobile': {'version_added': true}, 'firefox': {'version_added': '15'}, 'firefox_android': {'version_added': '15'}, 'ie': {'version_added': '11'}, 'ie_mobile': {'version_added': false}, 'opera': {'version_added': '15'}, 'safari': {'version_added': '6'}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}, 'border-image-repeat': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/border-image-repeat', 'support': {'chrome': {'version_added': '15'}, 'edge': {'version_added': true}, 'edge_mobile': {'version_added': true}, 'firefox': {'version_added': '15'}, 'firefox_android': {'version_added': '15'}, 'ie': {'version_added': '11'}, 'ie_mobile': {'version_added': false}, 'opera': {'version_added': '15'}, 'safari': {'version_added': '6'}, 'safari_ios': {'version_added': '9.3'}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}, 'round': {'__compat': {'description': '<code>round</code>', 'support': {'chrome': {'version_added': '30'}, 'edge': {'version_added': true}, 'edge_mobile': {'version_added': true}, 'firefox': {'version_added': '15'}, 'firefox_android': {'version_added': '15'}, 'ie': {'version_added': '11'}, 'safari': {'version_added': '9.1'}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}, 'space': {'__compat': {'description': '<code>space</code>', 'support': {'chrome': {'version_added': '56'}, 'edge': {'version_added': true}, 'edge_mobile': {'version_added': true}, 'firefox': {'version_added': '50'}, 'firefox_android': {'version_added': '50'}, 'ie': {'version_added': '11'}, 'opera': {'version_added': false}, 'safari': {'version_added': '9.1'}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}}, 'border-image-slice': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/border-image-slice', 'support': {'webview_android': {'prefix': '-webkit-', 'version_added': '4.1'}, 'chrome': {'version_added': '15'}, 'chrome_android': {'version_added': null}, 'edge': {'version_added': true}, 'edge_mobile': {'version_added': true}, 'firefox': {'version_added': '15', 'notes': ["Small SVGs are incorrectly stretched, because percentages in <a href='https://developer.mozilla.org/docs/Web/CSS/border-image-slice'><code>border-image-slice</code></a> are computed to integers instead of floats (<a href='https://bugzil.la/1284797'>bug 1284797</a>).", "Until Firefox 47, SVGs without viewport were not sliced correctly (<a href='https://bugzil.la/619500'>bug 619500</a>).", "From Firefox 48 until Firefox 49, SVGs without viewport are displayed the same as SVGs with viewport, but if the slices are not exactly 50%, they are incorrectly stretched (<a href='https://bugzil.la/1264809' >bug 1264809</a>).", "Until Firefox 57, an issue persisted for SVGs without viewport when <a href='https://wiki.mozilla.org/Electrolysis'>e10s</a> was disabled (<a href='https://bugzil.la/1290782'>bug 1290782</a>)."]}, 'firefox_android': {'version_added': '15', 'notes': ["Small SVGs are incorrectly stretched, because percentages in <a href='https://developer.mozilla.org/docs/Web/CSS/border-image-slice'><code>border-image-slice</code></a> are computed to integers instead of floats (<a href='https://bugzil.la/1284797'>bug 1284797</a>).", "Until Firefox 47, SVGs without viewport were not sliced correctly (<a href='https://bugzil.la/619500'>bug 619500</a>).", "From Firefox 48 until Firefox 49, SVGs without viewport are displayed the same as SVGs with viewport, but if the slices are not exactly 50%, they are incorrectly stretched (<a href='https://bugzil.la/1264809' >bug 1264809</a>).", "Until Firefox 57, an issue persisted for SVGs without viewport when <a href='https://wiki.mozilla.org/Electrolysis'>e10s</a> was disabled (<a href='https://bugzil.la/1290782'>bug 1290782</a>)."]}, 'ie': {'version_added': '11'}, 'ie_mobile': {'version_added': false}, 'opera': {'version_added': '15'}, 'safari': {'version_added': '6'}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}, 'border-image-source': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/border-image-source', 'support': {'chrome': {'version_added': '15'}, 'edge': {'version_added': true}, 'edge_mobile': {'version_added': true}, 'firefox': {'version_added': '15'}, 'firefox_android': {'version_added': '15'}, 'ie': {'version_added': '11'}, 'ie_mobile': {'version_added': false}, 'opera': {'version_added': '15'}, 'safari': {'version_added': '6'}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}, 'border-image-width': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/border-image-width', 'support': {'chrome': {'version_added': '15'}, 'edge': {'version_added': true}, 'edge_mobile': {'version_added': true}, 'firefox': {'version_added': '13'}, 'firefox_android': {'version_added': '14'}, 'ie': {'version_added': '11'}, 'ie_mobile': {'version_added': false}, 'opera': {'version_added': '15'}, 'safari': {'version_added': '6'}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}, 'border-image': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/border-image', 'support': {'webview_android': {'prefix': '-webkit-', 'version_added': '2.1'}, 'chrome': [{'version_added': '16'}, {'prefix': '-webkit-', 'version_added': '7'}], 'chrome_android': {'version_added': null}, 'edge': [{'version_added': true}, {'prefix': '-webkit-', 'version_added': true}], 'edge_mobile': [{'version_added': true}, {'prefix': '-webkit-', 'version_added': true}], 'firefox': [{'version_added': '15', 'notes': ["Small SVGs are incorrectly stretched, because percentages in <a href='https://developer.mozilla.org/docs/Web/CSS/border-image-slice'><code>border-image-slice</code></a> are computed to integers instead of floats (<a href='https://bugzil.la/1284797'>bug 1284797</a>).", "Until Firefox 47, SVGs without viewport were not sliced correctly (<a href='https://bugzil.la/619500'>bug 619500</a>).", "From Firefox 48 until Firefox 49, SVGs without viewport are displayed the same as SVGs with viewport, but if the slices are not exactly 50%, they are incorrectly stretched (<a href='https://bugzil.la/1264809' >bug 1264809</a>).", "Until Firefox 57, an issue persisted for SVGs without viewport when <a href='https://wiki.mozilla.org/Electrolysis'>e10s</a> was disabled (<a href='https://bugzil.la/1290782'>bug 1290782</a>)."]}, {'version_added': '3.5', 'prefix': '-moz-', 'notes': 'An earlier version of the specification was implemented, prefixed, in Firefox versions prior to 15.'}, {'prefix': '-webkit-', 'version_added': '44', 'flag': {'type': 'preference', 'name': 'layout.css.prefixes.webkit', 'value_to_set': 'true'}}], 'firefox_android': [{'version_added': '15', 'notes': ["Small SVGs are incorrectly stretched, because percentages in <a href='https://developer.mozilla.org/docs/Web/CSS/border-image-slice'><code>border-image-slice</code></a> are computed to integers instead of floats (<a href='https://bugzil.la/1284797'>bug 1284797</a>).", "Until Firefox 47, SVGs without viewport were not sliced correctly (<a href='https://bugzil.la/619500'>bug 619500</a>).", "From Firefox 48 until Firefox 49, SVGs without viewport are displayed the same as SVGs with viewport, but if the slices are not exactly 50%, they are incorrectly stretched (<a href='https://bugzil.la/1264809' >bug 1264809</a>).", "Until Firefox 57, an issue persisted for SVGs without viewport when <a href='https://wiki.mozilla.org/Electrolysis'>e10s</a> was disabled (<a href='https://bugzil.la/1290782'>bug 1290782</a>)."]}, {'version_added': '3.5', 'prefix': '-moz-', 'notes': 'An earlier version of the specification was implemented, prefixed, in Firefox versions prior to 15.'}, {'prefix': '-webkit-', 'version_added': '44', 'flag': {'type': 'preference', 'name': 'layout.css.prefixes.webkit', 'value_to_set': 'true'}}], 'ie': {'version_added': '11'}, 'ie_mobile': {'version_added': null}, 'opera': [{'version_added': '10.5'}, {'prefix': '-o-', 'version_added': '11'}], 'opera_android': {'prefix': '-o-', 'version_added': '11'}, 'safari': [{'version_added': '6'}, {'prefix': '-webkit-', 'version_added': '3'}], 'safari_ios': [{'version_added': '6'}, {'prefix': '-webkit-', 'version_added': '3.2'}]}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}, 'optional_border_image_slice': {'__compat': {'description': 'optional <code>&lt;border-image-slice&gt;</code>', 'support': {'firefox': {'version_added': '15'}, 'firefox_android': {'version_added': '15'}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}, 'fill_keyword': {'__compat': {'description': '<code>fill</code> keyword', 'support': {'webview_android': {'version_added': '18'}, 'chrome': {'version_added': true}, 'firefox': {'version_added': '15'}, 'firefox_android': {'version_added': '15'}, 'safari': {'version_added': '6'}, 'safari_ios': {'version_added': '6'}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}, 'gradient': {'__compat': {'description': '<code>&lt;gradient&gt;</code>', 'support': {'webview_android': {'version_added': true}, 'chrome': {'version_added': true}, 'firefox': {'version_added': '29'}, 'firefox_android': {'version_added': '29'}, 'ie': {'version_added': true}, 'opera': {'version_added': true}, 'opera_android': {'version_added': true}, 'safari': {'version_added': true}, 'safari_ios': {'version_added': true}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}}, 'border-inline-end-color': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/border-inline-end-color', 'support': {'webview_android': {'version_added': false}, 'chrome': {'version_added': false}, 'firefox': [{'version_added': '41'}, {'version_added': '38', 'flag': {'type': 'preference', 'name': 'layout.css.vertical-text.enabled', 'value_to_set': 'true'}, 'notes': 'Enabled by default since Firefox 41.'}, {'version_added': true, 'alternative_name': '-moz-border-end-color'}], 'firefox_android': [{'version_added': '41'}, {'version_added': '38', 'flag': {'type': 'preference', 'name': 'layout.css.vertical-text.enabled', 'value_to_set': 'true'}, 'notes': 'Enabled by default since Firefox 41.'}, {'version_added': true, 'alternative_name': '-moz-border-end-color'}], 'ie': {'version_added': false}, 'ie_mobile': {'version_added': false}, 'opera': {'version_added': false}, 'opera_android': {'version_added': false}, 'safari': {'version_added': false}, 'safari_ios': {'version_added': false}}, 'status': {'experimental': true, 'standard_track': true, 'deprecated': false}}}, 'border-inline-end-style': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/border-inline-end-style', 'support': {'webview_android': {'version_added': false}, 'chrome': {'version_added': false}, 'firefox': [{'version_added': '41'}, {'version_added': '38', 'flag': {'type': 'preference', 'name': 'layout.css.vertical-text.enabled', 'value_to_set': 'true'}, 'notes': 'Enabled by default since Firefox 41.'}, {'version_added': '38', 'alternative_name': '-moz-border-end-style'}], 'firefox_android': [{'version_added': '41'}, {'version_added': '38', 'flag': {'type': 'preference', 'name': 'layout.css.vertical-text.enabled', 'value_to_set': 'true'}, 'notes': 'Enabled by default since Firefox 41.'}, {'version_added': '38', 'alternative_name': '-moz-border-end-style'}], 'ie': {'version_added': false}, 'ie_mobile': {'version_added': false}, 'opera': {'version_added': false}, 'opera_android': {'version_added': false}, 'safari': {'version_added': false}, 'safari_ios': {'version_added': false}}, 'status': {'experimental': true, 'standard_track': true, 'deprecated': false}}}, 'border-inline-end-width': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/border-inline-end-width', 'support': {'webview_android': {'version_added': false}, 'chrome': {'version_added': false}, 'firefox': [{'version_added': '41'}, {'version_added': '38', 'flag': {'type': 'preference', 'name': 'layout.css.vertical-text.enabled', 'value_to_set': 'true'}, 'notes': 'Enabled by default since Firefox 41.'}, {'version_added': true, 'alternative_name': '-moz-border-end-width'}], 'firefox_android': [{'version_added': '41'}, {'version_added': '38', 'flag': {'type': 'preference', 'name': 'layout.css.vertical-text.enabled', 'value_to_set': 'true'}, 'notes': 'Enabled by default since Firefox 41.'}, {'version_added': true, 'alternative_name': '-moz-border-end-width'}], 'ie': {'version_added': false}, 'ie_mobile': {'version_added': false}, 'opera': {'version_added': false}, 'opera_android': {'version_added': false}, 'safari': {'version_added': false}, 'safari_ios': {'version_added': false}}, 'status': {'experimental': true, 'standard_track': true, 'deprecated': false}}}, 'border-inline-end': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/border-inline-end', 'support': {'webview_android': {'version_added': false}, 'chrome': {'version_added': false}, 'firefox': [{'version_added': '41'}, {'version_added': '38', 'flag': {'type': 'preference', 'name': 'layout.css.vertical-text.enabled', 'value_to_set': 'true'}}], 'firefox_android': [{'version_added': '41'}, {'version_added': '38', 'flag': {'type': 'preference', 'name': 'layout.css.vertical-text.enabled', 'value_to_set': 'true'}}], 'ie': {'version_added': false}, 'ie_mobile': {'version_added': false}, 'opera': {'version_added': false}, 'opera_android': {'version_added': false}, 'safari': {'version_added': false}, 'safari_ios': {'version_added': false}}, 'status': {'experimental': true, 'standard_track': true, 'deprecated': false}}}, 'border-inline-start-color': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/border-inline-start-color', 'support': {'webview_android': {'version_added': false}, 'chrome': {'version_added': false}, 'firefox': [{'version_added': '41'}, {'version_added': '38', 'flag': {'type': 'preference', 'name': 'layout.css.vertical-text.enabled', 'value_to_set': 'true'}, 'notes': 'Enabled by default since Firefox 41.'}, {'version_added': '38', 'alternative_name': '-moz-border-start-color'}], 'firefox_android': [{'version_added': '41'}, {'version_added': '38', 'flag': {'type': 'preference', 'name': 'layout.css.vertical-text.enabled', 'value_to_set': 'true'}, 'notes': 'Enabled by default since Firefox 41.'}, {'version_added': '38', 'alternative_name': '-moz-border-start-color'}], 'ie': {'version_added': false}, 'ie_mobile': {'version_added': false}, 'opera': {'version_added': false}, 'opera_android': {'version_added': false}, 'safari': {'version_added': false}, 'safari_ios': {'version_added': false}}, 'status': {'experimental': true, 'standard_track': true, 'deprecated': false}}}, 'border-inline-start-style': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/border-inline-start-style', 'support': {'webview_android': {'version_added': false}, 'chrome': {'version_added': false}, 'firefox': [{'version_added': '41'}, {'version_added': '38', 'flag': {'type': 'preference', 'name': 'layout.css.vertical-text.enabled', 'value_to_set': 'true'}, 'notes': 'Enabled by default since Firefox 41.'}, {'version_added': true, 'alternative_name': '-moz-border-start-style'}], 'firefox_android': [{'version_added': '41'}, {'version_added': '38', 'flag': {'type': 'preference', 'name': 'layout.css.vertical-text.enabled', 'value_to_set': 'true'}, 'notes': 'Enabled by default since Firefox 41.'}, {'version_added': true, 'alternative_name': '-moz-border-start-style'}], 'ie': {'version_added': false}, 'ie_mobile': {'version_added': false}, 'opera': {'version_added': false}, 'opera_android': {'version_added': false}, 'safari': {'version_added': false}, 'safari_ios': {'version_added': false}}, 'status': {'experimental': true, 'standard_track': true, 'deprecated': false}}}, 'border-inline-start-width': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/border-inline-start-width', 'support': {'webview_android': {'version_added': false}, 'chrome': {'version_added': false}, 'firefox': [{'version_added': '41'}, {'version_added': '38', 'flag': {'type': 'preference', 'name': 'layout.css.vertical-text.enabled', 'value_to_set': 'true'}, 'notes': 'Enabled by default since Firefox 41.'}], 'firefox_android': [{'version_added': '41'}, {'version_added': '38', 'flag': {'type': 'preference', 'name': 'layout.css.vertical-text.enabled', 'value_to_set': 'true'}, 'notes': 'Enabled by default since Firefox 41.'}], 'ie': {'version_added': false}, 'ie_mobile': {'version_added': false}, 'opera': {'version_added': false}, 'opera_android': {'version_added': false}, 'safari': {'version_added': false}, 'safari_ios': {'version_added': false}}, 'status': {'experimental': true, 'standard_track': true, 'deprecated': false}}}, 'border-inline-start': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/border-inline-start', 'support': {'webview_android': {'version_added': false}, 'chrome': {'version_added': false}, 'firefox': [{'version_added': '41'}, {'version_added': '38', 'flag': {'type': 'preference', 'name': 'layout.css.vertical-text.enabled', 'value_to_set': 'true'}}], 'firefox_android': [{'version_added': '41'}, {'version_added': '38', 'flag': {'type': 'preference', 'name': 'layout.css.vertical-text.enabled', 'value_to_set': 'true'}}], 'ie': {'version_added': false}, 'ie_mobile': {'version_added': false}, 'opera': {'version_added': false}, 'opera_android': {'version_added': false}, 'safari': {'version_added': false}, 'safari_ios': {'version_added': false}}, 'status': {'experimental': true, 'standard_track': true, 'deprecated': false}}}, 'border-left-color': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/border-left-color', 'support': {'webview_android': {'version_added': '1'}, 'chrome': {'version_added': '1'}, 'edge': {'version_added': true}, 'edge_mobile': {'version_added': true}, 'firefox': {'version_added': '1', 'notes': "Firefox also supports the non-standard <a href='https://developer.mozilla.org/docs/Web/CSS/-moz-border-left-colors'><code>-moz-border-left-colors</code></a> CSS property that sets the bottom border to multiple colors."}, 'firefox_android': {'version_added': '4', 'notes': "Firefox also supports the non-standard <a href='https://developer.mozilla.org/docs/Web/CSS/-moz-border-left-colors'><code>-moz-border-left-colors</code></a> CSS property that sets the bottom border to multiple colors."}, 'ie': {'version_added': '4'}, 'ie_mobile': {'version_added': '6.5'}, 'opera': {'version_added': '3.5'}, 'opera_android': {'version_added': '11'}, 'safari': {'version_added': '1'}, 'safari_ios': {'version_added': '1'}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}, 'border-left-style': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/border-left-style', 'support': {'webview_android': {'version_added': '2.3'}, 'chrome': {'version_added': '1'}, 'chrome_android': {'version_added': true}, 'edge': {'version_added': true}, 'edge_mobile': {'version_added': true}, 'firefox': {'version_added': '1', 'notes': "Prior to Firefox 50, border styles of rounded corners (with <a href='https://developer.mozilla.org/docs/Web/CSS/border-radius'><code>border-radius</code></a>) were always rendered as if <code>border-bottom-style</code> was <code>solid</code>. This has been fixed in Firefox 50."}, 'firefox_android': {'version_added': '14', 'notes': "Prior to Firefox 50, border styles of rounded corners (with <a href='https://developer.mozilla.org/docs/Web/CSS/border-radius'><code>border-radius</code></a>) were always rendered as if <code>border-bottom-style</code> was <code>solid</code>. This has been fixed in Firefox 50."}, 'ie': {'version_added': '5.5'}, 'ie_mobile': {'version_added': '7'}, 'opera': {'version_added': '9.2'}, 'opera_android': {'version_added': true}, 'safari': {'version_added': '1'}, 'safari_ios': {'version_added': true}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}, 'border-left-width': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/border-left-width', 'support': {'webview_android': {'version_added': '2.3'}, 'chrome': {'version_added': '1'}, 'edge': {'version_added': true}, 'edge_mobile': {'version_added': true}, 'firefox': {'version_added': '1'}, 'firefox_android': {'version_added': '4'}, 'ie': {'version_added': '4'}, 'ie_mobile': {'version_added': '6'}, 'opera': {'version_added': '3.5'}, 'opera_android': {'version_added': '11'}, 'safari': {'version_added': '1'}, 'safari_ios': {'version_added': '1'}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}, 'border-left': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/border-left', 'support': {'webview_android': {'version_added': '1'}, 'chrome': {'version_added': '1'}, 'edge': {'version_added': true}, 'edge_mobile': {'version_added': true}, 'firefox': {'version_added': '1'}, 'firefox_android': {'version_added': '4'}, 'ie': {'version_added': '4'}, 'ie_mobile': {'version_added': true}, 'opera': {'version_added': '3.5'}, 'opera_android': {'version_added': true}, 'safari': {'version_added': '1'}, 'safari_ios': {'version_added': true}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}, 'border-radius': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/border-radius', 'support': {'chrome': [{'version_added': '4', 'notes': 'Current Chrome and Safari versions ignore border-radius on <code>&lt;select&gt;</code> elements unless <code>-webkit-appearance</code> is overridden to an appropriate value.'}, {'prefix': '-webkit-', 'version_added': '1'}], 'webview_android': {'version_added': '2.1', 'prefix': '-webkit-'}, 'edge': [{'version_added': true}, {'prefix': '-webkit-', 'version_added': true}], 'edge_mobile': [{'version_added': true}, {'prefix': '-webkit-', 'version_added': true}], 'firefox': [{'version_added': '4', 'notes': ['Prior to Firefox 50, border styles of rounded corners (with <code>border-radius</code>) were always rendered as if <code>border-style</code> was <code>solid</code>. This has been fixed in Firefox 50.', "To conform to the CSS3 standard, Firefox 4 changes the handling of <a href='https://developer.mozilla.org/docs/Web/CSS/percentage'><code>&lt;percentage&gt;</code></a> values to match the specification. You can specify an ellipse as a border on an arbitrary sized element with <code>border-radius: 50%;</code>. Firefox 4 also makes rounded corners clip content and images if <a href='https://developer.mozilla.org/docs/Web/CSS/overflow'><code>overflow</code></a><code>: visible</code> is not set."]}, {'prefix': '-moz-', 'version_added': '1', 'version_removed': '12'}], 'firefox_android': {'version_added': true, 'notes': 'Prior to Firefox 50, border styles of rounded corners (with <code>border-radius</code>) were always rendered as if <code>border-style</code> was <code>solid</code>. This has been fixed in Firefox 50.'}, 'ie': {'version_added': '9'}, 'ie_mobile': {'version_added': ''}, 'opera': {'version_added': '10.5', 'notes': 'In Opera prior to version 11.60, replaced elements with <code>border-radius</code> will not have rounded corners.'}, 'opera_android': {'version_added': ''}, 'safari': [{'version_added': '5', 'notes': 'Current Chrome and Safari versions ignore border-radius on <code>&lt;select&gt;</code> elements unless <code>-webkit-appearance</code> is overridden to an appropriate value.'}, {'prefix': '-webkit-', 'version_added': '3'}], 'safari_ios': {'version_added': ''}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}, 'elliptical_borders': {'__compat': {'description': 'Elliptical borders', 'support': {'chrome': {'version_added': true, 'notes': 'Prior to Chrome 4, the slash <code>/</code> notation is unsupported. If two values are specified, an elliptical border is drawn on all four corners. <code>-webkit-border-radius: 40px 10px;</code> is equivalent to <code>border-radius: 40px/10px;</code>.'}, 'edge': {'version_added': true}, 'edge_mobile': {'version_added': true}, 'firefox': {'version_added': '3.5'}, 'firefox_android': {'version_added': true}, 'ie': {'version_added': true}, 'opera': {'version_added': true}, 'opera_android': {'version_added': false}, 'safari': {'version_added': true, 'notes': 'Prior to Safari 4.1, the slash <code>/</code> notation is unsupported. If two values are specified, an elliptical border is drawn on all four corners. <code>-webkit-border-radius: 40px 10px;</code> is equivalent to <code>border-radius: 40px/10px;</code>.'}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}, '4_values_for_4_corners': {'__compat': {'description': '4 values for 4 corners', 'support': {'chrome': {'version_added': '4'}, 'edge': {'version_added': true}, 'edge_mobile': {'version_added': true}, 'firefox': {'version_added': true}, 'firefox_android': {'version_added': true}, 'ie': {'version_added': true}, 'opera': {'version_added': true}, 'opera_android': {'version_added': false}, 'safari': {'version_added': '5'}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}, 'percentages': {'__compat': {'description': 'Percentages', 'support': {'chrome': {'version_added': true, 'notes': "<code>&lt;percentage&gt;</code> values are not supported in older Chrome and Safari versions (it was <a href='http://trac.webkit.org/changeset/66615'>fixed in Sepember 2010</a>)."}, 'webview_android': {'version_added': true, 'notes': "<code>&lt;percentage&gt;</code> values are not supported in older Chrome and Safari versions (it was <a href='http://trac.webkit.org/changeset/66615'>fixed in Sepember 2010</a>)."}, 'edge': {'version_added': true}, 'edge_mobile': {'version_added': true}, 'firefox': {'version_added': '4', 'notes': '<code>&lt;percentage&gt;</code> values are implemented in a non-standard way prior to Firefox 4. Both horizontal and vertical radii were relative to the width of the border box.'}, 'firefox_android': {'version_added': true}, 'ie': {'version_added': true}, 'opera': {'version_added': '11.5', 'notes': 'The implementation of <code>&lt;percentage&gt;</code> values was buggy in Opera prior to 11.50.'}, 'opera_android': {'version_added': false}, 'safari': {'version_added': '5.1', 'notes': "<code>&lt;percentage&gt;</code> values are not supported in older Chrome and Safari versions (it was <a href='http://trac.webkit.org/changeset/66615'>fixed in Sepember 2010</a>)."}, 'safari_ios': {'version_added': true, 'notes': "<code>&lt;percentage&gt;</code> values are not supported in older Chrome and Safari versions (it was <a href='http://trac.webkit.org/changeset/66615'>fixed in Sepember 2010</a>)."}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}}, 'border-right-color': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/border-right-color', 'support': {'webview_android': {'version_added': '1'}, 'chrome': {'version_added': '1'}, 'edge': {'version_added': true}, 'edge_mobile': {'version_added': true}, 'firefox': {'version_added': '1', 'notes': "Firefox also supports the non-standard <a href='https://developer.mozilla.org/docs/Web/CSS/-moz-border-right-colors'><code>-moz-border-right-colors</code></a> CSS property that sets the right border to multiple colors."}, 'firefox_android': {'version_added': '4', 'notes': "Firefox also supports the non-standard <a href='https://developer.mozilla.org/docs/Web/CSS/-moz-border-right-colors'><code>-moz-border-right-colors</code></a> CSS property that sets the right border to multiple colors."}, 'ie': {'version_added': '4'}, 'ie_mobile': {'version_added': '6.5'}, 'opera': {'version_added': '3.5'}, 'opera_android': {'version_added': '11'}, 'safari': {'version_added': '1'}, 'safari_ios': {'version_added': '1'}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}, 'border-right-style': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/border-right-style', 'support': {'webview_android': {'version_added': true}, 'chrome': {'version_added': '1'}, 'edge': {'version_added': true}, 'edge_mobile': {'version_added': true}, 'firefox': {'version_added': '1', 'notes': "Prior to Firefox 50, border styles of rounded corners (with <a href='https://developer.mozilla.org/docs/Web/CSS/border-radius'><code>border-radius</code></a>) were always rendered as if <code>border-bottom-style</code> was <code>solid</code>. This has been fixed in Firefox 50."}, 'firefox_android': {'version_added': '14', 'notes': "Prior to Firefox 50, border styles of rounded corners (with <a href='https://developer.mozilla.org/docs/Web/CSS/border-radius'><code>border-radius</code></a>) were always rendered as if <code>border-bottom-style</code> was <code>solid</code>. This has been fixed in Firefox 50."}, 'ie': {'version_added': '5.5'}, 'ie_mobile': {'version_added': '7'}, 'opera': {'version_added': '9.2'}, 'opera_android': {'version_added': true}, 'safari': {'version_added': '1'}, 'safari_ios': {'version_added': true}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}, 'border-right-width': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/border-right-width', 'support': {'webview_android': {'version_added': '2.3'}, 'chrome': {'version_added': '1'}, 'edge': {'version_added': true}, 'edge_mobile': {'version_added': true}, 'firefox': {'version_added': '1'}, 'firefox_android': {'version_added': '4'}, 'ie': {'version_added': '4'}, 'ie_mobile': {'version_added': '6'}, 'opera': {'version_added': '3.5'}, 'opera_android': {'version_added': '11'}, 'safari': {'version_added': '1'}, 'safari_ios': {'version_added': '1'}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}, 'border-right': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/border-right', 'support': {'webview_android': {'version_added': true}, 'chrome': {'version_added': '1'}, 'edge': {'version_added': true}, 'edge_mobile': {'version_added': true}, 'firefox': {'version_added': '1'}, 'firefox_android': {'version_added': '14'}, 'ie': {'version_added': '5.5'}, 'ie_mobile': {'version_added': '7'}, 'opera': {'version_added': '9.2'}, 'opera_android': {'version_added': true}, 'safari': {'version_added': '1'}, 'safari_ios': {'version_added': true}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}, 'border-spacing': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/border-spacing', 'support': {'chrome': {'version_added': '1'}, 'edge': {'version_added': true}, 'edge_mobile': {'version_added': true}, 'firefox': {'version_added': '1'}, 'firefox_android': {'version_added': '4'}, 'ie': {'version_added': '8'}, 'opera': {'version_added': '4'}, 'safari': {'version_added': '1'}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}, 'border-style': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/border-style', 'support': {'webview_android': {'version_added': '2.6'}, 'chrome': {'version_added': '1'}, 'edge': {'version_added': '12'}, 'edge_mobile': {'version_added': '12'}, 'firefox': {'version_added': '1', 'notes': 'Prior to Firefox 50, border styles of rounded corners were always rendered as if <code>border-style</code> was solid. This has been fixed in Firefox 50.'}, 'firefox_android': {'version_added': '4', 'notes': 'Prior to Firefox 50, border styles of rounded corners were always rendered as if <code>border-style</code> was solid. This has been fixed in Firefox 50.'}, 'ie': {'version_added': '4'}, 'ie_mobile': {'version_added': '7'}, 'opera': {'version_added': '3.5'}, 'opera_android': {'version_added': true}, 'safari': {'version_added': '1'}, 'safari_ios': {'version_added': '3'}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}, 'border-top-color': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/border-top-color', 'support': {'webview_android': {'version_added': '1'}, 'chrome': {'version_added': '1'}, 'edge': {'version_added': true}, 'edge_mobile': {'version_added': true}, 'firefox': {'version_added': '1', 'notes': "Firefox also supports the non-standard <a href='https://developer.mozilla.org/docs/Web/CSS/-moz-border-top-colors'><code>-moz-border-top-colors</code></a> CSS property that sets the top border to multiple colors."}, 'firefox_android': {'version_added': '4', 'notes': "Firefox also supports the non-standard <a href='https://developer.mozilla.org/docs/Web/CSS/-moz-border-top-colors'><code>-moz-border-top-colors</code></a> CSS property that sets the top border to multiple colors."}, 'ie': {'version_added': '4'}, 'ie_mobile': {'version_added': '6.5'}, 'opera': {'version_added': '3.5'}, 'opera_android': {'version_added': '11'}, 'safari': {'version_added': '1'}, 'safari_ios': {'version_added': '1'}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}, 'border-top-left-radius': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/border-top-left-radius', 'support': {'chrome': [{'version_added': '4'}, {'prefix': '-webkit-', 'version_added': '1'}], 'edge': [{'version_added': true}, {'prefix': '-webkit-', 'version_added': true}], 'edge_mobile': [{'version_added': true}, {'prefix': '-webkit-', 'version_added': true}], 'firefox': [{'version_added': '4', 'notes': 'Prior to Firefox 50, border styles of rounded corners were always rendered as if <code>border-style</code> was solid. This has been fixed in Firefox 50.'}, {'prefix': '-webkit-', 'version_added': '49'}, {'prefix': '-webkit-', 'version_added': '44', 'flag': {'type': 'preference', 'name': 'layout.css.prefixes.webkit', 'value_to_set': 'true'}}, {'alternative_name': '-moz-border-radius-topright', 'version_added': '1', 'version_removed': '12'}], 'firefox_android': {'version_added': true, 'notes': 'Prior to Firefox 50, border styles of rounded corners were always rendered as if <code>border-style</code> was solid. This has been fixed in Firefox 50.'}, 'ie': {'version_added': '9'}, 'opera': {'version_added': '10.5'}, 'safari': [{'version_added': '5'}, {'prefix': '-webkit-', 'version_added': '3'}]}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}, 'percentages': {'__compat': {'description': 'Percentages', 'support': {'chrome': {'version_added': '4'}, 'edge': {'version_added': true}, 'edge_mobile': {'version_added': true}, 'firefox': [{'version_added': '4'}, {'version_added': '1', 'notes': "Before Firefox 4, the <a href='https://developer.mozilla.org/docs/Web/CSS/percentage'><code>&lt;percentage&gt;</code></a> was relative to the width of the box even when specifying the radius for a height. This implied that <code>-moz-border-radius-topright</code> was always drawing an arc of circle, and never an ellipse, when followed by a single value."}], 'firefox_android': {'version_added': true}, 'ie': {'version_added': '9'}, 'opera': {'version_added': '10.5'}, 'safari': {'version_added': '5'}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}, 'ellipitcal_corners': {'__compat': {'description': 'Ellipitcal corners', 'support': {'chrome': {'version_added': '1'}, 'edge': {'version_added': true}, 'edge_mobile': {'version_added': true}, 'firefox': {'version_added': '3.5'}, 'firefox_android': {'version_added': true}, 'ie': {'version_added': '9'}, 'opera': {'version_added': '10.5'}, 'safari': {'version_added': '3'}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}}, 'border-top-right-radius': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/border-top-right-radius', 'support': {'chrome': [{'version_added': '4'}, {'prefix': '-webkit-', 'version_added': '1'}], 'edge': [{'version_added': true}, {'prefix': '-webkit-', 'version_added': true}], 'edge_mobile': [{'version_added': true}, {'prefix': '-webkit-', 'version_added': true}], 'firefox': [{'version_added': '4', 'notes': 'Prior to Firefox 50, border styles of rounded corners were always rendered as if <code>border-style</code> was solid. This has been fixed in Firefox 50.'}, {'prefix': '-webkit-', 'version_added': '49'}, {'prefix': '-webkit-', 'version_added': '44', 'flag': {'type': 'preference', 'name': 'layout.css.prefixes.webkit', 'value_to_set': 'true'}}, {'alternative_name': '-moz-border-radius-topright', 'version_added': '1', 'version_removed': '12'}], 'firefox_android': {'version_added': true, 'notes': 'Prior to Firefox 50, border styles of rounded corners were always rendered as if <code>border-style</code> was solid. This has been fixed in Firefox 50.'}, 'ie': {'version_added': '9'}, 'opera': {'version_added': '10.5'}, 'safari': [{'version_added': '5'}, {'prefix': '-webkit-', 'version_added': '3'}]}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}, 'percentages': {'__compat': {'description': 'Percentages', 'support': {'chrome': {'version_added': '4'}, 'edge': {'version_added': true}, 'edge_mobile': {'version_added': true}, 'firefox': [{'version_added': '4'}, {'version_added': '1', 'notes': "Before Firefox 4, the <a href='https://developer.mozilla.org/docs/Web/CSS/percentage'><code>&lt;percentage&gt;</code></a> was relative to the width of the box even when specifying the radius for a height. This implied that <code>-moz-border-radius-topright</code> was always drawing an arc of circle, and never an ellipse, when followed by a single value."}], 'firefox_android': {'version_added': true}, 'ie': {'version_added': '9'}, 'opera': {'version_added': '10.5'}, 'safari': {'version_added': '5'}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}, 'ellipitcal_corners': {'__compat': {'description': 'Ellipitcal corners', 'support': {'chrome': {'version_added': '1'}, 'edge': {'version_added': true}, 'edge_mobile': {'version_added': true}, 'firefox': {'version_added': '3.5'}, 'firefox_android': {'version_added': true}, 'ie': {'version_added': '9'}, 'opera': {'version_added': '10.5'}, 'safari': {'version_added': '3'}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}}, 'border-top-style': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/border-top-style', 'support': {'chrome': {'version_added': '1'}, 'edge': {'version_added': true}, 'edge_mobile': {'version_added': true}, 'firefox': {'version_added': '1', 'notes': "Prior to Firefox 50, border styles of rounded corners (with <a href='https://developer.mozilla.org/docs/Web/CSS/border-radius'><code>border-radius</code></a>) were always rendered as if <code>border-top-style</code> was <code>solid</code>. This has been fixed in Firefox 50."}, 'firefox_android': {'version_added': true, 'notes': "Prior to Firefox 50, border styles of rounded corners (with <a href='https://developer.mozilla.org/docs/Web/CSS/border-radius'><code>border-radius</code></a>) were always rendered as if <code>border-top-style</code> was <code>solid</code>. This has been fixed in Firefox 50."}, 'ie': {'version_added': '5.5'}, 'opera': {'version_added': '9.2'}, 'safari': {'version_added': '1'}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}, 'border-top-width': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/border-top-width', 'support': {'chrome': {'version_added': '1'}, 'webview_android': {'version_added': '2.3'}, 'edge': {'version_added': true}, 'edge_mobile': {'version_added': true}, 'firefox': {'version_added': '1'}, 'firefox_android': {'version_added': '4'}, 'ie': {'version_added': '4'}, 'ie_mobile': {'version_added': '6'}, 'opera': {'version_added': '3.5'}, 'opera_android': {'version_added': '11'}, 'safari': {'version_added': '1'}, 'safari_ios': {'version_added': '1'}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}, 'border-top': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/border-top', 'support': {'webview_android': {'version_added': '1'}, 'chrome': {'version_added': '1'}, 'edge': {'version_added': true}, 'edge_mobile': {'version_added': true}, 'firefox': {'version_added': '1'}, 'firefox_android': {'version_added': '4'}, 'ie': {'version_added': '4'}, 'ie_mobile': {'version_added': true}, 'opera': {'version_added': '3.5'}, 'opera_android': {'version_added': true}, 'safari': {'version_added': '1'}, 'safari_ios': {'version_added': true}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}, 'border-width': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/border-width', 'support': {'chrome': {'version_added': '1'}, 'webview_android': {'version_added': '2'}, 'edge': {'version_added': true}, 'edge_mobile': {'version_added': true}, 'firefox': {'version_added': '1'}, 'firefox_android': {'version_added': '4'}, 'ie': {'version_added': '4'}, 'ie_mobile': {'version_added': '6'}, 'opera': {'version_added': '3.5'}, 'opera_android': {'version_added': '11'}, 'safari': {'version_added': '1'}, 'safari_ios': {'version_added': '3'}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}, 'border': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/border', 'support': {'chrome': {'version_added': '1'}, 'edge': {'version_added': true}, 'edge_mobile': {'version_added': true}, 'firefox': {'version_added': '1'}, 'firefox_android': {'version_added': '4'}, 'ie': {'version_added': '4'}, 'opera': {'version_added': '3.5'}, 'safari': {'version_added': '1'}, 'safari_ios': {'version_added': '1'}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}, 'bottom': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/bottom', 'support': {'webview_android': {'version_added': true}, 'chrome': {'version_added': '1'}, 'chrome_android': {'version_added': true}, 'edge': {'version_added': true}, 'edge_mobile': {'version_added': true}, 'firefox': {'version_added': '1'}, 'firefox_android': {'version_added': '4'}, 'ie': {'version_added': '5', 'notes': 'In Internet Explorer versions before 7, when both <code>top</code> and <code>bottom</code> are specified, the element position is overconstrained and the <code>top</code> property has precedence; the computed value of <code>bottom</code> is set to <code>-top</code>, while its specified value is ignored.'}, 'ie_mobile': {'version_added': true}, 'opera': {'version_added': '6'}, 'opera_android': {'version_added': true}, 'safari': {'version_added': '1'}, 'safari_ios': {'version_added': true}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}, 'clear': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/clear', 'support': {'webview_android': {'version_added': '1'}, 'chrome': {'version_added': '1'}, 'chrome_android': {'version_added': true}, 'edge': {'version_added': true}, 'edge_mobile': {'version_added': true}, 'firefox': {'version_added': '1'}, 'firefox_android': {'version_added': '4'}, 'ie': {'version_added': '4'}, 'ie_mobile': {'version_added': '6'}, 'opera': {'version_added': '3.5'}, 'opera_android': {'version_added': '6'}, 'safari': {'version_added': '1'}, 'safari_ios': {'version_added': '1'}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}, 'flow_relative_values': {'__compat': {'description': 'Flow-relative values <code>inline-start</code> and <code>inline-end</code>', 'support': {'webview_android': {'version_added': false}, 'chrome': {'version_added': false}, 'chrome_android': {'version_added': false}, 'edge': {'version_added': false}, 'edge_mobile': {'version_added': false}, 'firefox': {'version_added': '55'}, 'firefox_android': {'version_added': '55'}, 'ie': {'version_added': false}, 'ie_mobile': {'version_added': false}, 'opera': {'version_added': false}, 'opera_android': {'version_added': false}, 'safari': {'version_added': false}, 'safari_ios': {'version_added': false}}, 'status': {'experimental': true, 'standard_track': true, 'deprecated': false}}}}, 'column-count': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/column-count', 'support': {'webview_android': {'version_added': true}, 'chrome': [{'version_added': '50'}, {'prefix': '-webkit-', 'version_added': true}], 'chrome_android': {'version_added': '50'}, 'edge': [{'version_added': true}, {'prefix': '-webkit-', 'version_added': true}], 'edge_mobile': [{'version_added': true}, {'prefix': '-webkit-', 'version_added': true}], 'firefox': [{'version_added': '52'}, {'prefix': '-moz-', 'version_added': '1.5'}], 'firefox_android': [{'version_added': '52'}, {'prefix': '-moz-', 'version_added': '1'}], 'ie': {'version_added': '10'}, 'ie_mobile': {'version_added': true}, 'opera': [{'version_added': '11.10'}, {'prefix': '-webkit-', 'version_added': '15'}], 'opera_android': [{'version_added': true}, {'prefix': '-webkit-', 'version_added': true}], 'safari': {'prefix': '-webkit-', 'version_added': '3'}, 'safari_ios': [{'version_added': true}, {'prefix': '-webkit-', 'version_added': true}]}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}, 'on_display_table_caption': {'__compat': {'description': 'On <code>display: table-caption</code>', 'support': {'webview_android': {'version_added': true}, 'chrome': {'version_added': true}, 'edge': {'version_added': true}, 'edge_mobile': {'version_added': true}, 'firefox': {'version_added': '37'}, 'firefox_android': {'version_added': '37'}, 'ie': {'version_added': true}, 'ie_mobile': {'version_added': true}, 'opera': {'version_added': true}, 'opera_android': {'version_added': true}, 'safari': {'version_added': true}, 'safari_ios': {'version_added': true}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}}, 'column-fill': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/column-fill', 'support': {'webview_android': {'version_added': true}, 'chrome': {'version_added': true}, 'chrome_android': {'version_added': true}, 'edge': {'version_added': true}, 'edge_mobile': {'version_added': true}, 'firefox': [{'version_added': '52'}, {'prefix': '-moz-', 'version_added': '13'}], 'firefox_android': [{'version_added': '52'}, {'prefix': '-moz-', 'version_added': '13'}]}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}, 'column-gap': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/column-gap', 'support': {'webview_android': {'version_added': true}, 'chrome': [{'version_added': '50'}, {'prefix': '-webkit-', 'version_added': true}], 'chrome_android': {'version_added': '50'}, 'edge': [{'version_added': true}, {'prefix': '-webkit-', 'version_added': true}], 'edge_mobile': [{'version_added': true}, {'prefix': '-webkit-', 'version_added': true}], 'firefox': [{'version_added': '52'}, {'prefix': '-moz-', 'version_added': '1.5', 'notes': 'Before Firefox 3, the default value for the <code>normal</code> keyword was <code>0</code> and not <code>1em</code>.'}], 'firefox_android': [{'version_added': '52'}, {'prefix': '-moz-', 'version_added': '1.5'}], 'ie': {'version_added': '10'}, 'opera': [{'version_added': '11.10'}, {'prefix': '-webkit-', 'version_added': '15'}], 'safari': {'prefix': '-webkit-', 'version_added': '3'}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}, 'column-rule-color': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/column-rule-color', 'support': {'webview_android': {'version_added': true}, 'chrome': [{'version_added': '50'}, {'prefix': '-webkit-', 'version_added': true}], 'chrome_android': [{'version_added': '50'}, {'prefix': '-webkit-', 'version_added': true}], 'edge': [{'version_added': true}, {'prefix': '-webkit-', 'version_added': true}], 'edge_mobile': [{'version_added': true}, {'prefix': '-webkit-', 'version_added': true}], 'firefox': [{'version_added': '52'}, {'prefix': '-moz-', 'version_added': '3.5'}], 'firefox_android': [{'version_added': '52'}, {'prefix': '-moz-', 'version_added': true}], 'ie': {'version_added': '10'}, 'opera': [{'version_added': '11.10'}, {'prefix': '-webkit-', 'version_added': '15'}], 'safari': {'prefix': '-webkit-', 'version_added': '3'}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}, 'column-rule-style': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/column-rule-style', 'support': {'webview_android': {'version_added': true}, 'chrome': [{'version_added': '50'}, {'prefix': '-webkit-', 'version_added': true}], 'chrome_android': [{'version_added': '50'}, {'prefix': '-webkit-', 'version_added': true}], 'edge': [{'version_added': true}, {'prefix': '-webkit-', 'version_added': true}], 'edge_mobile': [{'version_added': true}, {'prefix': '-webkit-', 'version_added': true}], 'firefox': [{'version_added': '52'}, {'prefix': '-moz-', 'version_added': true}], 'firefox_android': [{'version_added': '52'}, {'prefix': '-moz-', 'version_added': true}], 'ie': {'version_added': '10'}, 'opera': [{'version_added': '11.10'}, {'prefix': '-webkit-', 'version_added': '15'}], 'safari': {'prefix': '-webkit-', 'version_added': '3'}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}, 'column-rule-width': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/column-rule-width', 'support': {'webview_android': {'version_added': true}, 'chrome': [{'version_added': '50'}, {'prefix': '-webkit-', 'version_added': true}], 'chrome_android': [{'version_added': '50'}, {'prefix': '-webkit-', 'version_added': true}], 'edge': {'prefix': '-webkit-', 'version_added': true}, 'edge_mobile': {'prefix': '-webkit-', 'version_added': true}, 'firefox': [{'version_added': '50'}, {'prefix': '-moz-', 'version_added': '3.5'}], 'firefox_android': [{'version_added': '50'}, {'prefix': '-moz-', 'version_added': true}], 'ie': {'version_added': '10'}, 'opera': [{'version_added': '11.1'}, {'prefix': '-webkit-', 'version_added': '15'}], 'safari': {'prefix': '-webkit-', 'version_added': '3'}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}, 'column-rule': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/column-rule', 'support': {'webview_android': {'version_added': true}, 'chrome': [{'version_added': '50'}, {'prefix': '-webkit-', 'version_added': true}], 'chrome_android': [{'version_added': '50'}, {'prefix': '-webkit-', 'version_added': true}], 'edge': {'prefix': '-webkit-', 'version_added': true}, 'edge_mobile': {'version_added': null}, 'firefox': [{'version_added': '52'}, {'prefix': '-moz-', 'version_added': '3.5', 'notes': 'Before Firefox 3, the default value for the <code>normal</code> keyword was <code>0</code> and not <code>1em</code>.'}], 'firefox_android': [{'version_added': '52'}, {'prefix': '-moz-', 'version_added': true}], 'ie': {'version_added': '10'}, 'opera': [{'version_added': '11.10'}, {'prefix': '-webkit-', 'version_added': '15'}], 'safari': {'prefix': '-webkit-', 'version_added': '3'}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}, 'column-span': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/column-span', 'support': {'webview_android': [{'version_added': '50'}, {'prefix': '-webkit-', 'version_added': true}], 'chrome': [{'version_added': '50'}, {'prefix': '-webkit-', 'version_added': true}], 'chrome_android': [{'version_added': '50'}, {'prefix': '-webkit-', 'version_added': true}], 'edge': [{'version_added': true}, {'prefix': '-webkit-', 'version_added': true}], 'edge_mobile': [{'version_added': true}, {'prefix': '-webkit-', 'version_added': true}], 'firefox': {'version_added': false}, 'firefox_android': {'version_added': false}, 'ie': {'version_added': '10'}, 'opera': [{'version_added': '11.10'}, {'prefix': '-webkit-', 'version_added': '15'}], 'opera_android': {'version_added': null}, 'safari': {'prefix': '-webkit-', 'version_added': true}, 'safari_ios': {'prefix': '-webkit-', 'version_added': true}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}, 'column-width': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/column-width', 'support': {'webview_android': {'version_added': true}, 'chrome': [{'version_added': '50'}, {'prefix': '-webkit-', 'version_added': true}], 'chrome_android': [{'version_added': '50'}, {'prefix': '-webkit-', 'version_added': true}], 'edge': [{'version_added': true}, {'prefix': '-webkit-', 'version_added': true}], 'edge_mobile': [{'version_added': true}, {'prefix': '-webkit-', 'version_added': true}], 'firefox': [{'version_added': '50'}, {'prefix': '-moz-', 'version_added': '1.5'}], 'firefox_android': [{'version_added': '50'}, {'prefix': '-moz-', 'version_added': '1'}], 'ie': {'version_added': '10'}, 'ie_mobile': {'version_added': true}, 'opera': {'version_added': '11.1'}, 'opera_android': {'version_added': true}, 'safari': {'prefix': '-webkit-', 'version_added': '3'}, 'safari_ios': {'version_added': true}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}, 'intrinsic_sizes': {'__compat': {'description': 'Intrinsic sizes', 'support': {'webview_android': {'version_added': false}, 'chrome': {'version_added': false}, 'firefox': {'version_added': false}, 'firefox_android': {'version_added': false}, 'ie': {'version_added': false}, 'ie_mobile': {'version_added': false}, 'opera': {'version_added': false}, 'opera_android': {'version_added': false}, 'safari': {'version_added': false}, 'safari_ios': {'version_added': false}}, 'status': {'experimental': true, 'standard_track': true, 'deprecated': false}}}, 'on_display_table_caption': {'__compat': {'description': 'On <code>display: table-caption</code>', 'support': {'webview_android': {'version_added': true}, 'chrome': {'version_added': true}, 'chrome_android': {'version_added': '50'}, 'edge': {'version_added': true}, 'edge_mobile': {'version_added': true}, 'firefox': {'version_added': '37'}, 'firefox_android': {'version_added': '37'}, 'ie': {'version_added': true}, 'ie_mobile': {'version_added': true}, 'opera': {'version_added': true}, 'opera_android': {'version_added': true}, 'safari': {'version_added': true}, 'safari_ios': {'version_added': true}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}}, 'columns': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/columns', 'support': {'webview_android': [{'version_added': true}, {'prefix': '-webkit-', 'version_added': '2.1'}], 'chrome': [{'version_added': '50'}, {'prefix': '-webkit-', 'version_added': '50'}], 'chrome_android': {'version_added': '50'}, 'edge': [{'version_added': true}, {'prefix': '-webkit-', 'version_added': true}], 'edge_mobile': [{'version_added': true}, {'prefix': '-webkit-', 'version_added': true}], 'firefox': [{'version_added': '52'}, {'prefix': '-moz-', 'version_added': '9'}], 'firefox_android': [{'version_added': '52'}, {'prefix': '-moz-', 'version_added': '22'}], 'ie': {'version_added': '10'}, 'ie_mobile': {'version_added': '10'}, 'opera': [{'version_added': '11.10'}, {'prefix': '-webkit-', 'version_added': '15'}], 'opera_android': [{'version_added': '11.5'}, {'prefix': '-webkit-', 'version_added': '32'}], 'safari': {'prefix': '-webkit-', 'version_added': '3'}, 'safari_ios': {'prefix': '-webkit-', 'version_added': '3.2'}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}, 'on_display_table_caption': {'__compat': {'description': 'On <code>display: table-caption</code>', 'support': {'webview_android': {'version_added': true}, 'chrome': {'version_added': true}, 'edge': {'version_added': true}, 'edge_mobile': {'version_added': true}, 'firefox': {'version_added': '37'}, 'firefox_android': {'version_added': '37'}, 'ie': {'version_added': true}, 'ie_mobile': {'version_added': true}, 'opera': {'version_added': true}, 'opera_android': {'version_added': true}, 'safari': {'version_added': true}, 'safari_ios': {'version_added': true}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}}, 'flex-basis': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/flex-basis', 'support': {'chrome': {'prefix': '-webkit-', 'version_added': '21'}, 'edge': [{'version_added': true}, {'prefix': '-webkit-', 'version_added': true}], 'edge_mobile': [{'version_added': true}, {'prefix': '-webkit-', 'version_added': true}], 'firefox': [{'version_added': '22', 'notes': 'Since Firefox 28, multi-line flexbox is supported.'}, {'prefix': '-webkit-', 'version_added': '49'}, {'prefix': '-webkit-', 'version_added': '44', 'flag': {'type': 'preference', 'name': 'layout.css.prefixes.webkit', 'value_to_set': 'true'}}, {'version_added': '18', 'version_removed': '28', 'flag': {'type': 'preference', 'name': 'layout.css.flexbox.enabled', 'value_to_set': 'true'}}], 'firefox_android': [{'version_added': '22', 'notes': 'Since Firefox 28, multi-line flexbox is supported.'}, {'prefix': '-webkit-', 'version_added': '49'}, {'prefix': '-webkit-', 'version_added': '44', 'flag': {'type': 'preference', 'name': 'layout.css.prefixes.webkit', 'value_to_set': 'true'}}, {'version_added': '18', 'version_removed': '28', 'flag': {'type': 'preference', 'name': 'layout.css.flexbox.enabled', 'value_to_set': 'true'}}], 'ie': {'version_added': '11', 'notes': "When a non-<code>auto</code> <code>flex-basis</code> is specified, Internet Explorer 10 and 11 always uses a <code>content-box</code> box model to calculate the size of a flex item, even if <a href='http://developer.mozilla.org/docs/Web/CSS/box-sizing'><code>box-sizing: border-box</code></a> is applied to the element. See <a href='https://github.com/philipwalton/flexbugs#7-flex-basis-doesnt-account-for-box-sizingborder-box'>Flexbug #7</a> for more info."}, 'ie_mobile': {'version_added': false}, 'opera': [{'version_added': '12.1'}, {'prefix': '-webkit-', 'version_added': '15'}], 'opera_android': [{'version_added': '12.1'}, {'prefix': '-webkit-', 'version_added': '15'}], 'safari': [{'version_added': '9'}, {'prefix': '-webkit-', 'version_added': '7'}], 'safari_ios': {'version_added': '9.2'}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}, 'auto': {'__compat': {'description': '<code>auto</code>', 'support': {'chrome': {'version_added': '21'}, 'edge': {'version_added': true}, 'edge_mobile': {'version_added': true}, 'firefox': {'version_added': '18'}, 'firefox_android': {'version_added': '18'}, 'ie': {'version_added': '11'}, 'opera': {'version_added': '12.1'}, 'opera_android': {'version_added': '12.1'}, 'safari': {'prefix': '-webkit-', 'version_added': '7'}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}, 'content': {'__compat': {'description': '<code>content</code>', 'support': {'chrome': {'version_added': false}, 'chrome_android': {'version_added': false}, 'edge': {'version_added': true}, 'edge_mobile': {'version_added': true}, 'firefox': {'version_added': false}, 'firefox_android': {'version_added': false}, 'ie': {'version_added': false}, 'ie_mobile': {'version_added': false}, 'opera': {'version_added': false}, 'opera_android': {'version_added': false}, 'safari': {'version_added': false}, 'safari_ios': {'version_added': false}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}}, 'flex-direction': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/flex-direction', 'support': {'chrome': {'prefix': '-webkit-', 'version_added': '21'}, 'edge': [{'version_added': true}, {'prefix': '-webkit-', 'version_added': true}], 'edge_mobile': [{'version_added': true}, {'prefix': '-webkit-', 'version_added': true}], 'firefox': [{'version_added': '20', 'notes': 'Since Firefox 28, multi-line flexbox is supported.'}, {'version_added': '18', 'version_removed': '20', 'flag': {'type': 'preference', 'name': 'layout.css.flexbox.enabled', 'value_to_set': 'true'}}, {'prefix': '-webkit-', 'version_added': '49'}, {'prefix': '-webkit-', 'version_added': '44', 'flag': {'type': 'preference', 'name': 'layout.css.prefixes.webkit', 'value_to_set': 'true'}}], 'ie': [{'version_added': '11'}, {'prefix': '-ms-', 'version_added': '10'}], 'ie_mobile': {'version_added': false}, 'opera': [{'version_added': '12.10'}, {'prefix': '-webkit-', 'version_added': '15'}], 'opera_android': [{'version_added': '12.10'}, {'prefix': '-webkit-', 'version_added': '15'}], 'safari': [{'version_added': '9'}, {'prefix': '-webkit-', 'version_added': '7'}], 'safari_ios': {'version_added': null}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}, 'flex-flow': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/flex-flow', 'support': {'chrome': [{'version_added': '29'}, {'prefix': '-webkit-', 'version_added': '21'}], 'edge': {'version_added': true}, 'edge_mobile': {'version_added': true}, 'firefox': [{'version_added': '28'}, {'prefix': '-webkit-', 'version_added': '49'}, {'prefix': '-webkit-', 'version_added': '44', 'flag': {'type': 'preference', 'name': 'layout.css.prefixes.webkit', 'value_to_set': 'true'}}], 'firefox_android': [{'version_added': '28'}, {'prefix': '-webkit-', 'version_added': '49'}, {'prefix': '-webkit-', 'version_added': '44', 'flag': {'type': 'preference', 'name': 'layout.css.prefixes.webkit', 'value_to_set': 'true'}}], 'ie': {'version_added': '11'}, 'ie_mobile': {'version_added': '11'}, 'opera': [{'version_added': '12.10'}, {'prefix': '-webkit-', 'version_added': '15'}], 'opera_android': [{'version_added': '12.10'}, {'prefix': '-webkit-', 'version_added': '15'}], 'safari': [{'version_added': '9'}, {'prefix': '-webkit-', 'version_added': '6.1'}], 'safari_ios': [{'version_added': '9.2'}, {'prefix': '-webkit-', 'version_added': '7.1'}]}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}, 'flex-grow': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/flex-grow', 'support': {'chrome': {'prefix': '-webkit-', 'version_added': '21'}, 'edge': [{'version_added': true}, {'prefix': '-webkit-', 'version_added': true}], 'edge_mobile': [{'version_added': true}, {'prefix': '-webkit-', 'version_added': true}], 'firefox': [{'version_added': '20', 'notes': 'Since Firefox 28, multi-line flexbox is supported.'}, {'version_added': '18', 'version_removed': '20', 'flag': {'type': 'preference', 'name': 'layout.css.flexbox.enabled', 'value_to_set': 'true'}}], 'firefox_android': [{'version_added': '20', 'notes': 'Since Firefox 28, multi-line flexbox is supported.'}, {'version_added': '18', 'version_removed': '20', 'flag': {'type': 'preference', 'name': 'layout.css.flexbox.enabled', 'value_to_set': 'true'}}], 'ie': {'alternative_name': '-ms-flex-positive', 'version_added': '11'}, 'ie_mobile': {'version_added': false}, 'opera': [{'version_added': '12.10'}, {'prefix': '-webkit-', 'version_added': '15'}], 'opera_android': [{'version_added': '12.10'}, {'prefix': '-webkit-', 'version_added': '15'}], 'safari': {'prefix': '-webkit-', 'version_added': '6.1'}, 'safari_ios': {'version_added': null}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}, 'less_than_zero_animate': {'__compat': {'description': '<0 animate', 'support': {'chrome': {'version_added': '49'}, 'firefox': {'version_added': '32', 'notes': "Before Firefox 32, Firefox wasn't able to animate values starting or stopping at <code>0</code>."}, 'firefox_android': {'version_added': '32', 'notes': "Before Firefox 32, Firefox wasn't able to animate values starting or stopping at <code>0</code>."}, 'opera': {'version_added': false}, 'opera_android': {'version_added': false}, 'safari': {'version_added': false}, 'safari_ios': {'version_added': false}}, 'status': {'experimental': false, 'standard_track': false, 'deprecated': false}}}}, 'flex-shrink': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/flex-shrink', 'support': {'chrome': {'prefix': '-webkit-', 'version_added': '21'}, 'edge': [{'version_added': true}, {'prefix': '-webkit-', 'version_added': true}], 'edge_mobile': [{'version_added': true}, {'prefix': '-webkit-', 'version_added': true}], 'firefox': [{'version_added': '20', 'notes': ['Since Firefox 28, multi-line flexbox is supported.', "Before Firefox 32, Firefox wasn't able to animate values starting or stopping at <code>0</code>."]}, {'prefix': '-webkit-', 'version_added': '49'}, {'prefix': '-webkit-', 'version_added': '44', 'flag': {'type': 'preference', 'name': 'layout.css.prefixes.webkit', 'value_to_set': 'true'}}, {'version_added': '18', 'version_removed': '20', 'flag': {'type': 'preference', 'name': 'layout.css.flexbox.enabled', 'value_to_set': 'true'}}], 'firefox_android': [{'version_added': '20', 'notes': ['Since Firefox 28, multi-line flexbox is supported.', "Before Firefox 32, Firefox wasn't able to animate values starting or stopping at <code>0</code>."]}, {'prefix': '-webkit-', 'version_added': '49'}, {'prefix': '-webkit-', 'version_added': '44', 'flag': {'type': 'preference', 'name': 'layout.css.prefixes.webkit', 'value_to_set': 'true'}}, {'version_added': '18', 'version_removed': '20', 'flag': {'type': 'preference', 'name': 'layout.css.flexbox.enabled', 'value_to_set': 'true'}}], 'ie': {'version_added': '10', 'notes': "Internet Explorer 10 uses <code>0</code> instead of <code>1</code> as the initial value for the <code>flex-shrink</code> property. A workaround is to always set an explicit value for <code>flex-shrink</code>. See <a href='https://github.com/philipwalton/flexbugs#6-the-default-flex-value-has-changed'>Flexbug #6</a> for more info."}, 'ie_mobile': {'version_added': false}, 'opera': [{'version_added': '12.10'}, {'prefix': '-webkit-', 'version_added': '15'}], 'opera_android': [{'version_added': '12.10'}, {'prefix': '-webkit-', 'version_added': '15'}], 'safari': {'prefix': '-webkit-', 'version_added': '8'}, 'safari_ios': {'version_added': null}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}, 'flex-wrap': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/flex-wrap', 'support': {'webview_android': {'version_added': '4.4'}, 'chrome': {'version_added': '29'}, 'edge': {'version_added': '12'}, 'edge_mobile': {'version_added': '12'}, 'firefox': {'version_added': '28'}, 'firefox_android': {'version_added': '52'}, 'ie': {'version_added': '11', 'partial_implementation': true, 'notes': "Partial support due to large number of bugs present. See <a href='https://github.com/philipwalton/flexbugs'>Flexbugs</a>."}, 'ie_mobile': {'version_added': '11'}, 'opera': {'version_added': '17'}, 'opera_android': {'version_added': '12.1'}, 'safari': {'version_added': '9'}, 'safari_ios': {'version_added': '9.2'}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}, 'flex': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/flex', 'support': {'webview_android': [{'version_added': '4.4'}, {'prefix': '-webkit-', 'version_added': true}], 'chrome': [{'version_added': '29'}, {'prefix': '-webkit-', 'version_added': '21'}], 'chrome_android': {'version_added': null}, 'edge': [{'version_added': true}, {'prefix': '-webkit-', 'version_added': true}], 'edge_mobile': [{'version_added': true}, {'prefix': '-webkit-', 'version_added': true}], 'firefox': [{'version_added': '20', 'notes': ['Since Firefox 28, multi-line flexbox is supported.', "Before Firefox 32, Firefox wasn't able to animate values starting or stopping at <code>0</code>."]}, {'prefix': '-webkit-', 'version_added': '49'}, {'prefix': '-webkit-', 'version_added': '44', 'flag': {'type': 'preference', 'name': 'layout.css.prefixes.webkit', 'value_to_set': 'true'}}, {'version_added': '18', 'version_removed': '28', 'flag': {'type': 'preference', 'name': 'layout.css.flexbox.enabled', 'value_to_set': 'true'}}], 'ie': [{'version_added': '11', 'notes': ["Internet Explorer 11 ignores uses of <a href='https://developer.mozilla.org/docs/Web/CSS/calc'><code>calc()</code></a> in the <code>flex-basis</code> part of the <code>flex</code> syntax. This can be worked around by using the longhand properties instead of the shorthand. See <a href='https://github.com/philipwalton/flexbugs#8-flex-basis-doesnt-support-calc'>Flexbug #8</a> for more info.", "Internet Explorer 11 considers a unitless value in the <code>flex-basis</code> part to be syntactically invalid (and will thus be ignored). A workaround is to always include a unit in the <code>flex-basis</code> part of the <code>flex</code> shorthand value. See <a href='https://github.com/philipwalton/flexbugs#4-flex-shorthand-declarations-with-unitless-flex-basis-values-are-ignored'>Flexbug #4</a> for more info."]}, {'prefix': '-ms-', 'version_added': '10', 'notes': ["Internet Explorer 10 and 11 ignore uses of <a href='https://developer.mozilla.org/docs/Web/CSS/calc'><code>calc()</code></a> in the <code>flex-basis</code> part of the <code>flex</code> syntax. This can be worked around by using the longhand properties instead of the shorthand. See <a href='https://github.com/philipwalton/flexbugs#8-flex-basis-doesnt-support-calc'>Flexbug #8</a> for more info.", "Internet Explorer 10 and 11 consider a unitless value in the <code>flex-basis</code> part to be syntactically invalid (and will thus be ignored). A workaround is to always include a unit in the <code>flex-basis</code> part of the <code>flex</code> shorthand value. See <a href='https://github.com/philipwalton/flexbugs#4-flex-shorthand-declarations-with-unitless-flex-basis-values-are-ignored'>Flexbug #4</a> for more info."]}], 'ie_mobile': {'version_added': '11'}, 'opera': {'version_added': '12.1'}, 'opera_android': {'version_added': '12.1'}, 'safari': [{'version_added': '9'}, {'prefix': '-webkit-', 'version_added': '6.1'}], 'safari_ios': [{'version_added': true}, {'prefix': '-webkit-', 'version_added': '7.1'}]}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}, 'float': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/float', 'support': {'webview_android': {'version_added': '1'}, 'chrome': {'version_added': '1'}, 'chrome_android': {'version_added': true}, 'edge': {'version_added': true}, 'edge_mobile': {'version_added': true}, 'firefox': {'version_added': '1'}, 'firefox_android': {'version_added': '4'}, 'ie': {'version_added': '4'}, 'ie_mobile': {'version_added': '6'}, 'opera': {'version_added': '7'}, 'opera_android': {'version_added': '6'}, 'safari': {'version_added': '1'}, 'safari_ios': {'version_added': '1'}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}, 'flow_relative_values': {'__compat': {'description': 'Flow-relative values <code>inline-start</code> and <code>inline-end</code>', 'support': {'webview_android': {'version_added': false}, 'chrome': {'version_added': false}, 'chrome_android': {'version_added': false}, 'edge': {'version_added': false}, 'edge_mobile': {'version_added': false}, 'firefox': {'version_added': '55'}, 'firefox_android': {'version_added': '55'}, 'ie': {'version_added': false}, 'ie_mobile': {'version_added': false}, 'opera': {'version_added': false}, 'opera_android': {'version_added': false}, 'safari': {'version_added': false}, 'safari_ios': {'version_added': false}}, 'status': {'experimental': true, 'standard_track': true, 'deprecated': false}}}}, 'font-family': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/font-family', 'support': {'webview_android': {'version_added': '1'}, 'chrome': {'version_added': '1'}, 'chrome_android': {'version_added': '1'}, 'edge': {'version_added': true}, 'edge_mobile': {'version_added': true}, 'firefox': {'version_added': '1'}, 'firefox_android': {'version_added': '4'}, 'ie': {'version_added': '3'}, 'ie_mobile': {'version_added': '6'}, 'opera': {'version_added': '3.5'}, 'opera_android': {'version_added': '6'}, 'safari': {'version_added': '1'}, 'safari_ios': {'version_added': '1'}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}, 'system_ui': {'__compat': {'description': '<code>system-ui</code>', 'support': {'webview_android': {'version_added': '56'}, 'chrome': {'version_added': '56'}, 'chrome_android': {'version_added': '56'}, 'edge': {'version_added': false}, 'edge_mobile': {'version_added': false}, 'firefox': [{'version_added': false}, {'alternative_name': '-apple-system', 'version_added': '43', 'notes': 'Supported on macOS only.'}], 'firefox_android': {'version_added': null}, 'ie': {'version_added': false}, 'ie_mobile': {'version_added': false}, 'opera': {'version_added': '43'}, 'opera_android': {'version_added': '43'}, 'safari': {'alternative_name': '-apple-system', 'version_added': '9', 'notes': 'Supported since macOS 10.11.'}, 'safari_ios': {'alternative_name': '-apple-system', 'version_added': true, 'notes': 'Supported since iOS 9.'}}, 'status': {'experimental': true, 'standard_track': true, 'deprecated': false}}}}, 'font-feature-settings': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/font-feature-settings', 'support': {'webview_android': {'version_added': '4.4'}, 'chrome': [{'version_added': '48'}, {'prefix': '-webkit-', 'version_added': '16'}], 'chrome_android': {'version_added': '48'}, 'edge': {'version_added': '15'}, 'edge_mobile': {'version_added': true}, 'firefox': [{'version_added': '34', 'notes': ["The <a href='http://mpeg.chiariglione.org/standards/mpeg-4/open-font-format/text-isoiec-cd-14496-22-3rd-edition' >ISO/IEC CD 14496-22 3rd edition</a> suggests using the <code>ssty</code> feature to provide glyph variants more suitable for use in scripts (for example primes used as superscripts). Starting with Firefox 29, this is done automatically by the <a href='https://developer.mozilla.org/docs/Web/MathML'>MathML</a> rendering engine. The ISO/IEC CD 14496-22 3rd edition also suggests applying the <code>dtls</code> feature to letters when placing mathematical accents to get dotless forms (for example dotless i, j with a hat). Starting with Firefox 35, this is done automatically by the MathML rendering engine. You can override the default values determined by the MathML rendering engine with CSS."]}, {'prefix': '-moz-', 'version_added': '15', 'notes': "From Firefox 4 to Firefox 14 (inclusive), Firefox supported an older, slightly different syntax. See <a href='http://hacks.mozilla.org/2010/11/firefox-4-font-feature-support/'>OpenType Font Feature support in Firefox 4</a>."}], 'firefox_android': [{'version_added': '34', 'notes': ["The <a href='http://mpeg.chiariglione.org/standards/mpeg-4/open-font-format/text-isoiec-cd-14496-22-3rd-edition' >ISO/IEC CD 14496-22 3rd edition</a> suggests using the <code>ssty</code> feature to provide glyph variants more suitable for use in scripts (for example primes used as superscripts). Starting with Firefox 29, this is done automatically by the <a href='https://developer.mozilla.org/docs/Web/MathML'>MathML</a> rendering engine. The ISO/IEC CD 14496-22 3rd edition also suggests applying the <code>dtls</code> feature to letters when placing mathematical accents to get dotless forms (for example dotless i, j with a hat). Starting with Firefox 35, this is done automatically by the MathML rendering engine. You can override the default values determined by the MathML rendering engine with CSS."]}, {'prefix': '-moz-', 'version_added': '15', 'notes': "From Firefox 4 to Firefox 14 (inclusive), Firefox supported an older, slightly different syntax. See <a href='http://hacks.mozilla.org/2010/11/firefox-4-font-feature-support/'>OpenType Font Feature support in Firefox 4</a>."}], 'ie': {'version_added': '10'}, 'ie_mobile': {'version_added': null}, 'opera': [{'version_added': '35'}, {'prefix': '-webkit-', 'version_added': '15'}], 'opera_android': {'version_added': true}, 'safari': [{'version_added': '9.1'}, {'partial_implementation': true, 'version_added': '4', 'version_removed': '6'}], 'safari_ios': [{'version_added': '9.3'}, {'partial_implementation': true, 'version_added': '3.2', 'version_removed': '6.1'}]}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}, 'font-kerning': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/font-kerning', 'support': {'webview_android': {'version_added': null}, 'chrome': {'prefix': '-webkit-', 'version_added': '32'}, 'chrome_android': {'version_added': null}, 'edge': {'version_added': true}, 'edge_mobile': {'version_added': true}, 'firefox': [{'version_added': '32'}, {'version_added': '24', 'version_removed': '34', 'flag': {'type': 'preference', 'name': 'layout.css.font-features.enabled', 'value_to_set': 'true'}}], 'firefox_android': [{'version_added': '32'}, {'version_added': '24', 'version_removed': '34', 'flag': {'type': 'preference', 'name': 'layout.css.font-features.enabled', 'value_to_set': 'true'}}], 'ie': {'version_added': false}, 'ie_mobile': {'version_added': false}, 'opera': {'version_added': null}, 'opera_android': {'version_added': null}, 'safari': {'version_added': '7'}, 'safari_ios': {'version_added': '7'}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}, 'font-language-override': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/font-language-override', 'support': {'webview_android': {'version_added': false}, 'chrome': {'version_added': false}, 'chrome_android': {'version_added': false}, 'edge': {'version_added': false}, 'edge_mobile': {'version_added': false}, 'firefox': [{'version_added': '34'}, {'version_added': '24', 'version_removed': '34', 'flag': {'type': 'preference', 'name': 'layout.css.font-features.enabled', 'value_to_set': 'true'}}, {'prefix': '-moz-', 'version_added': '4'}], 'firefox_android': [{'version_added': '34'}, {'version_added': '24', 'version_removed': '34', 'flag': {'type': 'preference', 'name': 'layout.css.font-features.enabled', 'value_to_set': 'true'}}, {'prefix': '-moz-', 'version_added': '4'}], 'ie': {'version_added': false}, 'ie_mobile': {'version_added': false}, 'opera': {'version_added': false}, 'opera_android': {'version_added': false}, 'safari': {'version_added': false}, 'safari_ios': {'version_added': false}}, 'status': {'experimental': true, 'standard_track': true, 'deprecated': false}}}, 'font-size-adjust': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/font-size-adjust', 'support': {'webview_android': {'version_added': null}, 'chrome': {'version_added': '43', 'flag': {'type': 'preference', 'name': 'Enable experimental Web Platform features'}}, 'chrome_android': {'version_added': null}, 'edge': {'version_added': false}, 'edge_mobile': {'version_added': false}, 'firefox': [{'version_added': '3', 'notes': "Before Firefox 40, <code>font-size-adjust: 0</code> was incorrectly interpreted as <code>font-size-adjust: none</code> (<a href='https://bugzil.la/1144885'>bug 1144885</a>)."}, {'version_added': '1', 'notes': 'Before Firefox 3, <code>font-size-adjust</code> was supported on Windows only.'}], 'firefox_android': {'version_added': '4'}, 'ie': {'version_added': false}, 'ie_mobile': {'version_added': null}, 'opera': {'version_added': '30', 'flag': {'type': 'preference', 'name': 'Enable experimental Web Platform features'}}, 'opera_android': {'version_added': null}, 'safari': {'version_added': false}, 'safari_ios': {'version_added': null}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}, 'font-size': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/font-size', 'support': {'webview_android': {'version_added': '1'}, 'chrome': {'version_added': '1'}, 'chrome_android': {'version_added': '1'}, 'edge': {'version_added': '12'}, 'edge_mobile': {'version_added': '12'}, 'firefox': {'version_added': '1'}, 'firefox_android': {'version_added': '4'}, 'ie': {'version_added': '5.5'}, 'ie_mobile': {'version_added': '6'}, 'opera': {'version_added': '7'}, 'opera_android': {'version_added': '6'}, 'safari': {'version_added': '1'}, 'safari_ios': {'version_added': '1'}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}, 'rem_values': {'__compat': {'description': 'Rem values', 'support': {'webview_android': {'version_added': '4.1'}, 'chrome': {'version_added': '31'}, 'chrome_android': {'version_added': '42'}, 'edge': {'version_added': '12'}, 'edge_mobile': {'version_added': '12'}, 'firefox': {'version_added': '31', 'notes': ["Before Firefox 57, animations using em units are not affected by changes to the <code>font-size</code> of the animated element's parent (<a href='https://bugzil.la/1254424'>bug 1254424</a>).", "Before Firefox 57, some language settings' inherited <code>font-size</code> is smaller than expected (<a href='https://bugzil.la/1391341'>bug 1391341</a>)."]}, 'firefox_android': {'version_added': '31'}, 'ie': [{'version_added': '11'}, {'partial_implementation': true, 'version_added': '9', 'version_removed': '10'}], 'ie_mobile': {'version_added': '10'}, 'opera': {'version_added': '28'}, 'opera_android': {'version_added': '12'}, 'safari': {'version_added': '7'}, 'safari_ios': {'version_added': true}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}}, 'font-stretch': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/font-stretch', 'support': {'webview_android': {'version_added': false}, 'chrome': {'version_added': '48'}, 'chrome_android': {'version_added': null}, 'edge': {'version_added': '12'}, 'edge_mobile': {'version_added': '12'}, 'firefox': {'version_added': '9'}, 'firefox_android': {'version_added': '9'}, 'ie': {'version_added': '9'}, 'ie_mobile': {'version_added': null}, 'opera': {'version_added': '35'}, 'opera_android': {'version_added': false}, 'safari': {'version_added': '11'}, 'safari_ios': {'version_added': null}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}, 'font-style': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/font-style', 'support': {'webview_android': {'version_added': '1'}, 'chrome': {'version_added': '1'}, 'chrome_android': {'version_added': '1'}, 'edge': {'version_added': '12'}, 'edge_mobile': {'version_added': '12'}, 'firefox': {'version_added': '1', 'notes': 'Before Firefox 44, <code>oblique</code> was not distinguished from <code>italic</code>.'}, 'firefox_android': {'version_added': '4', 'notes': 'Before Firefox 44, <code>oblique</code> was not distinguished from <code>italic</code>.'}, 'ie': {'version_added': '4'}, 'ie_mobile': {'version_added': '6'}, 'opera': {'version_added': '7'}, 'opera_android': {'version_added': '6'}, 'safari': {'version_added': '1'}, 'safari_ios': {'version_added': '1'}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}, 'font-synthesis': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/font-synthesis', 'support': {'webview_android': {'version_added': false}, 'chrome': {'version_added': false}, 'chrome_android': {'version_added': false}, 'edge': {'version_added': false}, 'edge_mobile': {'version_added': false}, 'firefox': [{'version_added': '34'}, {'version_added': '33', 'version_removed': '34', 'flag': {'type': 'preference', 'name': 'layout.css.font-features.enabled', 'value_to_set': 'true'}}], 'firefox_android': {'version_added': '34'}, 'ie': {'version_added': false}, 'ie_mobile': {'version_added': false}, 'opera': {'version_added': false}, 'opera_android': {'version_added': false}, 'safari': {'version_added': '9'}, 'safari_ios': {'version_added': '9.1'}}, 'status': {'experimental': true, 'standard_track': true, 'deprecated': false}}}, 'font-variant-alternates': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/font-variant-alternates', 'support': {'webview_android': {'version_added': false}, 'chrome': {'version_added': false}, 'chrome_android': {'version_added': false}, 'edge': {'version_added': false}, 'edge_mobile': {'version_added': false}, 'firefox': [{'version_added': '34'}, {'version_added': '24', 'version_removed': '34', 'flag': {'type': 'preference', 'name': 'layout.css.font-features.enabled', 'value_to_set': 'true'}}], 'firefox_android': [{'version_added': '34'}, {'version_added': '24', 'version_removed': '34', 'flag': {'type': 'preference', 'name': 'layout.css.font-features.enabled', 'value_to_set': 'true'}}], 'ie': {'version_added': false}, 'ie_mobile': {'version_added': false}, 'opera': {'version_added': false}, 'opera_android': {'version_added': false}, 'safari': {'version_added': false}, 'safari_ios': {'version_added': false}}, 'status': {'experimental': true, 'standard_track': true, 'deprecated': true}}, 'annotation': {'__compat': {'description': '<code>annotation()</code>', 'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/font-variant-alternates#annotation()', 'support': {'webview_android': {'version_added': false}, 'chrome': {'version_added': false}, 'chrome_android': {'version_added': false}, 'edge': {'version_added': false}, 'edge_mobile': {'version_added': false}, 'firefox': [{'version_added': '34'}, {'version_added': '24', 'version_removed': '34', 'flag': {'type': 'preference', 'name': 'layout.css.font-features.enabled', 'value_to_set': 'true'}}], 'firefox_android': [{'version_added': '34'}, {'version_added': '24', 'version_removed': '34', 'flag': {'type': 'preference', 'name': 'layout.css.font-features.enabled', 'value_to_set': 'true'}}], 'ie': {'version_added': false}, 'ie_mobile': {'version_added': false}, 'opera': {'version_added': false}, 'opera_android': {'version_added': false}, 'safari': {'version_added': false}, 'safari_ios': {'version_added': false}}, 'status': {'experimental': true, 'standard_track': true, 'deprecated': true}}}, 'character_variant': {'__compat': {'description': '<code>character-variant()</code>', 'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/font-variant-alternates#character-variant()', 'support': {'webview_android': {'version_added': false}, 'chrome': {'version_added': false}, 'chrome_android': {'version_added': false}, 'edge': {'version_added': false}, 'edge_mobile': {'version_added': false}, 'firefox': [{'version_added': '34'}, {'version_added': '24', 'version_removed': '34', 'flag': {'type': 'preference', 'name': 'layout.css.font-features.enabled', 'value_to_set': 'true'}}], 'firefox_android': [{'version_added': '34'}, {'version_added': '24', 'version_removed': '34', 'flag': {'type': 'preference', 'name': 'layout.css.font-features.enabled', 'value_to_set': 'true'}}], 'ie': {'version_added': false}, 'ie_mobile': {'version_added': false}, 'opera': {'version_added': false}, 'opera_android': {'version_added': false}, 'safari': {'version_added': false}, 'safari_ios': {'version_added': false}}, 'status': {'experimental': true, 'standard_track': true, 'deprecated': true}}}, 'ornaments': {'__compat': {'description': '<code>ornaments()</code>', 'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/font-variant-alternates#ornaments()', 'support': {'webview_android': {'version_added': false}, 'chrome': {'version_added': false}, 'chrome_android': {'version_added': false}, 'edge': {'version_added': false}, 'edge_mobile': {'version_added': false}, 'firefox': [{'version_added': '34'}, {'version_added': '24', 'version_removed': '34', 'flag': {'type': 'preference', 'name': 'layout.css.font-features.enabled', 'value_to_set': 'true'}}], 'firefox_android': [{'version_added': '34'}, {'version_added': '24', 'version_removed': '34', 'flag': {'type': 'preference', 'name': 'layout.css.font-features.enabled', 'value_to_set': 'true'}}], 'ie': {'version_added': false}, 'ie_mobile': {'version_added': false}, 'opera': {'version_added': false}, 'opera_android': {'version_added': false}, 'safari': {'version_added': false}, 'safari_ios': {'version_added': false}}, 'status': {'experimental': true, 'standard_track': true, 'deprecated': true}}}, 'styleset': {'__compat': {'description': '<code>styleset()</code>', 'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/font-variant-alternates#styleset()', 'support': {'webview_android': {'version_added': false}, 'chrome': {'version_added': false}, 'chrome_android': {'version_added': false}, 'edge': {'version_added': false}, 'edge_mobile': {'version_added': false}, 'firefox': [{'version_added': '34'}, {'version_added': '24', 'version_removed': '34', 'flag': {'type': 'preference', 'name': 'layout.css.font-features.enabled', 'value_to_set': 'true'}}], 'firefox_android': [{'version_added': '34'}, {'version_added': '24', 'version_removed': '34', 'flag': {'type': 'preference', 'name': 'layout.css.font-features.enabled', 'value_to_set': 'true'}}], 'ie': {'version_added': false}, 'ie_mobile': {'version_added': false}, 'opera': {'version_added': false}, 'opera_android': {'version_added': false}, 'safari': {'version_added': false}, 'safari_ios': {'version_added': false}}, 'status': {'experimental': true, 'standard_track': true, 'deprecated': true}}}, 'stylistic': {'__compat': {'description': '<code>stylistic()</code>', 'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/font-variant-alternates#stylistic()', 'support': {'webview_android': {'version_added': false}, 'chrome': {'version_added': false}, 'chrome_android': {'version_added': false}, 'edge': {'version_added': false}, 'edge_mobile': {'version_added': false}, 'firefox': [{'version_added': '34'}, {'version_added': '24', 'version_removed': '34', 'flag': {'type': 'preference', 'name': 'layout.css.font-features.enabled', 'value_to_set': 'true'}}], 'firefox_android': [{'version_added': '34'}, {'version_added': '24', 'version_removed': '34', 'flag': {'type': 'preference', 'name': 'layout.css.font-features.enabled', 'value_to_set': 'true'}}], 'ie': {'version_added': false}, 'ie_mobile': {'version_added': false}, 'opera': {'version_added': false}, 'opera_android': {'version_added': false}, 'safari': {'version_added': false}, 'safari_ios': {'version_added': false}}, 'status': {'experimental': true, 'standard_track': true, 'deprecated': true}}}, 'swash': {'__compat': {'description': '<code>swash()</code>', 'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/font-variant-alternates#swash()', 'support': {'webview_android': {'version_added': false}, 'chrome': {'version_added': false}, 'chrome_android': {'version_added': false}, 'edge': {'version_added': false}, 'edge_mobile': {'version_added': false}, 'firefox': [{'version_added': '34'}, {'version_added': '24', 'version_removed': '34', 'flag': {'type': 'preference', 'name': 'layout.css.font-features.enabled', 'value_to_set': 'true'}}], 'firefox_android': [{'version_added': '34'}, {'version_added': '24', 'version_removed': '34', 'flag': {'type': 'preference', 'name': 'layout.css.font-features.enabled', 'value_to_set': 'true'}}], 'ie': {'version_added': false}, 'ie_mobile': {'version_added': false}, 'opera': {'version_added': false}, 'opera_android': {'version_added': false}, 'safari': {'version_added': false}, 'safari_ios': {'version_added': false}}, 'status': {'experimental': true, 'standard_track': true, 'deprecated': true}}}}, 'font-variant-caps': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/font-variant-caps', 'support': {'webview_android': {'version_added': '52'}, 'chrome': {'version_added': '52'}, 'chrome_android': {'version_added': '52'}, 'edge': {'version_added': false}, 'edge_mobile': {'version_added': false}, 'firefox': [{'version_added': '34'}, {'version_added': '24', 'version_removed': '34', 'flag': {'type': 'preference', 'name': 'layout.css.font-features.enabled', 'value_to_set': 'true'}}], 'firefox_android': [{'version_added': '34'}, {'version_added': '24', 'version_removed': '34', 'flag': {'type': 'preference', 'name': 'layout.css.font-features.enabled', 'value_to_set': 'true'}}], 'ie': {'version_added': false}, 'ie_mobile': {'version_added': false}, 'opera': {'version_added': '39'}, 'opera_android': {'version_added': '39'}, 'safari': {'version_added': false}, 'safari_ios': {'version_added': false}}, 'status': {'experimental': true, 'standard_track': true, 'deprecated': false}}}, 'font-variant-east-asian': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/font-variant-east-asian', 'support': {'webview_android': {'version_added': '63'}, 'chrome': {'version_added': '63'}, 'chrome_android': {'version_added': '63'}, 'edge': {'version_added': false}, 'edge_mobile': {'version_added': false}, 'firefox': [{'version_added': '34'}, {'version_added': '24', 'version_removed': '34', 'flag': {'type': 'preference', 'name': 'layout.css.font-features.enabled', 'value_to_set': 'true'}}], 'firefox_android': [{'version_added': '34'}, {'version_added': '24', 'version_removed': '34', 'flag': {'type': 'preference', 'name': 'layout.css.font-features.enabled', 'value_to_set': 'true'}}], 'ie': {'version_added': false}, 'ie_mobile': {'version_added': false}, 'opera': {'version_added': '50'}, 'opera_android': {'version_added': '50'}, 'safari': {'version_added': false}, 'safari_ios': {'version_added': false}}, 'status': {'experimental': true, 'standard_track': true, 'deprecated': false}}}, 'font-variant-ligatures': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/font-variant-ligatures', 'support': {'webview_android': [{'version_added': '34'}, {'prefix': '-webkit-', 'version_added': '4.4'}], 'chrome': [{'version_added': '34'}, {'prefix': '-webkit-', 'version_added': '31'}], 'chrome_android': {'version_added': '34'}, 'edge': {'version_added': false}, 'edge_mobile': {'version_added': false}, 'firefox': [{'version_added': '34'}, {'version_added': '24', 'version_removed': '34', 'flag': {'type': 'preference', 'name': 'layout.css.font-features.enabled', 'value_to_set': 'true'}}], 'firefox_android': [{'version_added': '34'}, {'version_added': '24', 'version_removed': '34', 'flag': {'type': 'preference', 'name': 'layout.css.font-features.enabled', 'value_to_set': 'true'}}], 'ie': {'version_added': false}, 'ie_mobile': {'version_added': null}, 'opera': [{'version_added': '21'}, {'prefix': '-webkit-', 'version_added': '19'}], 'opera_android': {'version_added': '21'}, 'safari': [{'version_added': '9.1'}, {'prefix': '-webkit-', 'version_added': '7'}], 'safari_ios': [{'version_added': true}, {'prefix': '-webkit-', 'version_added': '7'}]}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}, 'font-variant-numeric': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/font-variant-numeric', 'support': {'webview_android': {'version_added': '52'}, 'chrome': {'version_added': '52'}, 'chrome_android': {'version_added': '52'}, 'edge': {'version_added': false}, 'edge_mobile': {'version_added': false}, 'firefox': [{'version_added': '34'}, {'version_added': '24', 'version_removed': '34', 'flag': {'type': 'preference', 'name': 'layout.css.font-features.enabled', 'value_to_set': 'true'}}], 'firefox_android': [{'version_added': '34'}, {'version_added': '24', 'version_removed': '34', 'flag': {'type': 'preference', 'name': 'layout.css.font-features.enabled', 'value_to_set': 'true'}}], 'ie': {'version_added': false}, 'ie_mobile': {'version_added': false}, 'opera': {'version_added': '39'}, 'opera_android': {'version_added': '39'}, 'safari': {'version_added': '9.1'}, 'safari_ios': {'version_added': true}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}, 'font-variant-position': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/font-variant-position', 'support': {'webview_android': {'version_added': false}, 'chrome': {'version_added': false}, 'chrome_android': {'version_added': false}, 'edge': {'version_added': false}, 'edge_mobile': {'version_added': false}, 'firefox': [{'version_added': '34'}, {'version_added': '24', 'version_removed': '34', 'flag': {'type': 'preference', 'name': 'layout.css.font-features.enabled', 'value_to_set': 'true'}}], 'firefox_android': [{'version_added': '34'}, {'version_added': '24', 'version_removed': '34', 'flag': {'type': 'preference', 'name': 'layout.css.font-features.enabled', 'value_to_set': 'true'}}], 'ie': {'version_added': false}, 'ie_mobile': {'version_added': false}, 'opera': {'version_added': false}, 'opera_android': {'version_added': false}, 'safari': {'version_added': false}, 'safari_ios': {'version_added': false}}, 'status': {'experimental': true, 'standard_track': true, 'deprecated': false}}}, 'font-variant': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/font-variant', 'support': {'webview_android': {'version_added': '1'}, 'chrome': {'version_added': '1'}, 'chrome_android': {'version_added': '1'}, 'edge': {'version_added': '12'}, 'edge_mobile': {'version_added': '12'}, 'firefox': {'version_added': '1'}, 'firefox_android': {'version_added': '4'}, 'ie': {'version_added': '4'}, 'ie_mobile': {'version_added': true}, 'opera': {'version_added': '3.5'}, 'opera_android': {'version_added': true}, 'safari': {'version_added': '1'}, 'safari_ios': {'version_added': true}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}, 'uppercase_eszett': {'__compat': {'description': '<code>ß</code> → <code>SS</code>', 'support': {'webview_android': {'version_added': false}, 'chrome': {'version_added': null}, 'chrome_android': {'version_added': null}, 'edge': {'version_added': false}, 'edge_mobile': {'version_added': false}, 'firefox': {'version_added': '1'}, 'firefox_android': {'version_added': null}, 'ie': {'version_added': null}, 'ie_mobile': {'version_added': null}, 'opera': {'version_added': null}, 'opera_android': {'version_added': null}, 'safari': {'version_added': null}, 'safari_ios': {'version_added': null}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}, 'turkic_is': {'__compat': {'description': '<code>i</code> → <code>İ</code> and <code>ı</code> → <code>I</code>', 'support': {'webview_android': {'version_added': false}, 'chrome': {'version_added': false}, 'chrome_android': {'version_added': null}, 'edge': {'version_added': null}, 'edge_mobile': {'version_added': null}, 'firefox': {'version_added': '14'}, 'firefox_android': {'version_added': '14'}, 'ie': {'version_added': null}, 'ie_mobile': {'version_added': null}, 'opera': {'version_added': null}, 'opera_android': {'version_added': null}, 'safari': {'version_added': false}, 'safari_ios': {'version_added': false}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}, 'greek_accented_characters': {'__compat': {'description': 'Greek accented characters', 'support': {'webview_android': {'version_added': false}, 'chrome': {'version_added': false}, 'chrome_android': {'version_added': null}, 'edge': {'version_added': null}, 'edge_mobile': {'version_added': null}, 'firefox': {'version_added': '15'}, 'firefox_android': {'version_added': false}, 'ie': {'version_added': false}, 'ie_mobile': {'version_added': false}, 'opera': {'version_added': false}, 'opera_android': {'version_added': false}, 'safari': {'version_added': false}, 'safari_ios': {'version_added': false}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}, 'css_fonts_shorthand': {'__compat': {'description': 'CSS Fonts Module Level 3 shorthand', 'support': {'webview_android': {'version_added': null}, 'chrome': {'version_added': null}, 'chrome_android': {'version_added': null}, 'edge': {'version_added': null}, 'edge_mobile': {'version_added': null}, 'firefox': [{'version_added': '34'}, {'version_added': '33', 'version_removed': '34', 'flag': {'type': 'preference', 'name': 'layout.css.font-features.enabled', 'value_to_set': 'true'}}], 'firefox_android': [{'version_added': '34'}, {'version_added': '33', 'version_removed': '34', 'flag': {'type': 'preference', 'name': 'layout.css.font-features.enabled', 'value_to_set': 'true'}}], 'ie': {'version_added': null}, 'ie_mobile': {'version_added': null}, 'opera': {'version_added': null}, 'opera_android': {'version_added': null}, 'safari': {'version_added': '9.1'}, 'safari_ios': {'version_added': '9.3'}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}}, 'font-weight': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/font-weight', 'support': {'webview_android': {'version_added': '1'}, 'chrome': {'version_added': '2'}, 'chrome_android': {'version_added': true}, 'edge': {'version_added': true}, 'edge_mobile': {'version_added': true}, 'firefox': {'version_added': '1'}, 'firefox_android': {'version_added': '4'}, 'ie': {'version_added': '3'}, 'ie_mobile': {'version_added': '6'}, 'opera': {'version_added': '3.5'}, 'opera_android': {'version_added': '6'}, 'safari': {'version_added': '1.3'}, 'safari_ios': {'version_added': '3.1'}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}, 'font': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/font', 'support': {'webview_android': {'version_added': true}, 'chrome': {'version_added': '1'}, 'chrome_android': {'version_added': true}, 'edge': {'version_added': true}, 'edge_mobile': {'version_added': true}, 'firefox': {'version_added': '1'}, 'firefox_android': {'version_added': '4'}, 'ie': {'version_added': '3'}, 'ie_mobile': {'version_added': true}, 'opera': {'version_added': '3.5'}, 'opera_android': {'version_added': true}, 'safari': {'version_added': '1'}, 'safari_ios': {'version_added': true}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}, 'system_fonts': {'__compat': {'description': 'System fonts', 'support': {'webview_android': {'version_added': null}, 'chrome': {'version_added': '1'}, 'chrome_android': {'version_added': null}, 'edge': {'version_added': true}, 'edge_mobile': {'version_added': null}, 'firefox': {'version_added': '1'}, 'firefox_android': {'version_added': null}, 'ie': {'version_added': '4'}, 'ie_mobile': {'version_added': null}, 'opera': {'version_added': '6'}, 'opera_android': {'version_added': null}, 'safari': {'version_added': '1'}, 'safari_ios': {'version_added': null}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}, 'font_stretch_support': {'__compat': {'description': 'Support for <code>font-stretch</code> values', 'support': {'webview_android': {'version_added': null}, 'chrome': {'version_added': true}, 'chrome_android': {'version_added': null}, 'edge': {'version_added': null}, 'edge_mobile': {'version_added': null}, 'firefox': {'version_added': '43'}, 'firefox_android': {'version_added': '43'}, 'ie': {'version_added': null}, 'ie_mobile': {'version_added': null}, 'opera': {'version_added': null}, 'opera_android': {'version_added': null}, 'safari': {'version_added': null}, 'safari_ios': {'version_added': null}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}}, 'grid-area': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/grid-area', 'support': {'webview_android': [{'version_added': '57'}], 'chrome': [{'version_added': '57'}, {'version_added': '29', 'flag': {'type': 'preference', 'name': 'Enable experimental Web Platform features'}}], 'chrome_android': [{'version_added': '57'}, {'version_added': '29', 'flag': {'type': 'preference', 'name': 'Enable experimental Web Platform features'}}], 'edge': {'version_added': '16'}, 'edge_mobile': {'version_added': '16'}, 'firefox': [{'version_added': '52'}, {'version_added': '40', 'flag': {'type': 'preference', 'name': 'layout.css.grid.enabled', 'value_to_set': 'true'}}], 'firefox_android': [{'version_added': '52'}, {'version_added': '40', 'flag': {'type': 'preference', 'name': 'layout.css.grid.enabled', 'value_to_set': 'true'}}], 'ie': {'version_added': false}, 'ie_mobile': {'version_added': false}, 'opera': [{'version_added': '44'}, {'version_added': '28', 'flag': {'type': 'preference', 'name': 'Enable experimental Web Platform features'}}], 'opera_android': [{'version_added': '44'}], 'safari': {'version_added': '10.1'}, 'safari_ios': {'version_added': '10.3'}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}, 'grid-auto-columns': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/grid-auto-columns', 'support': {'webview_android': [{'version_added': '57'}], 'chrome': [{'version_added': '57'}, {'version_added': '29', 'flag': {'type': 'preference', 'name': 'Enable experimental Web Platform features'}}], 'chrome_android': [{'version_added': '57'}, {'version_added': '29', 'flag': {'type': 'preference', 'name': 'Enable experimental Web Platform features'}}], 'edge': [{'version_added': '16'}, {'version_added': '12', 'alternative_name': '-ms-grid-columns'}], 'edge_mobile': [{'version_added': '16'}, {'version_added': '12', 'alternative_name': '-ms-grid-columns'}], 'firefox': [{'version_added': '52'}, {'version_added': '40', 'flag': {'type': 'preference', 'name': 'layout.css.grid.enabled', 'value_to_set': 'true'}}], 'firefox_android': [{'version_added': '52'}, {'version_added': '40', 'flag': {'type': 'preference', 'name': 'layout.css.grid.enabled', 'value_to_set': 'true'}}], 'ie': {'version_added': '10', 'alternative_name': '-ms-grid-rows'}, 'ie_mobile': {'version_added': false}, 'opera': [{'version_added': '44'}, {'version_added': '28', 'flag': {'type': 'preference', 'name': 'Enable experimental Web Platform features'}}], 'opera_android': [{'version_added': '44'}], 'safari': {'version_added': '10.1'}, 'safari_ios': {'version_added': '10.3'}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}, 'grid-auto-flow': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/grid-auto-flow', 'support': {'webview_android': [{'version_added': '57'}], 'chrome': [{'version_added': '57'}, {'version_added': '29', 'flag': {'type': 'preference', 'name': 'Enable experimental Web Platform features'}}], 'chrome_android': [{'version_added': '57'}, {'version_added': '29', 'flag': {'type': 'preference', 'name': 'Enable experimental Web Platform features'}}], 'edge': {'version_added': '16'}, 'edge_mobile': {'version_added': '16'}, 'firefox': [{'version_added': '52'}, {'version_added': '40', 'flag': {'type': 'preference', 'name': 'layout.css.grid.enabled', 'value_to_set': 'true'}}], 'firefox_android': [{'version_added': '52'}, {'version_added': '40', 'flag': {'type': 'preference', 'name': 'layout.css.grid.enabled', 'value_to_set': 'true'}}], 'ie': {'version_added': false}, 'ie_mobile': {'version_added': false}, 'opera': [{'version_added': '44'}, {'version_added': '28', 'flag': {'type': 'preference', 'name': 'Enable experimental Web Platform features'}}], 'opera_android': [{'version_added': '44'}], 'safari': {'version_added': '10.1'}, 'safari_ios': {'version_added': '10.3'}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}, 'grid': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/grid', 'support': {'webview_android': [{'version_added': '57'}], 'chrome': [{'version_added': '57'}, {'version_added': '29', 'flag': {'type': 'preference', 'name': 'Enable experimental Web Platform features'}}], 'chrome_android': [{'version_added': '57'}, {'version_added': '29', 'flag': {'type': 'preference', 'name': 'Enable experimental Web Platform features'}}], 'edge': {'version_added': '16'}, 'edge_mobile': {'version_added': '16'}, 'firefox': [{'version_added': '52'}, {'version_added': '40', 'flag': {'type': 'preference', 'name': 'layout.css.grid.enabled', 'value_to_set': 'true'}}], 'firefox_android': [{'version_added': '52'}, {'version_added': '40', 'flag': {'type': 'preference', 'name': 'layout.css.grid.enabled', 'value_to_set': 'true'}}], 'ie': {'version_added': false}, 'ie_mobile': {'version_added': false}, 'opera': [{'version_added': '44'}, {'version_added': '28', 'flag': {'type': 'preference', 'name': 'Enable experimental Web Platform features'}}], 'opera_android': [{'version_added': '44'}], 'safari': {'version_added': '10.1'}, 'safari_ios': {'version_added': '10.3'}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}, 'left': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/left', 'support': {'webview_android': {'version_added': '1'}, 'chrome': {'version_added': '1'}, 'chrome_android': {'version_added': true}, 'edge': {'version_added': true}, 'edge_mobile': {'version_added': true}, 'firefox': {'version_added': '1'}, 'firefox_android': {'version_added': '4'}, 'ie': {'version_added': '5.5'}, 'ie_mobile': {'version_added': '6'}, 'opera': {'version_added': '5'}, 'opera_android': {'version_added': true}, 'safari': {'version_added': '1'}, 'safari_ios': {'version_added': '1'}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}, 'line-height': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/line-height', 'support': {'webview_android': {'version_added': '1'}, 'chrome': {'version_added': '1'}, 'chrome_android': {'version_added': true}, 'edge': {'version_added': '12'}, 'edge_mobile': {'version_added': '12'}, 'firefox': {'version_added': '1'}, 'firefox_android': {'version_added': '4'}, 'ie': {'version_added': '4'}, 'ie_mobile': {'version_added': '6'}, 'opera': {'version_added': '7'}, 'opera_android': {'version_added': '6'}, 'safari': {'version_added': '1'}, 'safari_ios': {'version_added': '1'}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}, 'list-style-image': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/list-style-image', 'support': {'webview_android': {'version_added': '1'}, 'chrome': {'version_added': '1'}, 'chrome_android': {'version_added': true}, 'edge': {'version_added': '12'}, 'edge_mobile': {'version_added': '12'}, 'firefox': {'version_added': '1'}, 'firefox_android': {'version_added': '4'}, 'ie': {'version_added': '4'}, 'ie_mobile': {'version_added': '6'}, 'opera': {'version_added': '7'}, 'opera_android': {'version_added': '6'}, 'safari': {'version_added': '1'}, 'safari_ios': {'version_added': '1'}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}, 'list-style-position': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/list-style-position', 'support': {'webview_android': {'version_added': true}, 'chrome': {'version_added': '1'}, 'chrome_android': {'version_added': true}, 'edge': {'version_added': '12'}, 'edge_mobile': {'version_added': '12'}, 'firefox': {'version_added': '1'}, 'firefox_android': {'version_added': '4'}, 'ie': {'version_added': '4'}, 'ie_mobile': {'version_added': null}, 'opera': {'version_added': '3.5'}, 'opera_android': {'version_added': null}, 'safari': {'version_added': '1'}, 'safari_ios': {'version_added': null}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}, 'list-style-type': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/list-style-type', 'support': {'webview_android': {'version_added': true}, 'chrome': {'version_added': '1'}, 'chrome_android': {'version_added': true}, 'edge': {'version_added': '12'}, 'edge_mobile': {'version_added': '12'}, 'firefox': {'version_added': '1'}, 'firefox_android': {'version_added': '4'}, 'ie': {'version_added': '4'}, 'ie_mobile': {'version_added': true}, 'opera': {'version_added': '3.5'}, 'opera_android': {'version_added': true}, 'safari': {'version_added': '1'}, 'safari_ios': {'version_added': true}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}, 'arabic-indic': {'__compat': {'description': '<code>arabic-indic</code>', 'support': {'webview_android': {'version_added': null}, 'chrome': {'version_added': false}, 'chrome_android': {'version_added': null}, 'edge': {'version_added': false}, 'edge_mobile': {'version_added': null}, 'firefox': {'version_added': null}, 'firefox_android': [{'version_added': '33'}, {'prefix': '-moz-', 'version_added': '1'}], 'ie': {'version_added': false}, 'ie_mobile': {'version_added': null}, 'opera': {'version_added': false}, 'opera_android': {'version_added': null}, 'safari': {'version_added': false}, 'safari_ios': {'version_added': null}}, 'status': {'experimental': true, 'standard_track': true, 'deprecated': false}}}, 'armenian': {'__compat': {'description': '<code>armenian</code>', 'support': {'webview_android': {'version_added': null}, 'chrome': {'version_added': '1'}, 'chrome_android': {'version_added': true}, 'edge': {'version_added': true}, 'edge_mobile': {'version_added': true}, 'firefox': {'version_added': '1'}, 'firefox_android': {'version_added': '4'}, 'ie': {'version_added': '8'}, 'ie_mobile': {'version_added': null}, 'opera': {'version_added': '6'}, 'opera_android': {'version_added': true}, 'safari': {'version_added': '1'}, 'safari_ios': {'version_added': true}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}, 'bengali': {'__compat': {'description': '<code>bengali</code>', 'support': {'webview_android': {'version_added': null}, 'chrome': {'version_added': false}, 'chrome_android': {'version_added': null}, 'edge': {'version_added': false}, 'edge_mobile': {'version_added': null}, 'firefox': {'version_added': null}, 'firefox_android': [{'version_added': '33'}, {'prefix': '-moz-', 'version_added': '1'}], 'ie': {'version_added': false}, 'ie_mobile': {'version_added': null}, 'opera': {'version_added': false}, 'opera_android': {'version_added': null}, 'safari': {'version_added': false}, 'safari_ios': {'version_added': null}}, 'status': {'experimental': true, 'standard_track': true, 'deprecated': false}}}, 'cjk-decimal': {'__compat': {'description': '<code>cjk-decimal</code>', 'support': {'webview_android': {'version_added': null}, 'chrome': {'version_added': false}, 'chrome_android': {'version_added': null}, 'edge': {'version_added': false}, 'edge_mobile': {'version_added': null}, 'firefox': {'version_added': '28'}, 'firefox_android': {'version_added': null}, 'ie': {'version_added': false}, 'ie_mobile': {'version_added': null}, 'opera': {'version_added': false}, 'opera_android': {'version_added': null}, 'safari': {'version_added': false}, 'safari_ios': {'version_added': null}}, 'status': {'experimental': true, 'standard_track': true, 'deprecated': false}}}, 'cjk-earthly-branch': {'__compat': {'description': '<code>cjk-earthly-branch</code>', 'support': {'webview_android': {'version_added': null}, 'chrome': {'version_added': false}, 'chrome_android': {'version_added': null}, 'edge': {'version_added': false}, 'edge_mobile': {'version_added': null}, 'firefox': {'version_added': null}, 'firefox_android': [{'version_added': '33'}, {'prefix': '-moz-', 'version_added': '1'}], 'ie': {'version_added': false}, 'ie_mobile': {'version_added': null}, 'opera': {'version_added': false}, 'opera_android': {'version_added': null}, 'safari': {'version_added': false}, 'safari_ios': {'version_added': null}}, 'status': {'experimental': true, 'standard_track': true, 'deprecated': false}}}, 'cjk-heavenly-stem': {'__compat': {'description': '<code>cjk-heavenly-stem</code>', 'support': {'webview_android': {'version_added': null}, 'chrome': {'version_added': false}, 'chrome_android': {'version_added': null}, 'edge': {'version_added': false}, 'edge_mobile': {'version_added': null}, 'firefox': {'version_added': null}, 'firefox_android': [{'version_added': '33'}, {'prefix': '-moz-', 'version_added': '1'}], 'ie': {'version_added': false}, 'ie_mobile': {'version_added': null}, 'opera': {'version_added': false}, 'opera_android': {'version_added': null}, 'safari': {'version_added': false}, 'safari_ios': {'version_added': null}}, 'status': {'experimental': true, 'standard_track': true, 'deprecated': false}}}, 'cjk-ideographic': {'__compat': {'description': '<code>cjk-ideographic</code>', 'support': {'webview_android': {'version_added': null}, 'chrome': {'version_added': '1'}, 'chrome_android': {'version_added': null}, 'edge': {'version_added': false}, 'edge_mobile': {'version_added': null}, 'firefox': {'version_added': '1'}, 'firefox_android': {'version_added': null}, 'ie': {'version_added': false}, 'ie_mobile': {'version_added': null}, 'opera': [{'version_added': '15'}, {'version_added': '7', 'partial_implementation': true, 'notes': 'Until version 15, only decimal numbers display.'}], 'opera_android': {'version_added': null}, 'safari': {'version_added': null}, 'safari_ios': {'version_added': null}}, 'status': {'experimental': true, 'standard_track': true, 'deprecated': false}}}, 'decimal-leading-zero': {'__compat': {'description': '<code>decimal-leading-zero</code>', 'support': {'webview_android': {'version_added': null}, 'chrome': {'version_added': '1'}, 'chrome_android': {'version_added': null}, 'edge': {'version_added': true}, 'edge_mobile': {'version_added': null}, 'firefox': {'version_added': '1'}, 'firefox_android': {'version_added': null}, 'ie': {'version_added': '8'}, 'ie_mobile': {'version_added': null}, 'opera': {'version_added': '8'}, 'opera_android': {'version_added': null}, 'safari': {'version_added': '1'}, 'safari_ios': {'version_added': null}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}, 'devanagari': {'__compat': {'description': '<code>devanagari</code>', 'support': {'webview_android': {'version_added': null}, 'chrome': {'version_added': false}, 'chrome_android': {'version_added': null}, 'edge': {'version_added': false}, 'edge_mobile': {'version_added': null}, 'firefox': {'version_added': null}, 'firefox_android': [{'version_added': '33'}, {'prefix': '-moz-', 'version_added': '1'}], 'ie': {'version_added': false}, 'ie_mobile': {'version_added': null}, 'opera': {'version_added': false}, 'opera_android': {'version_added': null}, 'safari': {'version_added': false}, 'safari_ios': {'version_added': null}}, 'status': {'experimental': true, 'standard_track': true, 'deprecated': false}}}, 'disclosure-closed': {'__compat': {'description': '<code>disclosure-closed</code>', 'support': {'webview_android': {'version_added': null}, 'chrome': {'version_added': false}, 'chrome_android': {'version_added': null}, 'edge': {'version_added': false}, 'edge_mobile': {'version_added': null}, 'firefox': {'version_added': '33'}, 'firefox_android': {'version_added': null}, 'ie': {'version_added': false}, 'ie_mobile': {'version_added': null}, 'opera': {'version_added': false}, 'opera_android': {'version_added': null}, 'safari': {'version_added': false}, 'safari_ios': {'version_added': null}}, 'status': {'experimental': true, 'standard_track': true, 'deprecated': false}}}, 'disclosure-open': {'__compat': {'description': '<code>disclosure-open</code>', 'support': {'webview_android': {'version_added': null}, 'chrome': {'version_added': false}, 'chrome_android': {'version_added': null}, 'edge': {'version_added': false}, 'edge_mobile': {'version_added': null}, 'firefox': {'version_added': '33'}, 'firefox_android': {'version_added': null}, 'ie': {'version_added': false}, 'ie_mobile': {'version_added': null}, 'opera': {'version_added': false}, 'opera_android': {'version_added': null}, 'safari': {'version_added': false}, 'safari_ios': {'version_added': null}}, 'status': {'experimental': true, 'standard_track': true, 'deprecated': false}}}, 'ethiopic-numeric': {'__compat': {'description': '<code>ethiopic-numeric</code>', 'support': {'webview_android': {'version_added': null}, 'chrome': {'version_added': false}, 'chrome_android': {'version_added': null}, 'edge': {'version_added': false}, 'edge_mobile': {'version_added': null}, 'firefox': {'version_added': null}, 'firefox_android': [{'version_added': '33', 'notes': 'Before Firefox 38, Firefox added a dot as suffix of the number for <code>ethiopic-numeric</code> (for example, ፫. instead of ፫). The specification later defined the absence of a suffix, which Firefox 38 followed.'}, {'prefix': '-moz-', 'version_added': '1'}], 'ie': {'version_added': false}, 'ie_mobile': {'version_added': null}, 'opera': {'version_added': false}, 'opera_android': {'version_added': null}, 'safari': {'version_added': false}, 'safari_ios': {'version_added': null}}, 'status': {'experimental': true, 'standard_track': true, 'deprecated': false}}}, 'georgian': {'__compat': {'description': '<code>georgian</code>', 'support': {'webview_android': {'version_added': null}, 'chrome': {'version_added': '1'}, 'chrome_android': {'version_added': true}, 'edge': {'version_added': true}, 'edge_mobile': {'version_added': true}, 'firefox': {'version_added': '1'}, 'firefox_android': {'version_added': '4'}, 'ie': {'version_added': '8'}, 'ie_mobile': {'version_added': null}, 'opera': {'version_added': '6'}, 'opera_android': {'version_added': true}, 'safari': {'version_added': '1'}, 'safari_ios': {'version_added': true}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}, 'gujarati': {'__compat': {'description': '<code>gujarati</code>', 'support': {'webview_android': {'version_added': null}, 'chrome': {'version_added': false}, 'chrome_android': {'version_added': null}, 'edge': {'version_added': false}, 'edge_mobile': {'version_added': null}, 'firefox': {'version_added': null}, 'firefox_android': [{'version_added': '33'}, {'prefix': '-moz-', 'version_added': '1'}], 'ie': {'version_added': false}, 'ie_mobile': {'version_added': null}, 'opera': {'version_added': false}, 'opera_android': {'version_added': null}, 'safari': {'version_added': false}, 'safari_ios': {'version_added': null}}, 'status': {'experimental': true, 'standard_track': true, 'deprecated': false}}}, 'gurmukhi': {'__compat': {'description': '<code>gurmukhi</code>', 'support': {'webview_android': {'version_added': null}, 'chrome': {'version_added': false}, 'chrome_android': {'version_added': null}, 'edge': {'version_added': false}, 'edge_mobile': {'version_added': null}, 'firefox': {'version_added': null}, 'firefox_android': [{'version_added': '33'}, {'prefix': '-moz-', 'version_added': '1'}], 'ie': {'version_added': false}, 'ie_mobile': {'version_added': null}, 'opera': {'version_added': false}, 'opera_android': {'version_added': null}, 'safari': {'version_added': false}, 'safari_ios': {'version_added': null}}, 'status': {'experimental': true, 'standard_track': true, 'deprecated': false}}}, 'hebrew': {'__compat': {'description': '<code>hebrew</code>', 'support': {'webview_android': {'version_added': null}, 'chrome': {'version_added': '1'}, 'chrome_android': {'version_added': null}, 'edge': {'version_added': false}, 'edge_mobile': {'version_added': null}, 'firefox': {'version_added': '1'}, 'firefox_android': {'version_added': null}, 'ie': {'version_added': false}, 'ie_mobile': {'version_added': null}, 'opera': [{'version_added': '15'}, {'version_added': '7', 'partial_implementation': true, 'notes': 'Until version 15, only decimal numbers display.'}], 'opera_android': {'version_added': null}, 'safari': {'version_added': null}, 'safari_ios': {'version_added': null}}, 'status': {'experimental': true, 'standard_track': true, 'deprecated': false}}}, 'hiragana': {'__compat': {'description': '<code>hiragana</code>', 'support': {'webview_android': {'version_added': null}, 'chrome': {'version_added': '1'}, 'chrome_android': {'version_added': null}, 'edge': {'version_added': false}, 'edge_mobile': {'version_added': null}, 'firefox': {'version_added': '1'}, 'firefox_android': {'version_added': null}, 'ie': {'version_added': false}, 'ie_mobile': {'version_added': null}, 'opera': [{'version_added': '15'}, {'version_added': '7', 'partial_implementation': true, 'notes': 'Until version 15, only decimal numbers display.'}], 'opera_android': {'version_added': null}, 'safari': {'version_added': null}, 'safari_ios': {'version_added': null}}, 'status': {'experimental': true, 'standard_track': true, 'deprecated': false}}}, 'hiragana-iroha': {'__compat': {'description': '<code>hiragana-iroha</code>', 'support': {'webview_android': {'version_added': null}, 'chrome': {'version_added': '1'}, 'chrome_android': {'version_added': null}, 'edge': {'version_added': false}, 'edge_mobile': {'version_added': null}, 'firefox': {'version_added': '1'}, 'firefox_android': {'version_added': null}, 'ie': {'version_added': false}, 'ie_mobile': {'version_added': null}, 'opera': [{'version_added': '15'}, {'version_added': '7', 'partial_implementation': true, 'notes': 'Until version 15, only decimal numbers display.'}], 'opera_android': {'version_added': null}, 'safari': {'version_added': null}, 'safari_ios': {'version_added': null}}, 'status': {'experimental': true, 'standard_track': true, 'deprecated': false}}}, 'japanese-formal': {'__compat': {'description': '<code>japanese-formal</code>', 'support': {'webview_android': {'version_added': null}, 'chrome': {'version_added': false}, 'chrome_android': {'version_added': null}, 'edge': {'version_added': false}, 'edge_mobile': {'version_added': null}, 'firefox': [{'version_added': '28'}, {'prefix': '-moz-', 'version_added': '1'}], 'firefox_android': {'version_added': null}, 'ie': {'version_added': false}, 'ie_mobile': {'version_added': null}, 'opera': {'version_added': false}, 'opera_android': {'version_added': null}, 'safari': {'version_added': false}, 'safari_ios': {'version_added': null}}, 'status': {'experimental': true, 'standard_track': true, 'deprecated': false}}}, 'japanese-informal': {'__compat': {'description': '<code>japanese-informal</code>', 'support': {'webview_android': {'version_added': null}, 'chrome': {'version_added': false}, 'chrome_android': {'version_added': null}, 'edge': {'version_added': false}, 'edge_mobile': {'version_added': null}, 'firefox': [{'version_added': '28'}, {'prefix': '-moz-', 'version_added': '1'}], 'firefox_android': {'version_added': null}, 'ie': {'version_added': false}, 'ie_mobile': {'version_added': null}, 'opera': {'version_added': false}, 'opera_android': {'version_added': null}, 'safari': {'version_added': false}, 'safari_ios': {'version_added': null}}, 'status': {'experimental': true, 'standard_track': true, 'deprecated': false}}}, 'kannada': {'__compat': {'description': '<code>kannada</code>', 'support': {'webview_android': {'version_added': null}, 'chrome': {'version_added': false}, 'chrome_android': {'version_added': null}, 'edge': {'version_added': false}, 'edge_mobile': {'version_added': null}, 'firefox': {'version_added': null}, 'firefox_android': [{'version_added': '33'}, {'prefix': '-moz-', 'version_added': '1'}], 'ie': {'version_added': false}, 'ie_mobile': {'version_added': null}, 'opera': {'version_added': false}, 'opera_android': {'version_added': null}, 'safari': {'version_added': false}, 'safari_ios': {'version_added': null}}, 'status': {'experimental': true, 'standard_track': true, 'deprecated': false}}}, 'katakana': {'__compat': {'description': '<code>katakana</code>', 'support': {'webview_android': {'version_added': null}, 'chrome': {'version_added': '1'}, 'chrome_android': {'version_added': null}, 'edge': {'version_added': false}, 'edge_mobile': {'version_added': null}, 'firefox': {'version_added': '1'}, 'firefox_android': {'version_added': null}, 'ie': {'version_added': false}, 'ie_mobile': {'version_added': null}, 'opera': [{'version_added': '15'}, {'version_added': '7', 'partial_implementation': true, 'notes': 'Until version 15, only decimal numbers display.'}], 'opera_android': {'version_added': null}, 'safari': {'version_added': null}, 'safari_ios': {'version_added': null}}, 'status': {'experimental': true, 'standard_track': true, 'deprecated': false}}}, 'katakana-iroha': {'__compat': {'description': '<code>katakana-iroha</code>', 'support': {'webview_android': {'version_added': null}, 'chrome': {'version_added': '1'}, 'chrome_android': {'version_added': null}, 'edge': {'version_added': false}, 'edge_mobile': {'version_added': null}, 'firefox': {'version_added': '1'}, 'firefox_android': {'version_added': null}, 'ie': {'version_added': false}, 'ie_mobile': {'version_added': null}, 'opera': [{'version_added': '15'}, {'version_added': '7', 'partial_implementation': true, 'notes': 'Until version 15, only decimal numbers display.'}], 'opera_android': {'version_added': null}, 'safari': {'version_added': null}, 'safari_ios': {'version_added': null}}, 'status': {'experimental': true, 'standard_track': true, 'deprecated': false}}}, 'khmer': {'__compat': {'description': '<code>khmer</code>', 'support': {'webview_android': {'version_added': null}, 'chrome': {'version_added': false}, 'chrome_android': {'version_added': null}, 'edge': {'version_added': false}, 'edge_mobile': {'version_added': null}, 'firefox': {'version_added': null}, 'firefox_android': [{'version_added': '33'}, {'prefix': '-moz-', 'version_added': '1'}], 'ie': {'version_added': false}, 'ie_mobile': {'version_added': null}, 'opera': {'version_added': false}, 'opera_android': {'version_added': null}, 'safari': {'version_added': false}, 'safari_ios': {'version_added': null}}, 'status': {'experimental': true, 'standard_track': true, 'deprecated': false}}}, 'korean-hangul-formal': {'__compat': {'description': '<code>korean-hangul-formal</code>', 'support': {'webview_android': {'version_added': null}, 'chrome': {'version_added': false}, 'chrome_android': {'version_added': null}, 'edge': {'version_added': false}, 'edge_mobile': {'version_added': null}, 'firefox': {'version_added': '28'}, 'firefox_android': {'version_added': null}, 'ie': {'version_added': false}, 'ie_mobile': {'version_added': null}, 'opera': {'version_added': false}, 'opera_android': {'version_added': null}, 'safari': {'version_added': false}, 'safari_ios': {'version_added': null}}, 'status': {'experimental': true, 'standard_track': true, 'deprecated': false}}}, 'korean-hanja-formal': {'__compat': {'description': '<code>korean-hanja-formal</code>', 'support': {'webview_android': {'version_added': null}, 'chrome': {'version_added': false}, 'chrome_android': {'version_added': null}, 'edge': {'version_added': false}, 'edge_mobile': {'version_added': null}, 'firefox': {'version_added': '28'}, 'firefox_android': {'version_added': null}, 'ie': {'version_added': false}, 'ie_mobile': {'version_added': null}, 'opera': {'version_added': false}, 'opera_android': {'version_added': null}, 'safari': {'version_added': false}, 'safari_ios': {'version_added': null}}, 'status': {'experimental': true, 'standard_track': true, 'deprecated': false}}}, 'korean-hanja-informal': {'__compat': {'description': '<code>korean-hanja-informal</code>', 'support': {'webview_android': {'version_added': null}, 'chrome': {'version_added': false}, 'chrome_android': {'version_added': null}, 'edge': {'version_added': false}, 'edge_mobile': {'version_added': null}, 'firefox': {'version_added': '28'}, 'firefox_android': {'version_added': null}, 'ie': {'version_added': false}, 'ie_mobile': {'version_added': null}, 'opera': {'version_added': false}, 'opera_android': {'version_added': null}, 'safari': {'version_added': false}, 'safari_ios': {'version_added': null}}, 'status': {'experimental': true, 'standard_track': true, 'deprecated': false}}}, 'lao': {'__compat': {'description': '<code>lao</code>', 'support': {'webview_android': {'version_added': null}, 'chrome': {'version_added': false}, 'chrome_android': {'version_added': null}, 'edge': {'version_added': false}, 'edge_mobile': {'version_added': null}, 'firefox': {'version_added': null}, 'firefox_android': [{'version_added': '33'}, {'prefix': '-moz-', 'version_added': '1'}], 'ie': {'version_added': false}, 'ie_mobile': {'version_added': null}, 'opera': {'version_added': false}, 'opera_android': {'version_added': null}, 'safari': {'version_added': false}, 'safari_ios': {'version_added': null}}, 'status': {'experimental': true, 'standard_track': true, 'deprecated': false}}}, 'lower-greek': {'__compat': {'description': '<code>lower-greek</code>', 'support': {'webview_android': {'version_added': null}, 'chrome': {'version_added': '1'}, 'chrome_android': {'version_added': true}, 'edge': {'version_added': true}, 'edge_mobile': {'version_added': true}, 'firefox': {'version_added': '1'}, 'firefox_android': {'version_added': '4'}, 'ie': {'version_added': '8'}, 'ie_mobile': {'version_added': null}, 'opera': {'version_added': '6'}, 'opera_android': {'version_added': true}, 'safari': {'version_added': '1'}, 'safari_ios': {'version_added': true}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}, 'lower-latin': {'__compat': {'description': '<code>lower-latin</code>', 'support': {'webview_android': {'version_added': null}, 'chrome': {'version_added': '1'}, 'chrome_android': {'version_added': true}, 'edge': {'version_added': true}, 'edge_mobile': {'version_added': true}, 'firefox': {'version_added': '1'}, 'firefox_android': {'version_added': '4'}, 'ie': {'version_added': '8'}, 'ie_mobile': {'version_added': null}, 'opera': {'version_added': '6'}, 'opera_android': {'version_added': true}, 'safari': {'version_added': '1'}, 'safari_ios': {'version_added': true}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}, 'malayalam': {'__compat': {'description': '<code>malayalam</code>', 'support': {'webview_android': {'version_added': null}, 'chrome': {'version_added': false}, 'chrome_android': {'version_added': null}, 'edge': {'version_added': false}, 'edge_mobile': {'version_added': null}, 'firefox': {'version_added': null}, 'firefox_android': [{'version_added': '33'}, {'prefix': '-moz-', 'version_added': '1'}], 'ie': {'version_added': false}, 'ie_mobile': {'version_added': null}, 'opera': {'version_added': false}, 'opera_android': {'version_added': null}, 'safari': {'version_added': false}, 'safari_ios': {'version_added': null}}, 'status': {'experimental': true, 'standard_track': true, 'deprecated': false}}}, 'mongolian': {'__compat': {'description': '<code>mongolian</code>', 'support': {'webview_android': {'version_added': null}, 'chrome': {'version_added': false}, 'chrome_android': {'version_added': null}, 'edge': {'version_added': false}, 'edge_mobile': {'version_added': null}, 'firefox': {'version_added': '33'}, 'firefox_android': {'version_added': null}, 'ie': {'version_added': false}, 'ie_mobile': {'version_added': null}, 'opera': {'version_added': false}, 'opera_android': {'version_added': null}, 'safari': {'version_added': false}, 'safari_ios': {'version_added': null}}, 'status': {'experimental': true, 'standard_track': true, 'deprecated': false}}}, 'myanmar': {'__compat': {'description': '<code>myanmar</code>', 'support': {'webview_android': {'version_added': null}, 'chrome': {'version_added': false}, 'chrome_android': {'version_added': null}, 'edge': {'version_added': false}, 'edge_mobile': {'version_added': null}, 'firefox': {'version_added': null}, 'firefox_android': [{'version_added': '33'}, {'prefix': '-moz-', 'version_added': '1'}], 'ie': {'version_added': false}, 'ie_mobile': {'version_added': null}, 'opera': {'version_added': false}, 'opera_android': {'version_added': null}, 'safari': {'version_added': false}, 'safari_ios': {'version_added': null}}, 'status': {'experimental': true, 'standard_track': true, 'deprecated': false}}}, 'oriya': {'__compat': {'description': '<code>oriya</code>', 'support': {'webview_android': {'version_added': null}, 'chrome': {'version_added': false}, 'chrome_android': {'version_added': null}, 'edge': {'version_added': false}, 'edge_mobile': {'version_added': null}, 'firefox': {'version_added': null}, 'firefox_android': [{'version_added': '33'}, {'prefix': '-moz-', 'version_added': '1'}], 'ie': {'version_added': false}, 'ie_mobile': {'version_added': null}, 'opera': {'version_added': false}, 'opera_android': {'version_added': null}, 'safari': {'version_added': false}, 'safari_ios': {'version_added': null}}, 'status': {'experimental': true, 'standard_track': true, 'deprecated': false}}}, 'persian': {'__compat': {'description': '<code>persian</code>', 'support': {'webview_android': {'version_added': null}, 'chrome': {'version_added': false}, 'chrome_android': {'version_added': null}, 'edge': {'version_added': false}, 'edge_mobile': {'version_added': null}, 'firefox': {'version_added': null}, 'firefox_android': [{'version_added': '33'}, {'prefix': '-moz-', 'version_added': '1'}], 'ie': {'version_added': false}, 'ie_mobile': {'version_added': null}, 'opera': {'version_added': false}, 'opera_android': {'version_added': null}, 'safari': {'version_added': false}, 'safari_ios': {'version_added': null}}, 'status': {'experimental': true, 'standard_track': true, 'deprecated': false}}}, 'simp-chinese-formal': {'__compat': {'description': '<code>simp-chinese-formal</code>', 'support': {'webview_android': {'version_added': null}, 'chrome': {'version_added': false}, 'chrome_android': {'version_added': null}, 'edge': {'version_added': false}, 'edge_mobile': {'version_added': null}, 'firefox': [{'version_added': '28'}, {'prefix': '-moz-', 'version_added': '1'}], 'firefox_android': {'version_added': null}, 'ie': {'version_added': false}, 'ie_mobile': {'version_added': null}, 'opera': {'version_added': false}, 'opera_android': {'version_added': null}, 'safari': {'version_added': false}, 'safari_ios': {'version_added': null}}, 'status': {'experimental': true, 'standard_track': true, 'deprecated': false}}}, 'simp-chinese-informal': {'__compat': {'description': '<code>simp-chinese-informal</code>', 'support': {'webview_android': {'version_added': null}, 'chrome': {'version_added': false}, 'chrome_android': {'version_added': null}, 'edge': {'version_added': false}, 'edge_mobile': {'version_added': null}, 'firefox': [{'version_added': '28'}, {'prefix': '-moz-', 'version_added': '1'}], 'firefox_android': {'version_added': null}, 'ie': {'version_added': false}, 'ie_mobile': {'version_added': null}, 'opera': {'version_added': false}, 'opera_android': {'version_added': null}, 'safari': {'version_added': false}, 'safari_ios': {'version_added': null}}, 'status': {'experimental': true, 'standard_track': true, 'deprecated': false}}}, 'tamil': {'__compat': {'description': '<code>tamil</code>', 'support': {'webview_android': {'version_added': null}, 'chrome': {'version_added': false}, 'chrome_android': {'version_added': null}, 'edge': {'version_added': false}, 'edge_mobile': {'version_added': null}, 'firefox': {'version_added': null}, 'firefox_android': [{'version_added': '33'}, {'prefix': '-moz-', 'version_added': '1'}], 'ie': {'version_added': false}, 'ie_mobile': {'version_added': null}, 'opera': {'version_added': false}, 'opera_android': {'version_added': null}, 'safari': {'version_added': false}, 'safari_ios': {'version_added': null}}, 'status': {'experimental': true, 'standard_track': true, 'deprecated': false}}}, 'telugu': {'__compat': {'description': '<code>telugu</code>', 'support': {'webview_android': {'version_added': null}, 'chrome': {'version_added': false}, 'chrome_android': {'version_added': null}, 'edge': {'version_added': false}, 'edge_mobile': {'version_added': null}, 'firefox': {'version_added': null}, 'firefox_android': [{'version_added': '33'}, {'prefix': '-moz-', 'version_added': '1'}], 'ie': {'version_added': false}, 'ie_mobile': {'version_added': null}, 'opera': {'version_added': false}, 'opera_android': {'version_added': null}, 'safari': {'version_added': false}, 'safari_ios': {'version_added': null}}, 'status': {'experimental': true, 'standard_track': true, 'deprecated': false}}}, 'thai': {'__compat': {'description': '<code>thai</code>', 'support': {'webview_android': {'version_added': null}, 'chrome': {'version_added': false}, 'chrome_android': {'version_added': null}, 'edge': {'version_added': false}, 'edge_mobile': {'version_added': null}, 'firefox': {'version_added': null}, 'firefox_android': [{'version_added': '33'}, {'prefix': '-moz-', 'version_added': '1'}], 'ie': {'version_added': false}, 'ie_mobile': {'version_added': null}, 'opera': {'version_added': false}, 'opera_android': {'version_added': null}, 'safari': {'version_added': false}, 'safari_ios': {'version_added': null}}, 'status': {'experimental': true, 'standard_track': true, 'deprecated': false}}}, 'trad-chinese-formal': {'__compat': {'description': '<code>trad-chinese-formal</code>', 'support': {'webview_android': {'version_added': null}, 'chrome': {'version_added': false}, 'chrome_android': {'version_added': null}, 'edge': {'version_added': false}, 'edge_mobile': {'version_added': null}, 'firefox': [{'version_added': '28'}, {'prefix': '-moz-', 'version_added': '1'}], 'firefox_android': {'version_added': null}, 'ie': {'version_added': false}, 'ie_mobile': {'version_added': null}, 'opera': {'version_added': false}, 'opera_android': {'version_added': null}, 'safari': {'version_added': false}, 'safari_ios': {'version_added': null}}, 'status': {'experimental': true, 'standard_track': true, 'deprecated': false}}}, 'trad-chinese-informal': {'__compat': {'description': '<code>trad-chinese-informal</code>', 'support': {'webview_android': {'version_added': null}, 'chrome': {'version_added': false}, 'chrome_android': {'version_added': null}, 'edge': {'version_added': false}, 'edge_mobile': {'version_added': null}, 'firefox': [{'version_added': '28'}, {'prefix': '-moz-', 'version_added': '1'}], 'firefox_android': {'version_added': null}, 'ie': {'version_added': false}, 'ie_mobile': {'version_added': null}, 'opera': {'version_added': false}, 'opera_android': {'version_added': null}, 'safari': {'version_added': false}, 'safari_ios': {'version_added': null}}, 'status': {'experimental': true, 'standard_track': true, 'deprecated': false}}}, 'upper-latin': {'__compat': {'description': '<code>upper-latin</code>', 'support': {'webview_android': {'version_added': null}, 'chrome': {'version_added': '1'}, 'chrome_android': {'version_added': true}, 'edge': {'version_added': true}, 'edge_mobile': {'version_added': true}, 'firefox': {'version_added': '1'}, 'firefox_android': {'version_added': '4'}, 'ie': {'version_added': '8'}, 'ie_mobile': {'version_added': null}, 'opera': {'version_added': '6'}, 'opera_android': {'version_added': true}, 'safari': {'version_added': '1'}, 'safari_ios': {'version_added': true}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}, 'string': {'__compat': {'description': '<code>&lt;string&gt;</code>', 'support': {'webview_android': {'version_added': null}, 'chrome': {'version_added': false}, 'chrome_android': {'version_added': null}, 'edge': {'version_added': false}, 'edge_mobile': {'version_added': null}, 'firefox': {'version_added': '39'}, 'firefox_android': {'version_added': null}, 'ie': {'version_added': false}, 'ie_mobile': {'version_added': null}, 'opera': {'version_added': false}, 'opera_android': {'version_added': null}, 'safari': {'version_added': false}, 'safari_ios': {'version_added': null}}, 'status': {'experimental': true, 'standard_track': true, 'deprecated': false}}}}, 'list-style': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/list-style', 'support': {'webview_android': {'version_added': '1'}, 'chrome': {'version_added': '1'}, 'chrome_android': {'version_added': true}, 'edge': {'version_added': '12'}, 'edge_mobile': {'version_added': '12'}, 'firefox': {'version_added': '1'}, 'firefox_android': {'version_added': '4'}, 'ie': {'version_added': '4'}, 'ie_mobile': {'version_added': '6'}, 'opera': {'version_added': '7'}, 'opera_android': {'version_added': '6'}, 'safari': {'version_added': '1'}, 'safari_ios': {'version_added': '1'}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}, 'margin-block-end': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/margin-block-end', 'support': {'webview_android': {'version_added': false}, 'chrome': {'version_added': false}, 'chrome_android': {'version_added': null}, 'edge': {'version_added': null}, 'edge_mobile': {'version_added': null}, 'firefox': [{'version_added': '41'}, {'version_added': '38', 'version_removed': '51', 'flag': {'type': 'preference', 'name': 'layout.css.vertical-text.enabled', 'value_to_set': 'true'}}], 'firefox_android': [{'version_added': '41'}, {'version_added': '38', 'version_removed': '51', 'flag': {'type': 'preference', 'name': 'layout.css.vertical-text.enabled', 'value_to_set': 'true'}}], 'ie': {'version_added': false}, 'ie_mobile': {'version_added': false}, 'opera': {'version_added': false}, 'opera_android': {'version_added': false}, 'safari': {'version_added': false}, 'safari_ios': {'version_added': false}}, 'status': {'experimental': true, 'standard_track': true, 'deprecated': false}}}, 'margin-block-start': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/margin-block-start', 'support': {'webview_android': {'version_added': false}, 'chrome': {'version_added': false}, 'chrome_android': {'version_added': null}, 'edge': {'version_added': null}, 'edge_mobile': {'version_added': null}, 'firefox': [{'version_added': '41'}, {'version_added': '38', 'version_removed': '51', 'flag': {'type': 'preference', 'name': 'layout.css.vertical-text.enabled', 'value_to_set': 'true'}}], 'firefox_android': [{'version_added': '41'}, {'version_added': '38', 'version_removed': '51', 'flag': {'type': 'preference', 'name': 'layout.css.vertical-text.enabled', 'value_to_set': 'true'}}], 'ie': {'version_added': false}, 'ie_mobile': {'version_added': false}, 'opera': {'version_added': false}, 'opera_android': {'version_added': false}, 'safari': {'version_added': false}, 'safari_ios': {'version_added': false}}, 'status': {'experimental': true, 'standard_track': true, 'deprecated': false}}}, 'margin-bottom': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/margin-bottom', 'support': {'webview_android': {'version_added': '1'}, 'chrome': {'version_added': '1'}, 'chrome_android': {'version_added': null}, 'edge': {'version_added': true}, 'edge_mobile': {'version_added': true}, 'firefox': {'version_added': '1'}, 'firefox_android': {'version_added': '4'}, 'ie': {'version_added': '3'}, 'ie_mobile': {'version_added': '6'}, 'opera': {'version_added': '3.5'}, 'opera_android': {'version_added': '6'}, 'safari': {'version_added': '1'}, 'safari_ios': {'version_added': '1'}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}, 'auto': {'__compat': {'description': '<code>auto</code>', 'support': {'webview_android': {'version_added': null}, 'chrome': {'version_added': '1'}, 'chrome_android': {'version_added': null}, 'edge': {'version_added': null}, 'edge_mobile': {'version_added': null}, 'firefox': {'version_added': '1'}, 'firefox_android': {'version_added': '4'}, 'ie': {'version_added': '6', 'notes': 'The <code>auto</code> value is not supported in quirks mode.'}, 'ie_mobile': {'version_added': null}, 'opera': {'version_added': '3.5'}, 'opera_android': {'version_added': null}, 'safari': {'version_added': '1'}, 'safari_ios': {'version_added': null}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}}, 'margin-inline-end': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/margin-inline-end', 'support': {'webview_android': {'version_added': true}, 'chrome': {'alternative_name': '-webkit-padding-end', 'version_added': '2'}, 'chrome_android': {'version_added': null}, 'edge': {'version_added': null}, 'edge_mobile': {'version_added': null}, 'firefox': [{'version_added': '41'}, {'alternative_name': '-moz-padding-end', 'version_added': '3'}, {'version_added': '38', 'version_removed': '51', 'flag': {'type': 'preference', 'name': 'layout.css.vertical-text.enabled', 'value_to_set': 'true'}}], 'firefox_android': [{'version_added': '41'}, {'alternative_name': '-moz-padding-end', 'version_added': '3'}, {'version_added': '38', 'version_removed': '51', 'flag': {'type': 'preference', 'name': 'layout.css.vertical-text.enabled', 'value_to_set': 'true'}}], 'ie': {'version_added': false}, 'ie_mobile': {'version_added': false}, 'opera': {'version_added': null}, 'opera_android': {'version_added': null}, 'safari': {'alternative_name': '-webkit-padding-end', 'version_added': '3'}, 'safari_ios': {'version_added': null}}, 'status': {'experimental': true, 'standard_track': true, 'deprecated': false}}}, 'margin-inline-start': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/margin-inline-start', 'support': {'webview_android': {'version_added': true}, 'chrome': {'alternative_name': '-webkit-padding-start', 'version_added': '2'}, 'chrome_android': {'version_added': null}, 'edge': {'version_added': null}, 'edge_mobile': {'version_added': null}, 'firefox': [{'version_added': '41'}, {'alternative_name': '-moz-padding-start', 'version_added': '3'}, {'version_added': '38', 'version_removed': '51', 'flag': {'type': 'preference', 'name': 'layout.css.vertical-text.enabled', 'value_to_set': 'true'}}], 'firefox_android': [{'version_added': '41'}, {'alternative_name': '-moz-padding-start', 'version_added': '3'}, {'version_added': '38', 'version_removed': '51', 'flag': {'type': 'preference', 'name': 'layout.css.vertical-text.enabled', 'value_to_set': 'true'}}], 'ie': {'version_added': false}, 'ie_mobile': {'version_added': false}, 'opera': {'version_added': null}, 'opera_android': {'version_added': null}, 'safari': {'alternative_name': '-webkit-padding-start', 'version_added': '3'}, 'safari_ios': {'version_added': null}}, 'status': {'experimental': true, 'standard_track': true, 'deprecated': false}}}, 'margin-left': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/margin-left', 'support': {'webview_android': {'version_added': '1'}, 'chrome': {'version_added': '1'}, 'chrome_android': {'version_added': null}, 'edge': {'version_added': true}, 'edge_mobile': {'version_added': true}, 'firefox': {'version_added': '1'}, 'firefox_android': {'version_added': '4'}, 'ie': {'version_added': '3'}, 'ie_mobile': {'version_added': '6'}, 'opera': {'version_added': '3.5'}, 'opera_android': {'version_added': '6'}, 'safari': {'version_added': '1'}, 'safari_ios': {'version_added': '1'}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}, 'auto': {'__compat': {'description': '<code>auto</code>', 'support': {'webview_android': {'version_added': null}, 'chrome': {'version_added': '1'}, 'chrome_android': {'version_added': null}, 'edge': {'version_added': null}, 'edge_mobile': {'version_added': null}, 'firefox': {'version_added': '1'}, 'firefox_android': {'version_added': '4'}, 'ie': {'version_added': '6', 'notes': 'The <code>auto</code> value is not supported in quirks mode.'}, 'ie_mobile': {'version_added': null}, 'opera': {'version_added': '3.5'}, 'opera_android': {'version_added': null}, 'safari': {'version_added': '1'}, 'safari_ios': {'version_added': null}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}}, 'margin-right': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/margin-right', 'support': {'webview_android': {'version_added': '1'}, 'chrome': {'version_added': '1'}, 'chrome_android': {'version_added': null}, 'edge': {'version_added': true}, 'edge_mobile': {'version_added': true}, 'firefox': {'version_added': '1'}, 'firefox_android': {'version_added': '4'}, 'ie': {'version_added': '3'}, 'ie_mobile': {'version_added': '6'}, 'opera': {'version_added': '3.5'}, 'opera_android': {'version_added': '6'}, 'safari': {'version_added': '1'}, 'safari_ios': {'version_added': '1'}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}, 'auto': {'__compat': {'description': '<code>auto</code>', 'support': {'webview_android': {'version_added': null}, 'chrome': {'version_added': '1'}, 'chrome_android': {'version_added': null}, 'edge': {'version_added': null}, 'edge_mobile': {'version_added': null}, 'firefox': {'version_added': '1'}, 'firefox_android': {'version_added': '4'}, 'ie': {'version_added': '6', 'notes': 'The <code>auto</code> value is not supported in quirks mode.'}, 'ie_mobile': {'version_added': null}, 'opera': {'version_added': '3.5'}, 'opera_android': {'version_added': null}, 'safari': {'version_added': '1'}, 'safari_ios': {'version_added': null}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}}, 'margin-top': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/margin-top', 'support': {'webview_android': {'version_added': '1'}, 'chrome': {'version_added': '1'}, 'chrome_android': {'version_added': null}, 'edge': {'version_added': true}, 'edge_mobile': {'version_added': true}, 'firefox': {'version_added': '1'}, 'firefox_android': {'version_added': '4'}, 'ie': {'version_added': '3'}, 'ie_mobile': {'version_added': '6'}, 'opera': {'version_added': '3.5'}, 'opera_android': {'version_added': '6'}, 'safari': {'version_added': '1'}, 'safari_ios': {'version_added': '1'}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}, 'auto': {'__compat': {'description': '<code>auto</code>', 'support': {'webview_android': {'version_added': null}, 'chrome': {'version_added': '1'}, 'chrome_android': {'version_added': null}, 'edge': {'version_added': null}, 'edge_mobile': {'version_added': null}, 'firefox': {'version_added': '1'}, 'firefox_android': {'version_added': '4'}, 'ie': {'version_added': '6', 'notes': 'The <code>auto</code> value is not supported in quirks mode.'}, 'ie_mobile': {'version_added': null}, 'opera': {'version_added': '3.5'}, 'opera_android': {'version_added': null}, 'safari': {'version_added': '1'}, 'safari_ios': {'version_added': null}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}}, 'margin': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/margin', 'support': {'webview_android': {'version_added': '1'}, 'chrome': {'version_added': '1'}, 'chrome_android': {'version_added': true}, 'edge': {'version_added': true}, 'edge_mobile': {'version_added': true}, 'firefox': {'version_added': '1'}, 'firefox_android': {'version_added': '4'}, 'ie': {'version_added': '3'}, 'ie_mobile': {'version_added': '6'}, 'opera': {'version_added': '3.5'}, 'opera_android': {'version_added': '6'}, 'safari': {'version_added': '1'}, 'safari_ios': {'version_added': '1'}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}, 'auto': {'__compat': {'description': '<code>auto</code>', 'support': {'webview_android': {'version_added': null}, 'chrome': {'version_added': '1'}, 'chrome_android': {'version_added': null}, 'edge': {'version_added': null}, 'edge_mobile': {'version_added': null}, 'firefox': {'version_added': '1'}, 'firefox_android': {'version_added': '4'}, 'ie': {'version_added': '6', 'notes': 'The <code>auto</code> value is not supported in quirks mode.'}, 'ie_mobile': {'version_added': null}, 'opera': {'version_added': '3.5'}, 'opera_android': {'version_added': null}, 'safari': {'version_added': '1'}, 'safari_ios': {'version_added': null}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}}, 'mask': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/mask', 'support': {'webview_android': [{'version_added': '2.1'}, {'prefix': '-webkit-', 'version_added': true}], 'chrome': [{'version_added': '1', 'partial_implementation': true, 'notes': "While the property is recognized, values applied to it don't have any effect."}, {'prefix': '-webkit-', 'version_added': true, 'notes': "The prefixed property can be used with SVG and HTML with a slightly different syntax, which allows setting the non-standard <a href='https://developer.mozilla.org/docs/Web/CSS/-webkit-mask-attachment'><code>-webkit-mask-attachment</code></a> property."}], 'chrome_android': {'version_added': null}, 'edge': {'version_added': true}, 'edge_mobile': {'version_added': true}, 'firefox': {'version_added': true, 'notes': 'From Firefox 10, the default color space when handling masks is sRGB. Previously, the default and only supported color space was linear RGB. This changes the appearance of mask effects, but brings Firefox into compliance with the second edition of the SVG 1.1 specification.'}, 'firefox_android': {'version_added': true}, 'ie': {'version_added': false}, 'ie_mobile': {'version_added': null}, 'opera': [{'version_added': true, 'partial_implementation': true, 'notes': "While the property is recognized, values applied to it don't have any effect."}, {'prefix': '-webkit-', 'version_added': true, 'notes': "The prefixed property can be used with SVG and HTML with a slightly different syntax, which allows setting the non-standard <a href='https://developer.mozilla.org/docs/Web/CSS/-webkit-mask-attachment'><code>-webkit-mask-attachment</code></a> property."}], 'opera_android': {'version_added': null}, 'safari': [{'version_added': '4', 'partial_implementation': true, 'notes': "While the property is recognized, values applied to it don't have any effect."}, {'prefix': '-webkit-', 'version_added': true, 'notes': "The prefixed property can be used with SVG and HTML with a slightly different syntax, which allows setting the non-standard <a href='https://developer.mozilla.org/docs/Web/CSS/-webkit-mask-attachment'><code>-webkit-mask-attachment</code></a> property."}], 'safari_ios': {'prefix': '-webkit-', 'version_added': '3.2'}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}, 'applies_to_html_elements': {'__compat': {'description': 'Applies to HTML elements', 'support': {'webview_android': {'version_added': null}, 'chrome': {'prefix': '-webkit-', 'version_added': true}, 'chrome_android': {'version_added': null}, 'edge': {'version_added': null}, 'edge_mobile': {'version_added': null}, 'firefox': {'version_added': '3.5'}, 'firefox_android': {'version_added': null}, 'ie': {'version_added': false}, 'ie_mobile': {'version_added': null}, 'opera': {'prefix': '-webkit-', 'version_added': true}, 'opera_android': {'version_added': null}, 'safari': {'version_added': false}, 'safari_ios': {'version_added': null}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}, 'shorthand_for_mask_properties': {'__compat': {'description': 'Shorthand for <code>mask-*</code> properties', 'support': {'webview_android': {'version_added': null}, 'chrome': {'prefix': '-webkit-', 'version_added': true}, 'chrome_android': {'version_added': null}, 'edge': {'version_added': null}, 'edge_mobile': {'version_added': null}, 'firefox': {'version_added': '53'}, 'firefox_android': {'version_added': '53'}, 'ie': {'version_added': false}, 'ie_mobile': {'version_added': null}, 'opera': {'prefix': '-webkit-', 'version_added': true}, 'opera_android': {'version_added': null}, 'safari': {'version_added': false}, 'safari_ios': {'version_added': null}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}}, 'order': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/order', 'support': {'webview_android': {'version_added': null}, 'chrome': [{'version_added': '29'}, {'prefix': '-webkit-', 'version_added': '21'}], 'chrome_android': {'version_added': null}, 'edge': [{'version_added': true}, {'prefix': '-webkit-', 'version_added': true}], 'edge_mobile': [{'version_added': true}, {'prefix': '-webkit-', 'version_added': true}], 'firefox': [{'version_added': '20', 'notes': 'Since Firefox 28, multi-line flexbox is supported.'}, {'prefix': '-webkit-', 'version_added': '49'}, {'prefix': '-webkit-', 'version_added': '48', 'flag': {'type': 'preference', 'name': 'layout.css.prefixes.webkit', 'value_to_set': 'true'}}, {'version_added': '18', 'version_removed': '28', 'flag': {'type': 'preference', 'name': 'layout.css.flexbox.enabled', 'value_to_set': 'true'}}], 'firefox_android': [{'version_added': '20', 'notes': 'Since Firefox 28, multi-line flexbox is supported.'}, {'prefix': '-webkit-', 'version_added': '49'}, {'prefix': '-webkit-', 'version_added': '48', 'flag': {'type': 'preference', 'name': 'layout.css.prefixes.webkit', 'value_to_set': 'true'}}, {'version_added': '18', 'version_removed': '28', 'flag': {'type': 'preference', 'name': 'layout.css.flexbox.enabled', 'value_to_set': 'true'}}], 'ie': [{'version_added': '11'}, {'prefix': '-ms-', 'version_added': '10'}], 'ie_mobile': {'version_added': null}, 'opera': {'version_added': '12.1'}, 'opera_android': {'version_added': '12.1'}, 'safari': [{'version_added': '9'}, {'prefix': '-webkit-', 'version_added': '7'}], 'safari_ios': [{'version_added': '9'}, {'prefix': '-webkit-', 'version_added': '7'}]}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}, 'absolutely_positioned_flex_children': {'__compat': {'description': 'Absolutely-positioned flex children', 'support': {'webview_android': {'version_added': null}, 'chrome': {'version_added': true}, 'chrome_android': {'version_added': null}, 'edge': {'version_added': true}, 'edge_mobile': {'version_added': null}, 'firefox': {'version_added': false}, 'firefox_android': {'version_added': false}, 'ie': {'version_added': '10'}, 'ie_mobile': {'version_added': '10'}, 'opera': {'version_added': '12.1'}, 'opera_android': {'version_added': '12.1'}, 'safari': {'version_added': true}, 'safari_ios': {'version_added': true}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}}, 'padding-block-end': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/padding-block-end', 'support': {'webview_android': {'version_added': false}, 'chrome': {'version_added': false}, 'chrome_android': {'version_added': false}, 'edge': {'version_added': false}, 'edge_mobile': {'version_added': false}, 'firefox': [{'version_added': '41'}, {'version_added': '38', 'version_removed': '51', 'flag': {'type': 'preference', 'name': 'layout.css.vertical-text.enabled', 'value_to_set': 'true'}}], 'firefox_android': [{'version_added': '41'}, {'version_added': '38', 'version_removed': '51', 'flag': {'type': 'preference', 'name': 'layout.css.vertical-text.enabled', 'value_to_set': 'true'}}], 'ie': {'version_added': false}, 'ie_mobile': {'version_added': false}, 'opera': {'version_added': false}, 'opera_android': {'version_added': false}, 'safari': {'version_added': false}, 'safari_ios': {'version_added': false}}, 'status': {'experimental': true, 'standard_track': true, 'deprecated': false}}}, 'padding-block-start': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/padding-block-start', 'support': {'webview_android': {'version_added': false}, 'chrome': {'version_added': false}, 'chrome_android': {'version_added': null}, 'edge': {'version_added': null}, 'edge_mobile': {'version_added': true}, 'firefox': [{'version_added': '41'}, {'version_added': '38', 'version_removed': '51', 'flag': {'type': 'preference', 'name': 'layout.css.vertical-text.enabled', 'value_to_set': 'true'}}], 'firefox_android': [{'version_added': '41'}, {'version_added': '38', 'version_removed': '51', 'flag': {'type': 'preference', 'name': 'layout.css.vertical-text.enabled', 'value_to_set': 'true'}}], 'ie': {'version_added': false}, 'ie_mobile': {'version_added': false}, 'opera': {'version_added': false}, 'opera_android': {'version_added': false}, 'safari': {'version_added': false}, 'safari_ios': {'version_added': false}}, 'status': {'experimental': true, 'standard_track': true, 'deprecated': false}}}, 'padding-bottom': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/padding-bottom', 'support': {'webview_android': {'version_added': true}, 'chrome': {'version_added': '1'}, 'chrome_android': {'version_added': true}, 'edge': {'version_added': true}, 'edge_mobile': {'version_added': true}, 'firefox': {'version_added': '1'}, 'firefox_android': {'version_added': '4'}, 'ie': {'version_added': '4'}, 'ie_mobile': {'version_added': true}, 'opera': {'version_added': '3.5'}, 'opera_android': {'version_added': true}, 'safari': {'version_added': '1'}, 'safari_ios': {'version_added': true}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}, 'padding-inline-end': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/padding-inline-end', 'support': {'webview_android': {'alternative_name': '-webkit-padding-end', 'version_added': true}, 'chrome': {'alternative_name': '-webkit-padding-end', 'version_added': '2'}, 'chrome_android': {'alternative_name': '-webkit-padding-end', 'version_added': '2'}, 'edge': {'version_added': null}, 'edge_mobile': {'version_added': true}, 'firefox': [{'version_added': '41'}, {'version_added': '38', 'version_removed': '51', 'flag': {'type': 'preference', 'name': 'layout.css.vertical-text.enabled', 'value_to_set': 'true'}}, {'alternative_name': '-moz-padding-end', 'version_added': '3'}], 'firefox_android': [{'version_added': '41'}, {'version_added': '38', 'version_removed': '51', 'flag': {'type': 'preference', 'name': 'layout.css.vertical-text.enabled', 'value_to_set': 'true'}}, {'alternative_name': '-moz-padding-end', 'version_added': '3'}], 'ie': {'version_added': false}, 'ie_mobile': {'version_added': false}, 'opera': {'alternative_name': '-webkit-padding-end', 'version_added': '15'}, 'opera_android': {'alternative_name': '-webkit-padding-end', 'version_added': '15'}, 'safari': {'alternative_name': '-webkit-padding-end', 'version_added': '3'}, 'safari_ios': {'alternative_name': '-webkit-padding-end', 'version_added': true}}, 'status': {'experimental': true, 'standard_track': true, 'deprecated': false}}}, 'padding-inline-start': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/padding-inline-start', 'support': {'webview_android': {'alternative_name': '-webkit-padding-end', 'version_added': true}, 'chrome': {'alternative_name': '-webkit-padding-start', 'version_added': '2'}, 'chrome_android': {'alternative_name': '-webkit-padding-end', 'version_added': true}, 'edge': {'version_added': false}, 'edge_mobile': {'version_added': false}, 'firefox': [{'version_added': '41'}, {'version_added': '38', 'version_removed': '51', 'flag': {'type': 'preference', 'name': 'layout.css.vertical-text.enabled', 'value_to_set': 'true'}}, {'alternative_name': '-moz-padding-start', 'version_added': '3'}], 'firefox_android': [{'version_added': '41'}, {'version_added': '38', 'version_removed': '51', 'flag': {'type': 'preference', 'name': 'layout.css.vertical-text.enabled', 'value_to_set': 'true'}}, {'alternative_name': '-moz-padding-start', 'version_added': '3'}], 'ie': {'version_added': false}, 'ie_mobile': {'version_added': false}, 'opera': {'alternative_name': '-webkit-padding-end', 'version_added': true}, 'opera_android': {'alternative_name': '-webkit-padding-end', 'version_added': true}, 'safari': {'alternative_name': '-webkit-padding-start', 'version_added': '3'}, 'safari_ios': {'alternative_name': '-webkit-padding-end', 'version_added': true}}, 'status': {'experimental': true, 'standard_track': true, 'deprecated': false}}}, 'padding-left': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/padding-left', 'support': {'webview_android': {'version_added': true}, 'chrome': {'version_added': '1'}, 'chrome_android': {'version_added': true}, 'edge': {'version_added': true}, 'edge_mobile': {'version_added': true}, 'firefox': {'version_added': '1'}, 'firefox_android': {'version_added': '4'}, 'ie': {'version_added': '4'}, 'ie_mobile': {'version_added': true}, 'opera': {'version_added': '3.5'}, 'opera_android': {'version_added': true}, 'safari': {'version_added': '1'}, 'safari_ios': {'version_added': true}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}, 'padding-right': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/padding-right', 'support': {'webview_android': {'version_added': true}, 'chrome': {'version_added': '1'}, 'chrome_android': {'version_added': true}, 'edge': {'version_added': true}, 'edge_mobile': {'version_added': true}, 'firefox': {'version_added': '1'}, 'firefox_android': {'version_added': '4'}, 'ie': {'version_added': '4'}, 'ie_mobile': {'version_added': true}, 'opera': {'version_added': '3.5'}, 'opera_android': {'version_added': true}, 'safari': {'version_added': '1'}, 'safari_ios': {'version_added': true}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}, 'padding-top': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/padding-top', 'support': {'webview_android': {'version_added': true}, 'chrome': {'version_added': '1'}, 'chrome_android': {'version_added': true}, 'edge': {'version_added': true}, 'edge_mobile': {'version_added': true}, 'firefox': {'version_added': '1'}, 'firefox_android': {'version_added': '4'}, 'ie': {'version_added': '4'}, 'ie_mobile': {'version_added': true}, 'opera': {'version_added': '3.5'}, 'opera_android': {'version_added': true}, 'safari': {'version_added': '1'}, 'safari_ios': {'version_added': true}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}, 'padding': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/padding', 'support': {'webview_android': {'version_added': true}, 'chrome': {'version_added': '1'}, 'chrome_android': {'version_added': true}, 'edge': {'version_added': true}, 'edge_mobile': {'version_added': true}, 'firefox': {'version_added': '1'}, 'firefox_android': {'version_added': '4'}, 'ie': {'version_added': '4'}, 'ie_mobile': {'version_added': true}, 'opera': {'version_added': '3.5'}, 'opera_android': {'version_added': true}, 'safari': {'version_added': '1'}, 'safari_ios': {'version_added': true}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}, 'right': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/right', 'support': {'webview_android': {'version_added': '1'}, 'chrome': {'version_added': '1'}, 'chrome_android': {'version_added': true}, 'edge': {'version_added': true}, 'edge_mobile': {'version_added': true}, 'firefox': {'version_added': '1'}, 'firefox_android': {'version_added': '4'}, 'ie': {'version_added': '5.5'}, 'ie_mobile': {'version_added': '6'}, 'opera': {'version_added': '5'}, 'opera_android': {'version_added': true}, 'safari': {'version_added': '1'}, 'safari_ios': {'version_added': '1'}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}, 'scroll-behavior': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/scroll-behavior', 'support': {'webview_android': {'version_added': false}, 'chrome': {'version_added': '61', 'flag': {'type': 'preference', 'name': 'Enable experimental web platform features', 'value_to_set': 'true'}}, 'chrome_android': {'version_added': null}, 'edge': {'version_added': false}, 'edge_mobile': {'version_added': false}, 'firefox': {'version_added': '36'}, 'firefox_android': {'version_added': '36'}, 'ie': {'version_added': false}, 'ie_mobile': {'version_added': false}, 'opera': {'version_added': true, 'flag': {'type': 'preference', 'name': 'Smooth Scrolling', 'value_to_set': 'true'}}, 'opera_android': {'version_added': false}, 'safari': {'version_added': false}, 'safari_ios': {'version_added': false}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}, 'scroll-snap-coordinate': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/scroll-snap-coordinate', 'support': {'webview_android': {'version_added': false}, 'chrome': {'version_added': false}, 'chrome_android': {'version_added': false}, 'edge': {'version_added': false}, 'edge_mobile': {'version_added': false}, 'firefox': {'version_added': '39'}, 'firefox_android': [{'version_added': '46'}, {'version_added': '39', 'flag': {'type': 'preference', 'name': 'layout.css.scroll-snap.enabled', 'value_to_set': 'true'}}], 'ie_mobile': {'version_added': false}, 'ie': {'version_added': false}, 'opera': {'version_added': false}, 'opera_android': {'version_added': false}, 'safari': {'version_added': false}, 'safari_ios': {'version_added': false}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': true}}}, 'scroll-snap-destination': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/scroll-snap-destination', 'support': {'webview_android': {'version_added': false}, 'chrome': {'version_added': false}, 'chrome_android': {'version_added': false}, 'edge': {'version_added': false}, 'edge_mobile': {'version_added': false}, 'firefox': {'version_added': '39'}, 'firefox_android': [{'version_added': '46'}, {'version_added': '39', 'flag': {'type': 'preference', 'name': 'layout.css.scroll-snap.enabled', 'value_to_set': 'true'}}], 'ie_mobile': {'version_added': false}, 'ie': {'version_added': false}, 'opera': {'version_added': false}, 'opera_android': {'version_added': false}, 'safari': {'version_added': false}, 'safari_ios': {'version_added': false}}, 'status': {'experimental': true, 'standard_track': true, 'deprecated': true}}}, 'scroll-snap-points-x': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/scroll-snap-points-x', 'support': {'webview_android': {'version_added': false}, 'chrome': {'version_added': false}, 'chrome_android': {'version_added': null}, 'edge': {'version_added': false}, 'edge_mobile': {'version_added': false}, 'firefox': {'version_added': '39'}, 'firefox_android': [{'version_added': '46'}, {'version_added': '39', 'flag': {'type': 'preference', 'name': 'layout.css.scroll-snap.enabled', 'value_to_set': 'true'}}], 'ie': {'version_added': false}, 'ie_mobile': {'version_added': false}, 'opera': {'version_added': false}, 'opera_android': {'version_added': false}, 'safari': {'version_added': '9', 'prefix': '-webkit-'}, 'safari_ios': {'version_added': '9', 'prefix': '-webkit-'}}, 'status': {'experimental': false, 'standard_track': false, 'deprecated': true}}}, 'scroll-snap-points-y': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/scroll-snap-points-y', 'support': {'webview_android': {'version_added': false}, 'chrome': {'version_added': false}, 'chrome_android': {'version_added': null}, 'edge': {'version_added': false}, 'edge_mobile': {'version_added': false}, 'firefox': {'version_added': '39'}, 'firefox_android': [{'version_added': '46'}, {'version_added': '39', 'flag': {'type': 'preference', 'name': 'layout.css.scroll-snap.enabled', 'value_to_set': 'true'}}], 'ie': {'version_added': false}, 'ie_mobile': {'version_added': false}, 'opera': {'version_added': false}, 'opera_android': {'version_added': false}, 'safari': {'version_added': '9', 'prefix': '-webkit-'}, 'safari_ios': {'version_added': '9', 'prefix': '-webkit-'}}, 'status': {'experimental': false, 'standard_track': false, 'deprecated': true}}}, 'scroll-snap-type-x': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/scroll-snap-type-x', 'support': {'webview_android': {'version_added': false}, 'chrome': {'version_added': false}, 'chrome_android': {'version_added': null}, 'edge': {'version_added': false}, 'edge_mobile': {'version_added': false}, 'firefox': {'version_added': '39'}, 'firefox_android': [{'version_added': '46'}, {'version_added': '39', 'flag': {'type': 'preference', 'name': 'layout.css.scroll-snap.enabled', 'value_to_set': 'true'}}], 'ie': {'version_added': false}, 'ie_mobile': {'version_added': false}, 'opera': {'version_added': false}, 'opera_android': {'version_added': false}, 'safari': {'version_added': '9'}, 'safari_ios': {'version_added': '9'}}, 'status': {'experimental': false, 'standard_track': false, 'deprecated': true}}}, 'scroll-snap-type-y': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/scroll-snap-type-y', 'support': {'webview_android': {'version_added': false}, 'chrome': {'version_added': false}, 'chrome_android': {'version_added': null}, 'edge': {'version_added': false}, 'edge_mobile': {'version_added': false}, 'firefox': {'version_added': '39'}, 'firefox_android': [{'version_added': '46'}, {'version_added': '39', 'flag': {'type': 'preference', 'name': 'layout.css.scroll-snap.enabled', 'value_to_set': 'true'}}], 'ie': {'version_added': false}, 'ie_mobile': {'version_added': false}, 'opera': {'version_added': false}, 'opera_android': {'version_added': false}, 'safari': {'version_added': false}, 'safari_ios': {'version_added': false}}, 'status': {'experimental': false, 'standard_track': false, 'deprecated': true}}}, 'scroll-snap-type': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/scroll-snap-type', 'support': {'webview_android': {'version_added': false}, 'chrome': {'version_added': false}, 'chrome_android': {'version_added': false}, 'edge': {'version_added': '12', 'prefix': '-ms-'}, 'edge_mobile': {'version_added': '12', 'prefix': '-ms-'}, 'firefox': {'version_added': '39'}, 'firefox_android': [{'version_added': '46'}, {'version_added': '39', 'flag': {'type': 'preference', 'name': 'layout.css.scroll-snap.enabled', 'value_to_set': 'true'}}], 'ie': {'version_added': '10', 'prefix': '-ms-'}, 'ie_mobile': {'version_added': false}, 'opera': {'version_added': false}, 'opera_android': {'version_added': false}, 'safari': {'version_added': '9', 'prefix': '-webkit-'}, 'safari_ios': {'version_added': '9', 'prefix': '-webkit-'}}, 'status': {'experimental': true, 'standard_track': true, 'deprecated': false}}}, 'text-align-last': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/text-align-last', 'support': {'webview_android': {'version_added': false}, 'chrome': [{'version_added': '35', 'version_removed': '47', 'flag': {'type': 'preference', 'name': 'Enable Experimental Web Platform Features', 'value_to_set': 'true'}}, {'version_added': '47'}], 'chrome_android': [{'version_added': '35', 'version_removed': '47', 'flag': {'type': 'preference', 'name': 'Enable Experimental Web Platform Features', 'value_to_set': 'true'}}, {'version_added': '47'}], 'edge': {'version_added': true}, 'edge_mobile': {'version_added': true}, 'firefox': [{'prefix': '-moz-', 'version_added': '12', 'version_removed': '53'}, {'version_added': '49'}], 'firefox_android': [{'prefix': '-moz-', 'version_added': '12', 'version_removed': '53'}, {'version_added': '49'}], 'ie': {'version_added': false}, 'ie_mobile': {'version_added': false}, 'opera': {'version_added': true}, 'opera_android': {'version_added': true}, 'safari': {'version_added': false, 'notes': 'See Webkit bug 76173.'}, 'safari_ios': {'version_added': false, 'notes': 'See Webkit bug 76173.'}}, 'status': {'experimental': true, 'standard_track': true, 'deprecated': false}}}, 'text-align': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/text-align', 'support': {'webview_android': {'version_added': true}, 'chrome': {'version_added': '1'}, 'chrome_android': {'version_added': true}, 'edge': {'version_added': true}, 'edge_mobile': {'version_added': true}, 'firefox': {'version_added': '1'}, 'firefox_android': {'version_added': '4'}, 'ie': {'version_added': '3'}, 'ie_mobile': {'version_added': true}, 'opera': {'version_added': true}, 'opera_android': {'version_added': true}, 'safari': {'version_added': '1'}, 'safari_ios': {'version_added': null}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}, 'block_alignment_values': {'__compat': {'description': 'Prefixed <code>center</code>, <code>left</code>, and <code>right</code> values for block alignment', 'support': {'webview_android': {'version_added': null}, 'chrome': {'prefix': '-webkit-', 'version_added': '1'}, 'chrome_android': {'version_added': null}, 'edge': {'version_added': null}, 'edge_mobile': {'version_added': null}, 'firefox': {'prefix': '-moz-', 'version_added': '1'}, 'firefox_android': {'version_added': null}, 'ie': {'version_added': false}, 'ie_mobile': {'version_added': null}, 'opera': {'version_added': null}, 'opera_android': {'version_added': null}, 'safari': [{'prefix': '-webkit-', 'version_added': '1.3'}, {'prefix': '-khtml-', 'version_added': '1'}], 'safari_ios': {'version_added': null}}, 'status': {'experimental': false, 'standard_track': false, 'deprecated': true}}}, 'flow_relative_values_start_and_end': {'__compat': {'description': 'Flow-relative values <code>start</code> and <code>end</code>', 'support': {'webview_android': {'version_added': null}, 'chrome': {'version_added': '1'}, 'chrome_android': {'version_added': null}, 'edge': {'version_added': false}, 'edge_mobile': {'version_added': null}, 'firefox': {'version_added': '1'}, 'firefox_android': {'version_added': '4'}, 'ie': {'version_added': false}, 'ie_mobile': {'version_added': null}, 'opera': {'version_added': null}, 'opera_android': {'version_added': null}, 'safari': {'version_added': '3.1'}, 'safari_ios': {'version_added': null}}, 'status': {'experimental': true, 'standard_track': true, 'deprecated': false}}}, 'match-parent': {'__compat': {'description': '<code>match-parent</code>', 'support': {'webview_android': {'version_added': null}, 'chrome': {'version_added': '16'}, 'chrome_android': {'version_added': null}, 'edge': {'version_added': null}, 'edge_mobile': {'version_added': null}, 'firefox': {'version_added': '40'}, 'firefox_android': {'version_added': '40'}, 'ie': {'version_added': false}, 'ie_mobile': {'version_added': null}, 'opera': {'version_added': null}, 'opera_android': {'version_added': null}, 'safari': {'version_added': false}, 'safari_ios': {'version_added': null}}, 'status': {'experimental': true, 'standard_track': true, 'deprecated': false}}}, 'justify-all': {'__compat': {'description': '<code>justify-all</code>', 'support': {'webview_android': {'version_added': false}, 'chrome': {'version_added': false}, 'chrome_android': {'version_added': false}, 'edge': {'version_added': false}, 'edge_mobile': {'version_added': false}, 'firefox': {'version_added': false}, 'firefox_android': {'version_added': false}, 'ie': {'version_added': false}, 'ie_mobile': {'version_added': false}, 'opera': {'version_added': false}, 'opera_android': {'version_added': false}, 'safari': {'version_added': false}, 'safari_ios': {'version_added': false}}, 'status': {'experimental': true, 'standard_track': true, 'deprecated': false}}}}, 'top': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/top', 'support': {'webview_android': {'version_added': true}, 'chrome': {'version_added': '1'}, 'chrome_android': {'version_added': true}, 'edge': {'version_added': true}, 'edge_mobile': {'version_added': true}, 'firefox': {'version_added': '1'}, 'firefox_android': {'version_added': '4'}, 'ie': {'version_added': '5', 'notes': 'In Internet Explorer versions before 7, when both <code>top</code> and <code>bottom</code> are specified, the element position is overconstrained and the <code>top</code> property has precedence; the computed value of <code>bottom</code> is set to <code>-top</code>, while its specified value is ignored.'}, 'ie_mobile': {'version_added': true}, 'opera': {'version_added': '6'}, 'opera_android': {'version_added': true}, 'safari': {'version_added': '1'}, 'safari_ios': {'version_added': true}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}, 'touch-action': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/touch-action', 'description': 'Level 1 values', 'support': {'webview_android': {'version_added': '36'}, 'chrome': {'version_added': '36'}, 'chrome_android': {'version_added': '36'}, 'edge': {'version_added': true}, 'edge_mobile': {'version_added': true}, 'firefox': [{'version_added': '52', 'notes': 'Not applicable to Firefox platforms that support neither pointer nor touch events.'}, {'version_added': '29', 'flag': {'type': 'preference', 'name': 'layout.css.touch_action.enabled', 'value_to_set': 'true'}, 'notes': 'Not applicable to Firefox platforms that support neither pointer nor touch events.'}], 'firefox_android': [{'version_added': '52'}, {'version_added': '29', 'flag': {'type': 'preference', 'name': 'layout.css.touch_action.enabled', 'value_to_set': 'true'}}], 'ie': [{'version_added': '11'}, {'version_added': '10', 'prefix': '-ms-'}], 'ie_mobile': [{'version_added': '11'}, {'version_added': '10', 'prefix': '-ms-'}], 'opera': {'version_added': '23'}, 'opera_android': {'version_added': true}, 'safari': {'version_added': false, 'notes': "See <a href='https://bugs.webkit.org/show_bug.cgi?id=133112'>WebKit bug 133112</a>."}, 'safari_ios': {'version_added': false, 'notes': "See <a href='https://bugs.webkit.org/show_bug.cgi?id=133112'>WebKit bug 133112</a>."}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}, 'manipulation': {'__compat': {'support': {'webview_android': {'version_added': '36'}, 'chrome': {'version_added': '36'}, 'chrome_android': {'version_added': '36'}, 'edge': {'version_added': true}, 'edge_mobile': {'version_added': true}, 'firefox': [{'version_added': '52', 'notes': 'Not applicable to Firefox platforms that support neither pointer nor touch events.'}, {'version_added': '29', 'flag': {'type': 'preference', 'name': 'layout.css.touch_action.enabled', 'value_to_set': 'true'}, 'notes': 'Not applicable to Firefox platforms that support neither pointer nor touch events.'}], 'firefox_android': [{'version_added': '52'}, {'version_added': '29', 'flag': {'type': 'preference', 'name': 'layout.css.touch_action.enabled', 'value_to_set': 'true'}}], 'ie': [{'version_added': '11'}, {'version_added': '10', 'prefix': '-ms-'}], 'ie_mobile': [{'version_added': '11'}, {'version_added': '10', 'prefix': '-ms-'}], 'opera': {'version_added': '23'}, 'opera_android': {'version_added': true}, 'safari': {'version_added': false}, 'safari_ios': {'version_added': '9.1'}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}, 'double-tap-zoom': {'__compat': {'support': {'webview_android': {'version_added': false}, 'chrome': {'version_added': false}, 'chrome_android': {'version_added': false}, 'edge': {'version_added': true}, 'edge_mobile': {'version_added': true}, 'firefox': {'version_added': false}, 'firefox_android': {'version_added': false}, 'ie': [{'version_added': '11'}, {'version_added': '10', 'prefix': '-ms-'}], 'ie_mobile': [{'version_added': '11'}, {'version_added': '10', 'prefix': '-ms-'}], 'opera': {'version_added': false}, 'opera_android': {'version_added': false}, 'safari': {'version_added': false}, 'safari_ios': {'version_added': false}}, 'status': {'experimental': false, 'standard_track': false, 'deprecated': false}}}, 'pinch-zoom': {'__compat': {'support': {'webview_android': {'version_added': '56'}, 'chrome': {'version_added': '56'}, 'chrome_android': {'version_added': '56'}, 'edge': {'version_added': true}, 'edge_mobile': {'version_added': true}, 'firefox': {'version_added': false, 'notes': "See <a href='https://bugzil.la/1285685'>bug 1285685</a>."}, 'firefox_android': {'version_added': false, 'notes': "See <a href='https://bugzil.la/1285685'>bug 1285685</a>."}, 'ie': [{'version_added': '11'}, {'version_added': '10', 'prefix': '-ms-'}], 'ie_mobile': [{'version_added': '11'}, {'version_added': '10', 'prefix': '-ms-'}], 'opera': {'version_added': '43'}, 'opera_android': {'version_added': '43'}, 'safari': {'version_added': false}, 'safari_ios': {'version_added': false}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}, 'unidirectional-pan': {'__compat': {'description': '<code>pan-up</code>, <code>pan-down</code>, <code>pan-left</code> and <code>pan-right</code>', 'support': {'webview_android': {'version_added': '55'}, 'chrome': {'version_added': '55'}, 'chrome_android': {'version_added': '55'}, 'edge': {'version_added': false}, 'edge_mobile': {'version_added': false}, 'firefox': {'version_added': false, 'notes': "See <a href='https://bugzil.la/1285685'>bug 1285685</a>."}, 'firefox_android': {'version_added': false, 'notes': "See <a href='https://bugzil.la/1285685'>bug 1285685</a>."}, 'ie': {'version_added': false}, 'ie_mobile': {'version_added': false}, 'opera': {'version_added': '42'}, 'opera_android': {'version_added': '42'}, 'safari': {'version_added': false}, 'safari_ios': {'version_added': false}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}}, 'transition-delay': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/transition-delay', 'support': {'webview_android': [{'version_added': true}, {'prefix': '-webkit-', 'version_added': '2.1'}], 'chrome': [{'version_added': '26'}, {'prefix': '-webkit-', 'version_added': '1'}], 'chrome_android': [{'version_added': '26'}, {'prefix': '-webkit-', 'version_added': true}], 'edge': [{'version_added': '12'}, {'prefix': '-webkit-', 'version_added': '12'}], 'edge_mobile': [{'version_added': '12'}, {'prefix': '-webkit-', 'version_added': '12'}], 'firefox': [{'version_added': '16'}, {'prefix': '-moz-', 'version_added': '4'}, {'version_added': '49', 'prefix': '-webkit-'}, {'prefix': '-webkit-', 'version_added': '44', 'flag': {'type': 'preference', 'name': 'layout.css.prefixes.webkit', 'value_to_set': 'true'}}], 'firefox_android': [{'version_added': '16'}, {'prefix': '-moz-', 'version_added': '4'}, {'version_added': '49', 'prefix': '-webkit-'}, {'prefix': '-webkit-', 'version_added': '44', 'flag': {'type': 'preference', 'name': 'layout.css.prefixes.webkit', 'value_to_set': 'true'}}], 'ie': {'version_added': '10'}, 'ie_mobile': {'version_added': null}, 'opera': [{'version_added': '12.1'}, {'prefix': '-webkit-', 'version_added': '15'}, {'prefix': '-o-', 'version_added': '11.6', 'version_removed': '15'}], 'opera_android': [{'version_added': '12.1'}, {'prefix': '-webkit-', 'version_added': '15'}, {'prefix': '-o-', 'version_added': '10', 'version_removed': '15'}], 'safari': [{'version_added': true}, {'prefix': '-webkit-', 'version_added': '3'}], 'safari_ios': [{'version_added': true}, {'prefix': '-webkit-', 'version_added': '3.2'}]}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}, 'transition-duration': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/transition-duration', 'support': {'webview_android': [{'version_added': true}, {'prefix': '-webkit-', 'version_added': '2.1'}], 'chrome': [{'version_added': '26'}, {'prefix': '-webkit-', 'version_added': '1'}], 'chrome_android': [{'version_added': '26'}, {'prefix': '-webkit-', 'version_added': true}], 'edge': [{'version_added': '12'}, {'prefix': '-webkit-', 'version_added': '12'}], 'edge_mobile': [{'version_added': '12'}, {'prefix': '-webkit-', 'version_added': '12'}], 'firefox': [{'version_added': '16'}, {'prefix': '-moz-', 'version_added': '4'}, {'version_added': '49', 'prefix': '-webkit-'}, {'prefix': '-webkit-', 'version_added': '44', 'flag': {'type': 'preference', 'name': 'layout.css.prefixes.webkit', 'value_to_set': 'true'}}], 'firefox_android': [{'version_added': '16'}, {'prefix': '-moz-', 'version_added': '4'}, {'version_added': '49', 'prefix': '-webkit-'}, {'prefix': '-webkit-', 'version_added': '44', 'flag': {'type': 'preference', 'name': 'layout.css.prefixes.webkit', 'value_to_set': 'true'}}], 'ie': {'version_added': '10'}, 'ie_mobile': {'version_added': null}, 'opera': [{'version_added': '12.1'}, {'prefix': '-webkit-', 'version_added': '15'}, {'prefix': '-o-', 'version_added': '10', 'version_removed': '15'}], 'opera_android': [{'version_added': '12.1'}, {'prefix': '-webkit-', 'version_added': '15'}, {'prefix': '-o-', 'version_added': '10', 'version_removed': '15'}], 'safari': [{'version_added': true}, {'prefix': '-webkit-', 'version_added': '3'}], 'safari_ios': [{'version_added': true}, {'prefix': '-webkit-', 'version_added': '3.2'}]}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}, 'transition-property': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/transition-property', 'support': {'webview_android': [{'version_added': true}, {'prefix': '-webkit-', 'version_added': true}], 'chrome': [{'version_added': '26'}, {'prefix': '-webkit-', 'version_added': true}], 'chrome_android': [{'version_added': '26'}, {'prefix': '-webkit-', 'version_added': true}], 'edge': [{'version_added': '12'}, {'prefix': '-webkit-', 'version_added': '12'}], 'edge_mobile': [{'version_added': '12'}, {'prefix': '-webkit-', 'version_added': '12'}], 'firefox': [{'version_added': '16'}, {'prefix': '-moz-', 'version_added': '4'}, {'version_added': '49', 'prefix': '-webkit-'}, {'prefix': '-webkit-', 'version_added': '44', 'flag': {'type': 'preference', 'name': 'layout.css.prefixes.webkit', 'value_to_set': 'true'}}], 'firefox_android': [{'version_added': '16'}, {'prefix': '-moz-', 'version_added': '4'}, {'version_added': '49', 'prefix': '-webkit-'}, {'prefix': '-webkit-', 'version_added': '44', 'flag': {'type': 'preference', 'name': 'layout.css.prefixes.webkit', 'value_to_set': 'true'}}], 'ie': {'version_added': '10'}, 'ie_mobile': {'version_added': null}, 'opera': [{'version_added': '12.1'}, {'prefix': '-webkit-', 'version_added': '15'}, {'prefix': '-o-', 'version_added': '11.6', 'version_removed': '15'}], 'opera_android': {'version_added': null}, 'safari': [{'version_added': true}, {'prefix': '-webkit-', 'version_added': true}], 'safari_ios': [{'version_added': true}, {'prefix': '-webkit-', 'version_added': true}]}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}, 'IDENT_value': {'__compat': {'description': '<code>IDENT</code> value', 'support': {'webview_android': {'version_added': true}, 'chrome': {'version_added': true}, 'chrome_android': {'version_added': true}, 'edge': {'version_added': null}, 'edge_mobile': {'version_added': null}, 'firefox': {'version_added': true}, 'firefox_android': {'version_added': true}, 'ie': {'version_added': true}, 'ie_mobile': {'version_added': null}, 'opera': {'version_added': true}, 'opera_android': {'version_added': true}, 'safari': {'version_added': false}, 'safari_ios': {'version_added': false}}, 'status': {'experimental': true, 'standard_track': true, 'deprecated': false}}}}, 'transition-timing-function': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/transition-timing-function', 'support': {'webview_android': [{'version_added': true}, {'prefix': '-webkit-', 'version_added': true}], 'chrome': [{'version_added': '26'}, {'prefix': '-webkit-', 'version_added': true}], 'chrome_android': [{'version_added': '26'}, {'prefix': '-webkit-', 'version_added': true}], 'edge': [{'version_added': '12'}, {'prefix': '-webkit-', 'version_added': '12'}], 'edge_mobile': [{'version_added': '12'}, {'prefix': '-webkit-', 'version_added': '12'}], 'firefox': [{'version_added': '16'}, {'prefix': '-moz-', 'version_added': '4'}, {'version_added': '49', 'prefix': '-webkit-'}, {'prefix': '-webkit-', 'version_added': '44', 'flag': {'type': 'preference', 'name': 'layout.css.prefixes.webkit', 'value_to_set': 'true'}}], 'firefox_android': [{'version_added': '16'}, {'prefix': '-moz-', 'version_added': '4'}, {'version_added': '49', 'prefix': '-webkit-'}, {'prefix': '-webkit-', 'version_added': '44', 'flag': {'type': 'preference', 'name': 'layout.css.prefixes.webkit', 'value_to_set': 'true'}}], 'ie': {'version_added': '10'}, 'ie_mobile': {'version_added': null}, 'opera': [{'version_added': '12.1'}, {'prefix': '-webkit-', 'version_added': '15'}, {'prefix': '-o-', 'version_added': '11.6', 'version_removed': '15'}], 'opera_android': {'version_added': null}, 'safari': [{'version_added': true}, {'prefix': '-webkit-', 'version_added': true}], 'safari_ios': [{'version_added': true}, {'prefix': '-webkit-', 'version_added': true}]}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}, 'transition': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/transition', 'support': {'webview_android': [{'version_added': true}, {'prefix': '-webkit-', 'version_added': '2.1'}], 'chrome': [{'version_added': '26'}, {'prefix': '-webkit-', 'version_added': '1'}], 'chrome_android': [{'version_added': '26'}, {'prefix': '-webkit-', 'version_added': true}], 'edge': [{'version_added': '12'}, {'prefix': '-webkit-', 'version_added': '12'}], 'edge_mobile': [{'version_added': '12'}, {'prefix': '-webkit-', 'version_added': '12'}], 'firefox': [{'version_added': '16', 'notes': ["Before Firefox 57, transitions do not work when transitioning from a <a href='https://developer.mozilla.org/docs/Web/CSS/text-shadow'><code>text-shadow</code></a> with a color specified to a <code>text-shadow</code> without a color specified (see <A href='https://bugzil.la/726550'>bug 726550</a>).", "Before Firefox 57, cancelling a filling animation (for example, with <code>animation-fill-mode: forwards</code> set) can trigger a transition set on the same element, although only once (see <a href='https://bugzil.la/1192592'>bug 1192592</a> and <a href='https://bug1192592.bmoattachments.org/attachment.cgi?id=8843824'>these test cases</a> for more information).", "Before Firefox 57, the <a href='https://developer.mozilla.org/docs/Web/CSS/background-position'><code>background-position</code></a> property can't be transitioned between two values containing different numbers of <a href='https://developer.mozilla.org/docs/Web/CSS/position_value' t><code>&lt;position&gt;</code></a> values, for example <code>background-position: 10px 10px;</code> and <code>background-position: 20px 20px, 30px 30px;</code> (see <a href='https://bugzil.la/1390446'>bug 1390446</a>)."]}, {'prefix': '-moz-', 'version_added': '4'}, {'version_added': '49', 'prefix': '-webkit-'}, {'prefix': '-webkit-', 'version_added': '44', 'flag': {'type': 'preference', 'name': 'layout.css.prefixes.webkit', 'value_to_set': 'true'}}], 'firefox_android': [{'version_added': '16', 'notes': ["Before Firefox 57, transitions do not work when transitioning from a <a href='https://developer.mozilla.org/docs/Web/CSS/text-shadow'><code>text-shadow</code></a> with a color specified to a <code>text-shadow</code> without a color specified (see <A href='https://bugzil.la/726550'>bug 726550</a>).", "Before Firefox 57, cancelling a filling animation (for example, with <code>animation-fill-mode: forwards</code> set) can trigger a transition set on the same element, although only once (see <a href='https://bugzil.la/1192592'>bug 1192592</a> and <a href='https://bug1192592.bmoattachments.org/attachment.cgi?id=8843824'>these test cases</a> for more information).", "Before Firefox 57, the <a href='https://developer.mozilla.org/docs/Web/CSS/background-position'><code>background-position</code></a> property can't be transitioned between two values containing different numbers of <a href='https://developer.mozilla.org/docs/Web/CSS/position_value' t><code>&lt;position&gt;</code></a> values, for example <code>background-position: 10px 10px;</code> and <code>background-position: 20px 20px, 30px 30px;</code> (see <a href='https://bugzil.la/1390446'>bug 1390446</a>)."]}, {'prefix': '-moz-', 'version_added': '4'}, {'version_added': '49', 'prefix': '-webkit-'}, {'prefix': '-webkit-', 'version_added': '44', 'flag': {'type': 'preference', 'name': 'layout.css.prefixes.webkit', 'value_to_set': 'true'}}], 'ie': {'version_added': '10'}, 'ie_mobile': {'version_added': '10'}, 'opera': [{'version_added': '12.1'}, {'prefix': '-webkit-', 'version_added': '15'}, {'prefix': '-o-', 'version_added': '10.1', 'version_removed': '15'}], 'opera_android': [{'version_added': '12.1'}, {'prefix': '-webkit-', 'version_added': '15'}, {'prefix': '-o-', 'version_added': '10.1', 'version_removed': '15'}], 'safari': [{'version_added': '6.1'}, {'prefix': '-webkit-', 'version_added': '3'}], 'safari_ios': [{'version_added': true}, {'prefix': '-webkit-', 'version_added': '3.2'}]}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}, 'gradients': {'__compat': {'description': 'Gradients', 'support': {'webview_android': {'version_added': false}, 'chrome': {'version_added': false}, 'chrome_android': {'version_added': null}, 'edge': {'version_added': true}, 'edge_mobile': {'version_added': true}, 'firefox': {'version_added': false}, 'firefox_android': {'version_added': false}, 'ie': {'version_added': '10'}, 'ie_mobile': {'version_added': '10'}, 'opera': {'version_added': false}, 'opera_android': {'version_added': false}, 'safari': {'version_added': false}, 'safari_ios': {'version_added': false}}, 'status': {'experimental': true, 'standard_track': true, 'deprecated': false}}}}, 'z-index': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/z-index', 'support': {'webview_android': {'version_added': true}, 'chrome': {'version_added': '1'}, 'chrome_android': {'version_added': true}, 'edge': {'version_added': true}, 'edge_mobile': {'version_added': true}, 'firefox': {'version_added': '1'}, 'firefox_android': {'version_added': '4'}, 'ie': {'version_added': '4'}, 'ie_mobile': {'version_added': true}, 'opera': {'version_added': '4'}, 'opera_android': {'version_added': true}, 'safari': {'version_added': '1'}, 'safari_ios': {'version_added': true}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}, 'negative_values': {'__compat': {'description': 'Negative values', 'support': {'webview_android': {'version_added': true}, 'chrome': {'version_added': '1'}, 'chrome_android': {'version_added': true}, 'edge': {'version_added': true}, 'edge_mobile': {'version_added': true}, 'firefox': {'version_added': '3'}, 'firefox_android': {'version_added': true}, 'ie': {'version_added': '4'}, 'ie_mobile': {'version_added': true}, 'opera': {'version_added': '4'}, 'opera_android': {'version_added': true}, 'safari': {'version_added': '1'}, 'safari_ios': {'version_added': true}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}}}, 'selectors': {'adjacent_sibling': {'__compat': {'description': 'Adjacent sibling combinator (<code>A + B</code>)', 'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/Adjacent_sibling_selectors', 'support': {'webview_android': {'version_added': true}, 'chrome': {'version_added': '1'}, 'chrome_android': {'version_added': true}, 'edge': {'version_added': '12'}, 'edge_mobile': {'version_added': true}, 'firefox': {'version_added': '1'}, 'firefox_android': {'version_added': '4'}, 'ie': {'version_added': '7', 'notes': ["Internet Explorer 7 doesn't update the style correctly when an element is dynamically placed before an element that matched the selector.", "In Internet Explorer 8, if an element is inserted dynamically by clicking on a link the first-child style isn't applied until the link loses focus."]}, 'ie_mobile': {'version_added': true}, 'opera': {'version_added': true}, 'opera_android': {'version_added': true}, 'safari': {'version_added': true}, 'safari_ios': {'version_added': true}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}, 'any-link': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/:any-link', 'support': {'webview_android': {'prefix': '-webkit-', 'version_added': true}, 'chrome': {'prefix': '-webkit-', 'version_added': true}, 'chrome_android': {'prefix': '-webkit-', 'version_added': true}, 'edge': {'version_added': false}, 'edge_mobile': {'version_added': false}, 'firefox': [{'prefix': '-moz-', 'version_added': true}, {'version_added': '50'}], 'firefox_android': [{'prefix': '-moz-', 'version_added': true}, {'version_added': '50'}], 'ie': {'version_added': false}, 'ie_mobile': {'version_added': false}, 'opera': {'prefix': '-webkit-', 'version_added': true}, 'opera_android': {'prefix': '-webkit-', 'version_added': true}, 'safari': {'prefix': '-webkit-', 'version_added': true}, 'safari_ios': {'prefix': '-webkit-', 'version_added': true}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}, 'attribute': {'__compat': {'description': 'Attribute selector (<code>[attr=value]</code>)', 'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/Attribute_selectors', 'support': {'webview_android': {'version_added': true}, 'chrome': {'version_added': '1'}, 'chrome_android': {'version_added': true}, 'edge': {'version_added': '12'}, 'edge_mobile': {'version_added': true}, 'firefox': {'version_added': '1'}, 'firefox_android': {'version_added': '4'}, 'ie': {'version_added': '7'}, 'ie_mobile': {'version_added': true}, 'opera': {'version_added': '9'}, 'opera_android': {'version_added': true}, 'safari': {'version_added': '3'}, 'safari_ios': {'version_added': true}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}, 'case_sensitive_modifier': {'__compat': {'description': 'Case-insensitive modifier (<code>i</code>)', 'support': {'webview_android': {'version_added': '49'}, 'chrome': {'version_added': '49'}, 'chrome_android': {'version_added': '49'}, 'edge': {'version_added': false}, 'edge_mobile': {'version_added': false}, 'firefox': {'version_added': '47'}, 'firefox_android': {'version_added': '47'}, 'ie': {'version_added': false}, 'ie_mobile': {'version_added': false}, 'opera': {'version_added': '36'}, 'opera_android': {'version_added': true}, 'safari': {'version_added': '9'}, 'safari_ios': {'version_added': true}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}}, 'child': {'__compat': {'description': 'Child combinator (<code>A &gt; B</code>)', 'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/Child_selectors', 'support': {'webview_android': {'version_added': true}, 'chrome': {'version_added': '1'}, 'chrome_android': {'version_added': true}, 'edge': {'version_added': '12'}, 'edge_mobile': {'version_added': true}, 'firefox': {'version_added': '1'}, 'firefox_android': {'version_added': '4'}, 'ie': {'version_added': '7'}, 'ie_mobile': {'version_added': true}, 'opera': {'version_added': true}, 'opera_android': {'version_added': true}, 'safari': {'version_added': true}, 'safari_ios': {'version_added': true}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}, 'class': {'__compat': {'description': 'Class selector (<code>.className</code>)', 'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/Class_selectors', 'support': {'webview_android': {'version_added': true}, 'chrome': {'version_added': '1'}, 'chrome_android': {'version_added': true}, 'edge': {'version_added': '12'}, 'edge_mobile': {'version_added': true}, 'firefox': {'version_added': '1'}, 'firefox_android': {'version_added': '4'}, 'ie': {'version_added': true}, 'ie_mobile': {'version_added': true}, 'opera': {'version_added': true}, 'opera_android': {'version_added': true}, 'safari': {'version_added': true}, 'safari_ios': {'version_added': true}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}, 'cue': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/::cue', 'support': {'webview_android': {'version_added': null}, 'chrome': {'version_added': true}, 'chrome_android': {'version_added': null}, 'edge': {'version_added': null}, 'edge_mobile': {'version_added': null}, 'firefox_android': {'version_added': '55'}, 'firefox': {'version_added': '55', 'notes': ['Firefox currently does not support a parameter on <code>::cue</code>.']}, 'ie': {'version_added': false}, 'ie_mobile': {'version_added': false}, 'opera': {'version_added': null}, 'opera_android': {'version_added': null}, 'safari': {'version_added': null}, 'safari_ios': {'version_added': null}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}, 'descendant': {'__compat': {'description': 'Descendant combinator (<code>A B</code>)', 'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/Descendant_selectors', 'support': {'webview_android': {'version_added': true}, 'chrome': {'version_added': '1'}, 'chrome_android': {'version_added': true}, 'edge': {'version_added': '12'}, 'edge_mobile': {'version_added': true}, 'firefox': {'version_added': '1'}, 'firefox_android': {'version_added': '4'}, 'ie': {'version_added': true}, 'ie_mobile': {'version_added': true}, 'opera': {'version_added': true}, 'opera_android': {'version_added': true}, 'safari': {'version_added': true}, 'safari_ios': {'version_added': true}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}, 'two_greater_than_syntax': {'__compat': {'description': '<code>A &gt;&gt; B</code> syntax', 'support': {'webview_android': {'version_added': false}, 'chrome': {'version_added': false}, 'chrome_android': {'version_added': false}, 'edge': {'version_added': false}, 'edge_mobile': {'version_added': false}, 'firefox': {'version_added': false}, 'firefox_android': {'version_added': false}, 'ie': {'version_added': false}, 'ie_mobile': {'version_added': false}, 'opera': {'version_added': false}, 'opera_android': {'version_added': false}, 'safari': {'version_added': '10'}, 'safari_ios': {'version_added': '10'}}, 'status': {'experimental': true, 'standard_track': true, 'deprecated': false}}}}, 'general_sibling': {'__compat': {'description': 'General sibling combinator (<code>A ~ B</code>)', 'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/General_sibling_selectors', 'support': {'webview_android': {'version_added': true}, 'chrome': {'version_added': '1'}, 'chrome_android': {'version_added': true}, 'edge': {'version_added': '12'}, 'edge_mobile': {'version_added': true}, 'firefox': {'version_added': '1'}, 'firefox_android': {'version_added': '4'}, 'ie': {'version_added': '7'}, 'ie_mobile': {'version_added': true}, 'opera': {'version_added': '9'}, 'opera_android': {'version_added': true}, 'safari': {'version_added': '3'}, 'safari_ios': {'version_added': true}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}, 'id': {'__compat': {'description': 'ID selector (<code>#idName</code>)', 'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/ID_selectors', 'support': {'webview_android': {'version_added': true}, 'chrome': {'version_added': '1'}, 'chrome_android': {'version_added': true}, 'edge': {'version_added': '12'}, 'edge_mobile': {'version_added': true}, 'firefox': {'version_added': '1'}, 'firefox_android': {'version_added': '4'}, 'ie': {'version_added': true}, 'ie_mobile': {'version_added': true}, 'opera': {'version_added': true}, 'opera_android': {'version_added': true}, 'safari': {'version_added': true}, 'safari_ios': {'version_added': true}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}, 'type': {'__compat': {'description': 'Type selector (<code>elementName</code>)', 'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/Type_selectors', 'support': {'webview_android': {'version_added': true}, 'chrome': {'version_added': '1'}, 'chrome_android': {'version_added': true}, 'edge': {'version_added': '12'}, 'edge_mobile': {'version_added': true}, 'firefox': {'version_added': '1'}, 'firefox_android': {'version_added': '4'}, 'ie': {'version_added': true}, 'ie_mobile': {'version_added': true}, 'opera': {'version_added': true}, 'opera_android': {'version_added': true}, 'safari': {'version_added': true}, 'safari_ios': {'version_added': true}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}, 'namespaces': {'__compat': {'description': 'Nampespaces (<code>ns|elementName</code>)', 'support': {'webview_android': {'version_added': true}, 'chrome': {'version_added': true}, 'chrome_android': {'version_added': true}, 'edge': {'version_added': true}, 'edge_mobile': {'version_added': true}, 'firefox': {'version_added': '1'}, 'firefox_android': {'version_added': '4'}, 'ie': {'version_added': '9'}, 'ie_mobile': {'version_added': true}, 'opera': {'version_added': '8'}, 'opera_android': {'version_added': true}, 'safari': {'version_added': '1.3'}, 'safari_ios': {'version_added': true}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}}, 'universal': {'__compat': {'description': 'Universal selector (<code>*</code>)', 'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/Universal_selectors', 'support': {'webview_android': {'version_added': true}, 'chrome': {'version_added': '1'}, 'chrome_android': {'version_added': true}, 'edge': {'version_added': '12'}, 'edge_mobile': {'version_added': true}, 'firefox': {'version_added': '1'}, 'firefox_android': {'version_added': '4'}, 'ie': {'version_added': '7'}, 'ie_mobile': {'version_added': true}, 'opera': {'version_added': true}, 'opera_android': {'version_added': true}, 'safari': {'version_added': true}, 'safari_ios': {'version_added': true}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}, 'namespaces': {'__compat': {'description': 'Nampespaces (<code>*|*</code>)', 'support': {'webview_android': {'version_added': true}, 'chrome': {'version_added': true}, 'chrome_android': {'version_added': true}, 'edge': {'version_added': true}, 'edge_mobile': {'version_added': true}, 'firefox': {'version_added': '1'}, 'firefox_android': {'version_added': '4'}, 'ie': {'version_added': '9'}, 'ie_mobile': {'version_added': true}, 'opera': {'version_added': '8'}, 'opera_android': {'version_added': true}, 'safari': {'version_added': '1.3'}, 'safari_ios': {'version_added': true}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}}}, 'types': {'angle': {'__compat': {'description': '<code>&lt;angle&gt;</code>', 'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/angle', 'support': {'webview_android': {'version_added': true}, 'chrome': {'version_added': '2'}, 'chrome_android': {'version_added': true}, 'edge': {'version_added': '12'}, 'edge_mobile': {'version_added': true}, 'firefox': {'version_added': '3.6'}, 'firefox_android': {'version_added': '4'}, 'ie': {'version_added': '9'}, 'ie_mobile': {'version_added': true}, 'opera': {'version_added': true}, 'opera_android': {'version_added': true}, 'safari': {'version_added': '4'}, 'safari_ios': {'version_added': true}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}, 'deg': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/angle#deg', 'support': {'webview_android': {'version_added': true}, 'chrome': {'version_added': '2'}, 'chrome_android': {'version_added': true}, 'edge': {'version_added': '12'}, 'edge_mobile': {'version_added': true}, 'firefox': {'version_added': '3.6'}, 'firefox_android': {'version_added': '4'}, 'ie': {'version_added': '9'}, 'ie_mobile': {'version_added': true}, 'opera': {'version_added': true}, 'opera_android': {'version_added': true}, 'safari': {'version_added': '4'}, 'safari_ios': {'version_added': true}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}, 'grad': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/angle#grad', 'support': {'webview_android': {'version_added': true}, 'chrome': {'version_added': '2'}, 'chrome_android': {'version_added': true}, 'edge': {'version_added': '12'}, 'edge_mobile': {'version_added': true}, 'firefox': {'version_added': '3.6'}, 'firefox_android': {'version_added': '4'}, 'ie': {'version_added': '9'}, 'ie_mobile': {'version_added': true}, 'opera': {'version_added': true}, 'opera_android': {'version_added': true}, 'safari': {'version_added': '4'}, 'safari_ios': {'version_added': true}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}, 'rad': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/angle#rad', 'support': {'webview_android': {'version_added': true}, 'chrome': {'version_added': '2'}, 'chrome_android': {'version_added': true}, 'edge': {'version_added': '12'}, 'edge_mobile': {'version_added': true}, 'firefox': {'version_added': '3.6'}, 'firefox_android': {'version_added': '4'}, 'ie': {'version_added': '9'}, 'ie_mobile': {'version_added': true}, 'opera': {'version_added': true}, 'opera_android': {'version_added': true}, 'safari': {'version_added': '4'}, 'safari_ios': {'version_added': true}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}, 'turn': {'__compat': {'mdn_url': 'https://developer.mozilla.org/docs/Web/CSS/angle#turn', 'support': {'webview_android': {'version_added': true}, 'chrome': {'version_added': true}, 'chrome_android': {'version_added': true}, 'edge': {'version_added': '12'}, 'edge_mobile': {'version_added': true}, 'firefox': {'version_added': '13'}, 'firefox_android': {'version_added': '14'}, 'ie': {'version_added': '9'}, 'ie_mobile': {'version_added': true}, 'opera': {'version_added': true}, 'opera_android': {'version_added': true}, 'safari': {'version_added': '10'}, 'safari_ios': {'version_added': '10'}}, 'status': {'experimental': false, 'standard_track': true, 'deprecated': false}}}}}}}
  /***/ },
/* 5 */
  /***/ function (module, exports) {
    module.exports = function cmp (a, b) {
      var pa = a.split('.')
      var pb = b.split('.')
      for (var i = 0; i < 3; i++) {
        var na = Number(pa[i])
        var nb = Number(pb[i])
        if (na > nb) return 1
        if (nb > na) return -1
        if (!isNaN(na) && isNaN(nb)) return 1
        if (isNaN(na) && !isNaN(nb)) return -1
      }
      return 0
    }
  /***/ },
/* 6 */
  /***/ function (module, exports) {
/**
 * Expose `Compiler`.
 */

    module.exports = Compiler

/**
 * Initialize a compiler.
 *
 * @param {Type} name
 * @return {Type}
 * @api public
 */

    function Compiler (opts) {
      this.options = opts || {}
    }

/**
 * Emit `str`
 */

    Compiler.prototype.emit = function (str) {
      return str
    }

/**
 * Visit `node`.
 */

    Compiler.prototype.visit = function (node) {
      return this[node.type](node)
    }

/**
 * Map visit over array of `nodes`, optionally using a `delim`
 */

    Compiler.prototype.mapVisit = function (nodes, delim) {
      var buf = ''
      delim = delim || ''

      for (var i = 0, length = nodes.length; i < length; i++) {
        buf += this.visit(nodes[i])
        if (delim && i < length - 1) buf += this.emit(delim)
      }

      return buf
    }
  /***/ },
/* 7 */
  /***/ function (module, exports) {
    if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
      module.exports = function inherits (ctor, superCtor) {
        ctor.super_ = superCtor
        ctor.prototype = Object.create(superCtor.prototype, {
          constructor: {
            value: ctor,
            enumerable: false,
            writable: true,
            configurable: true
          }
        })
      }
    } else {
  // old school shim for old browsers
      module.exports = function inherits (ctor, superCtor) {
        ctor.super_ = superCtor
        var TempCtor = function () {}
        TempCtor.prototype = superCtor.prototype
        ctor.prototype = new TempCtor()
        ctor.prototype.constructor = ctor
      }
    }
  /***/ },
/* 8 */
  /***/ function (module, exports, __webpack_require__) {
/*
 * Copyright 2009-2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE.txt or:
 * http://opensource.org/licenses/BSD-3-Clause
 */
    exports.SourceMapGenerator = __webpack_require__(23).SourceMapGenerator
    exports.SourceMapConsumer = __webpack_require__(24).SourceMapConsumer
    exports.SourceNode = __webpack_require__(25).SourceNode
  /***/ },
/* 9 */
  /***/ function (module, exports) {
// shim for using process in browser
    var process = module.exports = {}

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

    var cachedSetTimeout
    var cachedClearTimeout

    function defaultSetTimout () {
      throw new Error('setTimeout has not been defined')
    }
    function defaultClearTimeout () {
      throw new Error('clearTimeout has not been defined')
    }
    (function () {
      try {
        if (typeof setTimeout === 'function') {
          cachedSetTimeout = setTimeout
        } else {
          cachedSetTimeout = defaultSetTimout
        }
      } catch (e) {
        cachedSetTimeout = defaultSetTimout
      }
      try {
        if (typeof clearTimeout === 'function') {
          cachedClearTimeout = clearTimeout
        } else {
          cachedClearTimeout = defaultClearTimeout
        }
      } catch (e) {
        cachedClearTimeout = defaultClearTimeout
      }
    }())
    function runTimeout (fun) {
      if (cachedSetTimeout === setTimeout) {
        // normal enviroments in sane situations
        return setTimeout(fun, 0)
      }
    // if setTimeout wasn't available but was latter defined
      if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout
        return setTimeout(fun, 0)
      }
      try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0)
      } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
          return cachedSetTimeout.call(null, fun, 0)
        } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
          return cachedSetTimeout.call(this, fun, 0)
        }
      }
    }
    function runClearTimeout (marker) {
      if (cachedClearTimeout === clearTimeout) {
        // normal enviroments in sane situations
        return clearTimeout(marker)
      }
    // if clearTimeout wasn't available but was latter defined
      if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout
        return clearTimeout(marker)
      }
      try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker)
      } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
          return cachedClearTimeout.call(null, marker)
        } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
          return cachedClearTimeout.call(this, marker)
        }
      }
    }
    var queue = []
    var draining = false
    var currentQueue
    var queueIndex = -1

    function cleanUpNextTick () {
      if (!draining || !currentQueue) {
        return
      }
      draining = false
      if (currentQueue.length) {
        queue = currentQueue.concat(queue)
      } else {
        queueIndex = -1
      }
      if (queue.length) {
        drainQueue()
      }
    }

    function drainQueue () {
      if (draining) {
        return
      }
      var timeout = runTimeout(cleanUpNextTick)
      draining = true

      var len = queue.length
      while (len) {
        currentQueue = queue
        queue = []
        while (++queueIndex < len) {
          if (currentQueue) {
            currentQueue[queueIndex].run()
          }
        }
        queueIndex = -1
        len = queue.length
      }
      currentQueue = null
      draining = false
      runClearTimeout(timeout)
    }

    process.nextTick = function (fun) {
      var args = new Array(arguments.length - 1)
      if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
          args[i - 1] = arguments[i]
        }
      }
      queue.push(new Item(fun, args))
      if (queue.length === 1 && !draining) {
        runTimeout(drainQueue)
      }
    }

// v8 likes predictible objects
    function Item (fun, array) {
      this.fun = fun
      this.array = array
    }
    Item.prototype.run = function () {
      this.fun.apply(null, this.array)
    }
    process.title = 'browser'
    process.browser = true
    process.env = {}
    process.argv = []
    process.version = '' // empty string to avoid regexp issues
    process.versions = {}

    function noop () {}

    process.on = noop
    process.addListener = noop
    process.once = noop
    process.off = noop
    process.removeListener = noop
    process.removeAllListeners = noop
    process.emit = noop
    process.prependListener = noop
    process.prependOnceListener = noop

    process.listeners = function (name) { return [] }

    process.binding = function (name) {
      throw new Error('process.binding is not supported')
    }

    process.cwd = function () { return '/' }
    process.chdir = function (dir) {
      throw new Error('process.chdir is not supported')
    }
    process.umask = function () { return 0 }
  /***/ },
/* 10 */
  /***/ function (module, exports, __webpack_require__) {
    /* WEBPACK VAR INJECTION */(function (process) { // Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
      function normalizeArray (parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
        var up = 0
        for (var i = parts.length - 1; i >= 0; i--) {
          var last = parts[i]
          if (last === '.') {
            parts.splice(i, 1)
          } else if (last === '..') {
            parts.splice(i, 1)
            up++
          } else if (up) {
            parts.splice(i, 1)
            up--
          }
        }

  // if the path is allowed to go above the root, restore leading ..s
        if (allowAboveRoot) {
          for (; up--; up) {
            parts.unshift('..')
          }
        }

        return parts
      }

// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
      var splitPathRe =
    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/
      var splitPath = function (filename) {
        return splitPathRe.exec(filename).slice(1)
      }

// path.resolve([from ...], to)
// posix version
      exports.resolve = function () {
        var resolvedPath = '',
          resolvedAbsolute = false

        for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
          var path = (i >= 0) ? arguments[i] : process.cwd()

    // Skip empty and invalid entries
          if (typeof path !== 'string') {
            throw new TypeError('Arguments to path.resolve must be strings')
          } else if (!path) {
            continue
          }

          resolvedPath = path + '/' + resolvedPath
          resolvedAbsolute = path.charAt(0) === '/'
        }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
        resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function (p) {
          return !!p
        }), !resolvedAbsolute).join('/')

        return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.'
      }

// path.normalize(path)
// posix version
      exports.normalize = function (path) {
        var isAbsolute = exports.isAbsolute(path),
          trailingSlash = substr(path, -1) === '/'

  // Normalize the path
        path = normalizeArray(filter(path.split('/'), function (p) {
          return !!p
        }), !isAbsolute).join('/')

        if (!path && !isAbsolute) {
          path = '.'
        }
        if (path && trailingSlash) {
          path += '/'
        }

        return (isAbsolute ? '/' : '') + path
      }

// posix version
      exports.isAbsolute = function (path) {
        return path.charAt(0) === '/'
      }

// posix version
      exports.join = function () {
        var paths = Array.prototype.slice.call(arguments, 0)
        return exports.normalize(filter(paths, function (p, index) {
          if (typeof p !== 'string') {
            throw new TypeError('Arguments to path.join must be strings')
          }
          return p
        }).join('/'))
      }

// path.relative(from, to)
// posix version
      exports.relative = function (from, to) {
        from = exports.resolve(from).substr(1)
        to = exports.resolve(to).substr(1)

        function trim (arr) {
          var start = 0
          for (; start < arr.length; start++) {
            if (arr[start] !== '') break
          }

          var end = arr.length - 1
          for (; end >= 0; end--) {
            if (arr[end] !== '') break
          }

          if (start > end) return []
          return arr.slice(start, end - start + 1)
        }

        var fromParts = trim(from.split('/'))
        var toParts = trim(to.split('/'))

        var length = Math.min(fromParts.length, toParts.length)
        var samePartsLength = length
        for (var i = 0; i < length; i++) {
          if (fromParts[i] !== toParts[i]) {
            samePartsLength = i
            break
          }
        }

        var outputParts = []
        for (var i = samePartsLength; i < fromParts.length; i++) {
          outputParts.push('..')
        }

        outputParts = outputParts.concat(toParts.slice(samePartsLength))

        return outputParts.join('/')
      }

      exports.sep = '/'
      exports.delimiter = ':'

      exports.dirname = function (path) {
        var result = splitPath(path),
          root = result[0],
          dir = result[1]

        if (!root && !dir) {
    // No dirname whatsoever
          return '.'
        }

        if (dir) {
    // It has a dirname, strip trailing slash
          dir = dir.substr(0, dir.length - 1)
        }

        return root + dir
      }

      exports.basename = function (path, ext) {
        var f = splitPath(path)[2]
  // TODO: make this comparison case-insensitive on windows?
        if (ext && f.substr(-1 * ext.length) === ext) {
          f = f.substr(0, f.length - ext.length)
        }
        return f
      }

      exports.extname = function (path) {
        return splitPath(path)[3]
      }

      function filter (xs, f) {
        if (xs.filter) return xs.filter(f)
        var res = []
        for (var i = 0; i < xs.length; i++) {
          if (f(xs[i], i, xs)) res.push(xs[i])
        }
        return res
      }

// String.prototype.substr - negative index don't work in IE8
      var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
      if (start < 0) start = str.length + start
      return str.substr(start, len)
    }
    /* WEBPACK VAR INJECTION */ }.call(exports, __webpack_require__(9)))
  /***/ },
/* 11 */
  /***/ function (module, exports, __webpack_require__) {
    'use strict'

    var _createClass = (function () { function defineProperties (target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor) } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor } }())

    var _preact = __webpack_require__(0)

    var _Browser = __webpack_require__(12)

    var _Browser2 = _interopRequireDefault(_Browser)

    var _DetailsPanel = __webpack_require__(14)

    var _DetailsPanel2 = _interopRequireDefault(_DetailsPanel)

    var _data = __webpack_require__(4)

    var _data2 = _interopRequireDefault(_data)

    var _semverCompare = __webpack_require__(5)

    var _semverCompare2 = _interopRequireDefault(_semverCompare)

    var _StyleSheet = __webpack_require__(16)

    var _StyleSheet2 = _interopRequireDefault(_StyleSheet)

    function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { default: obj } }

    function _classCallCheck (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function') } }

    function _possibleConstructorReturn (self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called") } return call && (typeof call === 'object' || typeof call === 'function') ? call : self }

    function _inherits (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass) } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass }

    var Panel = (function (_Component) {
      _inherits(Panel, _Component)

      function Panel () {
        _classCallCheck(this, Panel)

        var _this = _possibleConstructorReturn(this, (Panel.__proto__ || Object.getPrototypeOf(Panel)).call(this))

        _this.state = {
          browserVersions: 10,
          expandedItem: null,
          isLoading: false,
          stylesheets: null
        }

        _this.state.browsers = _this._buildBrowserList(_this.state.browserVersions)
        return _this
      }

      _createClass(Panel, [{
        key: '_buildBrowserList',
        value: function _buildBrowserList (maxVersions) {
          return Object.keys(_data2.default.browsers).reduce(function (browsers, browser) {
            browsers[browser] = Object.keys(_data2.default.browsers[browser].releases).sort(_semverCompare2.default).slice(-maxVersions).reverse()

            return browsers
          }, {})
        }
      }, {
        key: '_expandItem',
        value: function _expandItem (issues, browser, version) {
          this.setState({
            expandedItem: {
              issues: issues,
              browser: browser,
              version: version
            }
          })
        }
      }, {
        key: '_fetchStylesheets',
        value: function _fetchStylesheets () {
          var _this2 = this

          var getSyleSheetNodesFn = '(' + this._getCSSNodes.toString() + ')()'

          this.setState({
            isLoading: true,
            stylesheets: []
          })

          return browser.devtools.inspectedWindow.eval(getSyleSheetNodesFn).then(function (response) {
            var stylesheetUrls = response[0]
            var queue = stylesheetUrls.map(function (url) {
              return fetch(url).then(function (response) {
              return response.text()
            }).then(function (response) {
            return {
              url: url,
              content: response
            }
          })
            })

            return Promise.all(queue)
          }).then(function (items) {
            var stylesheets = new _StyleSheet2.default(_this2.state.browsers)

            items.forEach(function (item) {
            stylesheets.add(item.content, item.url)
          })

            var processedStylesheets = stylesheets.parse()

            _this2.setState({
            isLoading: false,
            stylesheets: processedStylesheets
          })

            return items
          })
        }
      }, {
        key: '_getCSSNodes',
        value: function _getCSSNodes () {
          return Array.from(document.getElementsByTagName('link')).filter(function (node) {
            return node.getAttribute('rel') === 'stylesheet'
          }).map(function (node) {
          return node.getAttribute('href').indexOf('/') === 0 ? window.location.origin + node.getAttribute('href') : node.getAttribute('href')
        })
        }
      }, {
        key: '_setMaxBrowserVersions',
        value: function _setMaxBrowserVersions (versions) {
          this.setState({
          browsers: this._buildBrowserList(versions),
          browserVersions: versions
        })
        }
      }, {
        key: 'componentDidMount',
        value: function componentDidMount () {
        this._fetchStylesheets()
      }
      }, {
      key: 'render',
      value: function render () {
      var _state = this.state,
        browsers = _state.browsers,
        browserVersions = _state.browserVersions,
        expandedItem = _state.expandedItem,
        isLoading = _state.isLoading,
        stylesheets = _state.stylesheets

      if (isLoading) {
        return (0, _preact.h)(
          'div',
          null,
          'Loading...'
        )
      }

      if (stylesheets === null) {
        return null
      }

      return (0, _preact.h)(
        'div',
        { 'class': 'panel' },
        (0, _preact.h)(
          'div',
          { 'class': 'browsers' },
          (0, _preact.h)(_Browser2.default, {
            browsers: browsers,
            handle: 'chrome',
            name: 'Chrome',
            onExpand: this._expandItem.bind(this),
            stylesheets: stylesheets
          }),
          (0, _preact.h)(_Browser2.default, {
            browsers: browsers,
            handle: 'opera',
            name: 'Opera',
            onExpand: this._expandItem.bind(this),
            stylesheets: stylesheets
          }),
          (0, _preact.h)(_Browser2.default, {
            browsers: browsers,
            handle: 'firefox',
            name: 'Firefox',
            onExpand: this._expandItem.bind(this),
            stylesheets: stylesheets
          }),
          (0, _preact.h)(_Browser2.default, {
            browsers: browsers,
            handle: 'ie',
            name: 'IE',
            onExpand: this._expandItem.bind(this),
            stylesheets: stylesheets
          }),
          (0, _preact.h)(_Browser2.default, {
            browsers: browsers,
            handle: 'edge',
            name: 'Edge',
            onExpand: this._expandItem.bind(this),
            stylesheets: stylesheets
          })
        ),
        (0, _preact.h)(_DetailsPanel2.default, {
          browserVersions: browserVersions,
          data: expandedItem,
          issuesMap: stylesheets.issuesMap,
          onSetBrowserVersions: this._setMaxBrowserVersions.bind(this)
        })
      )
    }
    }])

      return Panel
    }(_preact.Component));

    (0, _preact.render)((0, _preact.h)(Panel, null), document.getElementById('app'))
  /***/ },
/* 12 */
  /***/ function (module, exports, __webpack_require__) {
    'use strict'

    Object.defineProperty(exports, '__esModule', {
      value: true
    })

    var _createClass = (function () { function defineProperties (target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor) } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor } }())

    var _preact = __webpack_require__(0)

    var _BrowserVersion = __webpack_require__(13)

    var _BrowserVersion2 = _interopRequireDefault(_BrowserVersion)

    function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { default: obj } }

    function _classCallCheck (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function') } }

    function _possibleConstructorReturn (self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called") } return call && (typeof call === 'object' || typeof call === 'function') ? call : self }

    function _inherits (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass) } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass }

    var Browser = (function (_Component) {
      _inherits(Browser, _Component)

      function Browser () {
        _classCallCheck(this, Browser)

        return _possibleConstructorReturn(this, (Browser.__proto__ || Object.getPrototypeOf(Browser)).apply(this, arguments))
      }

      _createClass(Browser, [{
        key: 'render',
        value: function render () {
          var _props = this.props,
            browsers = _props.browsers,
            handle = _props.handle,
            name = _props.name,
            onExpand = _props.onExpand,
            stylesheets = _props.stylesheets

          return (0, _preact.h)(
        'div',
        { 'class': 'browser' },
        (0, _preact.h)(
          'div',
          { 'class': 'browser__header' },
          (0, _preact.h)(
            'p',
            { 'class': 'browser__name' },
            name
          )
        ),
        (0, _preact.h)(
          'ol',
          { 'class': 'browser__versions' },
          browsers[handle].map(function (version) {
            return (0, _preact.h)(_BrowserVersion2.default, {
              issues: stylesheets.issues[handle] && stylesheets.issues[handle][version],
              name: name,
              onExpand: onExpand,
              version: version
            })
          })
        )
      )
        }
      }])

      return Browser
    }(_preact.Component))

    exports.default = Browser
  /***/ },
/* 13 */
  /***/ function (module, exports, __webpack_require__) {
    'use strict'

    Object.defineProperty(exports, '__esModule', {
      value: true
    })

    var _createClass = (function () { function defineProperties (target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor) } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor } }())

    var _preact = __webpack_require__(0)

    function _classCallCheck (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function') } }

    function _possibleConstructorReturn (self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called") } return call && (typeof call === 'object' || typeof call === 'function') ? call : self }

    function _inherits (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass) } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass }

    var BrowserVersion = (function (_Component) {
      _inherits(BrowserVersion, _Component)

      function BrowserVersion () {
        _classCallCheck(this, BrowserVersion)

        return _possibleConstructorReturn(this, (BrowserVersion.__proto__ || Object.getPrototypeOf(BrowserVersion)).apply(this, arguments))
      }

      _createClass(BrowserVersion, [{
        key: 'render',
        value: function render () {
          var _props = this.props,
            issues = _props.issues,
            name = _props.name,
            onExpand = _props.onExpand,
            version = _props.version

          var severity = 1

          if (issues && issues.length > 0) {
            severity = 2

            if (issues.length > 5) {
              severity = 3
            }
          }

          return (0, _preact.h)(
        'li',
        { 'class': 'browser-version severity--' + severity },
        (0, _preact.h)(
          'button',
          {
            'class': 'browser-version__button',
            onClick: function onClick (event) {
              return onExpand(issues, name, version)
            }
          },
          version
        )
      )
        }
      }])

      return BrowserVersion
    }(_preact.Component))

    exports.default = BrowserVersion
  /***/ },
/* 14 */
  /***/ function (module, exports, __webpack_require__) {
    'use strict'

    Object.defineProperty(exports, '__esModule', {
      value: true
    })

    var _createClass = (function () { function defineProperties (target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor) } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor } }())

    var _preact = __webpack_require__(0)

    var _BrowserVersionsPicker = __webpack_require__(34)

    var _BrowserVersionsPicker2 = _interopRequireDefault(_BrowserVersionsPicker)

    var _IssuesTable = __webpack_require__(15)

    var _IssuesTable2 = _interopRequireDefault(_IssuesTable)

    function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { default: obj } }

    function _classCallCheck (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function') } }

    function _possibleConstructorReturn (self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called") } return call && (typeof call === 'object' || typeof call === 'function') ? call : self }

    function _inherits (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass) } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass }

    var DetailsPanel = (function (_Component) {
      _inherits(DetailsPanel, _Component)

      function DetailsPanel () {
        _classCallCheck(this, DetailsPanel)

        return _possibleConstructorReturn(this, (DetailsPanel.__proto__ || Object.getPrototypeOf(DetailsPanel)).apply(this, arguments))
      }

      _createClass(DetailsPanel, [{
        key: '_renderIssuesTable',
        value: function _renderIssuesTable () {
          var _props = this.props,
            data = _props.data,
            issuesMap = _props.issuesMap

          if (data) {
            if (data.issues) {
              return (0, _preact.h)(
            'div',
            null,
            (0, _preact.h)(
              'p',
              { 'class': 'details-panel__header' },
              (0, _preact.h)(
                'strong',
                null,
                data.browser,
                ' ',
                data.version
              ),
              ' (',
              data.issues.length,
              ' issues)'
            ),
            (0, _preact.h)(_IssuesTable2.default, {
              browser: data.browser,
              data: data.issues,
              issuesMap: issuesMap,
              version: data.version
            })
          )
            } else {
              return (0, _preact.h)(
            'div',
            null,
            (0, _preact.h)(
              'p',
              { 'class': 'details-panel__header' },
              (0, _preact.h)(
                'strong',
                null,
                data.browser,
                ' ',
                data.version
              )
            ),
            (0, _preact.h)(
              'p',
              { 'class': 'details-panel__info' },
              'No compatibility issues found'
            )
          )
            }
          } else {
            return (0, _preact.h)(
          'div',
          null,
          (0, _preact.h)(
            'p',
            { 'class': 'details-panel__info' },
            'Click on a version to see a list of compatibility issues'
          )
        )
          }
        }
      }, {
        key: 'render',
        value: function render () {
          var _props2 = this.props,
            browserVersions = _props2.browserVersions,
            data = _props2.data,
            issuesMap = _props2.issuesMap,
            onSetBrowserVersions = _props2.onSetBrowserVersions

          return (0, _preact.h)(
        'div',
        { 'class': 'details-panel' },
        this._renderIssuesTable(),
        (0, _preact.h)(_BrowserVersionsPicker2.default, {
          browserVersions: browserVersions,
          onSetBrowserVersions: onSetBrowserVersions
        })
      )
        }
      }])

      return DetailsPanel
    }(_preact.Component))

    exports.default = DetailsPanel
  /***/ },
/* 15 */
  /***/ function (module, exports, __webpack_require__) {
    'use strict'

    Object.defineProperty(exports, '__esModule', {
      value: true
    })

    var _createClass = (function () { function defineProperties (target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor) } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor } }())

    var _preact = __webpack_require__(0)

    function _classCallCheck (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function') } }

    function _possibleConstructorReturn (self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called") } return call && (typeof call === 'object' || typeof call === 'function') ? call : self }

    function _inherits (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass) } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass }

    var IssuesTable = (function (_Component) {
      _inherits(IssuesTable, _Component)

      function IssuesTable () {
        _classCallCheck(this, IssuesTable)

        return _possibleConstructorReturn(this, (IssuesTable.__proto__ || Object.getPrototypeOf(IssuesTable)).apply(this, arguments))
      }

      _createClass(IssuesTable, [{
        key: '_openLink',
        value: function _openLink (issue) {
          console.log('--> b:', browser.tabs)
          console.log('--> c:', chrome)
      // var creating = chrome.tabs.create({
      //   url:"https://example.org"
      // })
        }
      }, {
        key: '_renderIssue',
        value: function _renderIssue (key) {
          var issuesMap = this.props.issuesMap

          if (key.indexOf('css/p/') === 0) {
            return key.slice(6)
          }
        }
      }, {
        key: 'render',
        value: function render () {
          var _this2 = this

          var _props = this.props,
            browser = _props.browser,
            data = _props.data,
            issuesMap = _props.issuesMap,
            version = _props.version

          var issues = data.sort(function (a, b) {
            var diff = issuesMap[b].occurrences.length - issuesMap[a].occurrences.length

            return Math.max(-1, Math.min(1, diff))
          })

          return (0, _preact.h)(
        'div',
        { 'class': 'issues-table' },
        (0, _preact.h)(
          'table',
          { 'class': 'issues-table__table' },
          (0, _preact.h)(
            'tbody',
            null,
            issues.map(function (issue) {
              return (0, _preact.h)(
                'tr',
                null,
                (0, _preact.h)(
                  'td',
                  { 'class': 'issues-table__key' },
                  (0, _preact.h)(
                    'button',
                    {
                      onClick: _this2._openLink.bind(_this2, issue)
                    },
                    _this2._renderIssue(issue)
                  )
                ),
                (0, _preact.h)(
                  'td',
                  { 'class': 'issues-table__value' },
                  '\xD7',
                  issuesMap[issue].occurrences.length
                )
              )
            })
          )
        )
      )
        }
      }])

      return IssuesTable
    }(_preact.Component))

    exports.default = IssuesTable
  /***/ },
/* 16 */
  /***/ function (module, __webpack_exports__, __webpack_require__) {
    'use strict'
    Object.defineProperty(__webpack_exports__, '__esModule', { value: true })
    const compatData = __webpack_require__(4)
// const parseCss = require('./../node_modules/css/lib/parse')
    const parseCss = __webpack_require__(17).parse
    const semverCompare = __webpack_require__(5)

    class StyleSheet {
      constructor (browserList) {
        this.browserList = browserList
        this.cssMatches = {}
        this.issues = {}
        this.inputs = []
      }

      add (source, reference) {
        this.inputs.push({
          source,
          reference
        })
      }

      parse () {
        this.inputs.forEach(input => {
          try {
            const parsedCss = parseCss(input.source, {inputSourcemaps: false})

            this.process(
          parsedCss.stylesheet,
          input.reference
        )
          } catch (err) {
            console.log('Error whilst parsing CSS:', err)
          }
        })

        return {
          issues: this.issues,
          issuesMap: this.cssMatches
        }
      }

      process (stylesheet, reference) {
        stylesheet.rules.forEach(this.processRule.bind(this, reference))

        Object.keys(this.cssMatches).forEach(key => {
          const matchData = this.cssMatches[key].data

          Object.keys(matchData.support).forEach(browser => {
            if (!this.browserList[browser]) return

            this.issues[browser] = this.issues[browser] || {}

            const versionIndex = this.browserList[browser]
          .findIndex(key => key === matchData.support[browser].version_added)

            if (versionIndex >= 0) {
              for (let i = versionIndex + 1; i < this.browserList[browser].length; i++) {
                const versionForIndex = this.browserList[browser][i]

                this.issues[browser][versionForIndex] = this.issues[browser][versionForIndex] || []

                if (!this.issues[browser][versionForIndex].includes(key)) {
                  this.issues[browser][versionForIndex].push(key)
                }
              }
            }
          })
        })
      }

      processDeclaration (reference, declaration) {
        const property = declaration.property && compatData.css.properties[declaration.property]

        if (!property) return

        const hashKey = `css/p/${declaration.property}`

        this.cssMatches[hashKey] = this.cssMatches[hashKey] || {
          data: property.__compat,
          occurrences: []
        }
        this.cssMatches[hashKey].occurrences.push({
          stylesheet: reference,
          position: declaration.position
        })
      }

      processRule (reference, rule) {
        if (rule.type !== 'rule') return

    // Processing declarations
        rule.declarations.forEach(this.processDeclaration.bind(this, reference))
      }
}

    /* harmony default export */ __webpack_exports__['default'] = (StyleSheet)
  /***/ },
/* 17 */
  /***/ function (module, exports, __webpack_require__) {
    exports.parse = __webpack_require__(18)
    exports.stringify = __webpack_require__(19)
  /***/ },
/* 18 */
  /***/ function (module, exports) {
// http://www.w3.org/TR/CSS21/grammar.html
// https://github.com/visionmedia/css-parse/pull/49#issuecomment-30088027
    var commentre = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g

    module.exports = function (css, options) {
      options = options || {}

  /**
   * Positional.
   */

      var lineno = 1
      var column = 1

  /**
   * Update lineno and column based on `str`.
   */

      function updatePosition (str) {
        var lines = str.match(/\n/g)
        if (lines) lineno += lines.length
        var i = str.lastIndexOf('\n')
        column = ~i ? str.length - i : column + str.length
      }

  /**
   * Mark position and patch `node.position`.
   */

      function position () {
        var start = { line: lineno, column: column }
        return function (node) {
          node.position = new Position(start)
          whitespace()
          return node
        }
      }

  /**
   * Store position information for a node
   */

      function Position (start) {
        this.start = start
        this.end = { line: lineno, column: column }
        this.source = options.source
      }

  /**
   * Non-enumerable source string
   */

      Position.prototype.content = css

  /**
   * Error `msg`.
   */

      var errorsList = []

      function error (msg) {
        var err = new Error(options.source + ':' + lineno + ':' + column + ': ' + msg)
        err.reason = msg
        err.filename = options.source
        err.line = lineno
        err.column = column
        err.source = css

        if (options.silent) {
          errorsList.push(err)
        } else {
          throw err
        }
      }

  /**
   * Parse stylesheet.
   */

      function stylesheet () {
        var rulesList = rules()

        return {
          type: 'stylesheet',
          stylesheet: {
            rules: rulesList,
            parsingErrors: errorsList
          }
        }
      }

  /**
   * Opening brace.
   */

      function open () {
        return match(/^{\s*/)
      }

  /**
   * Closing brace.
   */

      function close () {
        return match(/^}/)
      }

  /**
   * Parse ruleset.
   */

      function rules () {
        var node
        var rules = []
        whitespace()
        comments(rules)
        while (css.length && css.charAt(0) != '}' && (node = atrule() || rule())) {
          if (node !== false) {
            rules.push(node)
            comments(rules)
          }
        }
        return rules
      }

  /**
   * Match `re` and return captures.
   */

      function match (re) {
        var m = re.exec(css)
        if (!m) return
        var str = m[0]
        updatePosition(str)
        css = css.slice(str.length)
        return m
      }

  /**
   * Parse whitespace.
   */

      function whitespace () {
        match(/^\s*/)
      }

  /**
   * Parse comments;
   */

      function comments (rules) {
        var c
        rules = rules || []
        while (c = comment()) {
          if (c !== false) {
            rules.push(c)
          }
        }
        return rules
      }

  /**
   * Parse comment.
   */

      function comment () {
        var pos = position()
        if (css.charAt(0) != '/' || css.charAt(1) != '*') return

        var i = 2
        while (css.charAt(i) != '' && (css.charAt(i) != '*' || css.charAt(i + 1) != '/')) ++i
        i += 2

        if (css.charAt(i - 1) === '') {
          return error('End of comment missing')
        }

        var str = css.slice(2, i - 2)
        column += 2
        updatePosition(str)
        css = css.slice(i)
        column += 2

        return pos({
          type: 'comment',
          comment: str
        })
      }

  /**
   * Parse selector.
   */

      function selector () {
        var m = match(/^([^{]+)/)
        if (!m) return
    /* @fix Remove all comments from selectors
     * http://ostermiller.org/findcomment.html */
        return trim(m[0])
      .replace(/\/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*\/+/g, '')
      .replace(/"(?:\\"|[^"])*"|'(?:\\'|[^'])*'/g, function (m) {
        return m.replace(/,/g, '\u200C')
      })
      .split(/\s*(?![^(]*\)),\s*/)
      .map(function (s) {
        return s.replace(/\u200C/g, ',')
      })
      }

  /**
   * Parse declaration.
   */

      function declaration () {
        var pos = position()

    // prop
        var prop = match(/^(\*?[-#\/\*\\\w]+(\[[0-9a-z_-]+\])?)\s*/)
        if (!prop) return
        prop = trim(prop[0])

    // :
        if (!match(/^:\s*/)) return error("property missing ':'")

    // val
        var val = match(/^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^\)]*?\)|[^};])+)/)

        var ret = pos({
          type: 'declaration',
          property: prop.replace(commentre, ''),
          value: val ? trim(val[0]).replace(commentre, '') : ''
        })

    // ;
        match(/^[;\s]*/)

        return ret
      }

  /**
   * Parse declarations.
   */

      function declarations () {
        var decls = []

        if (!open()) return error("missing '{'")
        comments(decls)

    // declarations
        var decl
        while (decl = declaration()) {
          if (decl !== false) {
            decls.push(decl)
            comments(decls)
          }
        }

        if (!close()) return error("missing '}'")
        return decls
      }

  /**
   * Parse keyframe.
   */

      function keyframe () {
        var m
        var vals = []
        var pos = position()

        while (m = match(/^((\d+\.\d+|\.\d+|\d+)%?|[a-z]+)\s*/)) {
          vals.push(m[1])
          match(/^,\s*/)
        }

        if (!vals.length) return

        return pos({
          type: 'keyframe',
          values: vals,
          declarations: declarations()
        })
      }

  /**
   * Parse keyframes.
   */

      function atkeyframes () {
        var pos = position()
        var m = match(/^@([-\w]+)?keyframes\s*/)

        if (!m) return
        var vendor = m[1]

    // identifier
        var m = match(/^([-\w]+)\s*/)
        if (!m) return error('@keyframes missing name')
        var name = m[1]

        if (!open()) return error("@keyframes missing '{'")

        var frame
        var frames = comments()
        while (frame = keyframe()) {
          frames.push(frame)
          frames = frames.concat(comments())
        }

        if (!close()) return error("@keyframes missing '}'")

        return pos({
          type: 'keyframes',
          name: name,
          vendor: vendor,
          keyframes: frames
        })
      }

  /**
   * Parse supports.
   */

      function atsupports () {
        var pos = position()
        var m = match(/^@supports *([^{]+)/)

        if (!m) return
        var supports = trim(m[1])

        if (!open()) return error("@supports missing '{'")

        var style = comments().concat(rules())

        if (!close()) return error("@supports missing '}'")

        return pos({
          type: 'supports',
          supports: supports,
          rules: style
        })
      }

  /**
   * Parse host.
   */

      function athost () {
        var pos = position()
        var m = match(/^@host\s*/)

        if (!m) return

        if (!open()) return error("@host missing '{'")

        var style = comments().concat(rules())

        if (!close()) return error("@host missing '}'")

        return pos({
          type: 'host',
          rules: style
        })
      }

  /**
   * Parse media.
   */

      function atmedia () {
        var pos = position()
        var m = match(/^@media *([^{]+)/)

        if (!m) return
        var media = trim(m[1])

        if (!open()) return error("@media missing '{'")

        var style = comments().concat(rules())

        if (!close()) return error("@media missing '}'")

        return pos({
          type: 'media',
          media: media,
          rules: style
        })
      }

  /**
   * Parse custom-media.
   */

      function atcustommedia () {
        var pos = position()
        var m = match(/^@custom-media\s+(--[^\s]+)\s*([^{;]+);/)
        if (!m) return

        return pos({
          type: 'custom-media',
          name: trim(m[1]),
          media: trim(m[2])
        })
      }

  /**
   * Parse paged media.
   */

      function atpage () {
        var pos = position()
        var m = match(/^@page */)
        if (!m) return

        var sel = selector() || []

        if (!open()) return error("@page missing '{'")
        var decls = comments()

    // declarations
        var decl
        while (decl = declaration()) {
          decls.push(decl)
          decls = decls.concat(comments())
        }

        if (!close()) return error("@page missing '}'")

        return pos({
          type: 'page',
          selectors: sel,
          declarations: decls
        })
      }

  /**
   * Parse document.
   */

      function atdocument () {
        var pos = position()
        var m = match(/^@([-\w]+)?document *([^{]+)/)
        if (!m) return

        var vendor = trim(m[1])
        var doc = trim(m[2])

        if (!open()) return error("@document missing '{'")

        var style = comments().concat(rules())

        if (!close()) return error("@document missing '}'")

        return pos({
          type: 'document',
          document: doc,
          vendor: vendor,
          rules: style
        })
      }

  /**
   * Parse font-face.
   */

      function atfontface () {
        var pos = position()
        var m = match(/^@font-face\s*/)
        if (!m) return

        if (!open()) return error("@font-face missing '{'")
        var decls = comments()

    // declarations
        var decl
        while (decl = declaration()) {
          decls.push(decl)
          decls = decls.concat(comments())
        }

        if (!close()) return error("@font-face missing '}'")

        return pos({
          type: 'font-face',
          declarations: decls
        })
      }

  /**
   * Parse import
   */

      var atimport = _compileAtrule('import')

  /**
   * Parse charset
   */

      var atcharset = _compileAtrule('charset')

  /**
   * Parse namespace
   */

      var atnamespace = _compileAtrule('namespace')

  /**
   * Parse non-block at-rules
   */

      function _compileAtrule (name) {
        var re = new RegExp('^@' + name + '\\s*([^;]+);')
        return function () {
          var pos = position()
          var m = match(re)
          if (!m) return
          var ret = { type: name }
          ret[name] = m[1].trim()
          return pos(ret)
        }
      }

  /**
   * Parse at rule.
   */

      function atrule () {
        if (css[0] != '@') return

        return atkeyframes() ||
      atmedia() ||
      atcustommedia() ||
      atsupports() ||
      atimport() ||
      atcharset() ||
      atnamespace() ||
      atdocument() ||
      atpage() ||
      athost() ||
      atfontface()
      }

  /**
   * Parse rule.
   */

      function rule () {
        var pos = position()
        var sel = selector()

        if (!sel) return error('selector missing')
        comments()

        return pos({
          type: 'rule',
          selectors: sel,
          declarations: declarations()
        })
      }

      return addParent(stylesheet())
    }

/**
 * Trim `str`.
 */

    function trim (str) {
      return str ? str.replace(/^\s+|\s+$/g, '') : ''
    }

/**
 * Adds non-enumerable parent node reference to each node.
 */

    function addParent (obj, parent) {
      var isNode = obj && typeof obj.type === 'string'
      var childParent = isNode ? obj : parent

      for (var k in obj) {
        var value = obj[k]
        if (Array.isArray(value)) {
          value.forEach(function (v) { addParent(v, childParent) })
        } else if (value && typeof value === 'object') {
          addParent(value, childParent)
        }
      }

      if (isNode) {
        Object.defineProperty(obj, 'parent', {
          configurable: true,
          writable: true,
          enumerable: false,
          value: parent || null
        })
      }

      return obj
    }
  /***/ },
/* 19 */
  /***/ function (module, exports, __webpack_require__) {
/**
 * Module dependencies.
 */

    var Compressed = __webpack_require__(20)
    var Identity = __webpack_require__(21)

/**
 * Stringfy the given AST `node`.
 *
 * Options:
 *
 *  - `compress` space-optimized output
 *  - `sourcemap` return an object with `.code` and `.map`
 *
 * @param {Object} node
 * @param {Object} [options]
 * @return {String}
 * @api public
 */

    module.exports = function (node, options) {
      options = options || {}

      var compiler = options.compress
    ? new Compressed(options)
    : new Identity(options)

  // source maps
      if (options.sourcemap) {
        var sourcemaps = __webpack_require__(22)
        sourcemaps(compiler)

        var code = compiler.compile(node)
        compiler.applySourceMaps()

        var map = options.sourcemap === 'generator'
      ? compiler.map
      : compiler.map.toJSON()

        return { code: code, map: map }
      }

      var code = compiler.compile(node)
      return code
    }
  /***/ },
/* 20 */
  /***/ function (module, exports, __webpack_require__) {
/**
 * Module dependencies.
 */

    var Base = __webpack_require__(6)
    var inherits = __webpack_require__(7)

/**
 * Expose compiler.
 */

    module.exports = Compiler

/**
 * Initialize a new `Compiler`.
 */

    function Compiler (options) {
      Base.call(this, options)
    }

/**
 * Inherit from `Base.prototype`.
 */

    inherits(Compiler, Base)

/**
 * Compile `node`.
 */

    Compiler.prototype.compile = function (node) {
      return node.stylesheet
    .rules.map(this.visit, this)
    .join('')
    }

/**
 * Visit comment node.
 */

    Compiler.prototype.comment = function (node) {
      return this.emit('', node.position)
    }

/**
 * Visit import node.
 */

    Compiler.prototype.import = function (node) {
      return this.emit('@import ' + node.import + ';', node.position)
    }

/**
 * Visit media node.
 */

    Compiler.prototype.media = function (node) {
      return this.emit('@media ' + node.media, node.position) +
    this.emit('{') +
    this.mapVisit(node.rules) +
    this.emit('}')
    }

/**
 * Visit document node.
 */

    Compiler.prototype.document = function (node) {
      var doc = '@' + (node.vendor || '') + 'document ' + node.document

      return this.emit(doc, node.position) +
    this.emit('{') +
    this.mapVisit(node.rules) +
    this.emit('}')
    }

/**
 * Visit charset node.
 */

    Compiler.prototype.charset = function (node) {
      return this.emit('@charset ' + node.charset + ';', node.position)
    }

/**
 * Visit namespace node.
 */

    Compiler.prototype.namespace = function (node) {
      return this.emit('@namespace ' + node.namespace + ';', node.position)
    }

/**
 * Visit supports node.
 */

    Compiler.prototype.supports = function (node) {
      return this.emit('@supports ' + node.supports, node.position) +
    this.emit('{') +
    this.mapVisit(node.rules) +
    this.emit('}')
    }

/**
 * Visit keyframes node.
 */

    Compiler.prototype.keyframes = function (node) {
      return this.emit('@' +
    (node.vendor || '') +
    'keyframes ' +
    node.name, node.position) +
    this.emit('{') +
    this.mapVisit(node.keyframes) +
    this.emit('}')
    }

/**
 * Visit keyframe node.
 */

    Compiler.prototype.keyframe = function (node) {
      var decls = node.declarations

      return this.emit(node.values.join(','), node.position) +
    this.emit('{') +
    this.mapVisit(decls) +
    this.emit('}')
    }

/**
 * Visit page node.
 */

    Compiler.prototype.page = function (node) {
      var sel = node.selectors.length
    ? node.selectors.join(', ')
    : ''

      return this.emit('@page ' + sel, node.position) +
    this.emit('{') +
    this.mapVisit(node.declarations) +
    this.emit('}')
    }

/**
 * Visit font-face node.
 */

    Compiler.prototype['font-face'] = function (node) {
      return this.emit('@font-face', node.position) +
    this.emit('{') +
    this.mapVisit(node.declarations) +
    this.emit('}')
    }

/**
 * Visit host node.
 */

    Compiler.prototype.host = function (node) {
      return this.emit('@host', node.position) +
    this.emit('{') +
    this.mapVisit(node.rules) +
    this.emit('}')
    }

/**
 * Visit custom-media node.
 */

    Compiler.prototype['custom-media'] = function (node) {
      return this.emit('@custom-media ' + node.name + ' ' + node.media + ';', node.position)
    }

/**
 * Visit rule node.
 */

    Compiler.prototype.rule = function (node) {
      var decls = node.declarations
      if (!decls.length) return ''

      return this.emit(node.selectors.join(','), node.position) +
    this.emit('{') +
    this.mapVisit(decls) +
    this.emit('}')
    }

/**
 * Visit declaration node.
 */

    Compiler.prototype.declaration = function (node) {
      return this.emit(node.property + ':' + node.value, node.position) + this.emit(';')
    }
  /***/ },
/* 21 */
  /***/ function (module, exports, __webpack_require__) {
/**
 * Module dependencies.
 */

    var Base = __webpack_require__(6)
    var inherits = __webpack_require__(7)

/**
 * Expose compiler.
 */

    module.exports = Compiler

/**
 * Initialize a new `Compiler`.
 */

    function Compiler (options) {
      options = options || {}
      Base.call(this, options)
      this.indentation = options.indent
    }

/**
 * Inherit from `Base.prototype`.
 */

    inherits(Compiler, Base)

/**
 * Compile `node`.
 */

    Compiler.prototype.compile = function (node) {
      return this.stylesheet(node)
    }

/**
 * Visit stylesheet node.
 */

    Compiler.prototype.stylesheet = function (node) {
      return this.mapVisit(node.stylesheet.rules, '\n\n')
    }

/**
 * Visit comment node.
 */

    Compiler.prototype.comment = function (node) {
      return this.emit(this.indent() + '/*' + node.comment + '*/', node.position)
    }

/**
 * Visit import node.
 */

    Compiler.prototype.import = function (node) {
      return this.emit('@import ' + node.import + ';', node.position)
    }

/**
 * Visit media node.
 */

    Compiler.prototype.media = function (node) {
      return this.emit('@media ' + node.media, node.position) +
    this.emit(
        ' {\n' +
        this.indent(1)) +
    this.mapVisit(node.rules, '\n\n') +
    this.emit(
        this.indent(-1) +
        '\n}')
    }

/**
 * Visit document node.
 */

    Compiler.prototype.document = function (node) {
      var doc = '@' + (node.vendor || '') + 'document ' + node.document

      return this.emit(doc, node.position) +
    this.emit(
        ' ' +
      ' {\n' +
      this.indent(1)) +
    this.mapVisit(node.rules, '\n\n') +
    this.emit(
        this.indent(-1) +
        '\n}')
    }

/**
 * Visit charset node.
 */

    Compiler.prototype.charset = function (node) {
      return this.emit('@charset ' + node.charset + ';', node.position)
    }

/**
 * Visit namespace node.
 */

    Compiler.prototype.namespace = function (node) {
      return this.emit('@namespace ' + node.namespace + ';', node.position)
    }

/**
 * Visit supports node.
 */

    Compiler.prototype.supports = function (node) {
      return this.emit('@supports ' + node.supports, node.position) +
    this.emit(
      ' {\n' +
      this.indent(1)) +
    this.mapVisit(node.rules, '\n\n') +
    this.emit(
        this.indent(-1) +
        '\n}')
    }

/**
 * Visit keyframes node.
 */

    Compiler.prototype.keyframes = function (node) {
      return this.emit('@' + (node.vendor || '') + 'keyframes ' + node.name, node.position) +
    this.emit(
      ' {\n' +
      this.indent(1)) +
    this.mapVisit(node.keyframes, '\n') +
    this.emit(
        this.indent(-1) +
        '}')
    }

/**
 * Visit keyframe node.
 */

    Compiler.prototype.keyframe = function (node) {
      var decls = node.declarations

      return this.emit(this.indent()) +
    this.emit(node.values.join(', '), node.position) +
    this.emit(
      ' {\n' +
      this.indent(1)) +
    this.mapVisit(decls, '\n') +
    this.emit(
      this.indent(-1) +
      '\n' +
      this.indent() + '}\n')
    }

/**
 * Visit page node.
 */

    Compiler.prototype.page = function (node) {
      var sel = node.selectors.length
    ? node.selectors.join(', ') + ' '
    : ''

      return this.emit('@page ' + sel, node.position) +
    this.emit('{\n') +
    this.emit(this.indent(1)) +
    this.mapVisit(node.declarations, '\n') +
    this.emit(this.indent(-1)) +
    this.emit('\n}')
    }

/**
 * Visit font-face node.
 */

    Compiler.prototype['font-face'] = function (node) {
      return this.emit('@font-face ', node.position) +
    this.emit('{\n') +
    this.emit(this.indent(1)) +
    this.mapVisit(node.declarations, '\n') +
    this.emit(this.indent(-1)) +
    this.emit('\n}')
    }

/**
 * Visit host node.
 */

    Compiler.prototype.host = function (node) {
      return this.emit('@host', node.position) +
    this.emit(
        ' {\n' +
        this.indent(1)) +
    this.mapVisit(node.rules, '\n\n') +
    this.emit(
        this.indent(-1) +
        '\n}')
    }

/**
 * Visit custom-media node.
 */

    Compiler.prototype['custom-media'] = function (node) {
      return this.emit('@custom-media ' + node.name + ' ' + node.media + ';', node.position)
    }

/**
 * Visit rule node.
 */

    Compiler.prototype.rule = function (node) {
      var indent = this.indent()
      var decls = node.declarations
      if (!decls.length) return ''

      return this.emit(node.selectors.map(function (s) { return indent + s }).join(',\n'), node.position) +
    this.emit(' {\n') +
    this.emit(this.indent(1)) +
    this.mapVisit(decls, '\n') +
    this.emit(this.indent(-1)) +
    this.emit('\n' + this.indent() + '}')
    }

/**
 * Visit declaration node.
 */

    Compiler.prototype.declaration = function (node) {
      return this.emit(this.indent()) +
    this.emit(node.property + ': ' + node.value, node.position) +
    this.emit(';')
    }

/**
 * Increase, decrease or return current indentation.
 */

    Compiler.prototype.indent = function (level) {
      this.level = this.level || 1

      if (level != null) {
        this.level += level
        return ''
      }

      return Array(this.level).join(this.indentation || '  ')
    }
  /***/ },
/* 22 */
  /***/ function (module, exports, __webpack_require__) {
/**
 * Module dependencies.
 */

    var SourceMap = __webpack_require__(8).SourceMapGenerator
    var SourceMapConsumer = __webpack_require__(8).SourceMapConsumer
    var sourceMapResolve = __webpack_require__(26)
    var urix = __webpack_require__(32)
    var fs = __webpack_require__(33)
    var path = __webpack_require__(10)

/**
 * Expose `mixin()`.
 */

    module.exports = mixin

/**
 * Mixin source map support into `compiler`.
 *
 * @param {Compiler} compiler
 * @api public
 */

    function mixin (compiler) {
      compiler._comment = compiler.comment
      compiler.map = new SourceMap()
      compiler.position = { line: 1, column: 1 }
      compiler.files = {}
      for (var k in exports) compiler[k] = exports[k]
    }

/**
 * Update position.
 *
 * @param {String} str
 * @api private
 */

    exports.updatePosition = function (str) {
      var lines = str.match(/\n/g)
      if (lines) this.position.line += lines.length
      var i = str.lastIndexOf('\n')
      this.position.column = ~i ? str.length - i : this.position.column + str.length
    }

/**
 * Emit `str`.
 *
 * @param {String} str
 * @param {Object} [pos]
 * @return {String}
 * @api private
 */

    exports.emit = function (str, pos) {
      if (pos) {
        var sourceFile = urix(pos.source || 'source.css')

        this.map.addMapping({
          source: sourceFile,
          generated: {
            line: this.position.line,
            column: Math.max(this.position.column - 1, 0)
          },
          original: {
            line: pos.start.line,
            column: pos.start.column - 1
          }
        })

        this.addFile(sourceFile, pos)
      }

      this.updatePosition(str)

      return str
    }

/**
 * Adds a file to the source map output if it has not already been added
 * @param {String} file
 * @param {Object} pos
 */

    exports.addFile = function (file, pos) {
      if (typeof pos.content !== 'string') return
      if (Object.prototype.hasOwnProperty.call(this.files, file)) return

      this.files[file] = pos.content
    }

/**
 * Applies any original source maps to the output and embeds the source file
 * contents in the source map.
 */

    exports.applySourceMaps = function () {
      Object.keys(this.files).forEach(function (file) {
        var content = this.files[file]
        this.map.setSourceContent(file, content)

        if (this.options.inputSourcemaps !== false) {
          var originalMap = sourceMapResolve.resolveSync(
        content, file, fs.readFileSync)
          if (originalMap) {
            var map = new SourceMapConsumer(originalMap.map)
            var relativeTo = originalMap.sourcesRelativeTo
            this.map.applySourceMap(map, file, urix(path.dirname(relativeTo)))
          }
        }
      }, this)
    }

/**
 * Process comments, drops sourceMap comments.
 * @param {Object} node
 */

    exports.comment = function (node) {
      if (/^# sourceMappingURL=/.test(node.comment)) { return this.emit('', node.position) } else { return this._comment(node) }
    }
  /***/ },
/* 23 */
  /***/ function (module, exports, __webpack_require__) {
    /* WEBPACK VAR INJECTION */(function (module) { /* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */
      if (typeof define !== 'function') {
        var define = __webpack_require__(2)(module, !(function webpackMissingModule () { var e = new Error('Cannot find module "."'); e.code = 'MODULE_NOT_FOUND'; throw e }()))
      }
      define(function (require, exports, module) {
        var base64VLQ = require('./base64-vlq')
        var util = require('./util')
        var ArraySet = require('./array-set').ArraySet
        var MappingList = require('./mapping-list').MappingList

  /**
   * An instance of the SourceMapGenerator represents a source map which is
   * being built incrementally. You may pass an object with the following
   * properties:
   *
   *   - file: The filename of the generated source.
   *   - sourceRoot: A root for all relative URLs in this source map.
   */
        function SourceMapGenerator (aArgs) {
          if (!aArgs) {
            aArgs = {}
          }
          this._file = util.getArg(aArgs, 'file', null)
          this._sourceRoot = util.getArg(aArgs, 'sourceRoot', null)
          this._skipValidation = util.getArg(aArgs, 'skipValidation', false)
          this._sources = new ArraySet()
          this._names = new ArraySet()
          this._mappings = new MappingList()
          this._sourcesContents = null
        }

        SourceMapGenerator.prototype._version = 3

  /**
   * Creates a new SourceMapGenerator based on a SourceMapConsumer
   *
   * @param aSourceMapConsumer The SourceMap.
   */
        SourceMapGenerator.fromSourceMap =
    function SourceMapGenerator_fromSourceMap (aSourceMapConsumer) {
      var sourceRoot = aSourceMapConsumer.sourceRoot
      var generator = new SourceMapGenerator({
        file: aSourceMapConsumer.file,
        sourceRoot: sourceRoot
      })
      aSourceMapConsumer.eachMapping(function (mapping) {
        var newMapping = {
          generated: {
            line: mapping.generatedLine,
            column: mapping.generatedColumn
          }
        }

        if (mapping.source != null) {
          newMapping.source = mapping.source
          if (sourceRoot != null) {
            newMapping.source = util.relative(sourceRoot, newMapping.source)
          }

          newMapping.original = {
            line: mapping.originalLine,
            column: mapping.originalColumn
          }

          if (mapping.name != null) {
            newMapping.name = mapping.name
          }
        }

        generator.addMapping(newMapping)
      })
      aSourceMapConsumer.sources.forEach(function (sourceFile) {
        var content = aSourceMapConsumer.sourceContentFor(sourceFile)
        if (content != null) {
          generator.setSourceContent(sourceFile, content)
        }
      })
      return generator
    }

  /**
   * Add a single mapping from original source line and column to the generated
   * source's line and column for this source map being created. The mapping
   * object should have the following properties:
   *
   *   - generated: An object with the generated line and column positions.
   *   - original: An object with the original line and column positions.
   *   - source: The original source file (relative to the sourceRoot).
   *   - name: An optional original token name for this mapping.
   */
        SourceMapGenerator.prototype.addMapping =
    function SourceMapGenerator_addMapping (aArgs) {
      var generated = util.getArg(aArgs, 'generated')
      var original = util.getArg(aArgs, 'original', null)
      var source = util.getArg(aArgs, 'source', null)
      var name = util.getArg(aArgs, 'name', null)

      if (!this._skipValidation) {
        this._validateMapping(generated, original, source, name)
      }

      if (source != null && !this._sources.has(source)) {
        this._sources.add(source)
      }

      if (name != null && !this._names.has(name)) {
        this._names.add(name)
      }

      this._mappings.add({
        generatedLine: generated.line,
        generatedColumn: generated.column,
        originalLine: original != null && original.line,
        originalColumn: original != null && original.column,
        source: source,
        name: name
      })
    }

  /**
   * Set the source content for a source file.
   */
        SourceMapGenerator.prototype.setSourceContent =
    function SourceMapGenerator_setSourceContent (aSourceFile, aSourceContent) {
      var source = aSourceFile
      if (this._sourceRoot != null) {
        source = util.relative(this._sourceRoot, source)
      }

      if (aSourceContent != null) {
        // Add the source content to the _sourcesContents map.
        // Create a new _sourcesContents map if the property is null.
        if (!this._sourcesContents) {
          this._sourcesContents = {}
        }
        this._sourcesContents[util.toSetString(source)] = aSourceContent
      } else if (this._sourcesContents) {
        // Remove the source file from the _sourcesContents map.
        // If the _sourcesContents map is empty, set the property to null.
        delete this._sourcesContents[util.toSetString(source)]
        if (Object.keys(this._sourcesContents).length === 0) {
          this._sourcesContents = null
        }
      }
    }

  /**
   * Applies the mappings of a sub-source-map for a specific source file to the
   * source map being generated. Each mapping to the supplied source file is
   * rewritten using the supplied source map. Note: The resolution for the
   * resulting mappings is the minimium of this map and the supplied map.
   *
   * @param aSourceMapConsumer The source map to be applied.
   * @param aSourceFile Optional. The filename of the source file.
   *        If omitted, SourceMapConsumer's file property will be used.
   * @param aSourceMapPath Optional. The dirname of the path to the source map
   *        to be applied. If relative, it is relative to the SourceMapConsumer.
   *        This parameter is needed when the two source maps aren't in the same
   *        directory, and the source map to be applied contains relative source
   *        paths. If so, those relative source paths need to be rewritten
   *        relative to the SourceMapGenerator.
   */
        SourceMapGenerator.prototype.applySourceMap =
    function SourceMapGenerator_applySourceMap (aSourceMapConsumer, aSourceFile, aSourceMapPath) {
      var sourceFile = aSourceFile
      // If aSourceFile is omitted, we will use the file property of the SourceMap
      if (aSourceFile == null) {
        if (aSourceMapConsumer.file == null) {
          throw new Error(
            'SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, ' +
            'or the source map\'s "file" property. Both were omitted.'
          )
        }
        sourceFile = aSourceMapConsumer.file
      }
      var sourceRoot = this._sourceRoot
      // Make "sourceFile" relative if an absolute Url is passed.
      if (sourceRoot != null) {
        sourceFile = util.relative(sourceRoot, sourceFile)
      }
      // Applying the SourceMap can add and remove items from the sources and
      // the names array.
      var newSources = new ArraySet()
      var newNames = new ArraySet()

      // Find mappings for the "sourceFile"
      this._mappings.unsortedForEach(function (mapping) {
        if (mapping.source === sourceFile && mapping.originalLine != null) {
          // Check if it can be mapped by the source map, then update the mapping.
          var original = aSourceMapConsumer.originalPositionFor({
            line: mapping.originalLine,
            column: mapping.originalColumn
          })
          if (original.source != null) {
            // Copy mapping
            mapping.source = original.source
            if (aSourceMapPath != null) {
              mapping.source = util.join(aSourceMapPath, mapping.source)
            }
            if (sourceRoot != null) {
              mapping.source = util.relative(sourceRoot, mapping.source)
            }
            mapping.originalLine = original.line
            mapping.originalColumn = original.column
            if (original.name != null) {
              mapping.name = original.name
            }
          }
        }

        var source = mapping.source
        if (source != null && !newSources.has(source)) {
          newSources.add(source)
        }

        var name = mapping.name
        if (name != null && !newNames.has(name)) {
          newNames.add(name)
        }
      }, this)
      this._sources = newSources
      this._names = newNames

      // Copy sourcesContents of applied map.
      aSourceMapConsumer.sources.forEach(function (sourceFile) {
        var content = aSourceMapConsumer.sourceContentFor(sourceFile)
        if (content != null) {
          if (aSourceMapPath != null) {
            sourceFile = util.join(aSourceMapPath, sourceFile)
          }
          if (sourceRoot != null) {
            sourceFile = util.relative(sourceRoot, sourceFile)
          }
          this.setSourceContent(sourceFile, content)
        }
      }, this)
    }

  /**
   * A mapping can have one of the three levels of data:
   *
   *   1. Just the generated position.
   *   2. The Generated position, original position, and original source.
   *   3. Generated and original position, original source, as well as a name
   *      token.
   *
   * To maintain consistency, we validate that any new mapping being added falls
   * in to one of these categories.
   */
        SourceMapGenerator.prototype._validateMapping =
    function SourceMapGenerator_validateMapping (aGenerated, aOriginal, aSource,
                                                aName) {
      if (aGenerated && 'line' in aGenerated && 'column' in aGenerated &&
          aGenerated.line > 0 && aGenerated.column >= 0 &&
          !aOriginal && !aSource && !aName) {
        // Case 1.

      } else if (aGenerated && 'line' in aGenerated && 'column' in aGenerated &&
               aOriginal && 'line' in aOriginal && 'column' in aOriginal &&
               aGenerated.line > 0 && aGenerated.column >= 0 &&
               aOriginal.line > 0 && aOriginal.column >= 0 &&
               aSource) {
        // Cases 2 and 3.

      } else {
        throw new Error('Invalid mapping: ' + JSON.stringify({
          generated: aGenerated,
          source: aSource,
          original: aOriginal,
          name: aName
        }))
      }
    }

  /**
   * Serialize the accumulated mappings in to the stream of base 64 VLQs
   * specified by the source map format.
   */
        SourceMapGenerator.prototype._serializeMappings =
    function SourceMapGenerator_serializeMappings () {
      var previousGeneratedColumn = 0
      var previousGeneratedLine = 1
      var previousOriginalColumn = 0
      var previousOriginalLine = 0
      var previousName = 0
      var previousSource = 0
      var result = ''
      var mapping

      var mappings = this._mappings.toArray()

      for (var i = 0, len = mappings.length; i < len; i++) {
        mapping = mappings[i]

        if (mapping.generatedLine !== previousGeneratedLine) {
          previousGeneratedColumn = 0
          while (mapping.generatedLine !== previousGeneratedLine) {
            result += ';'
            previousGeneratedLine++
          }
        } else {
          if (i > 0) {
            if (!util.compareByGeneratedPositions(mapping, mappings[i - 1])) {
              continue
            }
            result += ','
          }
        }

        result += base64VLQ.encode(mapping.generatedColumn -
                                   previousGeneratedColumn)
        previousGeneratedColumn = mapping.generatedColumn

        if (mapping.source != null) {
          result += base64VLQ.encode(this._sources.indexOf(mapping.source) -
                                     previousSource)
          previousSource = this._sources.indexOf(mapping.source)

          // lines are stored 0-based in SourceMap spec version 3
          result += base64VLQ.encode(mapping.originalLine - 1 -
                                     previousOriginalLine)
          previousOriginalLine = mapping.originalLine - 1

          result += base64VLQ.encode(mapping.originalColumn -
                                     previousOriginalColumn)
          previousOriginalColumn = mapping.originalColumn

          if (mapping.name != null) {
            result += base64VLQ.encode(this._names.indexOf(mapping.name) -
                                       previousName)
            previousName = this._names.indexOf(mapping.name)
          }
        }
      }

      return result
    }

        SourceMapGenerator.prototype._generateSourcesContent =
    function SourceMapGenerator_generateSourcesContent (aSources, aSourceRoot) {
      return aSources.map(function (source) {
        if (!this._sourcesContents) {
          return null
        }
        if (aSourceRoot != null) {
          source = util.relative(aSourceRoot, source)
        }
        var key = util.toSetString(source)
        return Object.prototype.hasOwnProperty.call(this._sourcesContents,
                                                    key)
          ? this._sourcesContents[key]
          : null
      }, this)
    }

  /**
   * Externalize the source map.
   */
        SourceMapGenerator.prototype.toJSON =
    function SourceMapGenerator_toJSON () {
      var map = {
        version: this._version,
        sources: this._sources.toArray(),
        names: this._names.toArray(),
        mappings: this._serializeMappings()
      }
      if (this._file != null) {
        map.file = this._file
      }
      if (this._sourceRoot != null) {
        map.sourceRoot = this._sourceRoot
      }
      if (this._sourcesContents) {
        map.sourcesContent = this._generateSourcesContent(map.sources, map.sourceRoot)
      }

      return map
    }

  /**
   * Render the source map being generated to a string.
   */
        SourceMapGenerator.prototype.toString =
    function SourceMapGenerator_toString () {
      return JSON.stringify(this)
    }

        exports.SourceMapGenerator = SourceMapGenerator
      })
    /* WEBPACK VAR INJECTION */ }.call(exports, __webpack_require__(1)(module)))
  /***/ },
/* 24 */
  /***/ function (module, exports, __webpack_require__) {
    /* WEBPACK VAR INJECTION */(function (module) { /* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */
      if (typeof define !== 'function') {
        var define = __webpack_require__(2)(module, !(function webpackMissingModule () { var e = new Error('Cannot find module "."'); e.code = 'MODULE_NOT_FOUND'; throw e }()))
      }
      define(function (require, exports, module) {
        var util = require('./util')
        var binarySearch = require('./binary-search')
        var ArraySet = require('./array-set').ArraySet
        var base64VLQ = require('./base64-vlq')

  /**
   * A SourceMapConsumer instance represents a parsed source map which we can
   * query for information about the original file positions by giving it a file
   * position in the generated source.
   *
   * The only parameter is the raw source map (either as a JSON string, or
   * already parsed to an object). According to the spec, source maps have the
   * following attributes:
   *
   *   - version: Which version of the source map spec this map is following.
   *   - sources: An array of URLs to the original source files.
   *   - names: An array of identifiers which can be referrenced by individual mappings.
   *   - sourceRoot: Optional. The URL root from which all sources are relative.
   *   - sourcesContent: Optional. An array of contents of the original source files.
   *   - mappings: A string of base64 VLQs which contain the actual mappings.
   *   - file: Optional. The generated file this source map is associated with.
   *
   * Here is an example source map, taken from the source map spec[0]:
   *
   *     {
   *       version : 3,
   *       file: "out.js",
   *       sourceRoot : "",
   *       sources: ["foo.js", "bar.js"],
   *       names: ["src", "maps", "are", "fun"],
   *       mappings: "AA,AB;;ABCDE;"
   *     }
   *
   * [0]: https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit?pli=1#
   */
        function SourceMapConsumer (aSourceMap) {
          var sourceMap = aSourceMap
          if (typeof aSourceMap === 'string') {
            sourceMap = JSON.parse(aSourceMap.replace(/^\)\]\}'/, ''))
          }

          var version = util.getArg(sourceMap, 'version')
          var sources = util.getArg(sourceMap, 'sources')
    // Sass 3.3 leaves out the 'names' array, so we deviate from the spec (which
    // requires the array) to play nice here.
          var names = util.getArg(sourceMap, 'names', [])
          var sourceRoot = util.getArg(sourceMap, 'sourceRoot', null)
          var sourcesContent = util.getArg(sourceMap, 'sourcesContent', null)
          var mappings = util.getArg(sourceMap, 'mappings')
          var file = util.getArg(sourceMap, 'file', null)

    // Once again, Sass deviates from the spec and supplies the version as a
    // string rather than a number, so we use loose equality checking here.
          if (version != this._version) {
            throw new Error('Unsupported version: ' + version)
          }

    // Some source maps produce relative source paths like "./foo.js" instead of
    // "foo.js".  Normalize these first so that future comparisons will succeed.
    // See bugzil.la/1090768.
          sources = sources.map(util.normalize)

    // Pass `true` below to allow duplicate names and sources. While source maps
    // are intended to be compressed and deduplicated, the TypeScript compiler
    // sometimes generates source maps with duplicates in them. See Github issue
    // #72 and bugzil.la/889492.
          this._names = ArraySet.fromArray(names, true)
          this._sources = ArraySet.fromArray(sources, true)

          this.sourceRoot = sourceRoot
          this.sourcesContent = sourcesContent
          this._mappings = mappings
          this.file = file
        }

  /**
   * Create a SourceMapConsumer from a SourceMapGenerator.
   *
   * @param SourceMapGenerator aSourceMap
   *        The source map that will be consumed.
   * @returns SourceMapConsumer
   */
        SourceMapConsumer.fromSourceMap =
    function SourceMapConsumer_fromSourceMap (aSourceMap) {
      var smc = Object.create(SourceMapConsumer.prototype)

      smc._names = ArraySet.fromArray(aSourceMap._names.toArray(), true)
      smc._sources = ArraySet.fromArray(aSourceMap._sources.toArray(), true)
      smc.sourceRoot = aSourceMap._sourceRoot
      smc.sourcesContent = aSourceMap._generateSourcesContent(smc._sources.toArray(),
                                                              smc.sourceRoot)
      smc.file = aSourceMap._file

      smc.__generatedMappings = aSourceMap._mappings.toArray().slice()
      smc.__originalMappings = aSourceMap._mappings.toArray().slice()
        .sort(util.compareByOriginalPositions)

      return smc
    }

  /**
   * The version of the source mapping spec that we are consuming.
   */
        SourceMapConsumer.prototype._version = 3

  /**
   * The list of original sources.
   */
        Object.defineProperty(SourceMapConsumer.prototype, 'sources', {
          get: function () {
            return this._sources.toArray().map(function (s) {
              return this.sourceRoot != null ? util.join(this.sourceRoot, s) : s
            }, this)
          }
        })

  // `__generatedMappings` and `__originalMappings` are arrays that hold the
  // parsed mapping coordinates from the source map's "mappings" attribute. They
  // are lazily instantiated, accessed via the `_generatedMappings` and
  // `_originalMappings` getters respectively, and we only parse the mappings
  // and create these arrays once queried for a source location. We jump through
  // these hoops because there can be many thousands of mappings, and parsing
  // them is expensive, so we only want to do it if we must.
  //
  // Each object in the arrays is of the form:
  //
  //     {
  //       generatedLine: The line number in the generated code,
  //       generatedColumn: The column number in the generated code,
  //       source: The path to the original source file that generated this
  //               chunk of code,
  //       originalLine: The line number in the original source that
  //                     corresponds to this chunk of generated code,
  //       originalColumn: The column number in the original source that
  //                       corresponds to this chunk of generated code,
  //       name: The name of the original symbol which generated this chunk of
  //             code.
  //     }
  //
  // All properties except for `generatedLine` and `generatedColumn` can be
  // `null`.
  //
  // `_generatedMappings` is ordered by the generated positions.
  //
  // `_originalMappings` is ordered by the original positions.

        SourceMapConsumer.prototype.__generatedMappings = null
        Object.defineProperty(SourceMapConsumer.prototype, '_generatedMappings', {
          get: function () {
            if (!this.__generatedMappings) {
              this.__generatedMappings = []
              this.__originalMappings = []
              this._parseMappings(this._mappings, this.sourceRoot)
            }

            return this.__generatedMappings
          }
        })

        SourceMapConsumer.prototype.__originalMappings = null
        Object.defineProperty(SourceMapConsumer.prototype, '_originalMappings', {
          get: function () {
            if (!this.__originalMappings) {
              this.__generatedMappings = []
              this.__originalMappings = []
              this._parseMappings(this._mappings, this.sourceRoot)
            }

            return this.__originalMappings
          }
        })

        SourceMapConsumer.prototype._nextCharIsMappingSeparator =
    function SourceMapConsumer_nextCharIsMappingSeparator (aStr) {
      var c = aStr.charAt(0)
      return c === ';' || c === ','
    }

  /**
   * Parse the mappings in a string in to a data structure which we can easily
   * query (the ordered arrays in the `this.__generatedMappings` and
   * `this.__originalMappings` properties).
   */
        SourceMapConsumer.prototype._parseMappings =
    function SourceMapConsumer_parseMappings (aStr, aSourceRoot) {
      var generatedLine = 1
      var previousGeneratedColumn = 0
      var previousOriginalLine = 0
      var previousOriginalColumn = 0
      var previousSource = 0
      var previousName = 0
      var str = aStr
      var temp = {}
      var mapping

      while (str.length > 0) {
        if (str.charAt(0) === ';') {
          generatedLine++
          str = str.slice(1)
          previousGeneratedColumn = 0
        } else if (str.charAt(0) === ',') {
          str = str.slice(1)
        } else {
          mapping = {}
          mapping.generatedLine = generatedLine

          // Generated column.
          base64VLQ.decode(str, temp)
          mapping.generatedColumn = previousGeneratedColumn + temp.value
          previousGeneratedColumn = mapping.generatedColumn
          str = temp.rest

          if (str.length > 0 && !this._nextCharIsMappingSeparator(str)) {
            // Original source.
            base64VLQ.decode(str, temp)
            mapping.source = this._sources.at(previousSource + temp.value)
            previousSource += temp.value
            str = temp.rest
            if (str.length === 0 || this._nextCharIsMappingSeparator(str)) {
              throw new Error('Found a source, but no line and column')
            }

            // Original line.
            base64VLQ.decode(str, temp)
            mapping.originalLine = previousOriginalLine + temp.value
            previousOriginalLine = mapping.originalLine
            // Lines are stored 0-based
            mapping.originalLine += 1
            str = temp.rest
            if (str.length === 0 || this._nextCharIsMappingSeparator(str)) {
              throw new Error('Found a source and line, but no column')
            }

            // Original column.
            base64VLQ.decode(str, temp)
            mapping.originalColumn = previousOriginalColumn + temp.value
            previousOriginalColumn = mapping.originalColumn
            str = temp.rest

            if (str.length > 0 && !this._nextCharIsMappingSeparator(str)) {
              // Original name.
              base64VLQ.decode(str, temp)
              mapping.name = this._names.at(previousName + temp.value)
              previousName += temp.value
              str = temp.rest
            }
          }

          this.__generatedMappings.push(mapping)
          if (typeof mapping.originalLine === 'number') {
            this.__originalMappings.push(mapping)
          }
        }
      }

      this.__generatedMappings.sort(util.compareByGeneratedPositions)
      this.__originalMappings.sort(util.compareByOriginalPositions)
    }

  /**
   * Find the mapping that best matches the hypothetical "needle" mapping that
   * we are searching for in the given "haystack" of mappings.
   */
        SourceMapConsumer.prototype._findMapping =
    function SourceMapConsumer_findMapping (aNeedle, aMappings, aLineName,
                                           aColumnName, aComparator) {
      // To return the position we are searching for, we must first find the
      // mapping for the given position and then return the opposite position it
      // points to. Because the mappings are sorted, we can use binary search to
      // find the best mapping.

      if (aNeedle[aLineName] <= 0) {
        throw new TypeError('Line must be greater than or equal to 1, got ' +
                            aNeedle[aLineName])
      }
      if (aNeedle[aColumnName] < 0) {
        throw new TypeError('Column must be greater than or equal to 0, got ' +
                            aNeedle[aColumnName])
      }

      return binarySearch.search(aNeedle, aMappings, aComparator)
    }

  /**
   * Compute the last column for each generated mapping. The last column is
   * inclusive.
   */
        SourceMapConsumer.prototype.computeColumnSpans =
    function SourceMapConsumer_computeColumnSpans () {
      for (var index = 0; index < this._generatedMappings.length; ++index) {
        var mapping = this._generatedMappings[index]

        // Mappings do not contain a field for the last generated columnt. We
        // can come up with an optimistic estimate, however, by assuming that
        // mappings are contiguous (i.e. given two consecutive mappings, the
        // first mapping ends where the second one starts).
        if (index + 1 < this._generatedMappings.length) {
          var nextMapping = this._generatedMappings[index + 1]

          if (mapping.generatedLine === nextMapping.generatedLine) {
            mapping.lastGeneratedColumn = nextMapping.generatedColumn - 1
            continue
          }
        }

        // The last mapping for each line spans the entire line.
        mapping.lastGeneratedColumn = Infinity
      }
    }

  /**
   * Returns the original source, line, and column information for the generated
   * source's line and column positions provided. The only argument is an object
   * with the following properties:
   *
   *   - line: The line number in the generated source.
   *   - column: The column number in the generated source.
   *
   * and an object is returned with the following properties:
   *
   *   - source: The original source file, or null.
   *   - line: The line number in the original source, or null.
   *   - column: The column number in the original source, or null.
   *   - name: The original identifier, or null.
   */
        SourceMapConsumer.prototype.originalPositionFor =
    function SourceMapConsumer_originalPositionFor (aArgs) {
      var needle = {
        generatedLine: util.getArg(aArgs, 'line'),
        generatedColumn: util.getArg(aArgs, 'column')
      }

      var index = this._findMapping(needle,
                                    this._generatedMappings,
                                    'generatedLine',
                                    'generatedColumn',
                                    util.compareByGeneratedPositions)

      if (index >= 0) {
        var mapping = this._generatedMappings[index]

        if (mapping.generatedLine === needle.generatedLine) {
          var source = util.getArg(mapping, 'source', null)
          if (source != null && this.sourceRoot != null) {
            source = util.join(this.sourceRoot, source)
          }
          return {
            source: source,
            line: util.getArg(mapping, 'originalLine', null),
            column: util.getArg(mapping, 'originalColumn', null),
            name: util.getArg(mapping, 'name', null)
          }
        }
      }

      return {
        source: null,
        line: null,
        column: null,
        name: null
      }
    }

  /**
   * Returns the original source content. The only argument is the url of the
   * original source file. Returns null if no original source content is
   * availible.
   */
        SourceMapConsumer.prototype.sourceContentFor =
    function SourceMapConsumer_sourceContentFor (aSource) {
      if (!this.sourcesContent) {
        return null
      }

      if (this.sourceRoot != null) {
        aSource = util.relative(this.sourceRoot, aSource)
      }

      if (this._sources.has(aSource)) {
        return this.sourcesContent[this._sources.indexOf(aSource)]
      }

      var url
      if (this.sourceRoot != null &&
          (url = util.urlParse(this.sourceRoot))) {
        // XXX: file:// URIs and absolute paths lead to unexpected behavior for
        // many users. We can help them out when they expect file:// URIs to
        // behave like it would if they were running a local HTTP server. See
        // https://bugzilla.mozilla.org/show_bug.cgi?id=885597.
        var fileUriAbsPath = aSource.replace(/^file:\/\//, '')
        if (url.scheme == 'file' &&
            this._sources.has(fileUriAbsPath)) {
          return this.sourcesContent[this._sources.indexOf(fileUriAbsPath)]
        }

        if ((!url.path || url.path == '/') &&
            this._sources.has('/' + aSource)) {
          return this.sourcesContent[this._sources.indexOf('/' + aSource)]
        }
      }

      throw new Error('"' + aSource + '" is not in the SourceMap.')
    }

  /**
   * Returns the generated line and column information for the original source,
   * line, and column positions provided. The only argument is an object with
   * the following properties:
   *
   *   - source: The filename of the original source.
   *   - line: The line number in the original source.
   *   - column: The column number in the original source.
   *
   * and an object is returned with the following properties:
   *
   *   - line: The line number in the generated source, or null.
   *   - column: The column number in the generated source, or null.
   */
        SourceMapConsumer.prototype.generatedPositionFor =
    function SourceMapConsumer_generatedPositionFor (aArgs) {
      var needle = {
        source: util.getArg(aArgs, 'source'),
        originalLine: util.getArg(aArgs, 'line'),
        originalColumn: util.getArg(aArgs, 'column')
      }

      if (this.sourceRoot != null) {
        needle.source = util.relative(this.sourceRoot, needle.source)
      }

      var index = this._findMapping(needle,
                                    this._originalMappings,
                                    'originalLine',
                                    'originalColumn',
                                    util.compareByOriginalPositions)

      if (index >= 0) {
        var mapping = this._originalMappings[index]

        return {
          line: util.getArg(mapping, 'generatedLine', null),
          column: util.getArg(mapping, 'generatedColumn', null),
          lastColumn: util.getArg(mapping, 'lastGeneratedColumn', null)
        }
      }

      return {
        line: null,
        column: null,
        lastColumn: null
      }
    }

  /**
   * Returns all generated line and column information for the original source
   * and line provided. The only argument is an object with the following
   * properties:
   *
   *   - source: The filename of the original source.
   *   - line: The line number in the original source.
   *
   * and an array of objects is returned, each with the following properties:
   *
   *   - line: The line number in the generated source, or null.
   *   - column: The column number in the generated source, or null.
   */
        SourceMapConsumer.prototype.allGeneratedPositionsFor =
    function SourceMapConsumer_allGeneratedPositionsFor (aArgs) {
      // When there is no exact match, SourceMapConsumer.prototype._findMapping
      // returns the index of the closest mapping less than the needle. By
      // setting needle.originalColumn to Infinity, we thus find the last
      // mapping for the given line, provided such a mapping exists.
      var needle = {
        source: util.getArg(aArgs, 'source'),
        originalLine: util.getArg(aArgs, 'line'),
        originalColumn: Infinity
      }

      if (this.sourceRoot != null) {
        needle.source = util.relative(this.sourceRoot, needle.source)
      }

      var mappings = []

      var index = this._findMapping(needle,
                                    this._originalMappings,
                                    'originalLine',
                                    'originalColumn',
                                    util.compareByOriginalPositions)
      if (index >= 0) {
        var mapping = this._originalMappings[index]

        while (mapping && mapping.originalLine === needle.originalLine) {
          mappings.push({
            line: util.getArg(mapping, 'generatedLine', null),
            column: util.getArg(mapping, 'generatedColumn', null),
            lastColumn: util.getArg(mapping, 'lastGeneratedColumn', null)
          })

          mapping = this._originalMappings[--index]
        }
      }

      return mappings.reverse()
    }

        SourceMapConsumer.GENERATED_ORDER = 1
        SourceMapConsumer.ORIGINAL_ORDER = 2

  /**
   * Iterate over each mapping between an original source/line/column and a
   * generated line/column in this source map.
   *
   * @param Function aCallback
   *        The function that is called with each mapping.
   * @param Object aContext
   *        Optional. If specified, this object will be the value of `this` every
   *        time that `aCallback` is called.
   * @param aOrder
   *        Either `SourceMapConsumer.GENERATED_ORDER` or
   *        `SourceMapConsumer.ORIGINAL_ORDER`. Specifies whether you want to
   *        iterate over the mappings sorted by the generated file's line/column
   *        order or the original's source/line/column order, respectively. Defaults to
   *        `SourceMapConsumer.GENERATED_ORDER`.
   */
        SourceMapConsumer.prototype.eachMapping =
    function SourceMapConsumer_eachMapping (aCallback, aContext, aOrder) {
      var context = aContext || null
      var order = aOrder || SourceMapConsumer.GENERATED_ORDER

      var mappings
      switch (order) {
        case SourceMapConsumer.GENERATED_ORDER:
          mappings = this._generatedMappings
          break
        case SourceMapConsumer.ORIGINAL_ORDER:
          mappings = this._originalMappings
          break
        default:
          throw new Error('Unknown order of iteration.')
      }

      var sourceRoot = this.sourceRoot
      mappings.map(function (mapping) {
        var source = mapping.source
        if (source != null && sourceRoot != null) {
          source = util.join(sourceRoot, source)
        }
        return {
          source: source,
          generatedLine: mapping.generatedLine,
          generatedColumn: mapping.generatedColumn,
          originalLine: mapping.originalLine,
          originalColumn: mapping.originalColumn,
          name: mapping.name
        }
      }).forEach(aCallback, context)
    }

        exports.SourceMapConsumer = SourceMapConsumer
      })
    /* WEBPACK VAR INJECTION */ }.call(exports, __webpack_require__(1)(module)))
  /***/ },
/* 25 */
  /***/ function (module, exports, __webpack_require__) {
    /* WEBPACK VAR INJECTION */(function (module) { /* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */
      if (typeof define !== 'function') {
        var define = __webpack_require__(2)(module, !(function webpackMissingModule () { var e = new Error('Cannot find module "."'); e.code = 'MODULE_NOT_FOUND'; throw e }()))
      }
      define(function (require, exports, module) {
        var SourceMapGenerator = require('./source-map-generator').SourceMapGenerator
        var util = require('./util')

  // Matches a Windows-style `\r\n` newline or a `\n` newline used by all other
  // operating systems these days (capturing the result).
        var REGEX_NEWLINE = /(\r?\n)/

  // Newline character code for charCodeAt() comparisons
        var NEWLINE_CODE = 10

  // Private symbol for identifying `SourceNode`s when multiple versions of
  // the source-map library are loaded. This MUST NOT CHANGE across
  // versions!
        var isSourceNode = '$$$isSourceNode$$$'

  /**
   * SourceNodes provide a way to abstract over interpolating/concatenating
   * snippets of generated JavaScript source code while maintaining the line and
   * column information associated with the original source code.
   *
   * @param aLine The original line number.
   * @param aColumn The original column number.
   * @param aSource The original source's filename.
   * @param aChunks Optional. An array of strings which are snippets of
   *        generated JS, or other SourceNodes.
   * @param aName The original identifier.
   */
        function SourceNode (aLine, aColumn, aSource, aChunks, aName) {
          this.children = []
          this.sourceContents = {}
          this.line = aLine == null ? null : aLine
          this.column = aColumn == null ? null : aColumn
          this.source = aSource == null ? null : aSource
          this.name = aName == null ? null : aName
          this[isSourceNode] = true
          if (aChunks != null) this.add(aChunks)
        }

  /**
   * Creates a SourceNode from generated code and a SourceMapConsumer.
   *
   * @param aGeneratedCode The generated code
   * @param aSourceMapConsumer The SourceMap for the generated code
   * @param aRelativePath Optional. The path that relative sources in the
   *        SourceMapConsumer should be relative to.
   */
        SourceNode.fromStringWithSourceMap =
    function SourceNode_fromStringWithSourceMap (aGeneratedCode, aSourceMapConsumer, aRelativePath) {
      // The SourceNode we want to fill with the generated code
      // and the SourceMap
      var node = new SourceNode()

      // All even indices of this array are one line of the generated code,
      // while all odd indices are the newlines between two adjacent lines
      // (since `REGEX_NEWLINE` captures its match).
      // Processed fragments are removed from this array, by calling `shiftNextLine`.
      var remainingLines = aGeneratedCode.split(REGEX_NEWLINE)
      var shiftNextLine = function () {
        var lineContents = remainingLines.shift()
        // The last line of a file might not have a newline.
        var newLine = remainingLines.shift() || ''
        return lineContents + newLine
      }

      // We need to remember the position of "remainingLines"
      var lastGeneratedLine = 1, lastGeneratedColumn = 0

      // The generate SourceNodes we need a code range.
      // To extract it current and last mapping is used.
      // Here we store the last mapping.
      var lastMapping = null

      aSourceMapConsumer.eachMapping(function (mapping) {
        if (lastMapping !== null) {
          // We add the code from "lastMapping" to "mapping":
          // First check if there is a new line in between.
          if (lastGeneratedLine < mapping.generatedLine) {
            var code = ''
            // Associate first line with "lastMapping"
            addMappingWithCode(lastMapping, shiftNextLine())
            lastGeneratedLine++
            lastGeneratedColumn = 0
            // The remaining code is added without mapping
          } else {
            // There is no new line in between.
            // Associate the code between "lastGeneratedColumn" and
            // "mapping.generatedColumn" with "lastMapping"
            var nextLine = remainingLines[0]
            var code = nextLine.substr(0, mapping.generatedColumn -
                                          lastGeneratedColumn)
            remainingLines[0] = nextLine.substr(mapping.generatedColumn -
                                                lastGeneratedColumn)
            lastGeneratedColumn = mapping.generatedColumn
            addMappingWithCode(lastMapping, code)
            // No more remaining code, continue
            lastMapping = mapping
            return
          }
        }
        // We add the generated code until the first mapping
        // to the SourceNode without any mapping.
        // Each line is added as separate string.
        while (lastGeneratedLine < mapping.generatedLine) {
          node.add(shiftNextLine())
          lastGeneratedLine++
        }
        if (lastGeneratedColumn < mapping.generatedColumn) {
          var nextLine = remainingLines[0]
          node.add(nextLine.substr(0, mapping.generatedColumn))
          remainingLines[0] = nextLine.substr(mapping.generatedColumn)
          lastGeneratedColumn = mapping.generatedColumn
        }
        lastMapping = mapping
      }, this)
      // We have processed all mappings.
      if (remainingLines.length > 0) {
        if (lastMapping) {
          // Associate the remaining code in the current line with "lastMapping"
          addMappingWithCode(lastMapping, shiftNextLine())
        }
        // and add the remaining lines without any mapping
        node.add(remainingLines.join(''))
      }

      // Copy sourcesContent into SourceNode
      aSourceMapConsumer.sources.forEach(function (sourceFile) {
        var content = aSourceMapConsumer.sourceContentFor(sourceFile)
        if (content != null) {
          if (aRelativePath != null) {
            sourceFile = util.join(aRelativePath, sourceFile)
          }
          node.setSourceContent(sourceFile, content)
        }
      })

      return node

      function addMappingWithCode (mapping, code) {
        if (mapping === null || mapping.source === undefined) {
          node.add(code)
        } else {
          var source = aRelativePath
            ? util.join(aRelativePath, mapping.source)
            : mapping.source
          node.add(new SourceNode(mapping.originalLine,
                                  mapping.originalColumn,
                                  source,
                                  code,
                                  mapping.name))
        }
      }
    }

  /**
   * Add a chunk of generated JS to this source node.
   *
   * @param aChunk A string snippet of generated JS code, another instance of
   *        SourceNode, or an array where each member is one of those things.
   */
        SourceNode.prototype.add = function SourceNode_add (aChunk) {
          if (Array.isArray(aChunk)) {
            aChunk.forEach(function (chunk) {
              this.add(chunk)
            }, this)
          } else if (aChunk[isSourceNode] || typeof aChunk === 'string') {
            if (aChunk) {
              this.children.push(aChunk)
            }
          } else {
            throw new TypeError(
        'Expected a SourceNode, string, or an array of SourceNodes and strings. Got ' + aChunk
      )
          }
          return this
        }

  /**
   * Add a chunk of generated JS to the beginning of this source node.
   *
   * @param aChunk A string snippet of generated JS code, another instance of
   *        SourceNode, or an array where each member is one of those things.
   */
        SourceNode.prototype.prepend = function SourceNode_prepend (aChunk) {
          if (Array.isArray(aChunk)) {
            for (var i = aChunk.length - 1; i >= 0; i--) {
              this.prepend(aChunk[i])
            }
          } else if (aChunk[isSourceNode] || typeof aChunk === 'string') {
            this.children.unshift(aChunk)
          } else {
            throw new TypeError(
        'Expected a SourceNode, string, or an array of SourceNodes and strings. Got ' + aChunk
      )
          }
          return this
        }

  /**
   * Walk over the tree of JS snippets in this node and its children. The
   * walking function is called once for each snippet of JS and is passed that
   * snippet and the its original associated source's line/column location.
   *
   * @param aFn The traversal function.
   */
        SourceNode.prototype.walk = function SourceNode_walk (aFn) {
          var chunk
          for (var i = 0, len = this.children.length; i < len; i++) {
            chunk = this.children[i]
            if (chunk[isSourceNode]) {
              chunk.walk(aFn)
            } else {
              if (chunk !== '') {
                aFn(chunk, { source: this.source,
                  line: this.line,
                  column: this.column,
                  name: this.name })
              }
            }
          }
        }

  /**
   * Like `String.prototype.join` except for SourceNodes. Inserts `aStr` between
   * each of `this.children`.
   *
   * @param aSep The separator.
   */
        SourceNode.prototype.join = function SourceNode_join (aSep) {
          var newChildren
          var i
          var len = this.children.length
          if (len > 0) {
            newChildren = []
            for (i = 0; i < len - 1; i++) {
              newChildren.push(this.children[i])
              newChildren.push(aSep)
            }
            newChildren.push(this.children[i])
            this.children = newChildren
          }
          return this
        }

  /**
   * Call String.prototype.replace on the very right-most source snippet. Useful
   * for trimming whitespace from the end of a source node, etc.
   *
   * @param aPattern The pattern to replace.
   * @param aReplacement The thing to replace the pattern with.
   */
        SourceNode.prototype.replaceRight = function SourceNode_replaceRight (aPattern, aReplacement) {
          var lastChild = this.children[this.children.length - 1]
          if (lastChild[isSourceNode]) {
            lastChild.replaceRight(aPattern, aReplacement)
          } else if (typeof lastChild === 'string') {
            this.children[this.children.length - 1] = lastChild.replace(aPattern, aReplacement)
          } else {
            this.children.push(''.replace(aPattern, aReplacement))
          }
          return this
        }

  /**
   * Set the source content for a source file. This will be added to the SourceMapGenerator
   * in the sourcesContent field.
   *
   * @param aSourceFile The filename of the source file
   * @param aSourceContent The content of the source file
   */
        SourceNode.prototype.setSourceContent =
    function SourceNode_setSourceContent (aSourceFile, aSourceContent) {
      this.sourceContents[util.toSetString(aSourceFile)] = aSourceContent
    }

  /**
   * Walk over the tree of SourceNodes. The walking function is called for each
   * source file content and is passed the filename and source content.
   *
   * @param aFn The traversal function.
   */
        SourceNode.prototype.walkSourceContents =
    function SourceNode_walkSourceContents (aFn) {
      for (var i = 0, len = this.children.length; i < len; i++) {
        if (this.children[i][isSourceNode]) {
          this.children[i].walkSourceContents(aFn)
        }
      }

      var sources = Object.keys(this.sourceContents)
      for (var i = 0, len = sources.length; i < len; i++) {
        aFn(util.fromSetString(sources[i]), this.sourceContents[sources[i]])
      }
    }

  /**
   * Return the string representation of this source node. Walks over the tree
   * and concatenates all the various snippets together to one string.
   */
        SourceNode.prototype.toString = function SourceNode_toString () {
          var str = ''
          this.walk(function (chunk) {
            str += chunk
          })
          return str
        }

  /**
   * Returns the string representation of this source node along with a source
   * map.
   */
        SourceNode.prototype.toStringWithSourceMap = function SourceNode_toStringWithSourceMap (aArgs) {
          var generated = {
            code: '',
            line: 1,
            column: 0
          }
          var map = new SourceMapGenerator(aArgs)
          var sourceMappingActive = false
          var lastOriginalSource = null
          var lastOriginalLine = null
          var lastOriginalColumn = null
          var lastOriginalName = null
          this.walk(function (chunk, original) {
            generated.code += chunk
            if (original.source !== null &&
          original.line !== null &&
          original.column !== null) {
              if (lastOriginalSource !== original.source ||
           lastOriginalLine !== original.line ||
           lastOriginalColumn !== original.column ||
           lastOriginalName !== original.name) {
                map.addMapping({
                  source: original.source,
                  original: {
                line: original.line,
                column: original.column
              },
                  generated: {
                line: generated.line,
                column: generated.column
              },
                  name: original.name
                })
              }
              lastOriginalSource = original.source
              lastOriginalLine = original.line
              lastOriginalColumn = original.column
              lastOriginalName = original.name
              sourceMappingActive = true
            } else if (sourceMappingActive) {
              map.addMapping({
                generated: {
              line: generated.line,
              column: generated.column
            }
              })
              lastOriginalSource = null
              sourceMappingActive = false
            }
            for (var idx = 0, length = chunk.length; idx < length; idx++) {
              if (chunk.charCodeAt(idx) === NEWLINE_CODE) {
                generated.line++
                generated.column = 0
          // Mappings end at eol
                if (idx + 1 === length) {
                  lastOriginalSource = null
                  sourceMappingActive = false
                } else if (sourceMappingActive) {
              map.addMapping({
              source: original.source,
              original: {
                line: original.line,
                column: original.column
              },
              generated: {
                line: generated.line,
                column: generated.column
              },
              name: original.name
            })
            }
              } else {
                generated.column++
              }
            }
          })
          this.walkSourceContents(function (sourceFile, sourceContent) {
            map.setSourceContent(sourceFile, sourceContent)
          })

          return { code: generated.code, map: map }
        }

        exports.SourceNode = SourceNode
      })
    /* WEBPACK VAR INJECTION */ }.call(exports, __webpack_require__(1)(module)))
  /***/ },
/* 26 */
  /***/ function (module, exports, __webpack_require__) {
    /* WEBPACK VAR INJECTION */(function (setImmediate) {
      var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__// Copyright 2014 Simon Lydell
// X11 (“MIT”) Licensed. (See LICENSE.)

// Note: source-map-resolve.js is generated from source-map-resolve-node.js and
// source-map-resolve-template.js. Only edit the two latter files, _not_
// source-map-resolve.js!

      void (function (root, factory) {
        if (true) {
          !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(30), __webpack_require__(31)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function'
				? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))
        } else if (typeof exports === 'object') {
          var sourceMappingURL = require('source-map-url')
          var resolveUrl = require('resolve-url')
          module.exports = factory(sourceMappingURL, resolveUrl)
        } else {
          root.sourceMapResolve = factory(root.sourceMappingURL, root.resolveUrl)
        }
      }(this, function (sourceMappingURL, resolveUrl) {
        function callbackAsync (callback, error, result) {
          setImmediate(function () { callback(error, result) })
        }

        function parseMapToJSON (string) {
          return JSON.parse(string.replace(/^\)\]\}'/, ''))
        }

        function resolveSourceMap (code, codeUrl, read, callback) {
          var mapData
          try {
            mapData = resolveSourceMapHelper(code, codeUrl)
          } catch (error) {
            return callbackAsync(callback, error)
          }
          if (!mapData || mapData.map) {
            return callbackAsync(callback, null, mapData)
          }
          read(mapData.url, function (error, result) {
            if (error) {
              return callback(error)
            }
            try {
              mapData.map = parseMapToJSON(String(result))
            } catch (error) {
              return callback(error)
            }
            callback(null, mapData)
          })
        }

        function resolveSourceMapSync (code, codeUrl, read) {
          var mapData = resolveSourceMapHelper(code, codeUrl)
          if (!mapData || mapData.map) {
            return mapData
          }
          mapData.map = parseMapToJSON(String(read(mapData.url)))
          return mapData
        }

        var dataUriRegex = /^data:([^,;]*)(;[^,;]*)*(?:,(.*))?$/
        var jsonMimeTypeRegex = /^(?:application|text)\/json$/

        function resolveSourceMapHelper (code, codeUrl) {
          var url = sourceMappingURL.getFrom(code)
          if (!url) {
            return null
          }

          var dataUri = url.match(dataUriRegex)
          if (dataUri) {
            var mimeType = dataUri[1]
            var lastParameter = dataUri[2]
            var encoded = dataUri[3]
            if (!jsonMimeTypeRegex.test(mimeType)) {
              throw new Error('Unuseful data uri mime type: ' + (mimeType || 'text/plain'))
            }
            return {
              sourceMappingURL: url,
              url: null,
              sourcesRelativeTo: codeUrl,
              map: parseMapToJSON(lastParameter === ';base64' ? atob(encoded) : decodeURIComponent(encoded))
            }
          }

          var mapUrl = resolveUrl(codeUrl, url)
          return {
            sourceMappingURL: url,
            url: mapUrl,
            sourcesRelativeTo: mapUrl,
            map: null
          }
        }

        function resolveSources (map, mapUrl, read, options, callback) {
          if (typeof options === 'function') {
            callback = options
            options = {}
          }
          var pending = map.sources.length
          var errored = false
          var result = {
            sourcesResolved: [],
            sourcesContent: []
          }

          var done = function (error) {
            if (errored) {
              return
            }
            if (error) {
              errored = true
              return callback(error)
            }
            pending--
            if (pending === 0) {
              callback(null, result)
            }
          }

          resolveSourcesHelper(map, mapUrl, options, function (fullUrl, sourceContent, index) {
            result.sourcesResolved[index] = fullUrl
            if (typeof sourceContent === 'string') {
              result.sourcesContent[index] = sourceContent
              callbackAsync(done, null)
            } else {
              read(fullUrl, function (error, source) {
                result.sourcesContent[index] = String(source)
                done(error)
              })
            }
          })
        }

        function resolveSourcesSync (map, mapUrl, read, options) {
          var result = {
            sourcesResolved: [],
            sourcesContent: []
          }
          resolveSourcesHelper(map, mapUrl, options, function (fullUrl, sourceContent, index) {
            result.sourcesResolved[index] = fullUrl
            if (read !== null) {
              if (typeof sourceContent === 'string') {
                result.sourcesContent[index] = sourceContent
              } else {
                result.sourcesContent[index] = String(read(fullUrl))
              }
            }
          })
          return result
        }

        var endingSlash = /\/?$/

        function resolveSourcesHelper (map, mapUrl, options, fn) {
          options = options || {}
          var fullUrl
          var sourceContent
          for (var index = 0, len = map.sources.length; index < len; index++) {
            if (map.sourceRoot && !options.ignoreSourceRoot) {
        // Make sure that the sourceRoot ends with a slash, so that `/scripts/subdir` becomes
        // `/scripts/subdir/<source>`, not `/scripts/<source>`. Pointing to a file as source root
        // does not make sense.
              fullUrl = resolveUrl(mapUrl, map.sourceRoot.replace(endingSlash, '/'), map.sources[index])
            } else {
              fullUrl = resolveUrl(mapUrl, map.sources[index])
            }
            sourceContent = (map.sourcesContent || [])[index]
            fn(fullUrl, sourceContent, index)
          }
        }

        function resolve (code, codeUrl, read, options, callback) {
          if (typeof options === 'function') {
            callback = options
            options = {}
          }
          resolveSourceMap(code, codeUrl, read, function (error, mapData) {
            if (error) {
              return callback(error)
            }
            if (!mapData) {
              return callback(null, null)
            }
            resolveSources(mapData.map, mapData.sourcesRelativeTo, read, options, function (error, result) {
              if (error) {
                return callback(error)
              }
              mapData.sourcesResolved = result.sourcesResolved
              mapData.sourcesContent = result.sourcesContent
              callback(null, mapData)
            })
          })
        }

        function resolveSync (code, codeUrl, read, options) {
          var mapData = resolveSourceMapSync(code, codeUrl, read)
          if (!mapData) {
            return null
          }
          var result = resolveSourcesSync(mapData.map, mapData.sourcesRelativeTo, read, options)
          mapData.sourcesResolved = result.sourcesResolved
          mapData.sourcesContent = result.sourcesContent
          return mapData
        }

        return {
          resolveSourceMap: resolveSourceMap,
          resolveSourceMapSync: resolveSourceMapSync,
          resolveSources: resolveSources,
          resolveSourcesSync: resolveSourcesSync,
          resolve: resolve,
          resolveSync: resolveSync
        }
      }))
    /* WEBPACK VAR INJECTION */ }.call(exports, __webpack_require__(27).setImmediate))
  /***/ },
/* 27 */
  /***/ function (module, exports, __webpack_require__) {
    var apply = Function.prototype.apply

// DOM APIs, for completeness

    exports.setTimeout = function () {
      return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout)
    }
    exports.setInterval = function () {
      return new Timeout(apply.call(setInterval, window, arguments), clearInterval)
    }
    exports.clearTimeout =
exports.clearInterval = function (timeout) {
  if (timeout) {
    timeout.close()
  }
}

    function Timeout (id, clearFn) {
      this._id = id
      this._clearFn = clearFn
    }
    Timeout.prototype.unref = Timeout.prototype.ref = function () {}
    Timeout.prototype.close = function () {
      this._clearFn.call(window, this._id)
    }

// Does not start the time, just sets up the members needed.
    exports.enroll = function (item, msecs) {
      clearTimeout(item._idleTimeoutId)
      item._idleTimeout = msecs
    }

    exports.unenroll = function (item) {
      clearTimeout(item._idleTimeoutId)
      item._idleTimeout = -1
    }

    exports._unrefActive = exports.active = function (item) {
      clearTimeout(item._idleTimeoutId)

      var msecs = item._idleTimeout
      if (msecs >= 0) {
        item._idleTimeoutId = setTimeout(function onTimeout () {
          if (item._onTimeout) { item._onTimeout() }
        }, msecs)
      }
    }

// setimmediate attaches itself to the global object
    __webpack_require__(28)
    exports.setImmediate = setImmediate
    exports.clearImmediate = clearImmediate
  /***/ },
/* 28 */
  /***/ function (module, exports, __webpack_require__) {
    /* WEBPACK VAR INJECTION */(function (global, process) {
      (function (global, undefined) {
        'use strict'

        if (global.setImmediate) {
          return
        }

        var nextHandle = 1 // Spec says greater than zero
        var tasksByHandle = {}
        var currentlyRunningATask = false
        var doc = global.document
        var registerImmediate

        function setImmediate (callback) {
      // Callback can either be a function or a string
          if (typeof callback !== 'function') {
            callback = new Function('' + callback)
          }
      // Copy function arguments
          var args = new Array(arguments.length - 1)
          for (var i = 0; i < args.length; i++) {
            args[i] = arguments[i + 1]
          }
      // Store and register the task
          var task = { callback: callback, args: args }
          tasksByHandle[nextHandle] = task
          registerImmediate(nextHandle)
          return nextHandle++
        }

        function clearImmediate (handle) {
          delete tasksByHandle[handle]
        }

        function run (task) {
          var callback = task.callback
          var args = task.args
          switch (args.length) {
            case 0:
              callback()
              break
            case 1:
              callback(args[0])
              break
            case 2:
              callback(args[0], args[1])
              break
            case 3:
              callback(args[0], args[1], args[2])
              break
            default:
              callback.apply(undefined, args)
              break
          }
        }

        function runIfPresent (handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
          if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle)
          } else {
            var task = tasksByHandle[handle]
            if (task) {
              currentlyRunningATask = true
              try {
                run(task)
              } finally {
                clearImmediate(handle)
                currentlyRunningATask = false
              }
            }
          }
        }

        function installNextTickImplementation () {
          registerImmediate = function (handle) {
            process.nextTick(function () { runIfPresent(handle) })
          }
        }

        function canUsePostMessage () {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
          if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true
            var oldOnMessage = global.onmessage
            global.onmessage = function () {
              postMessageIsAsynchronous = false
            }
            global.postMessage('', '*')
            global.onmessage = oldOnMessage
            return postMessageIsAsynchronous
          }
        }

        function installPostMessageImplementation () {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

          var messagePrefix = 'setImmediate$' + Math.random() + '$'
          var onGlobalMessage = function (event) {
            if (event.source === global &&
                typeof event.data === 'string' &&
                event.data.indexOf(messagePrefix) === 0) {
              runIfPresent(+event.data.slice(messagePrefix.length))
            }
          }

          if (global.addEventListener) {
            global.addEventListener('message', onGlobalMessage, false)
          } else {
            global.attachEvent('onmessage', onGlobalMessage)
          }

          registerImmediate = function (handle) {
            global.postMessage(messagePrefix + handle, '*')
          }
        }

        function installMessageChannelImplementation () {
          var channel = new MessageChannel()
          channel.port1.onmessage = function (event) {
            var handle = event.data
            runIfPresent(handle)
          }

          registerImmediate = function (handle) {
            channel.port2.postMessage(handle)
          }
        }

        function installReadyStateChangeImplementation () {
          var html = doc.documentElement
          registerImmediate = function (handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement('script')
            script.onreadystatechange = function () {
              runIfPresent(handle)
              script.onreadystatechange = null
              html.removeChild(script)
              script = null
            }
            html.appendChild(script)
          }
        }

        function installSetTimeoutImplementation () {
          registerImmediate = function (handle) {
            setTimeout(runIfPresent, 0, handle)
          }
        }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
        var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global)
        attachTo = attachTo && attachTo.setTimeout ? attachTo : global

    // Don't get fooled by e.g. browserify environments.
        if ({}.toString.call(global.process) === '[object process]') {
        // For Node.js before 0.9
          installNextTickImplementation()
        } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
          installPostMessageImplementation()
        } else if (global.MessageChannel) {
        // For web workers, where supported
          installMessageChannelImplementation()
        } else if (doc && 'onreadystatechange' in doc.createElement('script')) {
        // For IE 6–8
          installReadyStateChangeImplementation()
        } else {
        // For older browsers
          installSetTimeoutImplementation()
        }

        attachTo.setImmediate = setImmediate
        attachTo.clearImmediate = clearImmediate
      }(typeof self === 'undefined' ? typeof global === 'undefined' ? this : global : self))
    /* WEBPACK VAR INJECTION */ }.call(exports, __webpack_require__(29), __webpack_require__(9)))
  /***/ },
/* 29 */
  /***/ function (module, exports) {
    var g

// This works in non-strict mode
    g = (function () {
      return this
    })()

    try {
	// This works if eval is allowed (see CSP)
      g = g || Function('return this')() || (1, eval)('this')
    } catch (e) {
	// This works if the window reference is available
      if (typeof window === 'object') { g = window }
    }

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

    module.exports = g
  /***/ },
/* 30 */
  /***/ function (module, exports, __webpack_require__) {
    var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__// Copyright 2014 Simon Lydell
// X11 (“MIT”) Licensed. (See LICENSE.)

    void (function (root, factory) {
      if (true) {
        !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function'
				? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module))
				: __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))
      } else if (typeof exports === 'object') {
        module.exports = factory()
      } else {
        root.sourceMappingURL = factory()
      }
    }(this, function () {
      var innerRegex = /[#@] sourceMappingURL=([^\s'"]*)/

      var regex = RegExp(
    '(?:' +
      '/\\*' +
      '(?:\\s*\r?\n(?://)?)?' +
      '(?:' + innerRegex.source + ')' +
      '\\s*' +
      '\\*/' +
      '|' +
      '//(?:' + innerRegex.source + ')' +
    ')' +
    '\\s*$'
  )

      return {

        regex: regex,
        _innerRegex: innerRegex,

        getFrom: function (code) {
          var match = code.match(regex)
          return (match ? match[1] || match[2] || '' : null)
        },

        existsIn: function (code) {
          return regex.test(code)
        },

        removeFrom: function (code) {
          return code.replace(regex, '')
        },

        insertBefore: function (code, string) {
          var match = code.match(regex)
          if (match) {
            return code.slice(0, match.index) + string + code.slice(match.index)
          } else {
            return code + string
          }
        }
      }
    }))
  /***/ },
/* 31 */
  /***/ function (module, exports, __webpack_require__) {
    var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__// Copyright 2014 Simon Lydell
// X11 (“MIT”) Licensed. (See LICENSE.)

    void (function (root, factory) {
      if (true) {
        !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function'
				? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module))
				: __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))
      } else if (typeof exports === 'object') {
        module.exports = factory()
      } else {
        root.resolveUrl = factory()
      }
    }(this, function () {
      function resolveUrl (/* ...urls */) {
        var numUrls = arguments.length

        if (numUrls === 0) {
          throw new Error('resolveUrl requires at least one argument; got none.')
        }

        var base = document.createElement('base')
        base.href = arguments[0]

        if (numUrls === 1) {
          return base.href
        }

        var head = document.getElementsByTagName('head')[0]
        head.insertBefore(base, head.firstChild)

        var a = document.createElement('a')
        var resolved

        for (var index = 1; index < numUrls; index++) {
          a.href = arguments[index]
          resolved = a.href
          base.href = resolved
        }

        head.removeChild(base)

        return resolved
      }

      return resolveUrl
    }))
  /***/ },
/* 32 */
  /***/ function (module, exports, __webpack_require__) {
// Copyright 2014 Simon Lydell
// X11 (“MIT”) Licensed. (See LICENSE.)

    var path = __webpack_require__(10)

    'use strict'

    function urix (aPath) {
      if (path.sep === '\\') {
        return aPath
      .replace(/\\/g, '/')
      .replace(/^[a-z]:\/?/i, '/')
      }
      return aPath
    }

    module.exports = urix
  /***/ },
/* 33 */
  /***/ function (module, exports) {

  /***/ },
/* 34 */
  /***/ function (module, exports, __webpack_require__) {
    'use strict'

    Object.defineProperty(exports, '__esModule', {
      value: true
    })

    var _createClass = (function () { function defineProperties (target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor) } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor } }())

    var _preact = __webpack_require__(0)

    function _classCallCheck (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function') } }

    function _possibleConstructorReturn (self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called") } return call && (typeof call === 'object' || typeof call === 'function') ? call : self }

    function _inherits (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass) } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass }

    var BrowserVersionsPicker = (function (_Component) {
      _inherits(BrowserVersionsPicker, _Component)

      function BrowserVersionsPicker () {
        _classCallCheck(this, BrowserVersionsPicker)

        return _possibleConstructorReturn(this, (BrowserVersionsPicker.__proto__ || Object.getPrototypeOf(BrowserVersionsPicker)).apply(this, arguments))
      }

      _createClass(BrowserVersionsPicker, [{
        key: '_handleChange',
        value: function _handleChange (event) {
          var onSetBrowserVersions = this.props.onSetBrowserVersions

          if (event.target.value === 'All') {
            onSetBrowserVersions(Infinity)
          } else {
            onSetBrowserVersions(parseInt(event.target.value))
          }
        }
      }, {
        key: 'render',
        value: function render () {
          var _props = this.props,
            browserVersions = _props.browserVersions,
            onSetBrowserVersions = _props.onSetBrowserVersions

          return (0, _preact.h)(
        'div',
        null,
        (0, _preact.h)(
          'p',
          { style: 'margin-top: 0;' },
          (0, _preact.h)(
            'strong',
            null,
            'Browser versions'
          )
        ),
        (0, _preact.h)(
          'div',
          { 'class': 'browser-versions' },
          (0, _preact.h)(
            'label',
            null,
            (0, _preact.h)('input', {
              type: 'radio',
              name: 'browser-versions',
              checked: browserVersions === 10,
              onChange: this._handleChange.bind(this),
              value: '10'
            }),
            'Newest 10'
          ),
          (0, _preact.h)(
            'label',
            null,
            (0, _preact.h)('input', {
              type: 'radio',
              name: 'browser-versions',
              checked: browserVersions === Infinity,
              onChange: this._handleChange.bind(this),
              value: 'All'
            }),
            'All'
          )
        )
      )
        }
      }])

      return BrowserVersionsPicker
    }(_preact.Component))

    exports.default = BrowserVersionsPicker
  /***/ }
/******/ ])
