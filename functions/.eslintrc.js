module.exports = {
  env: {
    es6: true,
    node: true
  },
  parserOptions: {
    "ecmaVersion": 2018
  },
  extends: [
    "eslint:recommended",
    "google"
  ],
  rules: {
    "no-restricted-globals": ["error", "name", "length"],
    "prefer-arrow-callback": "error",
    "quotes": ["error", "double", {"allowTemplateLiterals": true}],
    "max-len": ["off"], // Disable max-len rule
    "comma-dangle": ["error", "never"], // Optional: Fix trailing comma issue
    "object-curly-spacing": ["error", "never"], // Optional: Fix spacing issue
    "eol-last": ["error", "always"], // Optional: Ensure newline at end of file
    "semi": ["error", "always"] // Optional: Ensure semicolon at end of statements
  },
  overrides: [
    {
      files: ["**/*.spec.*"],
      env: {
        mocha: true
      },
      rules: {}
    }
  ],
  globals: {}
};
