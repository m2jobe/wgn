const webpack = require("webpack");
const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const config = {
  mode: "development",
  performance: { hints: false },

  plugins: [
    new webpack.DefinePlugin({
      DEVELOPMENT: true,
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: "src/assets", to: "assets" },
        { from: "src/elsyium.html", to: "elsyium.html" },
        { from: "src/elsyium.js", to: "elsyium.js" },
      ],
    }),
    new HtmlWebpackPlugin({
      template: "src/index.html",
      inject: false,
      title: "development",
      meta: {
        viewport:
          "width=device-width, initial-scale=1, shrink-to-fit=no, maximum-scale=1.0, user-scalable=no",
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(glsl|vs|fs|vert|frag)$/,
        use: ["raw-loader", "glslify-loader"],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            compact: false,
            presets: [["@babel/preset-env"]],
            plugins: [["@babel/transform-runtime"]],
          },
        },
      },
    ],
  },
};

config.devtool = "#source-map";

var main = Object.assign({}, config, {
  entry: {
    build: "./src/index.js",
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
});
var elsyium = Object.assign({}, config, {
  entry: {
    build: "./src/elsyium.js",
  },
  output: {
    filename: "elsyiumbuild.js",
    path: path.resolve(__dirname, "dist"),
  },
});

module.exports = (env) => {
  const isProd = env && env.prod;

  if (!isProd) {
    config.devtool = "#source-map";
  }

  return [main, elsyium];
};
