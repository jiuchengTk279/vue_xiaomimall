module.exports = {
    devServer: {
        host: 'localhost',
        port: 8080,
        proxy: {
            '/api': {
                target: 'http://mall-pre.springboot.cn',
                changeOrigin: true,
                // 转发，去除 /api
                pathRewrite: {
                    '/api': ''
                }
            }
        }
    }
}