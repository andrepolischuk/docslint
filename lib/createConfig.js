'use strict'
const merge = require('lodash.merge')

const DEFAULT_CONFIG = {
  rules: [
    'common-misspellings',
    'apostrophe',
    'diacritics',
    'stop-words',
    'terminology',
    'no-dead-link',
    'no-start-duplicated-conjunction',
    'write-good',
    'en-capitalization'
  ],
  filterRules: [
    'comments'
  ],
  rulesConfig: {
    'common-misspellings': true,
    'apostrophe': true,
    'diacritics': true,
    'stop-words': true,
    'terminology': true,
    'no-dead-link': true,
    'no-start-duplicated-conjunction': true,
    'write-good': {
      cliches: false,
      passive: false
    },
    'en-capitalization': {
      allowHeading: false
    }
  },
  filtersRulesConfig: {
    comments: true
  }
}

module.exports = function createConfig (options) {
  const config = merge({}, DEFAULT_CONFIG)
  let disableRules = options.disable

  if (typeof disableRules === 'string') {
    disableRules = [disableRules]
  }

  if (disableRules) {
    disableRules.forEach(rule => {
      if (config.rulesConfig[rule]) {
        config.rulesConfig[rule] = false
      }
    })
  }

  return config
}
