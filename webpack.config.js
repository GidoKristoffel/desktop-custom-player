const path = require('path');

module.exports = {
    mode: 'development',
    entry: './main.js',
    target: 'electron-main',
    output: {
        path: path.resolve(__dirname),
        filename: 'bundle.js'
    },
    resolve: {
        alias: {
            'electron/main': path.resolve(__dirname, 'electron/main.js'),
            'node:path': 'path'
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    }
};
