const prod = process.env.NODE_ENV === "production"

const HtmlWebpackPlugin = require("html-webpack-plugin")
const path = require("path")

module.exports = {
  mode: prod ? "production" : "development",
  entry: path.resolve(__dirname, "./src/index.tsx"),
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].bundle.js",
  },
  resolve: {
    alias: {
      "@api": path.resolve(__dirname, "src/api"),
      "@model": path.resolve(__dirname, "src/model/index.ts"),
      "@view": path.resolve(__dirname, "src/view"),
      "@component": path.resolve(__dirname, "src/component")
    }
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        resolve: {
          extensions: [".ts", ".tsx", ".js"],
        },
        use: "ts-loader",
      },
      {
        test: /\.less$/,
        use: [
          "style-loader",
          "css-loader",
          "less-loader",
        ]
      }
    ]
  },
  devtool: prod ? undefined : "source-map",
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html",
    })
  ]
}
