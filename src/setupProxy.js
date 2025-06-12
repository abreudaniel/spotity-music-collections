const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://127.0.0.1:8080',
            changeOrigin: true,
            secure: false,
            withCredentials: true,
            logLevel: 'debug',
            pathRewrite: {
                '^/api': '/api'
            },
            onProxyReq: (proxyReq, req, _res) => {
                // Adiciona headers necessários
                proxyReq.setHeader('origin', 'http://localhost:3000');
                proxyReq.setHeader('host', 'localhost:8080');

                // Se houver corpo na requisição
                if (req.body) {
                    const bodyData = JSON.stringify(req.body);
                    proxyReq.setHeader('Content-Type', 'application/json');
                    proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
                    proxyReq.write(bodyData);
                }
            },
            onProxyRes: (proxyRes, req, res) => {
                // Remove headers existentes
                delete proxyRes.headers['access-control-allow-origin'];
                delete proxyRes.headers['access-control-allow-credentials'];
                delete proxyRes.headers['access-control-allow-methods'];
                delete proxyRes.headers['access-control-allow-headers'];

                // Adiciona os headers corretos
                proxyRes.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000';
                proxyRes.headers['Access-Control-Allow-Credentials'] = 'true';
                proxyRes.headers['Access-Control-Allow-Methods'] = 'GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS';
                proxyRes.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization, Accept, Origin, X-Requested-With';
                proxyRes.headers['Access-Control-Max-Age'] = '3600';
            },
            onError: (err, req, res) => {
                console.error('Erro no proxy:', err);
                res.writeHead(500, {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': 'http://localhost:3000',
                    'Access-Control-Allow-Credentials': 'true'
                });
                res.end(JSON.stringify({
                    message: 'Erro na comunicação com o servidor',
                    error: err.message
                }));
            },
            // Adiciona timeout mais longo
            timeout: 30000,
            // Configurações adicionais para evitar desconexões
            ws: true,
            xfwd: true,
            followRedirects: true
        })
    );
};
