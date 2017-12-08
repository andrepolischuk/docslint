'use strict'

module.exports = function getErrors (results, options) {
  return results.reduce((acc, result) => {
    const messages = options.fix ? result.remainingMessages : result.messages
    return acc + messages.length
  }, 0)
}
