const createProxyMiddleware = require('http-proxy-middleware');

module.exports = (app) => {
	// app.use(
	// 	'/tool',
	// 	createProxyMiddleware({
	// 		target: 'https://api.twitter.com/oauth2/token',
	// 		changeOrigin: true,
	// 		headers: {
	// 			'Content-Type': 'application/x-www-form-urlencoded',
	// 		},
	// 	})
	// );
	// app.use(
	// 	'/twitchAPI',
	// 	createProxyMiddleware({
	// 		target: 'https://id.twitch.tv/oauth2/token',
	// 		changeOrigin: true,
	// 	})
	// );
};
