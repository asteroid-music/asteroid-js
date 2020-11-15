const HTMLWebpackPlugin = require('html-webpack-plugin')
var path = require('path');

const WebpackConfig = {
    entry: "./src/index.ts",
    plugins: [
        new HTMLWebpackPlugin({
            template: "src/index.html",
            filename: "index.html",
            favicon: "src/favicon.png"
        })
    ],
    module: {
        rules: [
            {
                test: /\.(tsx?)$/,
                exclude: [/node_modules/, /test/],
                use: [
                    'babel-loader',
                    'ts-loader'
                ]
            }
        ]
    },
    resolve: {
        modules: [path.resolve(__dirname,'src'), 'node_modules'],
        extensions: ['.ts', '.tsx', '.js']
    }
};

module.exports = WebpackConfig;
