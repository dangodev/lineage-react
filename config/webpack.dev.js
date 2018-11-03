const history = require("connect-history-api-fallback");
const convert = require("koa-connect");
const merge = require("webpack-merge");

const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  serve: {
    host: process.env.MANIFOLD_DASHBOARD_URL || "0.0.0.0",
    port: 8080,
    content: [__dirname],
    dev: { publicPath: "/" },
    add: app => {
      app.use(convert(history({})));
    }
  }
});
