import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import {defineConfig} from "eslint/config";
import eslintPluginImport from "eslint-plugin-import";

export default defineConfig([
  // Базовые правила ESLint
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    plugins: {
      js,
      import: eslintPluginImport
    },
    extends: [
      "eslint:recommended",
      "plugin:import/recommended",
      "plugin:import/typescript"
    ],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      },
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module"
      }
    },
    rules: {
      // Обязательные точки с запятой
      "semi": ["error", "always"],
      "semi-style": ["error", "last"],

      // Форматирование импортов
      "import/newline-after-import": ["error", {"count": 1}],
      "import/no-unresolved": "off", // Отключаем, так как TypeScript сам проверяет

      // Пробелы вокруг фигурных скобок в импортах
      "object-curly-spacing": ["error", "always"],

      // Пробелы в начале и конце файла
      "eol-last": ["error", "always"],
      "no-multiple-empty-lines": ["error", {"max": 1, "maxEOF": 0}],

      // Другие базовые правила
      "quotes": ["error", "single", {"avoidEscape": true}],
      "indent": ["error", 2],
      "comma-dangle": ["error", "never"]
    }
  },

  // TypeScript правила
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{ts,mts,cts}"],
    rules: {
      "@typescript-eslint/semi": ["error", "always"],
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/object-curly-spacing": ["error", "always"],
      "@typescript-eslint/member-delimiter-style": [
        "error",
        {
          "multiline": {
            "delimiter": "semi",
            "requireLast": true
          },
          "singleline": {
            "delimiter": "semi",
            "requireLast": false
          }
        }
      ]
    }
  },

  // Правила для тестовых файлов (можно добавить исключения)
  {
    files: ["**/*.test.{js,ts}"],
    rules: {
      "no-unused-expressions": "off"
    }
  }
]);
