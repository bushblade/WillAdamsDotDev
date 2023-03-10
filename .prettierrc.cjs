module.exports = {
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  semi: false,
  singleQuote: true,
  bracketSpacing: true,
  jsxBracketSameLine: false,
  jsxSingleQuote: true,
  trailingComma: "es5",
  arrowFunctionParentheses: "avoid",
  plugins: [require.resolve("prettier-plugin-astro")],
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro",
      },
    },
  ],
};
