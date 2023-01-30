module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  extends: ['eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    "plugin:eslint-plugin-react/recommended",
    "plugin:eslint-plugin-react/jsx-runtime",
    'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.eslint.json', './packages/*/tsconfig.json'],
    tsconfigRootDir: __dirname,
    ecmaFeatures: {
      jsx: true,
      tsx: true
    }
  },
  plugins: ['@typescript-eslint', "simple-import-sort", "eslint-plugin-react"],
  rules: {
    '@typescript-eslint/ban-ts-comment': 1,
    'no-duplicate-imports': ["error", { "includeExports": true }],
    'eol-last': 2,
    'prefer-const': 2,
    'no-eval': 2,
    'no-var': 2,
    'no-multi-str': 2,
    'arrow-parens': 2,
    'indent': ["error", 2],
    'semi': 2,
    'eqeqeq': 2,
    "simple-import-sort/imports": ["error", {
      groups: [
        [
          "^(assert|buffer|child_process|cluster|console|constants|crypto|dgram|dns|domain|events|fs|http|https|module|net|os|path|punycode|querystring|readline|repl|stream|string_decoder|sys|timers|tls|tty|url|util|vm|zlib|freelist|v8|process|async_hooks|http2|perf_hooks)(/.*|$)",
        ],
        ["^react", "^@?\\w"],
        ["^(@|@company|@ui|components|utils|config|vendored-lib)(/.*|$)"],
        ["^\\u0000"],
        ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
        ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
        ["^.+\\.s?css$"],
      ],
    },
    ],
    "simple-import-sort/exports": "error",
    "@typescript-eslint/naming-convention": [
      "error",
      {
        "selector": "variable",
        "format": ["camelCase", "UPPER_CASE", "PascalCase"]
      },
      {
        "selector": "objectLiteralProperty",
        "format": ["camelCase", "UPPER_CASE"]
      },
      {
        "selector": "parameter",
        "format": ["camelCase"],
        "leadingUnderscore": "allow"
      },
      {
        "selector": "memberLike",
        "modifiers": ["private"],
        "format": ["camelCase"],
      },
      {
        "selector": "variable",
        "types": ["boolean"],
        "format": ["PascalCase"],
        "prefix": ["is", "should", "has", "can", "did", "will"]
      },
      {
        "selector": "typeParameter",
        "format": ["PascalCase"],
        "prefix": ["T_", "T"]
      },
      {
        "selector": "typeAlias",
        "format": ["PascalCase"],
        "prefix": ["T_"]
      },
      {
        "selector": "interface",
        "format": ["PascalCase"],
        "prefix": ["I_"]
      },
      {
        "selector": [
          "classProperty",
          "objectLiteralProperty",
          "typeProperty",
          "classMethod",
          "objectLiteralMethod",
          "typeMethod",
          "accessor",
          "enumMember"
        ],
        "format": null,
        "modifiers": ["requiresQuotes"]
      },
    ],
    "react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error",
    "react/hook-use-state": "error",
    "react/jsx-key": "error",
    "react/no-array-index-key": "error",
    "react/no-multi-comp": "error",
    "react/no-set-state": "error",
    "react/prefer-read-only-props": "error",
    "react/function-component-definition": ["error", { "namedComponents": "arrow-function" }]
  },
  settings: {
    "react": {
      "version": "detect",
    },
  }
};
