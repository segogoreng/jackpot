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
            Externals: path.resolve(__dirname, 'src/externals/'),
            Handlers: path.resolve(__dirname, 'src/handlers/'),
            Helpers: path.resolve(__dirname, 'src/helpers/'),
            Models: path.resolve(__dirname, 'src/models/'),
            Views: path.resolve(__dirname, 'src/views/'),
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