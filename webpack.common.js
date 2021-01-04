const Path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const dest = Path.join(__dirname, './dist');

module.exports = {
  entry: {
    dashboard: Path.resolve(__dirname, './src/js/dashboard'),
    login: Path.resolve(__dirname, './src/js/login'),
    logout: Path.resolve(__dirname, './src/js/logout'),
  },
  output: {
    path: dest,
    filename: '[name].[hash].js'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
        patterns: [
            { from: Path.resolve(__dirname, './public'), to: 'public' }
        ]
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: Path.resolve(__dirname, './src/pages/dashboard.html'),
      chunks: ['dashboard']
    }),
    new HtmlWebpackPlugin({
      filename: 'login.html',
      template: Path.resolve(__dirname, './src/pages/login.html'),
      chunks: ['login']
    }),
    new HtmlWebpackPlugin({
      filename: 'logout.html',
      template: Path.resolve(__dirname, './src/pages/logout.html'),
      chunks: ['logout']
    })
  ],
  resolve: {
    alias: {
      '~': Path.resolve(__dirname, './src')
    }
  },
  module: {
    rules: [
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto'
      },
      {
        test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]'
          }
        }
      }
    ]
  }
};
