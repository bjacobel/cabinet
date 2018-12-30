const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env = {}) => {
  const isProd = env.production || ['production'].includes(process.env.NODE_ENV);

  const config = {
    mode: isProd ? 'production' : 'development',
    output: {
      path: `${__dirname}/dist`,
      filename: isProd ? '[name].[hash].js' : '[name].js',
      publicPath: isProd ? '/' : 'http://localhost:8080/',
    },
    devtool: isProd ? false : 'source-map',
    module: {
      rules: [
        {
          test: /\.(png|jpe?g|gif|svg)(\?[a-z0-9=]+)?$/,
          use: 'file-loader',
        },
        {
          test: /\.js$/,
          include: path.join(__dirname, 'src'),
          use: 'babel-loader',
        },
        {
          test: /\.ejs$/,
          use: 'ejs-webpack-loader',
        },
      ],
    },
    resolve: {
      extensions: ['.js', '.json', '.css'],
      modules: [__dirname, path.resolve(__dirname, 'src'), 'node_modules'],
      alias: {
        react: 'preact-compat',
        'react-dom': 'preact-compat',
      },
    },
    node: {
      constants: false,
    },
    optimization: {
      noEmitOnErrors: true,
      splitChunks: {},
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(isProd ? 'production' : 'development'),
        'process.env.TRAVIS_COMMIT': JSON.stringify(process.env.TRAVIS_COMMIT || 'unreleased'),
      }),
    ],
    performance: {
      maxAssetSize: 350000,
      maxEntrypointSize: 500000,
      hints: isProd ? 'warning' : false,
    },
  };

  if (!isProd) {
    config.plugins.push(
      new HtmlWebpackPlugin({
        template: './src/index.html.ejs',
        favicon: './src/assets/images/favicon.ico',
      })
    );
  }

  return config;
};

module.exports.cssLoaderOpts = {
  modules: true,
  importLoaders: 1,
  localIdentName: '[name]__[local]___[hash:base64:5]',
};
