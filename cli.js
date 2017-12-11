#!/usr/bin/env node
'use strict'
const meow = require('meow')
const format = require('./lib/formatter')
const getErrors = require('./lib/getErrors')
const lintFiles = require('./lib/lintFiles')

const cli = meow(`
  Usage
    docslint [file|glob ...]

  Options
    --fix      Automatically fix issues
    --disable  Rules to disable, can be set multiple times

  Examples
    docslint
    docslint readme.md
    docslint *.md !readme.md
    docslint --fix
    docslint --disable terminology
`, {
  flags: {
    fix: {
      type: 'boolean'
    },
    disable: {
      type: 'string'
    }
  }
})

lintFiles(cli.input, cli.flags)
  .then(results => {
    console.log(format(results, cli.flags))
    process.exit(getErrors(results, cli.flags) > 0 ? 1 : 0)
  })
  .catch(err => {
    console.error(err)
    process.exit(1)
  })
