import test from 'ava'
import execa from 'execa'
import fs from 'fs-extra'

test('should lint', async t => {
  const stdout = await execa.stdout('./cli.js', ['./README.md'])
  t.is(stdout, '')
})

test('should lint with error', async t => {
  const err = await t.throws(execa.stdout('./cli.js', ['./fixture.md']))
  t.is(err.code, 1)
  t.true(err.stdout.indexOf('http://andrepolischuk.com is redirected') > 0)
  t.true(err.stdout.indexOf('Avoid using “Currently” ') > 0)
  t.true(err.stdout.indexOf('Correct it to misspelling') > 0)
  t.true(err.stdout.indexOf('use “Markdown” instead') > 0)
})

test('should fix some errors', async t => {
  await fs.copy('./fixture.md', './temp-fixture.md')
  const stdout = await execa.stdout('./cli.js', ['./temp-fixture.md', '--fix'])
  t.true(stdout.indexOf('http://andrepolischuk.com is redirected') > 0)
  t.true(stdout.indexOf('Correct it to misspelling') > 0)
  t.true(stdout.indexOf('use “Markdown” instead') > 0)
  t.true(stdout.indexOf('Avoid using “Currently” ') === -1)
  await fs.remove('./temp-fixture.md')
})
