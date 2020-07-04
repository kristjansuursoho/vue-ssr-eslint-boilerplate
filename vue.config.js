const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const nodeExternals = require('webpack-node-externals')

const TARGET_NODE = process.env.WEBPACK_TARGET === 'node'

const createApiFile = TARGET_NODE
  ? './create-api-server.js'
  : './create-api-client.js'

const entryFile = TARGET_NODE
  ? './src/lib/entry-server.js'
  : './src/lib/entry-client.js'

const webpackTarget = TARGET_NODE
  ? 'node'
  : 'web'

const isNodeDefined = TARGET_NODE
  ? undefined
  : false

const TargetPlugin = TARGET_NODE
  ? VueSSRServerPlugin
  : VueSSRClientPlugin

const getNodeExternals = () => nodeExternals({
  whitelist: /\.css$/
})

const includedNodeExternals = TARGET_NODE
  ? getNodeExternals()
  : undefined

const libraryTarget = TARGET_NODE
  ? 'commonjs2'
  : undefined

module.exports = {
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },
  css: {
    extract: process.env.NODE_ENV === 'production'
  },
  configureWebpack: () => ({
    entry: entryFile,
    target: webpackTarget,
    node: isNodeDefined,
    plugins: [
      new TargetPlugin(),
      new CompressionPlugin()
    ],
    externals: includedNodeExternals,
    output: {
      libraryTarget
    },
    optimization: {
      splitChunks: undefined
    },
    resolve: {
      alias: {
        'create-api': createApiFile
      }
    }
  }),
  chainWebpack: (config) => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap(options => {
        return {
          ...options,
          optimizeSSR: false
        }
      })
  }
}
