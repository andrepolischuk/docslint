'use strict'
const TextFixEngine = require('textlint').TextFixEngine
const TextLintFixer = require('textlint/lib/fixer/textlint-fixer')

module.exports = function fixFiles (paths, options) {
  const engine = new TextFixEngine(options)

  return engine.executeOnFiles(paths).then(results => {
    const fixer = new TextLintFixer()

    const report = {
      output: engine.formatResults(results)
    }

    return fixer.write(results).then(() => report)
  })
}
