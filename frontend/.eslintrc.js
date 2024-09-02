module.exports = {
  "extends": [
    "next/core-web-vitals",
    "plugin:import/recommended",
    "prettier"
  ],
  "rules": {
    "react/jsx-key": "off",
    "jsx-a11y/alt-text": "off",
    "react/display-name": "off",
    "react/no-children-prop": "off",
    "@next/next/no-img-element": "off",
    "@next/next/no-page-custom-font": "off",
    'padding-line-between-statements': 'off',
    'import/newline-after-import': 'off',
    'newline-before-return': 'off',
    'import/order': 'off',
    'lines-around-comment': 'off',
    // "lines-around-comment": [
    //   "error",
    //   {
    //     "beforeBlockComment": false,
    //     "beforeLineComment": false,
    //     "allowBlockStart": false,
    //     "allowObjectStart": false,
    //     "allowArrayStart": false
    //   }
    // ],
    // "padding-line-between-statements": [
    //   "error",
    //   {
    //     "blankLine": "any",
    //     "prev": "export",
    //     "next": "export"
    //   },
    //   {
    //     "blankLine": "always",
    //     "prev": [
    //       "const",
    //       "let",
    //       "var"
    //     ],
    //     "next": "*"
    //   },
    //   {
    //     "blankLine": "any",
    //     "prev": [
    //       "const",
    //       "let",
    //       "var"
    //     ],
    //     "next": [
    //       "const",
    //       "let",
    //       "var"
    //     ]
    //   },
    //   {
    //     "blankLine": "always",
    //     "prev": "*",
    //     "next": [
    //       "function",
    //       "multiline-const",
    //       "multiline-block-like"
    //     ]
    //   },
    //   {
    //     "blankLine": "always",
    //     "prev": [
    //       "function",
    //       "multiline-const",
    //       "multiline-block-like"
    //     ],
    //     "next": "*"
    //   }
    // ],
    // "newline-before-return": "error",
    // "import/newline-after-import": [
    //   "error",
    //   {
    //     "count": 1
    //   }
    // ],
    // "import/order": [
    //   "error",
    //   {
    //     "groups": [
    //       "builtin",
    //       "external",
    //       [
    //         "internal",
    //         "parent",
    //         "sibling",
    //         "index"
    //       ],
    //       [
    //         "object",
    //         "unknown"
    //       ]
    //     ],
    //     "pathGroups": [
    //       {
    //         "pattern": "react",
    //         "group": "external",
    //         "position": "before"
    //       },
    //       {
    //         "pattern": "next/**",
    //         "group": "external",
    //         "position": "before"
    //       },
    //       {
    //         "pattern": "~/**",
    //         "group": "external",
    //         "position": "before"
    //       },
    //       {
    //         "pattern": "@/**",
    //         "group": "internal"
    //       }
    //     ],
    //     "pathGroupsExcludedImportTypes": [
    //       "react",
    //       "type"
    //     ],
    //     "newlines-between": "always-and-inside-groups"
    //   }
    // ]
  },
  "settings": {
    "react": {
      "version": "detect"
    },
    "import/parsers": {},
    "import/resolver": {
      "node": {},
      "typescript": {
        "project": "./jsconfig.json"
      }
    }
  },
  "overrides": []
}
