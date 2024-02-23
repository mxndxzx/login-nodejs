const express = require('express');
const controller = require('../controller/login.controller');

const router = express.Router();

router.post('/login', controller.login);
router.post('/register', controller.register);

module.exports = router;