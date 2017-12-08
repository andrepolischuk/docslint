'use strict'

module.exports = {
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
