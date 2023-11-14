module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended'
  ],
  parseOption: {
    sourceType: 'module',
    project: ["./tsconfig.json"]
  },
  ignorePatterns: ['dist', '.eslintrc.cjs', "vite.config.ts"],
  parser: '@typescript-eslint/parser',
  plugins: ["@typescript-eslint",'react-refresh', 'import', 'prettier'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    "import/order": [
      "error",
      {
          alphabetize: {
              order: "asc",
              caseInsensitive: true,
          },
          "newlines-between": "always",
          groups: ["builtin", "external", "parent", "sibling", "index"],
          pathGroups: [
              {
                  pattern: "react",
                  group: "external",
                  position: "before",
              },
          ],
          pathGroupsExcludedImportTypes: ["builtin"],
      },
  ],
  "prettier/prettier": [
      "error",
      {
          endOfLine: "auto",
      },
  ],
  "no-unused-vars": "off",
  },
}
