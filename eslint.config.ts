import globals from 'globals'
import pluginJs from '@eslint/js'
import stylistic from '@stylistic/eslint-plugin'
// import { Linter } from 'eslint';

export default [
  stylistic.configs.recommended,
  pluginJs.configs.recommended,
  {
    files: ['**/*.{js,ts,tsx}'],
  },
  {
    languageOptions: {
      globals: globals.node,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
    },
  },
] // satisfies Linter.Config[]
