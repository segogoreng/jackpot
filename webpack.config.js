const path = require('path');

module.exports = {
    entry: './src/game.ts',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        alias: {
            Config: path.resolve(__dirname, 'src/config/'),
            Helpers: path.resolve(__dirname, 'src/helpers/'),
            Infrastructure: path.resolve(__dirname, 'src/infrastructure/'),
            Models: path.resolve(__dirname, 'src/models/'),
        },
        mainFields: ['browser', 'main', 'module'],
        extensions: [ '.ts', '.tsx', '.js' ]
    },
    output: {
        filename: 'game.js',
        path: path.resolve(__dirname, 'dist')
    },
    mode: 'development',
    devtool: 'source-map'
};