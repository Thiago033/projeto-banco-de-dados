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


/*
===================
BOOKS ROUTES
===================
*/
//Show all books
app.get('/books', async (req, res) => {

    const [books, _] = await Book.findAll();

    res.render('books-page/index', {books});
});

//Show one specific books
app.get('/books/:id', async (req, res) => {
    
    const [publishers] = await Publishers.findAll();
    const [book, _] = await Book.findById(req.params.id);
    
    res.render('books-page/show', {book: book[0], publishers: publishers[0]});
});

//Form to a new book
app.get('/books/new', (req, res) => {
    res.render('books-page/new');
});

//Creating a new book
app.post('/books', async (req, res) => {

    let { isbn, titulo, autor, idioma, descricao, preco, quantidade, id_editora } = req.body.book;
    let book = new Book(isbn, titulo, autor, idioma, descricao, preco, quantidade, id_editora);

    await book.save();

    //res.status(201).json({ message: "Book Created!" });

    res.redirect(`books/${isbn}`);
});

//Delete a book
app.delete('/books/:id', async (req, res) => {
    //const id = req.params.id;

    await Book.findByIdAndDelete(req.params.id);

    res.redirect('/books');
});



/*
===================
Publishers
===================
*/
//Show all publishers
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

//Orders page
app.get('/pedidos', (req, res) => {
    res.render('order');
});

//Create new order
app.post('/pedidos', async (req, res) => {

    const [book, _] = await Book.findById(req.body.isbn);
    
    let price = book[0].preco * req.body.quantidade;

    let order = new Order(5, 'thiagolopes@hotmail.com', req.body.isbn, price, req.body.quantidade, 'Pendente');

    await order.save();
});