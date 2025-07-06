module.exports = [
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: require("@typescript-eslint/parser"),
      parserOptions: {
        project: "./tsconfig.json"
      }
    },
    rules: {
      "semi": ["error", "always"],
      "quotes": ["error", "single"],
      "object-curly-spacing": ["error", "always"]
    }
  }
];
