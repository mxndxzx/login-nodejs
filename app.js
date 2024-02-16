// Entry point
const express = require('express');
const pg = require('pg');
const dotenv = require('dotenv');
dotenv.config({path: './.env'})

const app = express();

const host = process.env.HOST;
const port = process.env.PORT;


app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})