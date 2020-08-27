const HTMLWebpackPlugin = require('html-webpack-plugin')

const WebpackConfig = {
    entry: "./src/ts/index.ts",
    plugins: [
        new HTMLWebpackPlugin({
            template: "src/html/index.html",
            filename: "index.html"
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
        extensions: ['.ts', '.tsx', '.js']
    }
};

module.exports = WebpackConfig;
