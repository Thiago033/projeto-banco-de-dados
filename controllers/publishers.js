const Publishers = require('../models/Publisher');

exports.showAllPublishers = async (req, res, next) => {
    try {
        const [publishers, _] = await Publishers.findAllPublishers();
        res.render('publishers/index', {publishers});
        
    } catch (error) {
        console.log("error");
        next(error);
    }
};

exports.showPublisherById = async (req, res, next) => {
    try {
        const [publishers] = await Publishers.findPublisherById(req.params.id);
        const [books, _] = await Publishers.findAllBooksByPublisherId(req.params.id);
    
        res.render('publishers/show', {books, publishers: publishers[0]});
        
    } catch (error) {
        console.log("error");
        next(error);
    }
};