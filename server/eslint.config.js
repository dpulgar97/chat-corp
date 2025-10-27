module.exports = {
  env: {
    node: true,
    es2021: true,
  },
  extends: "eslint:recommended",
  parserOptions: {
    ecmaVersion: 12, // Permite usar características de ES2021
    sourceType: "module", // Indica que estás utilizando ES Modules
  },
  rules: {
    // Reglas específicas para tu back-end
  },
};
