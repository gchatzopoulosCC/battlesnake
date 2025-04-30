import js from "@eslint/js";
import globals from "globals";

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
