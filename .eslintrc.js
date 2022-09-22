module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:import/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    project: "./tsconfig.json",
    ecmaVersion: 2018,
    sourceType: "module",
  },
  plugins: ["react", "prettier", "@typescript-eslint", "react-hooks"],

  rules: {
    "import/no-unresolved": "off",
    "react/react-in-jsx-scope": 0,
    "react/display-name": "off",
    "import/namespace": "off",
    "@typescript-eslint/ban-ts-ignore": "off",
    "react/prop-types": "off",
  },
}
