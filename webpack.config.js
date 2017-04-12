
const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractSASS = new ExtractTextPlugin('style.css');


function buildConfig (env) {
    var config = {
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
                            presets: ['env', 'stage-0'],
                            plugins: [
                                ["transform-react-jsx", { "pragma":"h" }]
                            ]
                        }
                    }
                },
                {
                    test: /\.scss$/,
                    use: extractSASS.extract(["css-loader", "sass-loader"])
                }
            ]
        },

        plugins: [
            extractSASS
        ]
    };

    if (env === 'production') {
        config.plugins.push(
            new webpack.DefinePlugin({
                'process.env':{
                    'NODE_ENV': JSON.stringify('production')
                }
            }),
            new webpack.optimize.UglifyJsPlugin()
        );
    }

    return config;
}

module.exports = buildConfig;
