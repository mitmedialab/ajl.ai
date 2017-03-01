const { resolve } = require('path');
const webpack = require('webpack');
const findCacheDir = require('find-cache-dir');
const objectHash = require('node-object-hash');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const hardSourceCacheDir = findCacheDir({
  // Render into node_modules/.cache/hard-source/[confighash]/...
  name: 'hard-source/[confighash]'
});

module.exports = {
  devtool: 'cheap-module-source-map',

  context: resolve(__dirname, 'frontend'),

  entry: [
    // activate HMR for React
    'react-hot-loader/patch',

    // bundle the client for webpack-dev-server and connect to the provided endpoint
    'webpack-dev-server/client?http://localhost:8080',

    // bundle the client for hot reloading only (only hot reload for successful updates)
    'webpack/hot/only-dev-server',

    './index.jsx',
  ],

  output: {
    // the output bundle
    filename: 'bundle.js',

    path: resolve(__dirname, 'dist'),

    // necessary for HMR to know where to load the hot update chunks
    publicPath: '/'
  },

  devServer: {
    // enable HMR on the server
    hot: true,

    // match the output path
    contentBase: resolve(__dirname, 'dist'),

    // match the output `publicPath`
    publicPath: '/'
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
                name: 'react-scripts'
              })
            }
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.styl$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[path][name]--[local]--[hash:base64:5]'
            }
          },
          'postcss-loader', // See postcss.config.js for options
          'stylus-loader'
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        loader: 'url-loader?limit=10000'
      }
    ],
  },

  resolve: {
    extensions: ['.js', '.jsx'],
  },

  plugins: [
    // enable HMR globally
    new webpack.HotModuleReplacementPlugin(),

    // prints more readable module names in the browser console on HMR updates
    new webpack.NamedModulesPlugin(),

    // Inject generated scripts into the frontend/index.html template
    new HtmlWebpackPlugin({
      template: './index.html'
    }),

    // Use hard source caching for faster rebuilds
    new HardSourceWebpackPlugin({
      cacheDirectory: hardSourceCacheDir,
      recordsPath: resolve(hardSourceCacheDir, 'records.json'),

      // Build a string value used by HardSource to determine which cache to
      // use if [confighash] is in cacheDirectory, or if the cache should be
      // replaced if [confighash] does not appear in cacheDirectory.
      configHash: (webpackConfig) => objectHash().hash(webpackConfig)
    }),
  ],

};
