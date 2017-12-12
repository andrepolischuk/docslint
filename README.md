# docslint [![Build Status][travis-image]][travis-url]

> Lint and fix docs simpler

Under the hood `docslint` uses [`textlint`][textlint] with predefined rule set. It’s a simple zero-config tool that works out of the box like [`standard`][standard] and [`xo`][xo].

## Install

```sh
npm install --global docslint
```

## Usage

```sh
docslint --help

  Lint and fix docs simpler

  Usage
    docslint [file|glob ...]

  Options
    --fix      Automatically fix issues
    --disable  Rules to disable, can be set multiple times

  Examples
    docslint
    docslint readme.md
    docslint *.md !readme.md
    docslint --fix
    docslint --disable terminology
```

## Rules

[Base configuration](https://github.com/andrepolischuk/docslint/blob/master/lib/createConfig.js#L19-L33) contains following rules:

* [`common-misspellings`](https://github.com/io-monad/textlint-rule-common-misspellings) — check common misspellings
* [`apostrophe`](https://github.com/sapegin/textlint-rule-apostrophe) — check and fix correct apostrophe usage
* [`diacritics`](https://github.com/sapegin/textlint-rule-diacritics) — check and fix the usage of diacritics
* [`stop-words`](https://github.com/sapegin/textlint-rule-stop-words) — find filler words, buzzwords and clichés
* [`terminology`](https://github.com/sapegin/textlint-rule-terminology) — check and fix correct terms spelling
* [`no-dead-link`](https://github.com/nodaguti/textlint-rule-no-dead-link) — check if all links are available or not
* [`no-start-duplicated-conjunction`](https://github.com/azu/textlint-rule-no-start-duplicated-conjunction) — check no start with duplicated conjunction
* [`real-symbols`](https://github.com/andrepolischuk/textlint-rule-real-symbols) — check and fix symbols
* [`write-good`](https://github.com/nodaguti/textlint-rule-write-good) — naive linter for English prose for developers
* [`en-capitalization`](https://github.com/textlint-rule/textlint-rule-en-capitalization) — check and fix capitalization

You can disable any rule by running `docslint` with `--disable <rule>` flag.

## License

MIT

[travis-url]: https://travis-ci.org/andrepolischuk/docslint
[travis-image]: https://travis-ci.org/andrepolischuk/docslint.svg?branch=master

[textlint]: https://github.com/textlint/textlint
[standard]: https://github.com/standard/standard
[xo]: https://github.com/sindresorhus/xo
