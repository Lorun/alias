
const webpack = require('webpack');
const path = require('path');

const config = {
    entry: './app/app.js',
    output: {
        path: path.resolve(__dirname, 'assets'),
        filename: 'webpack.bundle.js'
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            }
        ]
    },

    plugins: [
        //new webpack.optimize.UglifyJsPlugin(),
    ]
};

module.exports = config;
