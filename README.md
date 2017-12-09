# docslint [![Build Status][travis-image]][travis-url]

> Lint and fix docs simpler

Under the hood `docslint` uses [`textlint`][textlint] with predefined rule set.

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
    --fix                Automatically fix issues
    --no-misspellings    Allow common misspellings
    --no-stop-words      Use stop words
    --no-terminology     Ignore terms
    --no-dead-link       Pass all links
    --no-write-good      Disable good writing
    --no-capitalization  Don't check capitalization

  Examples
    docslint
    docslint readme.md
    docslint *.md !readme.md
    docslint --fix
    docslint --no-stop-words
```

## License

MIT

[travis-url]: https://travis-ci.org/andrepolischuk/docslint
[travis-image]: https://travis-ci.org/andrepolischuk/docslint.svg?branch=master

[textlint]: https://github.com/textlint/textlint
