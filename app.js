const express = require('express');
const dotenv = require('dotenv');
const router = require('./src/router/login.router');
const bodyParser = require('body-parser');
const path = require('path');
const logger = require('./src/logger/logger.config');
dotenv.config({path: './.env'})

const app = express();

const host = process.env.HOST;
const port = process.env.PORT;

app.use(bodyParser.json());

// For bootstrap
app.use("/",express.static("./node_modules/bootstrap/dist/"));
app.use(express.static(path.join(__dirname, "public")));
app.use("/styles/css", express.static(path.join(__dirname, "node_modules/bootstrap/dist/css")));

let renderHTML = path.resolve(__dirname, './public/index.html');  

app.use('/', router);

app.get('/', (req, res) => {
    res.sendFile(renderHTML);
})

app.listen(port, () => {
    logger.info(`Server listening on http://${host}:${port}`);
})