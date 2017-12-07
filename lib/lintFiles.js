'use strict'
const TextLintEngine = require('textlint').TextLintEngine

module.exports = function lintFiles (paths, options) {
  const engine = new TextLintEngine(options)

  return engine.executeOnFiles(paths).then(results => {
    const report = {
      output: engine.formatResults(results),
      hasErrors: engine.isErrorResults(results)
    }

    return report
  })
}
