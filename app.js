const express = require('express');
const fileUpload = require('express-fileupload');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const path = require('path');

const Book = require("../projeto-banco-de-dados/models/Book");
const Publishers = require("../projeto-banco-de-dados/models/Publishers");
const Order = require("../projeto-banco-de-dados/models/Order");
const { ifError } = require('assert');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(methodOverride('_method'));
app.use('/public/', express.static('./public'));

app.engine('ejs', ejsMate);

//server connection
//http://localhost:3000/
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`server running on port ${PORT}`));

//Home page
app.get('/', async (req, res) => {

    const [books, _] = await Book.findAll();

    res.render('home', {books});
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
app.get('/book/new', (req, res) => {
    res.render('books-page/new');
});

//Creating a new book
app.post('/book', async (req, res) => {
    
    let bookCover;
    let uploadPath;

    bookCover = req.files.capa;
    uploadPath = '/public/upload/' + bookCover.name;

    teste = __dirname + uploadPath

    bookCover.mv(teste);

    let isbn = req.body.isbn, 
        titulo = req.body.titulo,
        autor = req.body.autor, 
        idioma = req.body.idioma, 
        descricao = req.body.descricao, 
        preco = req.body.preco, 
        quantidade = req.body.quantidade, 
        id_editora = req.body.id_editora
        capa = uploadPath;
    ;

    let book = new Book(isbn, titulo, autor, idioma, descricao, preco, quantidade, id_editora, capa);

    await book.save();
    
    res.redirect(`book/${isbn}`);
});

//Page to show one specific book
app.get('/book/:id', async (req, res) => {
    
    const [publishers] = await Publishers.findAll();
    const [book, _] = await Book.findById(req.params.id);
    
    res.render('books-page/show', {book: book[0], publishers: publishers[0]});
});

//Delete a book by id
app.delete('/book/:id', async (req, res) => {

    await Book.findByIdAndDelete(req.params.id);

    res.redirect('/books');
});

//Form to edit a book
app.get('/book/:id/edit', async (req, res) => {
    
    const [book, _] = await Book.findById(req.params.id);

    res.render('books-page/edit-book', { book: book[0] });
});

//Edit a book
app.put('/book/:id', async (req, res) => {

    await Book.findByIdAndUpdate(req.params.id, {...req.body.book});
    
    res.redirect(`/book/${req.body.book.isbn}`);
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
app.get('/editora/:id', async (req, res) => {

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

    let qtd = req.body.quantidade;
    qtd = book[0].quantidade - qtd;

    await Book.deleteQuantity(req.body.isbn, qtd);

    let price = book[0].preco * req.body.quantidade;
    let order = new Order(null, email, req.body.isbn, price, req.body.quantidade, 'Pendente');

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