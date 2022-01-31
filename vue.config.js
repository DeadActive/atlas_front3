module.exports = {
    lintOnSave: false,
    devServer: {
        proxy: {
            '/public': {
                target: process.env.VUE_APP_BASE_URL,
                ws: true,
                changeOrigin: true,
                proxyTimeout: 1000 * 60 * 10,
                timeout: 1000 * 60 * 10,
            },
            '/private': {
                target: process.env.VUE_APP_BASE_URL,
                ws: true,
                changeOrigin: true,
                proxyTimeout: 1000 * 60 * 10,
                timeout: 1000 * 60 * 10,
            },
            '/auth': {
                target: process.env.VUE_APP_BASE_URL,
                ws: true,
                changeOrigin: true,
                proxyTimeout: 1000 * 60 * 10,
                timeout: 1000 * 60 * 10,
            },
            '/ws': {
                target: process.env.VUE_APP_BASE_URL,
                ws: true,
                changeOrigin: true,
                proxyTimeout: 1000 * 60 * 10,
                timeout: 1000 * 60 * 10,
            },
        },
    },
    transpileDependencies: ['vuetify'],
}
