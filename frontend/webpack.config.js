var webpack = require('webpack');

module.exports = {
    entry: './src/Index.ts',
    output: {
        filename: './dist/js/bundle.js'
    },
    devtool: 'eval-source-map',
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
    },
    plugins: [
        new webpack.ProvidePlugin({
            _: "underscore",
            $: "jquery",
            Backbone: "backbone"
        })
    ],
    module: {
        preLoaders: [
            {
                test: /\.ts$/,
                loader: 'tslint-loader',
                options: {
                    configFile: 'tslint.json'
                }
            }
        ],
        loaders: [
            {test: /\.tsx?$/, loader: 'ts-loader'},
            { test: /\.ejs$/, loader: 'ejs-loader' }
        ]
    }
};
