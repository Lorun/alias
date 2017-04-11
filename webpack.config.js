
const webpack = require('webpack');
const path = require('path');


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
                            presets: ['es2017', 'stage-0'],
                            plugins: [
                                ["transform-react-jsx", { "pragma":"h" }]
                            ]
                        }
                    }
                }
            ]
        },

        plugins: []
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
