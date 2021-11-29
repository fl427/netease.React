// import webpack from 'webpack'
//
// export default {
//     devtool: 'eval-cheap-module-source-map',
//     module: {
//         rules: [
//             {
//                 test: /\.module\.css$/,
//                 use: [
//                     'style-loader', // CSS的HMR需要使用style-loader
//                     {
//                         loader: 'css-loader',
//                         options: {
//                             import: true,
//                             modules: {
//                                 localIdentName: '[path][name]__[local]--[hash:base64:5]',
//                             },
//                             importLoaders: 1,
//                         },
//                     },
//                     'postcss-loader',
//                 ],
//                 include: /src/,
//             },
//         ],
//     },
//     plugins: [new webpack.HotModuleReplacementPlugin()],
//     devServer: {
//         // contentBase: './dist',
//         static: './dist',
//         historyApiFallback: true,
//         hot: true,
//         proxy: {
//             '/api': {
//                 target: 'http://localhost:3000',
//                 pathRewrite: { '^/api': '' },
//             },
//             '/graphql': {
//                 target: 'http://localhost:4000',
//             },
//         },
//     },
// }

const webpackMerge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
const path = require('path')

/**
 * @type {import('webpack').WebpackOptionsNormalized}
 */
const devServer = {
    port: 4000,
    host: 'localhost',
    compress: true,
    hot: true,
    static: path.join(__dirname, '../public'),
    // watchContentBase: true,
    // publicPath: '/',
    // compress: true,
    // historyApiFallback: true,
    // hot: true,
    // clientLogLevel: 'error',
    // open: true,
    // watchOptions: {
    //     ignored: /node_modules/,
    // },
    historyApiFallback: true,
    proxy: {
        // 这样写不行🚫！！，路由似乎会被捕捉到，然后无法跳转到前端路由
        // '/': 'http://localhost:3000',
        // '/': {
        //     target: 'http://localhost:3000',
        // }

        // 这样写可以。/api是一个前端路由里没有的值

        // '/api': {
        //     target: 'http://localhost:3000',
        //     pathRewrite: { '^/api': '' },
        // },
    }
}

const devConfig = {
    mode: 'development',
    devServer: devServer,
}

module.exports = webpackMerge.merge(baseConfig, devConfig)



