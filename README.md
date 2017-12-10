<img alt="Colorful Lego bricks" src="https://raw.githubusercontent.com/eduardoboucas/compat-report/master/dist/logo_512.png" width="200">

# Compat Report

[![coverage](https://img.shields.io/badge/coverage-14%25-red.svg?style=flat?style=flat-square)](https://github.com/eduardoboucas/compat-report) [![Build Status](https://travis-ci.org/eduardoboucas/compat-report.svg?branch=master)](https://travis-ci.org/eduardoboucas/compat-report)

> A DevTools panel for flagging browser compatibility issues

## Overview

This extension creates a Developer Tools panel that provides a basic overview of potential browser compatibility issues, using data from [MDN](https://github.com/mdn/browser-compat-data). It's still a proof of concept at the moment, so you'll likely find some glitches in the matrix.

## Development

### Architecture

The panel is a JavaScript application built with [Preact.js](https://preactjs.com/) and [Redux](https://redux.js.org/).

Some files exist in the `dist/` directory, such as the extension manifest, images and the background scripts. In the majority of times, however, you'll be working on the `src/` directory, where the Preact components and the key libraries live.

Inside `lib/`, the main file is `StyleSheet.js`, a module for parsing and processing stylesheets using [PostCSS](http://postcss.org/). When processing a stylesheet, it uses 3 sub-modules to process different types of elements:

- `lib/AtRule.js`: processes at-rules
- `lib/Selector.js`: processes selectors
- `lib/Declaration.js`: processes declarations

#### Transforms

When processing a declaration, the property will be matched against [the list of CSS properties from MDN](https://github.com/mdn/browser-compat-data/tree/master/css/properties). This is a trivial comparison – when we find a property, say `transform`, we look for a `mdn.css.properties.transform` object.

But MDN compat data has the concept of [sub-features](https://github.com/mdn/browser-compat-data/blob/master/compat-data-schema.md#sub-features), a variant of an object that introduces different browser support. In the example of `transform`, this could be 3D transforms.

This is identified by `mdn.css.properties.transform.3d` in MDN, but matching it with a CSS declaration is more complex than a textual comparison, as we need to look for transform functions (`matrix3d`, `rotate3d`, `scale3d` or `translate3d`). We need a set of rules that specify how each sub-feature can be identified in a block of CSS.

We do this with *transforms* (probably not the best name for the concept, but the best I could do). Each transform consists of a JavaScript file that receives a declaration, a rule and a list of MDN compatibility keys (like `transform` and `transform.3d`). The latter can be modified by a transform, which can add a new key to the list to signal a new compatibility problem, or remove existing items from the list if the transform believes that the context of the rule/declaration means that a particular key shouldn't be flagged as a compatibility issue.

To see an example, check the [`transform-3d` transform](tree/master/src/lib/transforms/transform-3d.js) which determines whether a transform function has been used in a declaration, applying the `transform.3d` sub-property if so.

### Installing

1. Clone the repository

    ```shell
    git clone git@github.com:eduardoboucas/compat-report.git
    ```

1. Install the dependencies using [NPM](https://npmjs.com)

    ```shell
    npm install
    ```

1. Watch for changes

    ```shell
    npm run watch
    ```

### Test suite

Unit tests use [Jest](https://facebook.github.io/jest/) and live in the `test/` directory.

To run the suite:

```shell
npm test
```

## Credits

Logo made by [Smashicons](https://www.flaticon.com/authors/smashicons).
Icon made by [Coucou](https://www.flaticon.com/authors/coucou).
