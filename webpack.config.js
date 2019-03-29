const {VueLoaderPlugin} = require('vue-loader');

const path = require('path');

module.exports = {
  entry: './public/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'public')
  },
  resolve: {
    extensions: ['.js', '.scss', '.vue'],
    alias: {
      '@': path.resolve(__dirname, 'public')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: ['vue-loader']
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader',
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ]
};