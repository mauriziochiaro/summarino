const path = require('path');
const Dotenv = require('dotenv-webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    background: './src/background.js',
    content: './src/content.js'
  },
  output: {
    filename: '[name].js',  // genera background.js e content.js
    path: path.resolve(__dirname, 'dist')
  },
  mode: 'production',
  plugins: [
    new Dotenv(),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/manifest.json', to: '' }
      ]
    })
  ]
};
