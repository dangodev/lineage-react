module.exports = {
  extends: ["react"],
  rules: {
    "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
    quotes: 0
  },
  settings: {
    "import/resolver": {
      webpack: {
        config: "config/webpack.dev.js"
      }
    }
  }
};
