// webpack.config.base.js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

/**
 * @type {import('webpack').Configuration}
 */

module.exports = {
    entry: {
        app: './src/index.tsx',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[hash].js',
        publicPath: "/"
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(ts|tsx)$/,
                use: ['babel-loader', 'ts-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // 将 JS 字符串生成为 style 节点
                    'style-loader',
                    // 将 CSS 转化成 CommonJS 模块
                    'css-loader',
                    // 将 Sass 编译成 CSS
                    'sass-loader',
                ],
            },
            {
                test: /\.(jpe?g|png|gif|svg|woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.jsx'],
        alias: {
            '@src': path.resolve(__dirname, 'src'),
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: '管理后台',
            template: path.resolve(__dirname, '../public/index.html'),
            filename: 'index.html',
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[hash].css',
        })
    ],
    cache: {
        type: 'filesystem',
        // 可选配置
        buildDependencies: {
            config: [__filename], // 当构建依赖的config文件（通过 require 依赖）内容发生变化时，缓存失效
        },
        name: 'development-cache',
    },
    stats: 'errors-only',
    // target: 'electron-renderer',
}

//
// import path from 'path'
// import webpack from 'webpack'
// import HtmlWebpackPlugin from 'html-webpack-plugin'
// import MiniCssExtractPlugin from 'mini-css-extract-plugin'
// // import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
// import TerserPlugin from 'terser-webpack-plugin'
//
// const rootPath = process.cwd()
//
// export default (env, argv) => {
//     const isProd = argv.mode === 'production'
//
//     const config = {
//         entry: path.resolve(rootPath, 'src/index.tsx'),
//         output: {
//             // 因为开发环境中，chunkhash与HotModuleReplacementPlugin有冲突，所以两个环境分别设置
//             filename: isProd ? '[name].[chunkhash:8].js' : '[name].[fullhash:8].js',
//             path: path.resolve(rootPath, 'dist'),
//             publicPath: '/',
//         },
//         resolve: {
//             extensions: ['.tsx', '.ts', '.jsx', '.js'],
//             modules: [path.resolve(rootPath, 'src'), 'node_modules'],
//             alias: {
//                 '@mui': path.resolve(rootPath, 'node_modules/@uniquemo/mui/esm/components'),
//             },
//         },
//         module: {
//             rules: [
//                 {
//                     test: /\.(t|j)sx?$/,
//                     use: {
//                         loader: 'babel-loader',
//                         options: {
//                             plugins: [
//                                 [
//                                     'import',
//                                     {
//                                         libraryName: '@blueprintjs/core',
//                                         transformToDefaultImport: false,
//                                         customName: (name) => {
//                                             const BASE_PATH = `${rootPath}/node_modules/@blueprintjs/core/lib/esm`
//
//                                             const PATH_MAP = {
//                                                 button: ['button', 'buttons'],
//                                                 'input-group': ['forms', 'inputGroup'],
//                                                 'menu-item': ['menu', 'menuItem'],
//                                                 toaster: ['toast', 'toaster'],
//                                             }
//
//                                             if (name === 'position') {
//                                                 return `${BASE_PATH}/common/position`
//                                             }
//
//                                             const info = PATH_MAP[name]
//                                             if (info) {
//                                                 const [folder, filename] = info
//                                                 return `${BASE_PATH}/components/${folder}/${filename}`
//                                             }
//
//                                             return `${BASE_PATH}/components/${name}/${name}`
//                                         },
//                                     },
//                                 ],
//                             ],
//                         },
//                     },
//                     exclude: /node_modules/,
//                 },
//                 {
//                     test: /\.css$/,
//                     use: [MiniCssExtractPlugin.loader, 'css-loader'],
//                     include: /node_modules/,
//                 },
//                 {
//                     test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg)$/,
//                     use: [
//                         {
//                             loader: 'url-loader',
//                             options: {
//                                 name: '[name].[hash:8].[ext]',
//                             },
//                         },
//                     ],
//                 },
//             ],
//         },
//         plugins: [
//             new webpack.DefinePlugin({
//                 'process.env': '{}', // 临时修复@blueprintjs报错“process is not defined”
//                 __LOCALHOST__: process.env.LOCAL === 'true',
//             }),
//             new HtmlWebpackPlugin({
//                 template: path.resolve(rootPath, 'src/index.html'),
//                 favicon: path.resolve(rootPath, 'favicon.ico'),
//             }),
//             new MiniCssExtractPlugin({
//                 filename: '[name].[contenthash:8].css',
//             }),
//             // new BundleAnalyzerPlugin(),
//         ],
//         optimization: {
//             minimize: true,
//             minimizer: [
//                 new TerserPlugin({
//                     parallel: true,
//                 }),
//             ],
//         },
//     }
//     return config
// }
