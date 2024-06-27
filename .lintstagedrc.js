const path = require('path')

const nextLintCommand = (filenames) =>
  `next lint --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' --file ')}`

module.exports = {
  '*': ['prettier --ignore-unknown --write'],
  '*.{ts,tsx}': [nextLintCommand],
}
