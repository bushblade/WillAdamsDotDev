module.exports = {
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  semi: false,
  singleQuote: true,
  bracketSpacing: true,
  bracketSameLine: false,
  jsxSingleQuote: true,
  trailingComma: "es5",
  arrowParens: "avoid",
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
