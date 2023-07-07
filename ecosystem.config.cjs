
const env = {
  NODE_ENV: process.env.NODE_ENV || "DEV"
}

module.exports = {
  apps: [{
    name: "express-starter-app-for-aws",
    script: "./dist/index.js",
    env: env,
  }]
}
