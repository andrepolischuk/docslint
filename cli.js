#!/usr/bin/env node
'use strict'
const meow = require('meow')
const globby = require('globby')
const options = require('./lib/options')
const format = require('./lib/format')
const getErrors = require('./lib/getErrors')
const fixFiles = require('./lib/fixFiles')
const lintFiles = require('./lib/lintFiles')

const cli = meow(`
  Usage
    docslint [file|glob ...]

  Options
    --fix  Automatically fix issues

  Examples
    docslint
    docslint readme.md
    docslint *.md !readme.md
    docslint --fix
`, {
  flags: {
    fix: {
      type: 'boolean'
    }
  }
})

const excute = cli.flags.fix ? fixFiles : lintFiles
const patterns = cli.input.length === 0 ? ['**/*.md'] : cli.input

globby(patterns, {gitignore: true})
  .then(paths => excute(paths, options))
  .then(results => {
    console.log(format(results, cli.flags))
    process.exit(getErrors(results, cli.flags) > 0 ? 1 : 0)
  })
  .catch(err => {
    console.error(err)
    process.exit(1)
  })
