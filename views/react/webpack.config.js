var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:3009',
    'webpack/hot/only-dev-server',
    __dirname+'/index.js'
  ],
  output: {
    path: __dirname + '/../../public/',
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [{
      test: /\.jsx{0,1}$/,
      loader: 'react-hot-loader!babel-loader?'+JSON.stringify({presets:['react','es2015']}),
      exclude: /node_modules/,
      include: __dirname
    }]
  }
};
