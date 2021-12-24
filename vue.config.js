module.exports = {
    publicPath: '/vue/',
    outputDir: 'dist',

    devServer: {
        proxy: {
            '/api': {
                target: 'http://javaee.therainisme.com',
                ws: true,
                changeOrigin: true
            }
        }
    },
}