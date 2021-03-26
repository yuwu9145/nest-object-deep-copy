const path = require('path')

module.exports = {
  entry: './src/index.js',
  mode: 'production',
  output: {
    filename: 'nest-object-hard-copy.js',
    path: path.resolve(__dirname, 'dist'),
  }
}