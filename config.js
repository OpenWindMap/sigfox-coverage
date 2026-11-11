// Configuration read from environment variables (see .env.example)
module.exports = {
    sigfoxApiUser: process.env.SIGFOX_API_USER,
    sigfoxApiPassword: process.env.SIGFOX_API_PASSWORD,
    sigfoxApiSite: process.env.SIGFOX_API_SITE || "api.sigfox.com",
    publicMapPath: process.env.SIGFOX_PUBLIC_MAP_PATH || "/v2/tiles/public-coverage",
    https: process.env.SIGFOX_API_HTTPS !== "false"
};
