const {
  mode,
  pathTo,
  generateFilename,
  getSourceMapOptions,
  getDevServerOptions,
  getOptimizationOptions,
  cssLoaders,
  HtmlWebpackPlugin,
  CleanWebpackPlugin,
  MiniCssExtractPlugin,
  CopyWebpackPlugin
} = require('./utils')

module.exports = {
  context: pathTo('src'),
  mode: mode.name,
  entry: {
    main: ['core-js/stable', 'regenerator-runtime/runtime', './main.js']
  },
  output: {
    publicPath: '/',
    path: pathTo('public'),
    filename: generateFilename('js')
  },
  devtool: getSourceMapOptions(),
  devServer: getDevServerOptions(),
  optimization: getOptimizationOptions(),
  resolve: {
    alias: {
      '@': pathTo('src'),
      '~': pathTo('node_modules')
    }
  },
  module: {
    rules: [
      { test: /\.css$/, use: cssLoaders() },
      { test: /\.s[ac]ss$/, use: cssLoaders({ loader: 'sass-loader', options: { sourceMap: mode.dev } }) },
      {
        test: /\.(png|jpg|jpeg|webp|gif)$/,
        loader: 'file-loader',
        options: { name: generateFilename(undefined, 'img') }
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        loader: 'file-loader',
        options: { name: generateFilename(undefined, 'fonts') }
      },
      { enforce: 'pre', test: /\.js$/, exclude: /node_modules/, loader: 'eslint-loader' },
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
      minify: {
        collapseWhitespace: mode.prod
      }
    }),
    new MiniCssExtractPlugin({ filename: generateFilename('css') }),
    new CopyWebpackPlugin({
      patterns: [{ from: pathTo('src/favicon.ico'), to: pathTo('public') }]
    }),
    new CleanWebpackPlugin()
  ]
}
