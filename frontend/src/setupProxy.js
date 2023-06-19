const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:8080', // Node.js 서버의 주소와 포트로 변경해야 합니다.
      changeOrigin: true,
    })
  );
};
