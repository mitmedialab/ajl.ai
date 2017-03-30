const { resolve } = require('path');
const webpack = require('webpack');
const findCacheDir = require('find-cache-dir');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'source-map',

  context: resolve(__dirname, 'frontend'),

  entry: [
    './index.jsx',
  ],

  output: {
    // the output bundle
    filename: '[name]-[hash].min.js',

    path: resolve(__dirname, 'dist'),
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              // This is a feature of `babel-loader` for webpack (not Babel itself).
              // It enables caching results in ./node_modules/.cache/react-scripts/
              // directory for faster rebuilds. We use findCacheDir() because of:
              // https://github.com/facebookincubator/create-react-app/issues/483
              cacheDirectory: findCacheDir({
                name: 'react-scripts',
              }),
            },
          },
          // Before running code through babel, check it for lint errors
          {
            loader: 'eslint-loader',
            options: {
              // emit all errors as warnings: this lets us see all issues in the
              // dev console, but the presence of errors will not block rebuilds
              emitWarning: true,
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.styl$/,

        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                localIdentName: '[path][name]--[local]--[hash:base64:5]',
              },
            },
            'postcss-loader', // See postcss.config.js for options
            'stylus-loader',
          ],
        }),
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'url-loader?limit=10000',
        ],
      },
    ],
  },

  resolve: {
    extensions: ['.js', '.jsx'],
  },

  plugins: [
    // Inject generated scripts into the frontend/index.html template
    new HtmlWebpackPlugin({
      template: './index.html',
    }),

    // Set NODE_ENV to production so that Uglify can strip out dev-only code
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),

    // Extract css into bundle.css
    new ExtractTextPlugin('[name]-[contenthash].css'),

    // Minify with UglifyJS
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
  ],

};
