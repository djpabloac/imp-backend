module.exports = {
  'extends'    : [ 'plugin:@typescript-eslint/recommended', ],
  parser       : '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      arrowFunctions                  : true,
      blockBindings                   : true,
      classes                         : true,
      defaultParams                   : true,
      destructuring                   : true,
      experimentalObjectRestSpread    : true,
      forOf                           : true,
      generators                      : true,
      modules                         : true,
      objectLiteralComputedProperties : true,
      objectLiteralShorthandMethods   : true,
      objectLiteralShorthandProperties: true,
      restParams                      : true,
      spread                          : true,
      templateStrings                 : true,
    },
    ecmaVersion: 2018,
    sourceType : 'module',
  },
  plugins: [ '@typescript-eslint', 'sort-keys-fix', ],
  rules  : {
    '@typescript-eslint/ban-ts-ignore'                : 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/member-delimiter-style'       : [ 'error', {
      multiline: {
        delimiter  : 'semi',
        requireLast: true,
      },
      singleline: {
        delimiter  : 'semi',
        requireLast: true,
      },
    }, ],
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-unused-vars'       : 'error',
    '@typescript-eslint/no-var-requires'      : 0,
    'array-bracket-spacing'                   : [ 'error', 'always', ],
    'arrow-body-style'                        : [ 'error', 'as-needed', ],
    'arrow-spacing'                           : 'error',
    'comma-dangle'                            : [ 'error', {
      arrays   : 'always',
      exports  : 'always',
      functions: 'never',
      imports  : 'always',
      objects  : 'always',
    }, ],
    'comma-spacing': [ 'error', { after: true, before: false, }, ],
    'comma-style'  : [ 'error', 'last', ],
    curly          : [ 2, 'multi', 'consistent', ],
    'dot-location' : [ 2, 'property', ],
    'eol-last'     : 2,
    eqeqeq         : [ 'error', 'always', ],
    indent         : [
      2,
      2,
      {
        SwitchCase: 1,
      },
    ],
    'key-spacing': [
      2,
      {
        align: 'colon',
      },
    ],
    'keyword-spacing': [
      2,
      {
        overrides: {
          'catch': {
            before: true,
          },
          'if': {
            after: false,
          },
          'while': {
            before: true,
          },
        },
      },
    ],
    'max-len': [
      'error',
      {
        code         : 150,
        ignorePattern: '^\\s*var\\s.+=\\s*require\\s*\\(',
        ignoreStrings: true,
        ignoreUrls   : true,
      },
    ],
    'no-empty': [
      2,
      {
        allowEmptyCatch: true,
      },
    ],
    'no-mixed-spaces-and-tabs': 2,
    'no-multi-str'            : 2,
    'no-multiple-empty-lines' : [ 'error', { max: 1, maxEOF: 1, }, ],
    'no-restricted-syntax'    : [
      'warn',
      {
        message : 'Unexpected property on console object was called',
        selector: 'CallExpression[callee.object.name=\'console\'][callee.property.name=/^(log|warn|error|info|trace)$/]',
      },
    ],
    'no-spaced-func'                 : 2,
    'no-trailing-spaces'             : 2,
    'no-unused-vars'                 : 'off',
    'no-with'                        : 2,
    'object-curly-spacing'           : [ 'error', 'always', ],
    'operator-linebreak'             : [ 2, 'after', ],
    'padded-blocks'                  : [ 'error', 'never', ],
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', next: 'return', prev: '*', },
    ],
    'prefer-destructuring': [
      'error', {
        array : true,
        object: true,
      }, {
        enforceForRenamedProperties: false,
      },
    ],
    'quote-props': [
      2,
      'as-needed',
      {
        keywords: true,
      },
    ],
    quotes: [
      2,
      'single',
      {
        avoidEscape: true,
      },
    ],
    semi                         : [ 2, 'always', ],
    'sort-keys-fix/sort-keys-fix': 'error',
    'space-before-blocks'        : [ 2, 'always', ],
    'space-before-function-paren': [
      2,
      {
        anonymous: 'ignore',
        named    : 'never',
      },
    ],
    'space-in-parens': [ 2, 'never', ],
    'space-infix-ops': 2,
    'space-unary-ops': [
      2,
      {
        nonwords: false,
        words   : false,
      },
    ],
    'spaced-comment': [ 2, 'always', ],
    'wrap-iife'     : 2,
    yoda            : [ 2, 'never', ],
  },
};
