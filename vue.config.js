module.exports = {
    publicPath: '/vue/',
    outputDir: 'dist',

    devServer: {
        proxy: {
            '/api': {
                target: 'http://javaee.therainisme.com:8111',
                ws: true,
                changeOrigin: true
            }
        }
    },
}