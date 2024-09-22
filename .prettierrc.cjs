module.exports = {
  plugins: ["prettier-plugin-organize-imports", "prettier-plugin-jsdoc"],
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: true,
  trailingComma: "all",
  arrowParens: "avoid",
  overrides: [
    {
      files: ["*.js", "*.ts", "*.tsx", "*.cjs"],
      options: {
        jsdocSeperateReturnsFromParam: true,
        jsdocSeparateTagGroups: true,
        jsdocPreferCodeFences: true,
        jsdocPrintWidth: 100,
        jsDocCapitalizeDescription: false,
      },
    },
    {
      files: "*.css",
      options: {
        parser: "css",
        tabWidth: 4,
        singleQuote: false,
      },
    },
    {
      files: "*.json",
      options: {
        tabWidth: 4,
        singleQuote: false,
      },
    },
  ],
};
