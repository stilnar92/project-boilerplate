process.title = 'howtocards:webpack';
const { resolve } = require('path');

const ROOT = resolve(__dirname, '..', '..');
const DIST = resolve(ROOT, 'dist');
const SRC = resolve(ROOT, 'src');

const { NODE_ENV } = process.env;
const IS_PROD = NODE_ENV === 'production';
const IS_DEV = NODE_ENV === 'development';
const IS_TEST = NODE_ENV === 'test';

const pkg = require(resolve(ROOT, 'package.json'));
const { configureBabel } = require('../babel.config');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { NoEmitOnErrorsPlugin, EnvironmentPlugin } = require('webpack');
const HtmlPlugin = require('html-webpack-plugin');
const NotifierPlugin = require('webpack-notifier');

const configureFontLoader = () => {
  return {
    test: /\.(ttf|eot|woff2?)$/i,
    use: [
      {
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[ext]',
        },
      },
    ],
  };
};

const configureReactSvgLoader = () => {
  return {
    test: /\.svg$/,
    use: 'react-svg-loader',
  };
};

const configureCssLoader = () => {
  return {
    test: /\.css$/,
    use: [
      {
        loader: MiniCssExtractPlugin.loader,
      },
      'css-loader',
    ],
  };
};

const config = {
  context: SRC,
  target: 'web',
  entry: {
    index: ['./index'],
  },

  resolve: {
    extensions: ['.js'],
    modules: ['node_modules'],
    alias: {
      '@features': resolve(SRC, 'features'),
      '@lib': resolve(SRC, 'lib'),
      '@ui': resolve(SRC, 'ui'),
    },
  },

  output: {
    path: DIST,
  },

  module: {
    rules: [
      configureBabel(Object.values(pkg.browserslist.modernBrowsers)),
      configureCssLoader(),
      configureReactSvgLoader(),
      configureFontLoader(),
    ],
  },

  parallelism: 8,

  plugins: [
    new NoEmitOnErrorsPlugin(),
    new EnvironmentPlugin({
      NODE_ENV: process.env.NODE_ENV || 'development',
    }),

    new HtmlPlugin({
      title: 'ProjectBoilerPlate',
      template: resolve(ROOT, 'src', 'index.html'),
    }),

    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),

    new NotifierPlugin({
      title: 'Webpack',
      excludeWarnings: true,
      alwaysNotify: true,
    }),
  ],

  stats: 'errors-only',
};

module.exports = {
  config,

  IS_DEV,
  IS_PROD,
  IS_TEST,

  DIST,
  SRC,
  ROOT,
};
