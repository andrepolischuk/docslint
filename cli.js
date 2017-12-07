#!/usr/bin/env node
'use strict'
const meow = require('meow')
const path = require('path')
const TextFixEngine = require('textlint').TextFixEngine
const TextLintEngine = require('textlint').TextLintEngine
const TextLintFixer = require('textlint/lib/fixer/textlint-fixer')

const cli = meow(`
    Usage
      docslint [...files]

    Options
      --fix  Automatically fix problems

    Examples
      docslint README.md
      docslint --fix README.md
`, {
  flags: {
    fix: {
      type: 'boolean'
    }
  }
})

const options = {
  rules: [
    'common-misspellings',
    'no-dead-link',
    'no-start-duplicated-conjunction',
    'stop-words',
    'write-good',
    'terminology'
  ],
  rulesConfig: {
    'write-good': {
      passive: false
    }
  },
  formatterName: 'stylish'
}

const filenames = cli.input.map(name => path.join(process.cwd(), name))
const lintEngine = cli.flags.fix ? new TextFixEngine(options) : new TextLintEngine(options)

lintEngine.executeOnFiles(filenames).then(results => {
  const output = lintEngine.formatResults(results)
  console.log(output)

  if (cli.flags.fix) {
    const fixer = new TextLintFixer()
    fixer.write(results)
  }
})
