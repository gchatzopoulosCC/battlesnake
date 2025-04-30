import js from "@eslint/js";
import globals from "globals";
import prettierConfig from "eslint-config-prettier";
import sonarjs from "eslint-plugin-sonarjs";
import eslintComments from "eslint-plugin-eslint-comments";
import unicorn from "eslint-plugin-unicorn";

export default [
  js.configs.recommended,
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
      },
    },
    linterOptions: {
      reportUnusedInlineConfigs: "error",
      reportUnusedDisableDirectives: "error",
    },
    plugins: {
      prettier: prettierConfig,
      sonarjs: sonarjs,
      unicorn: unicorn,
      "eslint-comments": eslintComments,
    },
    rules: {
      semi: ["error", "always"],
      quotes: ["warn", "double"],
      indent: ["error", 2],
      "prefer-const": [
        "error",
        {
          destructuring: "all",
          ignoreReadBeforeAssign: false,
        },
      ],
      "no-unused-vars": "error",
      eqeqeq: "error",
    },
  },
];
