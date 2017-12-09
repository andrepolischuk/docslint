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
    --fix                Automatically fix issues
    --no-misspellings    Allow common misspellings
    --no-stop-words      Use stop words
    --no-terminology     Ignore terms
    --no-dead-link       Pass all links
    --no-write-good      Disable good writing
    --no-capitalization  Don't check capitalization

  Examples
    docslint
    docslint readme.md
    docslint *.md !readme.md
    docslint --fix
    docslint --no-stop-words
`, {
  flags: {
    fix: {
      type: 'boolean'
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
