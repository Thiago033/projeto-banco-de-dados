const User = require('../models/User');

const bcrypt = require('bcrypt');

exports.registerPage = async (req, res, next) => {
    try {
        res.render('auth-views/register');

    } catch (error) {
        console.log("error");
        next(error);
    }
};

exports.registerTeste = async (req, res, next) => {
    try {
        
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        let user = new User(req.body.email, 'thiago', '1', '1', hashedPassword);

        await user.save();

        res.redirect('/login');
    } catch (error) {
        res.redirect('/register');
        console.log("error");
        next(error);
    }

    console.log(users);
};


exports.loginPage = async (req, res, next) => {
    try {
        res.render('auth-views/login');

    } catch (error) {
        console.log("error");
        next(error);
    }
};

exports.login = async (req, res, next) => {
    try {
        

    } catch (error) {
        console.log("error");
        next(error);
    }
};