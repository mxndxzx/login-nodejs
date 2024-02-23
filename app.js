const express = require('express');
const dotenv = require('dotenv');
const router = require('./src/router/login.router');
const bodyParser = require('body-parser');
dotenv.config({path: './.env'})

const app = express();

const host = process.env.HOST;
const port = process.env.PORT;

app.use(bodyParser.json());

app.use('/', router);

app.listen(port, () => {
    console.log(`Server listening on http://${host}:${port}`);
})