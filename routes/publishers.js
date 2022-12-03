const express       = require('express');
const publishers    = require('../controllers/publishers');

const router = express.Router();

router.get('/publishers', publishers.showAllPublishers);
router.get('/publisher/:id', publishers.showPublisherById);

module.exports = router;