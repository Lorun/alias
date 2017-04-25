import express from 'express';
import webpack from 'webpack';
import DevServer from 'webpack-dev-server';
import webpackConfig from './webpack.config.js';

const app = express();

new DevServer(webpack(webpackConfig),{
    publicPath: webpackConfig.output.publicPath,
    hot: true,
    historyApiFallback: true
}).listen(8080,'localhost',(err,res)=>{
    if (err){
        return console.log(err);
    }
    console.log(`server is up on port 8080`);
});