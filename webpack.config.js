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
            Domain: path.resolve(__dirname, 'src/domain/'),
            Infrastructure: path.resolve(__dirname, 'src/infrastructure/'),
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