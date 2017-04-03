//const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
const webpack = require('webpack'); //to access built-in plugins
const path = require('path');

const config = {
    entry: './app/app.js',
    output: {
        path: path.resolve(__dirname, 'assets'),
        filename: 'webpack.bundle.js'
    },
    module: {

        /*loaders: [
            {
                test: /\.js$/,
                exclude: [
                    path.resolve(__dirname, "node_modules")
                ],
                loader: "babel-loader"
            }
        ],*/

        /*rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: [/node_modules/],
                loader: "babel-loader"
                *//*options: {
                    cacheDirectory: true,
                    presets: ["es2015", "stage-0"]
                }*//*
            }
        ]*/
    },
    resolve: {
        modules: [path.resolve(__dirname, './app'), 'node_modules'],
        alias: {
            rxjs: "rxjs-es"
        }
    },
    plugins: [
        //new webpack.optimize.UglifyJsPlugin(),
        //new HtmlWebpackPlugin({template: './index.html'})
    ]
};

module.exports = config;
