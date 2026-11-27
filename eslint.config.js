const js = require('@eslint/js');
const n = require('eslint-plugin-n');
const prettierRecommended = require('eslint-plugin-prettier/recommended');
const unicorn = require('eslint-plugin-unicorn').default;
const globals = require('globals');

module.exports = [
  {
    ignores: ['test-reports/', 'coverage/'],
  },
  js.configs.recommended,
  n.configs['flat/recommended-script'],
  unicorn.configs.recommended,
  prettierRecommended,
  {
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: 'commonjs',
      globals: {
        ...globals.node,
      },
    },
    rules: {
      // The package is CommonJS because Serverless Framework v3 loads plugins with require().
      // Converting it to ES modules would change how consumers load the plugin.
      'unicorn/prefer-module': 'off',

      // Allow abbreviated names such as acc, msg and Vars. This was 'unicorn/prevent-abbreviations'
      // in older unicorn versions and was already turned off.
      'unicorn/name-replacements': 'off',

      // Keep the standard JSDoc style with an asterisk at the start of each line.
      'unicorn/no-asterisk-prefix-in-documentation-comments': 'off',

      // These two rules would restructure loops and conditions in the published source.
      // They are turned off so that the plugin code stays unchanged.
      'unicorn/no-for-each': 'off',
      'unicorn/prefer-early-return': 'off',

      // Use camelCase for files (and directories - not enforced)
      'unicorn/filename-case': ['error', { case: 'camelCase' }],

      // Turn off explicit length checks
      'unicorn/explicit-length-check': 'off',

      // Turned off because it leads to many uses of the word 'error' in the same block, which is confusing
      'unicorn/catch-error-name': 'off',

      // This rule is no good for test specs
      'unicorn/consistent-function-scoping': 'off',

      // Not convinced that this is the right approach
      'unicorn/no-array-reduce': 'off',
    },
  },
  {
    files: ['**/*.spec.js'],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
    rules: {
      // Test specs load fixtures that are not part of the published package
      'n/no-unpublished-require': 'off',
    },
  },
];
