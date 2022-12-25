module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['plugin:import/recommended', 'airbnb', 'prettier'],
  plugins: ['react', 'react-hooks', '@typescript-eslint', 'unused-imports'],
  rules: {
    // clutter out unused imports
    'unused-imports/no-unused-imports': 'error',
  },
  overrides: [
    {
      files: 'packages/client/**',
      extends: [
        'plugin:react/recommended',
        'plugin:import/typescript',
        'airbnb-typescript',
        'plugin:jsx-a11y/recommended',
        'next',
      ],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      rules: {
        // prefer named arrow-function components
        'react/function-component-definition': [
          'error',
          { namedComponents: 'arrow-function' },
        ],
        // airbnb is using .jsx
        'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }],
        // enforces premature optimization
        'react/jsx-no-bind': 'off',
        // Great for raising awareness; however, sometimes not needed
        // if data is never expected to change (i.e. non-state data)
        'react/no-array-index-key': 'warn',
        'react/no-danger': 'error',
        'react/no-direct-mutation-state': 'error',
        // use ES6+ deconstructed inner props instead of defaultProps
        'react/require-default-props': 'off',
        'react/sort-prop-types': 'error',
        'react/jsx-props-no-spreading': 'warn',
        // enforces react hook rules
        'react-hooks/rules-of-hooks': 'error',

        // rule may produce incorrect errors
        '@typescript-eslint/indent': 'warn',
        indent: 'off',
        // disabled type-aware linting due to performance considerations
        '@typescript-eslint/dot-notation': 'off',
        'dot-notation': 'error',
        // disabled type-aware linting due to performance considerations
        '@typescript-eslint/no-implied-eval': 'off',
        'no-implied-eval': 'error',
        // disabled type-aware linting due to performance considerations
        '@typescript-eslint/no-throw-literal': 'off',
        'no-throw-literal': 'error',
        // disabled type-aware linting due to performance considerations
        '@typescript-eslint/return-await': 'off',
        'no-return-await': 'error',
      },
    },
    {
      files: 'packages/server/**',
      parserOptions: {
        ecmaVersion: 'latest',
      },
      rules: {
        // Prefer in situations where destructuring multiple values
        'prefer-destructuring': 'off',
        'no-underscore-dangle': 'off',
      },
    },
    {
      // match all ui components
      files: 'packages/client/**/ui/*.tsx',
      rules: {
        'react/no-array-index-key': 'off',
        'react/jsx-props-no-spreading': 'off',
      },
    },
    {
      // match all entry files
      files: 'packages/**/**/index.ts',
      rules: {
        'import/prefer-default-export': 'off',
      },
    },
  ],
};
