const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
const webpack = require('webpack'); //to access built-in plugins
const path = require('path');

const config = {
    entry: './app/app.js',
    output: {
        filename: 'webpack.bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {

        loaders: [
            {
                test: /\.js$/,
                exclude: "node_modules",
                loader: "babel-loader"
            }
        ],

        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: "babel"
            }
        ]
    },
    resolve: {
        alias: {
            'rxjs': 'rxjs-es'
        }
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin(),
        new HtmlWebpackPlugin({template: './index.html'})
    ]
};

module.exports = config;
