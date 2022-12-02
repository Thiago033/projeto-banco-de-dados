const Book = require('../models/Book');

exports.showHomePage = async (req, res, next) => {
    try {
        const [books, _] = await Book.findAllBooks();
        res.render('home', {books});
    } catch (error) {
        console.log("error");
        next(error);
    }
};