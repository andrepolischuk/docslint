import test from 'ava'
import fs from 'fs'
import execa from 'execa'

test('should lint', async t => {
  const {stdout} = await execa('./cli.js', ['./fixture.md'])
  t.true(stdout.indexOf('http://andrepolischuk.com is redirected') > 0)
  t.true(stdout.indexOf('Avoid using “Currently” ') > 0)
  t.true(stdout.indexOf('Correct it to misspelling') > 0)
  t.true(stdout.indexOf('use “Markdown” instead') > 0)
})

test('should fix', async t => {
  fs.copyFileSync('./fixture.md', './temp-fixture.md')
  const {stdout} = await execa('./cli.js', ['./temp-fixture.md', '--fix'])
  t.true(stdout.indexOf('http://andrepolischuk.com is redirected') > 0)
  t.true(stdout.indexOf('Correct it to misspelling') > 0)
  t.true(stdout.indexOf('use “Markdown” instead') > 0)
  t.true(stdout.indexOf('Avoid using “Currently” ') === -1)
  fs.unlinkSync('./temp-fixture.md')
})
