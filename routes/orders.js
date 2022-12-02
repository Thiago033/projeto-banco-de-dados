const express   = require('express');

const order = require('../controllers/orders');

const router = express.Router();

router.get('/pedidos', order.showAllOrders);

router.get('/pedido/:id', order.showOrderById);

router.get('/pedido/:id/entrega', order.showOrderConfirmation);

router.post('/pedido/entrega', order.OrderConfirmation);

router.post('/pedidos', order.newOrder);

module.exports = router;