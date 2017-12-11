'use strict'
const globby = require('globby')
const textlint = require('textlint')
const TextLintFixer = require('textlint/lib/fixer/textlint-fixer')
const createConfig = require('./createConfig')

module.exports = function lintFiles (input, options) {
  const config = createConfig(options)
  const patterns = input.length === 0 ? ['**/*.md'] : input

  const engine = options.fix
    ? new textlint.TextFixEngine(config)
    : new textlint.TextLintEngine(config)

  return globby(patterns, {gitignore: true})
    .then(paths => engine.executeOnFiles(paths))
    .then(results => {
      if (!options.fix) {
        return results
      }

      const fixer = new TextLintFixer()

      return fixer.write(results).then(() => results)
    })
}
