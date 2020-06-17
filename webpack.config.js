const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: "production",
    entry: ["./src/scripts/script.js"],
    output: { 
        path: __dirname + "/script",
        filename: 'bundle.min.js' 
    },
    devtool: "sourcemap",
    externals: {
        "jquery": "jQuery"
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: ['babel-loader']
        }]
   }
}