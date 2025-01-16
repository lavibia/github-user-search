const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
 mode: "development",
 entry: './src/script.js',
 devServer: {
  static: './dist',
 },

 plugins: [
  new HtmlWebpackPlugin({
   title: 'DevFinder',
   template: "src/index.html",
  }),
  new Dotenv({
   path: './src/.env',
   prefix: 'import.meta.env.' // reference your env variables as 'import.meta.env.ENV_VAR'.
  }),
  new CopyWebpackPlugin({
   patterns: [
    { from: 'src/assets', to: 'assets' }, // Keep assets structure

   ]
  })
 ],
 output: {
  path: path.resolve(__dirname, 'dist'),
  filename: '[name].js',
  publicPath: '/',
  clean: true

 },

 module: {
  rules: [

   {
    test: /\.css$/i,
    use: ['style-loader', 'css-loader'],
   },
   {
    test: /\.(png|jpe?g|gif|svg|webp)$/i,
    type: 'asset/resource',
    use: [
     {
      loader: 'file-loader',
      options: {
       name: '[path][name].[ext]',
       context: 'src/assets', // Menține structura folderului în dist
       outputPath: 'assets', // Fișierele imagini în `dist/assets`
       publicPath: '/assets'
      }
     }
    ]
   },
  ],

 },
 optimization: {
  minimize: true
 },
 resolve: {
  extensions: ['.js']
 }
};