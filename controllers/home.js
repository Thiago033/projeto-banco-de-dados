const Book = require('../models/Book');

exports.showHomePage = async (req, res, next) => {
    try {
        const [books, _] = await Book.findAllBooks();

        const user = req.user;

        res.render('home', {books, user});
    } catch (error) {
        console.log("error");
        next(error);
    }
};