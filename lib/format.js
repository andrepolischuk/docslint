'use strict'
const path = require('path')
const chalk = require('chalk')
const pluralize = require('numd')
const logSymbols = require('log-symbols')
const stringWidth = require('string-width')

module.exports = function format (results, options) {
  const lines = []
  const fix = options.fix
  let errors = 0
  let fixable = 0
  let warnings = 0
  let maxLineWidth = 0
  let maxColumnWidth = 0
  let maxMessageWidth = 0
  let showLineNumbers = false

  results.forEach(result => {
    const messages = result.messages

    if (messages.length === 0) {
      return
    }

    if (lines.length > 0) {
      lines.push({
        type: 'separator'
      })
    }

    const filePath = result.filePath

    lines.push({
      type: 'header',
      filePath,
      relativeFilePath: path.relative('.', filePath),
      firstLineCol: messages[0].line + ':' + messages[0].column
    })

    messages.forEach(m => {
      let severity

      const message = m.message.replace(
        /\B`(.*?)`\B|\B'(.*?)'\B/g,
        (m, p1, p2) => chalk.bold(p1 || p2)
      )

      if (m.fatal || m.severity === 2) {
        severity = 'error'
        errors++
      } else {
        severity = 'warning'
        warnings++
      }

      if (fix && m.fix) {
        severity = 'success'
      }

      if (m.fix) {
        fixable++
      }

      const line = String(m.line || 0)
      const column = String(m.column || 0)
      const lineWidth = stringWidth(line)
      const columnWidth = stringWidth(column)
      const messageWidth = stringWidth(message)

      maxLineWidth = Math.max(lineWidth, maxLineWidth)
      maxColumnWidth = Math.max(columnWidth, maxColumnWidth)
      maxMessageWidth = Math.max(messageWidth, maxMessageWidth)
      showLineNumbers = showLineNumbers || m.line || m.column

      lines.push({
        type: 'message',
        severity,
        line,
        lineWidth,
        column,
        columnWidth,
        message,
        messageWidth,
        ruleId: m.ruleId || ''
      })
    })
  })

  let output = '\n'

  output += lines
    .map(l => {
      if (l.type === 'header') {
        const position = showLineNumbers
          ? chalk.hidden.dim.gray(`:${l.firstLineCol}`)
          : ''

        return '  ' + chalk.underline(l.relativeFilePath) + position
      }

      if (l.type === 'message') {
        const line = [
          '',
          logSymbols[l.severity],
          ' '.repeat(maxLineWidth - l.lineWidth) + chalk.dim(l.line + chalk.gray(':') + l.column),
          ' '.repeat(maxColumnWidth - l.columnWidth) + l.message,
          ' '.repeat(maxMessageWidth - l.messageWidth) + chalk.gray.dim(l.ruleId)
        ]

        if (!showLineNumbers) {
          line.splice(2, 1)
        }

        return line.join('  ')
      }

      return ''
    })
    .join('\n')

  output += '\n\n'

  if (warnings > 0) {
    output += '  ' + chalk.yellow(pluralize(warnings, 'warning', 'warnings')) + '\n'
  }

  if (errors > 0) {
    output += '  ' + chalk.red(pluralize(errors, 'error', 'errors')) + '\n'
  }

  if (fixable > 0) {
    output += '  ' + chalk.green(`${fixable} ${fix ? 'fixed' : 'fixable'}`) + '\n'
  }

  return (errors + warnings) > 0 ? output : ''
}
