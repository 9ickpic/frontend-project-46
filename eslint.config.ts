import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import stylistic from '@stylistic/eslint-plugin';
// import { Linter } from 'eslint';

export default [
  stylistic.configs.recommended,
  pluginJs.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
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
      '@typescript-eslint/no-unsafe-assignment': 'off', // Отключаем проверку unsafe assignment
      '@typescript-eslint/no-unsafe-member-access': 'off', // Отключаем проверку unsafe member access
      '@typescript-eslint/no-unsafe-call': 'off', // Отключаем проверку unsafe call
      '@typescript-eslint/no-explicit-any': 'off', // Отключаем проверку использования any
      '@typescript-eslint/no-unused-vars': 'off',

      '@stylistic/semi': 'off',
    },
  },
]; // satisfies Linter.Config[]
