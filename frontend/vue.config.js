const path = require("path");

module.exports = {
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "~@/assets/scss/main.scss";`
      }
    }
  },
  //publicPath: process.env.NODE_ENV === "development" ? "/" : "/backend",
  publicPath: "/",
  devServer: {
    proxy: {
      "/api": {
        target: "http://backend:3000",
        changeOrigin: true,
        pathRewrite: { "^/apis": "" }
      }
    },
    compress: true,
    disableHostCheck: true
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
