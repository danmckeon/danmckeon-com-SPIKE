const path = require('path');
const slsw = require('serverless-webpack');
const nodeExternals = require('webpack-node-externals');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: slsw.lib.entries,
  target: 'node',
  mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
  optimization: { minimize: false },
  performance: { hints: false },
  devtool: 'nosources-source-map',
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: __dirname, //do we want this?
        exclude: /node_modules/,
        loader: 'ts-loader'
        // query: {
        //   presets: ['es2015', 'react-app', 'stage-2'],
        //   plugins: ['css-modules-transform']
        // }
      },
      {
        test: /\.css?$/,
        include: __dirname, //do we want this?
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react-app', 'stage-2'],
          plugins: ['css-modules-transform']
        }
      },
      {
        test: /\.(png|jp(e*)g|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8000,
              name: 'images/[hash]-[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  plugins: [
    new CopyWebpackPlugin([{ from: 'client/build', to: 'build' }], {
      debug: 'info'
    })
  ]
  // output: {
  //   libraryTarget: 'commonjs2',
  //   path: path.join(__dirname, '.webpack'),
  //   filename: '[name].js',
  //   sourceMapFilename: '[file].map'
  // }
};
