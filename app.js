const express = require('express');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const path = require('path');

const Book = require("../projeto-banco-de-dados/models/Book");

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

app.get('/', (req, res) => {
    res.render('home');
});

//Show all books
app.get('/books', async (req, res) => {

    const [books, _] = await Book.findAll();

    res.render('books-page/index', {books});
});

//Show one specific books
app.get('/books/:id', async (req, res) => {

    const [book, _] = await Book.findById(req.params.id);

    res.render('books-page/show', {book: book[0]});
});