const path = require("path");

module.exports = {
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "~@/assets/scss/main.scss";`
      }
    }
  },
  publicPath: "/",
  outputDir: '../backend/public/',
  devServer: {
    proxy: {
      "/api": {
        target: "http://nodejs:3000",
        changeOrigin: true,
        pathRewrite: { "^/apis": "" }
      }
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        "@": path.join(__dirname, "src/")
      },
      extensions: [".js", ".vue"]
    }
  }
};
