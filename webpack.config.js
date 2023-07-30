const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

// eslint-disable-next-line no-undef
module.exports = {
    // eslint-disable-next-line no-undef
    entry : __dirname + '/src/index.js',
    mode: 'production',
    module : {
        rules : [
            {
                test : /\.js$/,
                // eslint-disable-next-line no-undef
                include : path.resolve(__dirname, 'src'),
                exclude: /node_modules/,
                loaders : 'babel-loader'
            }
        ]
    },
    output : {
        filename : 'lib.js',
        // eslint-disable-next-line no-undef
        path : path.resolve(__dirname, 'dist'),
        library: 'native-support-handler',
        libraryTarget: 'commonjs2',
    },
    plugins: [
        new CleanWebpackPlugin()
    ],
    optimization: {
        minimizer: [new UglifyJsPlugin()],
    },
}
