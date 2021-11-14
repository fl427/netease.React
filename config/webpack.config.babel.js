import merge from 'webpack-merge'
import baseConfig from './webpack.config.base'
import devConfig from './webpack.config.dev'
import prodConfig from './webpack.config.prod'

export default (env, argv) => {
    let config = argv.mode === 'development' ? devConfig : prodConfig
    return merge(baseConfig(env, argv), config)
}
