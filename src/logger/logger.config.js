const pino = require('pino');
// const pretty = require('pino-pretty')
const logger = pino({
    transport: {
        target: 'pino-pretty',
        options: {
            colorize: true
        }
    }
})

module.exports = logger