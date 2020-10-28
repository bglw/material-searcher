const path = require('path');
const mode = process.env.NODE_ENV || 'development';

module.exports = {
    entry: path.resolve(__dirname, 'index.js'),
    resolve: {
        alias: {
            svelte: path.resolve(__dirname, 'node_modules/svelte'),
        },
        extensions: ['.mjs', '.js', '.svelte']
    },
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, '../assets')
    },
    watchOptions: {
        ignored: /(site|node_modules)/
    },
    module: {
        rules: [{
            test: /\.m?js/,
            resolve: {
                fullySpecified: false,
            }
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            use: ['import-glob-keyed']
        }, {
            test: /\.svelte$/,
            exclude: /node_modules/,
            use: [{
                loader: 'svelte-loader',
                options: {
                    hydratable: true
                }
            }]
        }]
    },
    mode,
    devtool: mode === 'production' ? false : 'source-map'
};