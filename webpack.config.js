const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const outputDir = 'docs';

module.exports = {
  mode: 'production',
  entry: {
    vendor: './js/vendor',
    source: './js/source',
  },
  resolve: {
    alias: {
      jquery: path.resolve(__dirname, 'js/jquery-2.1.3.min.js'),
    },
  },
  output: {
    path: path.resolve(__dirname, outputDir),
    filename: `[contenthash].js`,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
      {
        test: /\.(gif|png|jpg|woff(2)?|ttf|eot|svg)$/,
        loader: 'file-loader',
        options: {
          name: `[path][name].[ext]`,
        },
      },
    ],
  },
  performance: {
    hints: 'warning',
  },
  plugins: [
    new CleanWebpackPlugin(outputDir),
    new CopyWebpackPlugin([
      {from: 'images/**', to: `[path][name].[ext]`},
      {from: 'fonts/**', to: `[path][name].[ext]`},
      {from: 'inc/**', to: `[path][name].[ext]`},
    ]),
    new HtmlWebpackPlugin({
      template: 'index.html',
      favicon: 'favicon.ico',
      // hash: true,
      chunksSortMode: 'dependency',
      inject: 'body',
      minify: {
        collapseInlineTagWhitespace: true,
        collapseWhitespace: true,
        conservativeCollapse: true,
        decodeEntities: true,
        removeComments: true,
        removeCommentsFromCDATA: true,
      },
    }),
    new MiniCssExtractPlugin({
      filename: `[contenthash].css`,
    }),
  ],
};
