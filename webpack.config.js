var webpack = require('webpack');
// import webpack from 'webpack'

const ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = options => {
  return {
    entry: './index.js',
    output: {
      filename: 'bundle.js',
    },
    // devtool: 'cheap-module-source-map',
    module: {
      rules: [
        {
          test: /.js$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                // cacheDirectory: true,
              },
            },
          ],
        },

        {
          test: /\.css$/,
          // use: ['style-loader', 'css-loader']
          use: [
            { loader: "style-loader" },
            {
              loader: "css-loader",
              options: {
                modules: true,
                localIdentName: '[path]-[name]-[local]-[hash:base64:5]'
              },
              
            }
          ],
        },
        {
          test: /\.scss$/,
          loaders: ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use: ['css-loader', 'sass-loader']
          })
      }

        // 也可使用以下的配置
        // {
        //   test: /\.js$/,
        //   exclude: /node_modules/,
        //   loader: 'babel-loader',
        //   options: {
        //     // cacheDirectory: true,
        //   }
        // },
        // {
        //   test: /\.css$/,
        //   loader: "style-loader!css-loader?modules&localIdentName=[path][name]---[local]---[hash:base64:5]"
        // },

      ],
    },
    plugins: [
      new ExtractTextPlugin('root.css')
    ],
    mode: 'development',
  }
}

