let idDefault = 1;

const Book          = require("../projeto-banco-de-dados/models/Book");
const Author        = require("../projeto-banco-de-dados/models/Author");
const Publishers    = require("../projeto-banco-de-dados/models/Publishers");
const Order         = require("../projeto-banco-de-dados/models/Order");
const User          = require("../projeto-banco-de-dados/models/User");
const Sale          = require("../projeto-banco-de-dados/models/Sale");
const Delivery       = require("./models/Delivery");

const { ifError }           = require('assert');
const express               = require('express');
const fileUpload            = require('express-fileupload');
const ejsMate               = require('ejs-mate');
const methodOverride        = require('method-override');
const bcrypt                = require('bcrypt');
const passport              = require('passport');
const path                  = require('path');
const flash                 = require('express-flash');
const session               = require('express-session');
const LocalStrategy         = require('passport-local').Strategy;

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(fileUpload());
app.use(methodOverride('_method'));
app.use('/public/', express.static('./public'));
app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.engine('ejs', ejsMate);

//server connection
//http://localhost:3000/
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`server running on port ${PORT}`));

//Form to login
app.get('/login', async (req, res) => {
    res.render('passport-login-system/login');
});

//Post
app.post('/login', passport.authenticate('local', {
	successRedirect: '/',
	failureRedirect: '/login'
}));

//Form to register
app.get('/register', async (req, res) => {
    res.render('passport-login-system/register');
});

//Register
app.post('/register', async (req, res) => {

    try {
        const hashedPassword = await bcrypt.hash(req.body.senha, 10);

        let email = req.body.email, 
            nome = req.body.nome,
            telefone = req.body.telefone, 
            endereco = req.body.endereco, 
            senha = hashedPassword 
        ;

        let user = new User(email, nome, telefone, endereco, senha);

        await user.save();

        res.redirect('/login');

    } catch (error) {
        console.log(error);
        res.redirect('/register');
    }
});

/*
=========================================================
HOME ROUTES
=========================================================
*/
//Home page
app.get('/', async (req, res) => {
    
    const [books, _] = await Book.findAllBooks();

    res.render('home', {books});
});

//Home page
app.get('/home', async (req, res) => {
    
    const [books, _] = await Book.findAllBooks();

    res.render('home', {books});
});


/*
=========================================================
BOOKS ROUTES
=========================================================
*/
//Page to show all books
app.get('/livros', async (req, res) => {

    const [books, _] = await Book.findAllBooks();

    res.render('books-page/index', {books});
});

/* 
=========================================================
Creating  a new book on database
=========================================================
*/
//Form to create a new book
app.get('/livro/new', (req, res) => {
    res.render('books-page/new');
});

//Show books by type
//Digital books
app.get('/livros/digitais', async (req, res) => {
    const [books, _] = await Book.findAllDigitalBooks();

    res.render('books-page/digital-books', {books});
});

//Fisical books
app.get('/livros/fisicos', async (req, res) => {
    const [books, _] = await Book.findAllFisicalBooks();

    res.render('books-page/fisical-books', {books});
});

//Creating a new book
app.post('/livro', async (req, res) => {
    
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
        id_editora = req.body.id_editora,
        capa = uploadPath,

        fileSize = req.body.tam_arquivo,
        fontType = req.body.fonte

        numPages = req.body.paginas

        option = req.body.flexRadioDefault
    ;

    let book = new Book(isbn, titulo, idioma, descricao, preco, quantidade, id_editora, capa);

    await book.saveBookOnDatabase(option, numPages, fileSize, fontType);

    let autores = new Author(isbn, autor);
    await autores.saveAuthorsOnDatabase();
    
    res.redirect(`livro/${isbn}`);
});

//Show book by id (isbn)
app.get('/livro/:id', async (req, res) => {
    
    const [book, _] = await Book.findBookByIsbn(req.params.id);


    //===================================================
    //TODO: create a decent function for this
    let bookType;

    const [digital] = await Book.findDigitalBookByIsbn(req.params.id);
    if (digital[0]) {
        
        const [fisico] = await Book.findFisicalBookByIsbn(req.params.id);
        if (fisico[0]) {
            bookType = 3;
        } else {
            bookType = 1;
        }
    } else {
        bookType = 2;
    }
    //===================================================
    

    const [editora] = await Publishers.findPublisherById(book[0].id_editora);

    const [autores] = await Author.findAuthorsByIsbn(req.params.id);

    res.render('books-page/show', { book: book[0], editora: editora[0], autores, bookType});
});

//Delete a book by id
app.delete('/livro/:id', async (req, res) => {

    await Book.findBookByIsbnAndDelete(req.params.id);

    res.redirect('/livros');
});

//Form to edit a book
app.get('/livro/:id/edit', async (req, res) => {
    
    const [book, _] = await Book.findBookByIsbn(req.params.id);
    const [autores] = await Author.findAuthorsByIsbn(req.params.id);

    res.render('books-page/edit-book', { book: book[0], autores});
});

//Edit a book
app.put('/livro/:id', async (req, res) => {

    let isbn = req.body.isbn, 
        titulo = req.body.titulo,
        autor = req.body.autor,
        idioma = req.body.idioma, 
        descricao = req.body.descricao, 
        preco = req.body.preco, 
        quantidade = req.body.quantidade, 
        id_editora = req.body.id_editora
    ;

    await Book.findBookByIsbnAndUpdate(req.params.id, isbn, titulo, autor, idioma, descricao, preco, quantidade, id_editora);
    
    res.redirect(`/livro/${req.body.isbn}`);
});

/*
=========================================================
PUBLISHERS ROUTES
=========================================================
*/
//Page to show all publishers
app.get('/editoras', async (req, res) => {

    const [publishers, _] = await Publishers.findAllPublishers();

    res.render('publishers-page/publishers-index', {publishers});
});

//Show all books from specify publisher
app.get('/editora/:id', async (req, res) => {

    const [publishers] = await Publishers.findAllPublishers();
    const [books, _] = await Publishers.findAllBooksByPublisherId(req.params.id);

    res.render('publishers-page/publishers-show', {books, publishers: publishers[0]});
});

/*
=========================================================
ORDERS ROUTES
=========================================================
*/
//Show all orders from user
app.get('/pedidos', async (req, res) => {

    const [orders, _] = await Order.findAllOrdersById(idDefault);

    res.render('orders-page/orders-index', {orders});
});

//Create a new order
app.post('/pedidos', async (req, res) => {

    const [book, _] = await Book.findBookByIsbn(req.body.isbn);
    
    let option = req.body.flexRadioDefault
    
    if (option == 2) {
        
        let qtd = req.body.quantidade;
        qtd = book[0].quantidade - qtd;
        
        await Book.deleteQuantity(req.body.isbn, qtd);
    }
    
    let price = book[0].preco * req.body.quantidade;

    let order = new Order(idDefault, price, 'Pendente', option);

    const ordem = await order.saveOrderOnDatabase();

    let sale = new Sale(ordem.insertId, req.body.isbn, req.body.quantidade);
    await sale.saveSaleOnDatabase();
    
    const [orders] = await Order.findAllOrdersById(idDefault);
    res.render('orders-page/orders-index', {orders});
});

//Show an order by id
app.get('/pedido/:id', async (req, res) => {

    const [order, _] = await Order.findOrderById(req.params.id);
    const [sale] = await Sale.findSaleById(req.params.id);

    res.render('orders-page/orders-show', {order: order[0], sale: sale[0]});
});

//Order confirmation
app.get('/pedido/:id/entrega', async (req, res) => {

    const [order, _] = await Order.findOrderById(req.params.id);
    res.render('orders-page/orders-confirmation', ({order: order[0]}));
});

//Delivery
app.post('/pedido/entrega', async (req, res) => {

    const [order, _] = await Order.findOrderById(req.body.cod_pedido);

    let delivery = new Delivery(10, 100, req.body.endereco, req.body.email);

    await delivery.saveDeliveryOnDatabase(order[0]);

    res.render('orders-page/orders-payment', ({order: order[0]}));
});