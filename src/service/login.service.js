const { connect } = require('../config/logindb.config');
const logger = require('../logger/logger.config');
const bcrypt = require('bcryptjs');
const { json } = require('body-parser');
const jwt = require('jsonwebtoken');

class Service {
    db = {};

    constructor() {
        this.db = connect();
        this.db.sequelize.sync().then(() => {
            logger.info('DB Synced!');
        })
    }

    async login(body) {
        try {
            let { mail, pass } = body;

            const res = await this.db.user.findOne({ where: {mail: mail}});

            if (! bcrypt.compareSync(pass, res.pass)) { // pw <> dbPw
                logger.error('Service error:: Bad pass!')
                return { err: "Bad pass!"};
            }

            res.update({lastLogin: new Date()});

            let token = jwt.sign({
                user: res,
            }, process.env.AUTH_SEED, {
                expiresIn: process.env.TOKEN_TIME
            })

            return { data: res, token: token };
        } catch (err) {
            logger.error('Service error:: ' + err);
            return { err: err };
        }
    }

    async register(body) {
        let { username, mail, pass } = body;

        try {
            const exists = await this.db.user.findOne({where : {mail: mail}});

            if (exists) {
                logger.error('Service error:: Email already exists!');
                return { err: "Email already exists!" };
            }

            const response = await this.db.user.create({
                username: username,
                mail: mail,
                pass: bcrypt.hashSync(pass, 10),
                lastLogin: new Date()
            })

            return { data: response };
        } catch (err) {
            logger.error('Service error:: ' + err);
            return { err: err };
        }
    }
}

module.exports = new Service();