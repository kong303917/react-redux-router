var path = require('path');
var webpack = require('webpack');
var fs = require('fs');

var nodeModules = {};
fs.readdirSync('node_modules')
    .filter(function(x) {
      return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function(mod) {
      nodeModules[mod] = 'commonjs ' + mod;
    });

module.exports = {
  node:{
    console:true,
    __filename:true,
    __dirname:true
  },
  target:'node',
  devtool: false,
  entry: {
    //'serverRouter':'./server',
    //'serverApp':'./server.bak',
    'wwwApp':'./bin/www'
  },
  output: {
    path: __dirname + '/bin',
    filename: '[name].js'
  },
  externals: nodeModules,
  resolve: {
    extensions: ['','.js', '.jsx']
  },
  module: {
    loaders: [{
      test: /\.jsx{0,1}$/,
      loader: 'babel-loader?'+JSON.stringify({presets:['react','es2015']}),
      exclude: /node_modules/,
      include: __dirname
    }]
  }
};
