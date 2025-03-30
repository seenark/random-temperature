// eslint.config.js
import antfu from '@antfu/eslint-config'
import oxlint from 'eslint-plugin-oxlint'
import perfectionist from "eslint-plugin-perfectionist"

export default [
  ...await antfu(
    {
      //   formatters: true,
      //    react: true,
      stylistic: {
        indent: 2,
        quotes: 'double',
      },
      typescript: true,
    },
    {
      plugins: [
        perfectionist.configs['recommended-alphabetical'],
        oxlint.configs['flat/all'],
      ],
      rules: {
        'no-console': 'warn',
        'perfectionist/sort-objects': 'error',
        'ts/consistent-type-definitions': 'off',
        'unicorn/throw-new-error': 'off',
        'unused-imports/no-unused-imports': 'error',
      },
    },
    {
      ignores: [
        'build',
        '**/*.json',
        '.husky/install.mjs',
      ],
    },
  ),
]

