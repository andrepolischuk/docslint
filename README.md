# docslint [![Build Status][travis-image]][travis-url]

> Lint and fix docs simpler

So under the hood `docslint` uses [`textlint`][textlint] with predefined rule set.

## Install

```sh
npm install --global docslint
```

## Usage

```sh
docslint --help

  Lint and fix docs simpler

  Usage
    docslint [...files]

  Options
    --fix  Automatically fix problems

  Examples
    docslint README.md
    docslint --fix README.md
```

## License

MIT

[travis-url]: https://travis-ci.org/andrepolischuk/docslint
[travis-image]: https://travis-ci.org/andrepolischuk/docslint.svg?branch=master

[textlint]: https://github.com/textlint/textlint
