module.exports = {
    publicPath: './',
    outputDir: 'dist',

    devServer: {
        proxy: {
            '/api': {
                target: 'https://javaee.therainisme.com',
                ws: true,
                changeOrigin: true
            }
        }
    },
}