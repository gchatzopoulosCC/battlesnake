import js from "@eslint/js";
import globals from "globals";
import prettierConfig from "eslint-config-prettier";
import sonarjs from "eslint-plugin-sonarjs";
import eslintComments from "eslint-plugin-eslint-comments";
import unicorn from "eslint-plugin-unicorn";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  js.configs.recommended,
  globalIgnores(["node_modules/", "out/"]),
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
  },
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
      },
    },
    plugins: {
      sonarjs: sonarjs,
      unicorn: unicorn,
    },
  },
  {
    files: ["**/*.test.{js,mjs,cjs}"],
    plugins: {
      "eslint-comments": eslintComments,
    },
    rules: {
      "eslint-comments/no-commented-out-code": "error",
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
      "no-duplicate-imports": "error",
      "no-multiple-empty-lines": [
        "warn",
        {
          max: 1,
          maxEOF: 0,
        },
      ],
    },
  },
  {
    linterOptions: {
      reportUnusedInlineConfigs: "error",
      reportUnusedDisableDirectives: "error",
    },
  },
  {
    rules: {},
  },
  prettierConfig,
]);
