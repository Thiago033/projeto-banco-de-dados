const Publishers = require('../models/Publishers');

exports.showAllPublishers = async (req, res, next) => {
    try {
        const [publishers, _] = await Publishers.findAllPublishers();
        res.render('publishers-page/publishers-index', {publishers});
        
    } catch (error) {
        console.log("error");
        next(error);
    }
};

exports.showPublisherById = async (req, res, next) => {
    try {
        const [publishers] = await Publishers.findAllPublishers();
        const [books, _] = await Publishers.findAllBooksByPublisherId(req.params.id);
    
        res.render('publishers-page/publishers-show', {books, publishers: publishers[0]});
        
    } catch (error) {
        console.log("error");
        next(error);
    }
};