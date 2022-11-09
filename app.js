const express = require('express');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const path = require('path');

const Book = require("../projeto-banco-de-dados/models/Book");
const Publishers = require("../projeto-banco-de-dados/models/Publishers");

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

//Show one specific books
app.get('/books/:id', async (req, res) => {

    const [book, _] = await Book.findById(req.params.id);

    res.render('books-page/show', {book: book[0]});
});

//Delete a campground
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

    res.render('publishers-page/index', {publishers});
});