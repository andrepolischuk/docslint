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

const flags = {
  misspellings: 'common-misspellings',
  stopWords: 'stop-words',
  terminology: 'terminology',
  writeGood: 'write-good',
  capitalization: 'en-capitalization'
}

module.exports = function createConfig (options) {
  const config = merge({}, DEFAULT_CONFIG)

  for (const option in options) {
    if (flags[option]) {
      config.rulesConfig[flags[option]] = options[option]
    }
  }

  if (options.deadLink === false) {
    config.rulesConfig['no-dead-link'] = false
  }

  return config
}
