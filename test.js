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
  t.true(err.stdout.indexOf('Avoid using “Currently”') > 0)
  t.true(err.stdout.indexOf('Correct it to misspelling') > 0)
  t.true(err.stdout.indexOf('use “Markdown” instead') > 0)
  t.true(err.stdout.indexOf('5 errors') > 0)
  t.true(err.stdout.indexOf('3 fixable') > 0)
})

test('should lint with flags', async t => {
  const err = await t.throws(execa.stdout('./cli.js', ['./fixture.md', '--disable', 'no-dead-link']))
  t.is(err.code, 1)
  t.true(err.stdout.indexOf('http://andrepolischuk.com is redirected') === -1)
  t.true(err.stdout.indexOf('Avoid using “Currently”') > 0)
  t.true(err.stdout.indexOf('Correct it to misspelling') > 0)
  t.true(err.stdout.indexOf('use “Markdown” instead') > 0)
  t.true(err.stdout.indexOf('4 errors') > 0)
  t.true(err.stdout.indexOf('2 fixable') > 0)
})

test('should fix some errors', async t => {
  await fs.copy('./fixture.md', './temp-fixture.md')
  const err = await t.throws(execa.stdout('./cli.js', ['./temp-fixture.md', '--fix']))
  t.true(err.stdout.indexOf('http://andrepolischuk.com is redirected') > 0)
  t.true(err.stdout.indexOf('Avoid using “Currently”') > 0)
  t.true(err.stdout.indexOf('Correct it to misspelling') > 0)
  t.true(err.stdout.indexOf('use “Markdown” instead') > 0)
  t.true(err.stdout.indexOf('2 errors') > 0)
  t.true(err.stdout.indexOf('3 issues are fixed') > 0)
  await fs.remove('./temp-fixture.md')
})
