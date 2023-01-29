const express   = require('express');
const auth      = require('../controllers/auth');

const router = express.Router();

router.get('/register', auth.registerPage);
router.post('/register', auth.registerTeste);

router.get('/login', auth.loginPage);
// router.post('/login', );

module.exports = router;