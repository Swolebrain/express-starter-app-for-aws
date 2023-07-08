
const env = {
  NODE_ENV: process.env.NODE_ENV || "DEV",
  APP_NAME: process.env.APP_NAME || 'express-starter-app-for-aws',
}

module.exports = {
  apps: [{
    name: "express-starter-app-for-aws",
    script: "./dist/index.js",
    env: env,
  }]
}
