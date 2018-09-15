const webpack = require('webpack');
const path = require('path');

const sourcePath = path.join(__dirname, './src');
const outPath = path.join(__dirname, './lib');

module.exports = {
    context: sourcePath,
    entry: './main.tsx',
    output: {
        path: outPath,
        filename: 'index.js',
        library: "iwutest",
        libraryTarget: "umd"
    },
    resolve: {
        extensions: ['.js', '.ts', '.tsx']
    },
    module: {
        rules: [
            { test: /\.tsx?$/, loader: ['ts-loader'] },
            { test: /\.css$/, use: ['style-loader', 'css-loader'] }
        ]
    }
};