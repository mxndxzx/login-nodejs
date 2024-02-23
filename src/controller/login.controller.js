const service = require('../service/login.service');
const logger = require('../logger/logger.config');

class Controller {
    async login (req,res) {
        const response = await service.login(req.body);

        // Response handling
        if (response) {
            res.status(200).send({
                status: "login",
                data: response
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
            res.status(200).send({
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