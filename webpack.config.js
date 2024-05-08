// webpack.config.js
const path = require('path');

module.exports = {
    entry: './main.js',
    target: 'electron-main',
    output: {
        path: path.resolve(__dirname, 'out'),
        filename: 'bundle.js'
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
