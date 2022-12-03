const express   = require('express');
const order     = require('../controllers/orders');

const router = express.Router();

router.get('/orders', order.showAllOrders);
router.get('/order/:id', order.showOrderById);

router.get('/order/:id/delivery', order.showOrderConfirmation);
router.post('/order/delivery', order.OrderConfirmation);

router.post('/orders', order.newOrder);

module.exports = router;