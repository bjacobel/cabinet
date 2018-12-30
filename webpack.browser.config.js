const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

const commonConfig = require('./webpack.common.config');

module.exports = (env = {}) => {
  const isProd = env.production || ['production'].includes(process.env.NODE_ENV);

  return merge(commonConfig(env), {
    entry: {
      browser: './src/browser.js',
    },
    target: 'web',
    module: {
      rules: [
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
                ...commonConfig.cssLoaderOpts,
                sourceMap: !isProd,
              },
            },
            { loader: 'postcss-loader' },
          ],
        },
      ],
    },
    devServer: {
      hot: true,
      publicPath: '/',
      historyApiFallback: true,
      overlay: true,
    },
    plugins: [
      ...(isProd ? [new ManifestPlugin()] : []),
      ...(isProd ? [] : [new webpack.HotModuleReplacementPlugin()]),
      ...(isProd
        ? [
            new MiniCssExtractPlugin({
              filename: isProd ? '[name].[contenthash].css' : '[name].css',
            }),
          ]
        : []),
    ],
  });
};
