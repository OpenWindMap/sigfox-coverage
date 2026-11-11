// Configuration read from environment variables (see .env.example)
module.exports = {
    sigfoxApiUser: process.env.SIGFOX_API_USER,
    sigfoxApiPassword: process.env.SIGFOX_API_PASSWORD,
    sigfoxApiSite: "api.sigfox.com",
    publicMapPath: "/v2/tiles/public-coverage",
    https: true
};
