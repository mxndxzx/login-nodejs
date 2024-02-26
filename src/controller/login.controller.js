const service = require('../service/login.service');
const logger = require('../logger/logger.config');

class Controller {
    async login (req,res) {
        logger.info('Controller entry...')
        const response = await service.login(req.body);
        logger.info('Controller exit:: ' + JSON.stringify(response));

        // Response handling
        if (response.data) {
            res.status(200).send({
                status: "ok",
                message: "User logged!",
                data: response.data,
                token: response.token
                
            })
        }

        if (response.err) {
            res.status(400).send({
                status: "failed",
                message: response.err
            })
        }

        if (!response) {
            res.status(501).send({
                status: "error",
                error: "Internal server error"
            })
        }
    }

    async register (req,res) {
        const response = await service.register(req.body);

        // Response handling
        if (response.data) {
            res.status(200).send({
                status: "ok",
                message: "User created!",
                data: response.data
            })
        }

        if (response.err) {
            res.status(400).send({
                status: "failed",
                message: response.err
            })
        }

        if (!response) {
            res.status(501).send({
                status: "error",
                error: "Internal server error"
            })
        }
    }
}

module.exports = new Controller();