/* eslint-env node */
module.exports = {
  parser: "@typescript-eslint/parser",
  env: {
    browser: true,
  },
  plugins: ["@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
  ],
  rules: {
    "no-console": "warn",
    "react/prop-types": "off",
    "@typescript-eslint/no-explicit-any": "off",
    // TODO: I would like to enable this rule eventually
    "@typescript-eslint/explicit-module-boundary-types": "off",
  },
};
