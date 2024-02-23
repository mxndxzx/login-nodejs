const {Sequelize, Model, DataTypes, QueryTypes} = require('sequelize');
const logger = require('../logger/logger.config');

require('dotenv').config();

const connect = () => {
    const sequelize = new Sequelize({
        host: process.env.DBHOST,
        port: process.env.DBPORT,
        username: process.env.DBUSER,
        password: process.env.DBPASS,
        database: process.env.DBNAME,
        schema: process.env.DBSCHEMA,
        dialect: 'postgres',
        pool: {
            max: 10,
            min: 0,
            acquire: 0,
            idle: 0
        },
        logging: (msg) => logger.info(msg)
    })

    async function auth() {
        try {
            await sequelize.authenticate();
            console.log('DB Authenticated!');
        } catch (err) {
            console.log('Error authenticating into DB:: ' + err);
            return err;
        }
    }

    auth(); // Exec, se podría mejorar

    const db = {};
    db.Sequelize = Sequelize;
    db.sequelize = sequelize;
    db.user = require('../models/user.model')(sequelize,DataTypes,Model)

    return db;
}

module.exports = { connect };