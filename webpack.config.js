const HTMLWebpackPlugin = require('html-webpack-plugin');

exports.default = {
    mode: 'development',
    devtool: 'source-map',
    entry: './src/index.tsx',
    module: {
        rules: [
            {
                test: /\.(glb|png|jpe?g|gif|tif)$/i,
                type: 'asset',
            },
            {
                test: /\.tsx?$/i,
                use: 'babel-loader',
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js', '.tsx', '.jsx'],
    },
    plugins: [
        new HTMLWebpackPlugin({ template: 'index.html' }),
    ],
};
