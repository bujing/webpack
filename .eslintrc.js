module.exports = {
  "env": {
    "browser": true,
    "es6": true
  },
  "extends": [
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:vue/vue3-recommended"
  ],
  "parser": "vue-eslint-parser",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 2018,
    "parser": "@typescript-eslint/parser",
    "sourceType": "module"
  },
  "plugins": [
    "@typescript-eslint"
  ],
  "rules": {
    "@typescript-eslint/indent": ["error", 2],
    "arrow-spacing": ["error", { "before": true, "after": true }],
    "indent": ["error", 2, { "SwitchCase": 1 }], // case 和 switch 保持嵌套的缩进
    "no-unused-vars": "off",
    "quotes": ["error", "single"],
    "semi": ["error", "never"]
  }
};
