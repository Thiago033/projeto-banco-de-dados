const express   = require('express');
const book      = require('../controllers/books');

const router    = express.Router();

router.get('/books', book.showAllBooks);
router.get('/book/:id', book.showBookByIsbn);

router.get('/books/digital', book.showDigitalBooks);
router.get('/books/fisical', book.showFisicalBooks);

router.get('/books/new', book.formToNewBook)
router.post('/book', book.createBook);

router.delete('/book/:id', book.deleteBook);

router.get('/book/:id/edit', book.formToEditBook);
router.put('/book/:id', book.editBook);

module.exports = router;