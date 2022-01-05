module.exports = {
  env: {
    "jest/globals": true,
  },
  root: true,
  parser: "@typescript-eslint/parser", // Specifies the ESLint parser
  overrides: [
    {
      files: ["*.ts", "*.tsx"], // Your TypeScript files extension
      parserOptions: {
        ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
        ecmaFeatures: {
          jsx: true,
        },
        sourceType: "module", // Allows for the use of imports
        project: ["./tsconfig.json"], // Specify it only for TypeScript files
      },
    },
  ],
  extends: [
    "plugin:@typescript-eslint/recommended", // uses typescript-specific linting rules
    "plugin:react/recommended", // uses react-specific linting rules
    "prettier",
    "prettier/@typescript-eslint",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "plugin:react-hooks/recommended",
  ],
  plugins: [
    "jest",
    "react",
    "react-native",
    "react-hooks",
    "import", // eslint-plugin-import for custom configure
  ],
  rules: {
    semi: ["error", "never"],
    "object-curly-spacing": ["error", "always"],
    "array-bracket-spacing": ["error", "never"],
    "react/prop-types": 0,
    "no-console": "off",
    "global-require": "off",
    // note you must disable the base rule as it can report incorrect errors
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": ["error", { variables: false }],
    "no-restricted-imports": [2, { patterns: ["../*"] }],
    "react/jsx-filename-extension": [1, { extensions: [".tsx"] }],
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-empty-interface": "off",
    "@typescript-eslint/explicit-member-accessibility": "error",
    "react-hooks/rules-of-hooks": "error", // Checks rules of Hooks
    "react-hooks/exhaustive-deps": "warn", // Checks effect dependencies
    "@typescript-eslint/naming-convention": [
      "error",
      {
        selector: "interface",
        format: ["PascalCase"],
        custom: {
          regex: "^I[A-Z]",
          match: true,
        },
      },
    ],
    "react-native/no-unused-styles": 2,
    "react-native/no-inline-styles": 2,
    "react-native/no-raw-text": 2,
    // import plugins
    "import/no-unresolved": "error",
    "import/default": [0],
    "import/named": "error",
    "import/namespace": "error",
    "import/export": "error",
    "import/order": [
      "error",
      {
        groups: ["builtin", "external", "parent", "sibling", "index"],
      },
    ],
  },
  settings: {
    react: {
      version: "detect",
    },
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
        project: ".",
      },
      "babel-module": {},
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
  globals: {
    __DEV__: true,
  },
}
