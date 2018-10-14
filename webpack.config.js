const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');

const { ProjectName } = require('./config');

module.exports = (env = {}) => {
  const isProd = env.production || ['production', 'staging'].includes(process.env.NODE_ENV);

  const wpconfig = {
    entry: {
      main: './src/index.js',
    },
    mode: isProd ? 'production' : 'development',
    output: {
      path: `${__dirname}/dist`,
      filename: isProd ? '[name].[chunkhash].js' : '[name].js',
      publicPath: isProd ? '/' : 'http://localhost:8080/',
      libraryTarget: isProd ? 'commonjs2' : 'var',
    },
    devtool: isProd ? false : 'source-map',
    target: isProd ? 'node' : 'web',
    module: {
      rules: [
        {
          test: /\.woff(2)?(\?[a-z0-9=]+)?$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 64000,
              },
            },
          ],
        },
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
          test: /\.html$/,
          use: 'ejs-loader',
        },
        {
          // Normal css files, from vendors
          test: /\.css$/,
          include: path.join(__dirname, 'node_modules'),
          loader: [
            isProd ? { loader: MiniCssExtractPlugin.loader } : { loader: 'style-loader' },
            { loader: 'css-loader' },
          ],
        },
        {
          // Postcss files
          test: /\.css$/,
          exclude: path.join(__dirname, 'node_modules'),
          loader: [
            isProd ? { loader: MiniCssExtractPlugin.loader } : { loader: 'style-loader' },
            {
              loader: 'css-loader',
              options: {
                modules: true,
                importLoaders: 1,
                localIdentName: '[name]__[local]___[hash:base64:5]',
                sourceMap: !isProd,
              },
            },
            { loader: 'postcss-loader' },
          ],
        },
      ],
    },
    resolve: {
      extensions: ['.js', '.json', '.css'],
      modules: [__dirname, path.resolve(__dirname, 'src'), 'node_modules'],
    },
    node: {
      constants: false,
    },
    optimization: {
      splitChunks: {
        chunks: 'async',
        minChunks: 1,
        name: true,
        cacheGroups: {
          vendor: isProd
            ? false
            : {
                test: /[\\/]node_modules[\\/]/,
                name: 'vendor',
                enforce: true,
                chunks: 'all',
              },
        },
      },
    },
    plugins: [
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.NamedModulesPlugin(),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(isProd ? 'production' : 'development'),
        'process.env.TRAVIS_COMMIT': JSON.stringify(process.env.TRAVIS_COMMIT || 'unreleased'),
      }),
    ],
    devServer: {
      hot: true,
      publicPath: '/',
      historyApiFallback: true,
      overlay: true,
    },
    performance: {
      maxAssetSize: 350000,
      maxEntrypointSize: 500000,
      hints: isProd ? 'warning' : false,
    },
  };

  if (!isProd) {
    wpconfig.plugins = [
      new HtmlWebpackPlugin({
        title: ProjectName,
        template: './src/index.html',
        favicon: './src/assets/images/favicon.ico',
      }),
      new ScriptExtHtmlWebpackPlugin({
        dynamicChunks: {
          preload: true,
        },
        defaultAttribute: 'defer',
      }),
      new webpack.HotModuleReplacementPlugin(),
      ...wpconfig.plugins,
    ];
  } else {
    wpconfig.plugins = [
      new MiniCssExtractPlugin({
        filename: isProd ? '[name].[contenthash].css' : '[name].css',
      }),
      new StaticSiteGeneratorPlugin({
        entry: 'main',
        paths: ['/', '/rep', '/dem', '/ind'],
        globals: {
          window: {
            addEventListener: () => {},
          },
        },
      }),
      ...wpconfig.plugins,
    ];
  }

  return wpconfig;
};
