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
            console.log('DB Synced!');
        })
    }

    async login(body) {
        await this.db.sequelize.findAll({ emailAdress: body.mail}, (err, userDb) => {
            if (err) {
                return err;
            }

            if (!userDb) {
                return false; // TODO Json
            }

            if (! bcrypt.compareSync(body.password, userDb.password)) { // pw <> dbPw
                return false; // TODO Json
            }

            let token = jwt.sign({
                user: userDb
            }, process.env.AUTH_SEED, {
                expiresIn: process.env.EXPIRES_IN
            })

            return userDb, token;
        })
    }

    async register(body) {
        let { username, mail, pass } = body;

        try {
            const exists = await this.db.user.findOne({where : {mail: mail}});

            if (exists) {
                logger.error('Email already exists!');
                return { err: "Email already exists!" };
            }

            const response = await this.db.user.create({
                username: username,
                mail: mail,
                pass: bcrypt.hashSync(pass, 10)
            })

            return { data: response };
        } catch (err) {
            logger.error('Service error:: ' + err);
            return { err: err };
        }
    }
}

module.exports = new Service();