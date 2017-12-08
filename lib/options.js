'use strict'

module.exports = {
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
  }
}
