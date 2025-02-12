/* eslint-env node */
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  ignorePatterns: ['*.html'],
  settings: {
    react: {
      version: '18',
    },
  },
  overrides: [
    {
      files: ['src/**/features/*.ts'],
      rules: { 'no-param-reassign': ['error', { props: false }] },
    },
    {
      'files': ['vite.config.ts', 'vitest.config.ts'],
      'rules': {
        'import/no-extraneous-dependencies': ['error', { 'devDependencies': true }],
      },
    },
  ],
  plugins: ['react', '@typescript-eslint', 'import'],
  rules: {
    '@typescript-eslint/naming-convention': [
      1,
      {
        selector: 'variable',
        format: ['camelCase', 'snake_case'],
      },
    ],
    'react/react-in-jsx-scope': 0,
    'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
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
};
