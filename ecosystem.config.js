module.exports = {
    apps: [{
        name: "MeteoServer",
        script: "src/bin/MeteoServer",
        env: {
            NODE_ENV: "development",
        },
        env_production: {
            NODE_ENV: "production",
        }
    }]
}