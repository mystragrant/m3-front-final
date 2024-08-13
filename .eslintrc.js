module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended", // Dodaje zalecenia dla TypeScript
    "plugin:react/recommended", // Dodaje zalecenia dla React (jeśli używasz React)
    "plugin:prettier/recommended", // Umożliwia integrację z Prettier
  ],
  parser: "@typescript-eslint/parser", // Określa parser TypeScript
  parserOptions: {
    ecmaFeatures: {
      jsx: true, // Umożliwia parsowanie JSX
    },
    ecmaVersion: 2021,
    sourceType: "module",
  },
  plugins: [
    "@typescript-eslint", // Używa pluginu TypeScript
    "react", // Używa pluginu React (jeśli używasz React)
    "prettier", // Umożliwia integrację z Prettier
  ],
  rules: {
    "react/react-in-jsx-scope": "off",
    "react/jsx-uses-react": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "no-useless-escape": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "no-empty": "off",
    "react/no-children-prop": "off",
    "@typescript-eslint/no-var-requires": "off",
    "no-useless-catch": "off",
    "react/jsx-key": "off",
    "no-empty-pattern": "off",
    "react/no-unescaped-entities": "off",
    "no-constant-condition": "off",
    "no-console": "off",
  },
  settings: {
    react: {
      version: "detect", // Automatycznie wykrywa wersję React (jeśli używasz React)
    },
  },
};
