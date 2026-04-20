import { defineConfig, globalIgnores } from 'eslint/config';

import typescriptEslint from '@typescript-eslint/eslint-plugin';
import eslintConfigPrettier from 'eslint-config-prettier';
import _import from 'eslint-plugin-import';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';

import { fixupPluginRules } from '@eslint/compat';

import js from '@eslint/js';

export default defineConfig([
  js.configs.recommended,
  ...typescriptEslint.configs['flat/recommended'],
  react.configs.flat.recommended,
  reactHooks.configs.flat['recommended-latest'],
  eslintConfigPrettier,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },

      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },

        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
      },
    },

    settings: {
      react: {
        version: '19',
      },
    },

    plugins: {
      import: fixupPluginRules(_import),
    },

    rules: {
      '@typescript-eslint/naming-convention': [
        1,
        {
          selector: 'variable',
          format: ['camelCase', 'snake_case'],
        },
      ],

      'react/react-in-jsx-scope': 0,

      'react/jsx-props-no-spreading': 0,
      'linebreak-style': 0,
      'no-restricted-imports': 0,

      '@typescript-eslint/no-restricted-imports': [
        'warn',
        {
          name: 'react-redux',
          importNames: ['useSelector', 'useDispatch'],
          message: 'Use typed hooks `useAppDispatch` and `useAppSelector` instead.',
        },
      ],

      'react/no-unescaped-entities': 0,
      'react/require-default-props': 0,
    },
  },
  globalIgnores(['**/*.html']),
  {
    files: ['src/**/features/*.ts'],

    rules: {
      'no-param-reassign': [
        'error',
        {
          props: false,
        },
      ],
    },
  },
  {
    files: ['**/vite.config.ts', '**/vitest.config.ts'],

    rules: {
      'import/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: true,
        },
      ],
    },
  },
]);
