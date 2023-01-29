const express               = require('express');
const fileUpload            = require('express-fileupload');
const ejsMate               = require('ejs-mate');
const methodOverride        = require('method-override');
const path                  = require('path');
const flash                 = require('express-flash');
const bodyParser            = require('body-parser');
const session               = require('express-session');
const passport              = require('passport');

const initializePassport    = require('./passport-config');
initializePassport(passport);

//Routes
const bookRoutes            = require('./routes/books');
const homeRoutes            = require('./routes/home');
const publishersRoutes      = require('./routes/publishers');
const ordersRoutes          = require('./routes/orders');
const authRoutes            = require('./routes/auth');

const app = express();

app.engine('ejs', ejsMate);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/public/', express.static('./public'));
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));
app.use(express.json());
app.use(fileUpload());
app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

//Routes
app.use(bookRoutes);
app.use(homeRoutes);
app.use(publishersRoutes);
app.use(ordersRoutes);
app.use(authRoutes);

//server connection
//http://localhost:3000/
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`server running on port ${PORT}`));

/* 
=============================
Global Error Handler
=============================
*/
app.use((err, req, res, next) => {
    console.log(err.stack);
    console.log(err.name);
    console.log(err.code);
});

app.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}));

app.delete('/logout', (req, res) => {
    req.logOut();
    res.redirect('/login');
  })

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    
    res.redirect('/login');
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }
    
    next();
}

//Function to generate a random tracking code for order
// function makeid(length) {
//     var result           = '';
//     var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     var charactersLength = characters.length;
//     for ( var i = 0; i < length; i++ ) {
//         result += characters.charAt(Math.floor(Math.random() * charactersLength));
//     }
//     return result;
// }

// export {makeid};