const express = require('express');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const path = require('path');

const Book = require("../projeto-banco-de-dados/models/Book");
const Publishers = require("../projeto-banco-de-dados/models/Publishers");
const Order = require("../projeto-banco-de-dados/models/Order");

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.engine('ejs', ejsMate);

//server connection
//http://localhost:3000/
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`server running on port ${PORT}`));

//Home page
app.get('/', (req, res) => {
    res.render('home');
});

let email = 'thiagolopes@hotmail.com';

/*
===================
BOOKS ROUTES
===================
*/
//Page to show all books
app.get('/books', async (req, res) => {

    const [books, _] = await Book.findAll();

    res.render('books-page/index', {books});
});

/* 
======================================
Creating  a new book on database
======================================
*/
//Form to create a new book
app.get('/books/new', (req, res) => {
    res.render('books-page/new');
});

//Creating a new book
app.post('/books', async (req, res) => {
    
    let { isbn, titulo, autor, idioma, descricao, preco, quantidade, id_editora } = req.body.book;
    let book = new Book(isbn, titulo, autor, idioma, descricao, preco, quantidade, id_editora);
    
    await book.save();
    
    res.redirect(`books/${isbn}`);
});

//Page to show one specific book
app.get('/books/:id', async (req, res) => {
    
    const [publishers] = await Publishers.findAll();
    const [book, _] = await Book.findById(req.params.id);
    
    res.render('books-page/show', {book: book[0], publishers: publishers[0]});
});

//Delete a book by id
app.delete('/books/:id', async (req, res) => {

    await Book.findByIdAndDelete(req.params.id);

    res.redirect('/books');
});


/*
===================
PUBLISHERS ROUTES
===================
*/
//Page to show all publishers
app.get('/editoras', async (req, res) => {

    const [publishers, _] = await Publishers.findAll();

    res.render('publishers-page/publishers-index', {publishers});
});

//Show all books from specify publisher
app.get('/editoras/:id', async (req, res) => {

    const [publishers] = await Publishers.findAll();
    const [books, _] = await Publishers.findById(req.params.id);

    res.render('publishers-page/publishers-show', {books, publishers: publishers[0]});
});

/*
===================
ORDERS ROUTES
===================
*/
//Show all orders from user
app.get('/pedidos', async (req, res) => {

    const [orders, _] = await Order.findAllOrdersById(email);

    res.render('orders-page/orders-index', {orders});
});

//Create a new order
app.post('/pedidos', async (req, res) => {

    const [orders] = await Order.findAllOrdersById(email);
    const [book, _] = await Book.findById(req.body.isbn);

    let qtd = book[0].quantidade;
    qtd -= req.body.quantidade;

    if (qtd < 0) {
        console.log("sem livros restantes");
        return;
    }

    await Book.deleteQuantity(req.body.isbn, qtd);

    let price = book[0].preco * req.body.quantidade;
    let order = new Order(1, email, req.body.isbn, price, req.body.quantidade, 'Pendente');

    await order.save();

    res.render('orders-page/orders-index', {orders});
});

//Show an order by id
app.get('/pedido/:id', async (req, res) => {

    const [order, _] = await Order.findOrderById(req.params.id);

    res.render('orders-page/orders-show', {order: order[0]});
});

//Order payment
app.get('/pedido/:id/pagamento', async (req, res) => {

    const [order, _] = await Order.findOrderById(req.params.id);

    Order.payment(req.params.id);

    res.render('orders-page/orders-payment', {order: order[0]});

});