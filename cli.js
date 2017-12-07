#!/usr/bin/env node
'use strict'
const meow = require('meow')
const globby = require('globby')
const textlint = require('textlint')
const TextLintFixer = require('textlint/lib/fixer/textlint-fixer')

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

const patterns = cli.input.length === 0 ? ['**/*.md'] : cli.input
const Engine = cli.flags.fix ? textlint.TextFixEngine : textlint.TextLintEngine

const engine = new Engine({
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
})

globby(patterns, {gitignore: true})
  .then(paths => engine.executeOnFiles(paths))
  .then(results => {
    const output = engine.formatResults(results)
    console.log(output)

    if (cli.flags.fix) {
      const fixer = new TextLintFixer()
      fixer.write(results)
    }
  })
