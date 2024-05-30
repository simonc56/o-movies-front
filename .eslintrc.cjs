/* eslint-env node */
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
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
  overrides: [
    {
      files: ['src/**/features/*.ts'],
      rules: { 'no-param-reassign': ['error', { props: false }] },
    },
  ],
  plugins: ['react', '@typescript-eslint'],
  rules: {
    '@typescript-eslint/naming-convention': [
      'warning',
      {
        selector: 'variable',
        format: ['camelCase', 'snake_case'],
      },
    ],
    'react/react-in-jsx-scope': 0,
    'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'react/jsx-props-no-spreading': 0,
    'jsx-a11y/label-has-associated-control': [2, { assert: 'either' }],
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
