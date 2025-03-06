import globals from 'globals';
import pluginJs from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
// import { Linter } from 'eslint'

export default [
  stylistic.configs.recommended,
  pluginJs.configs.recommended,
  {
    files: ['**/*.{js,ts,tsx}'],
  },
  {
    ignores: ['dist/'],
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
      '@typescript-eslint/no-unused-vars': 'off',
      '@stylistic/semi': 'off',
      'no-underscore-dangle': [2, { allow: ['__filename', '__dirname'] }],
      'import/extensions': 0,
      'import/no-extraneous-dependencies': 0,
      'no-console': 0,
      '@stylistic/arrow-parens': 'off',
    },
  },
]; // satisfies Linter.Config[]
