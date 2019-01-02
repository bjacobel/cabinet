const path = require('path');
const merge = require('webpack-merge');
const StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');

const commonConfig = require('./webpack.common.config');

module.exports = (env = {}) =>
  merge(commonConfig(env), {
    entry: {
      server: './src/server.js',
    },
    target: 'node',
    output: {
      libraryTarget: 'commonjs2',
      globalObject: 'this',
    },
    module: {
      rules: [
        {
          // Normal css files, from vendors
          test: /\.css$/,
          include: path.join(__dirname, 'node_modules'),
          loader: [{ loader: 'css-loader' }],
        },
        {
          // Postcss files
          test: /\.css$/,
          exclude: path.join(__dirname, 'node_modules'),
          loader: [
            {
              loader: 'css-loader/locals',
              options: commonConfig.cssLoaderOpts,
            },
            { loader: 'postcss-loader' },
          ],
        },
      ],
    },
    plugins: [
      new StaticSiteGeneratorPlugin({
        entry: 'server',
        paths: ['/', '/rep', '/dem', '/ind'],
        globals: {
          window: {
            addEventListener: () => {},
          },
        },
      }),
    ],
  });
