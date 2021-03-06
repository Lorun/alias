
const webpack = require('webpack');
const path = require('path');

function buildConfig (env) {
    const config = {
        entry: [
            './app/index.js',
        ],
        output: {
            path: path.resolve(__dirname, 'assets'),
            filename: 'webpack.bundle.js'
        },

        resolve: {
            alias: {
                'react': 'preact-compat',
                'react-dom': 'preact-compat',
                // Not necessary unless you consume a module using `createClass`
                'create-react-class': 'preact-compat/lib/create-react-class'
            }
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
                }
            ]
        },

        plugins: []
    };

    if (env === 'development') {
        config.entry = [
            'webpack-dev-server/client?http://local.lobarev.com:8080',
            'webpack/hot/only-dev-server',
            './app/index.js',
        ];
        config.devServer = {
            host: 'local.lobarev.com',
            port: 8080,
            contentBase: './',
            publicPath: '/assets/',
            hot: false,
            inline: true,
            historyApiFallback: true
        }
    }

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
