const express   = require('express');
const path      = require('path');

const home = require('../controllers/home');

const router = express.Router();

router.get('/', home.showHomePage);

module.exports = router;