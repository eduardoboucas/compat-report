![Colorful Lego bricks](dist/images/logo_512.png)

# Compat Report

[![coverage](https://img.shields.io/badge/coverage-14%25-red.svg?style=flat?style=flat-square)](https://github.com/eduardoboucas/compat-report) [![Build Status](https://travis-ci.org/eduardoboucas/compat-report.svg?branch=master)](https://travis-ci.org/eduardoboucas/compat-report)

> A DevTools panel for flagging browser compatibility issues

## Overview

This extension creates a Developer Tools panel that provides a basic overview of potential browser compatibility issues, using data from [MDN](https://github.com/mdn/browser-compat-data). It's still a proof of concept at the moment, so you'll likely find some glitches in the matrix.

## Development

The panel is a JavaScript application built with [Preact.js](https://preactjs.com/) and [Redux](https://redux.js.org/). To make changes, follow these steps:

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

To run the test suite, run `npm test`.