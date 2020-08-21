/* eslint-disable import/no-extraneous-dependencies */
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')

const mode = {
  name: process.env.NODE_ENV,
  dev: process.env.NODE_ENV === 'development',
  prod: process.env.NODE_ENV === 'production'
}

module.exports = {
  mode,
  pathTo: dir => path.resolve(dir),
  generateFilename(ext, subfolder) {
    const hashes = mode.dev ? Date.now() : '[hash]'
    return `assets/${subfolder || ext}/[name].${hashes}.${ext || '[ext]'}`
  },
  getSourceMapOptions() {
    return mode.dev ? 'source-map' : undefined
  },
  getDevServerOptions: () => ({
    compress: true,
    contentBase: path.resolve(__dirname, 'public'),
    hot: true,
    open: true,
    overlay: true,
    port: 666,
    watchContentBase: true
  }),
  getOptimizationOptions() {
    const optimizationOptions = { splitChunks: { chunks: 'all' } }
    if (mode.prod) {
      optimizationOptions.minimize = true
      optimizationOptions.minimizer = [new OptimizeCssAssetsPlugin(), new TerserWebpackPlugin()]
    }
    return optimizationOptions
  },
  cssLoaders(extra) {
    const loaders = [
      { loader: MiniCssExtractPlugin.loader, options: { hmr: mode.dev, reloadAll: mode.dev } },
      { loader: 'css-loader', options: { sourceMap: mode.dev } },
      { loader: 'postcss-loader', options: { sourceMap: mode.dev } }
    ]
    if (extra) loaders.push(extra)
    return loaders
  },
  HtmlWebpackPlugin,
  CleanWebpackPlugin,
  MiniCssExtractPlugin,
  CopyWebpackPlugin
}
