const { defineConfig, globalIgnores } = require('eslint/config');

const globals = require('globals');
const tsParser = require('@typescript-eslint/parser');
const react = require('eslint-plugin-react');
const reactHooks = require('eslint-plugin-react-hooks');
const typescriptEslint = require('@typescript-eslint/eslint-plugin');
const _import = require('eslint-plugin-import');

const { fixupPluginRules } = require('@eslint/compat');

const js = require('@eslint/js');

const { FlatCompat } = require('@eslint/eslintrc');

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

module.exports = defineConfig([
  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },

      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',

      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },

        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
      },
    },
    extends: [
      compat.extends(
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
        'prettier'
      ),
    ],

    settings: {
      react: {
        version: '19',
      },
    },

    plugins: {
      react,
      'react-hooks': reactHooks,
      '@typescript-eslint': typescriptEslint,
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

      'react/jsx-filename-extension': [
        2,
        {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      ],

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

    'rules': {
      'import/no-extraneous-dependencies': [
        'error',
        {
          'devDependencies': true,
        },
      ],
    },
  },
]);
