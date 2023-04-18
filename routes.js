const { switchRtHandler } = require("./handler")

const routes = [
    {
        // turn on realtime db
        method: 'POST',
        path: '/switch-rt',
        handler: () => {console.log("p")},
    },
]

module.exports = { routes }