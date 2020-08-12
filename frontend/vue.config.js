module.exports = {
  publicPath: "/",
  outputDir: "../backend/public/",
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:3000/",
        changeOrigin: true,
        pathRewrite: { "^/apis": "" }
      }
    }
  }
};
