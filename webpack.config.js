const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(svg|jpeg|jpg|png|gif)$/i,
        type: "asset/resource"
      }
    ]
  },
  devtool: "inline-source-map",
  mode: "production"
}