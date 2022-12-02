const express   = require('express');
const book      = require('../controllers/books');

const router    = express.Router();

router.get('/livros', book.showAllBooks);
router.get('/livro/:id', book.showBookByIsbn);
router.get('/livros/digitais', book.showDigitalBooks);
router.get('/livros/fisicos', book.showFisicalBooks);

router.get('/livro/new', book.formToNewBook);
router.post('/livro', book.createBook);

router.delete('/livro/:id', book.deleteBook);

router.get('/livro/:id/edit', book.formToEditBook);
router.put('/livro/:id', book.editBook);

module.exports = router;