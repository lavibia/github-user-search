const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
 mode: "production",
 entry: './src/script.js',
 devServer: {
  static: './dist',
 },

 plugins: [
  new HtmlWebpackPlugin({
   title: 'DevFinder',
   template: "src/index.html",
  }),
  new CopyWebpackPlugin({
   patterns: [
    { from: 'src/assets', to: 'assets' }, // Keep assets structure

   ]
  })
 ],
 output: {
  filename: 'script.js',
  path: path.resolve(__dirname, 'dist'),
 },

 module: {
  rules: [
   // Rule for JS files, transpile with Babel if needed
   {
    test: /\.js$/,
    exclude: /node_modules/,
    use: 'babel-loader'
   },
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
  minimize: true,
 },
 resolve: {
  extensions: ['.js']
 }
};