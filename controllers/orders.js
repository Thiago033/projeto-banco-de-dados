const Order = require('../models/Order');
const Sale = require('../models/Sale');
const Book = require('../models/Book');
const Delivery = require('../models/Delivery');

//import {makeid} from '/app.js'

exports.showAllOrders = async (req, res, next) => {
    try {
        //Hard coding the ID = 1
        const [orders, _] = await Order.findAllOrdersById(1);
        res.render('orders/index', {orders});
    } catch (error) {
        console.log("error");
        next(error);
    }
};


exports.showOrderById = async (req, res, next) => {
    try {
        const [order, _] = await Order.findOrderById(req.params.id);
        const [sale] = await Sale.findSaleById(req.params.id);
    
        res.render('orders/show', {order: order[0], sale: sale[0]});
    } catch (error) {
        console.log("error");
        next(error);
    }
};


exports.newOrder = async (req, res, next) => {
    try {
        console.log(req.body);
        const [book, _] = await Book.findBookByIsbn(req.body.isbn);
    
        let option = req.body.flexRadioDefault
        
        if (option == 2) {
            
            let qtd = req.body.quantidade;
            qtd = book[0].quantidade - qtd;
            
            await Book.deleteQuantity(req.body.isbn, qtd);
        }
        
        let price = book[0].preco * req.body.quantidade;

        let order = new Order(1, price, 'Pendente', option);

        const ordem = await order.saveOrderOnDatabase();

        let sale = new Sale(ordem.insertId, req.body.isbn, req.body.quantidade);
        await sale.saveSaleOnDatabase();
        
        const [orders] = await Order.findAllOrdersById(1);
        res.render('orders/index', {orders});

    } catch (error) {
        console.log("error");
        next(error);
    }
};

exports.showOrderConfirmation = async (req, res, next) => {
    try {
        const [order, _] = await Order.findOrderById(req.params.id);
        res.render('orders/confirmation', ({order: order[0]}));
        
    } catch (error) {
        console.log("error");
        next(error);
    }
};

exports.OrderConfirmation = async (req, res, next) => {
    try {
        const [order, _] = await Order.findOrderById(req.body.cod_pedido);

        let delivery = new Delivery(makeid(12), 10, req.body.endereco, req.body.email);
    
        await delivery.saveDeliveryOnDatabase(order[0]);
    
        res.render('orders/payment', ({order: order[0]}));
        
    } catch (error) {
        console.log("error");
        next(error);
    }
};

//Function to generate a random tracking code for order
function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}