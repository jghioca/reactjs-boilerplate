var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var path = require('path');

module.exports = {
    entry: getEntrySources(['./src/js/index.js']),
    output: getOutputResult({path: 'build', filename: 'js/main.js'}),
    devtool: 'eval',
    module: {
        preLoaders: [
            {
                test: /\.jsx?$/,
                include: /src/,
                loader: 'source-map'
            }
        ],
        loaders: [
            {
                test: /\.scss$/,
                include: /src/,
                loader: ExtractTextPlugin.extract('css!postcss-loader!sass?outputStyle=compressed')
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    'url?limit=8192',
                    'img'
                ]
            },
            {
                test: /\.jsx?$/,
                include: /src/,
                loaders : [
                    'react-hot',
                    'babel'
                ]
            }
        ]
    },
    postcss: function () {
        return [autoprefixer];
    },
    devServer: {
        // This is required for webpack-dev-server. The path should
        // be an absolute path to your build destination.
        outputPath: path.join(__dirname, 'build')
    },
    plugins: [
        new ExtractTextPlugin('css/main.css', {
            allChunks: true
        }),
        new HtmlWebpackPlugin({
            hash: true,
            inject: false,
            filename: 'index.html',
            template: __dirname + '/src/index.html',
            title: 'Webpage Title'
        }),
        new CopyWebpackPlugin([
            { from: 'src/favicon.ico' },
            { from: 'src/browserconfig.xml' },
            { from: 'src/tile-wide.png' },
            { from: 'src/tile.png' },
            { from: 'src/apple-touch-icon.png'}
        ]),
        new CleanWebpackPlugin(['build'], {
            root: __dirname,
            verbose: true,
            dry: false
        })
    ]
};

function getEntrySources(sources) {
    if (process.env.NODE_ENV !== 'production') {
        sources.push('webpack-dev-server/client/?http://localhost:8080');
        sources.push('webpack/hot/only-dev-server');
    }

    return sources;
}

function getOutputResult(result) {
    if (process.env.NODE_ENV !== 'production') {
        result['publicPath'] = 'http://localhost:8080/';
    }

    return result;
}
