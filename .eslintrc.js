module.exports = {
  "env": {
    "browser": true,
    "es6": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/eslint-recommended"
  ],
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "plugins": [
    "react",
    "@typescript-eslint"
  ],
  "rules": {
    "@typescript-eslint/indent": ["error", 2],
    "arrow-spacing": ["error", { "before": true, "after": true }],
    "indent": ["error", 2, { "SwitchCase": 1 }], // case 和 switch 保持嵌套的缩进
    "no-unused-vars": "off",
    "quotes": ["error", "single"],
    "react/prop-types": "off", // 使用 typescript 做静态类型检查
    "semi": ["error", "never"]
  }
};
