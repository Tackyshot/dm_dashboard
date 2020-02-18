const path = require('path');

module.exports = {
  mode: "development",
  entry: './src/client/index.jsx',
  output: {
    path: path.resolve(__dirname, 'dist/assets/js'),
    filename: 'bundle.js'
  },
  resolve: {
    modules:[
      "node_modules",
      path.join(__dirname, 'client')
    ],
    alias:{
      helpers: `${__dirname}/src/client/helpers/`,
      state: `${__dirname}/src/client/state/`,
      common: `${__dirname}/src/client/components/_common/`,
      styles: `${__dirname}/src/client/components/_styles/`
    },
    extensions: [".webpack.js", ".web.js", ".js", '.jsx']
  },
  module: {
    rules: [
      {
        test: /(\.jsx$|\.js$)/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      }
    ]
  }
};