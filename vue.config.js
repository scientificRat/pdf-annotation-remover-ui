const { defineConfig } = require('@vue/cli-service')
const server = "localhost:9989"
module.exports = defineConfig({
  transpileDependencies: true,
  // very important for code security
  productionSourceMap: false,
  devServer: {
    host: '0.0.0.0',
    port: 8080,
    compress: true,
    proxy: {
      '/api/*': {
        target: `http://${server}`,
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      },

    }
  },
})
