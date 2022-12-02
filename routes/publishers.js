const express   = require('express');

const publishers = require('../controllers/publishers');

const router = express.Router();

router.get('/editoras', publishers.showAllPublishers);

router.get('/editora/:id', publishers.showPublisherById);

module.exports = router;