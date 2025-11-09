const js = require("@eslint/js")
const globals = require("globals")

module.exports = [
  {
    ignores: ["node_modules/", "coverage/", ".idea/"]  // Новый способ игнорирования
  },
  js.configs.recommended,
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "commonjs",
      globals: {
        ...globals.node,
        ...globals.jest,  // Добавили Jest глобалы
      }
    },
    rules: {
      "no-unused-vars": ["error", {
        "argsIgnorePattern": "^_|next",  // Игнорируем '_' и 'next'
        "varsIgnorePattern": "^_"
      }],
      "no-console": "off",
    }
  }
];
