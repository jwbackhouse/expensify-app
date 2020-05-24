const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env) => {
  const isProduction = env === 'production';    // env variable set to 'production' when script is run (see package.json)
  const CSSExtract = new MiniCssExtractPlugin({ filename: 'styles.css' });    // default filename is main.css
  
  return {
    entry: './src/app.js',
    output: {
      path: path.join(__dirname,'public'),
      filename: 'bundle.js'
    },
    module: {
      rules: [{
        loader: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      }, {
        test:/\.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true   // needed for inline-source-map (see below)
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }]
    },
    plugins: [
      CSSExtract
    ],
  devtool: isProduction ? 'source-map' : 'inline-source-map',    // use production-suitable version if running for production (see webpack docs)
    devServer: {
      contentBase: path.join(__dirname,'public'),
      host: '100.115.92.10',
      historyApiFallback:true
    }
  };
};