const Book = require('../models/Book');
const Author = require('../models/Author');
const Publishers = require('../models/Publisher');

//Show all books in database
exports.showAllBooks = async (req, res, next) => {
    try {
        const [books, _] = await Book.findAllBooks();
        res.render('books/index', {books});
    } catch (error) {
        console.log("error");
        next(error);
    }
};

//Form to create a new book
exports.formToNewBook = (req, res, next) => {
    try {
        res.render('books/new');
    } catch (error) {
        console.log("error");
        next(error);
    }
};

//Creating a new book
exports.createBook = async (req, res, next) => {
    try {
        let bookCover;
        let uploadPath;
    
        bookCover = req.files.capa;
        //console.log(bookCover);

        uploadPath = 'public/upload/' + bookCover.name;

        teste =  'C:\\Repositorio\\projeto-banco-de-dados\\' + uploadPath
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
        
        res.redirect(`book/${isbn}`);

    } catch (error) {
        console.log("error");
        next(error);
    }
};

//Show book by id (isbn)
exports.showBookByIsbn = async (req, res, next) => {
    try {
        
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

        res.render('books/show', { book: book[0], editora: editora[0], autores, bookType});

    } catch (error) {
        console.log("error");
        next(error);
    }
};

exports.showDigitalBooks = async (req, res, next) => {
    try {
        const [books, _] = await Book.findAllFisicalBooks();
        res.render('books/digital-books', {books});
    } catch (error) {
        console.log("error");
        next(error);
    }
};

exports.showFisicalBooks = async (req, res, next) => {
    try {
        const [books, _] = await Book.findAllDigitalBooks();
        res.render('books/fisical-books', {books});
    } catch (error) {
        console.log("error");
        next(error);
    }
};

exports.deleteBook = async (req, res, next) => {
    try {
        await Book.findBookByIsbnAndDelete(req.params.id);
        res.redirect('/books');
    } catch (error) {
        console.log("error");
        next(error);
    }
};

exports.formToEditBook = async (req, res, next) => {
    try {
        const [book, _] = await Book.findBookByIsbn(req.params.id);
        const [autores] = await Author.findAuthorsByIsbn(req.params.id);
    
        res.render('books/edit', { book: book[0], autores});
    } catch (error) {
        console.log("error");
        next(error);
    }
};

exports.editBook = async (req, res, next) => {
    try {
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
    
        res.redirect(`/book/${req.body.isbn}`);
    } catch (error) {
        console.log("error");
        next(error);
    }
};




// exports. = async (req, res, next) => {
//     try {
        
//     } catch (error) {
//         console.log("error");
//         next(error);
//     }
// };