const express               = require('express');
const fileUpload            = require('express-fileupload');
const ejsMate               = require('ejs-mate');
const methodOverride        = require('method-override');
const path                  = require('path');
const flash                 = require('express-flash');

const passport              = require('passport');
const session               = require('express-session');

//Routes
const bookRoutes            = require('./routes/books');
const homeRoutes            = require('./routes/home');
const publishersRoutes      = require('./routes/publishers');
const ordersRoutes          = require('./routes/orders');

const app = express();

app.engine('ejs', ejsMate);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Routes
app.use(bookRoutes);
app.use(homeRoutes);
app.use(publishersRoutes);
app.use(ordersRoutes);

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(fileUpload());
app.use(methodOverride('_method'));
app.use('/public/', express.static('./public'));
app.use(flash());



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



// //Form to register
// app.get('/register', async (req, res) => {
//     res.render('passport-login-system/register');
// });

// //Register
// app.post('/register', async (req, res) => {

//     try {
//         const hashedPassword = await bcrypt.hash(req.body.senha, 10);

//         let email = req.body.email, 
//             nome = req.body.nome,
//             telefone = req.body.telefone, 
//             endereco = req.body.endereco, 
//             senha = hashedPassword 
//         ;

//         let user = new User(email, nome, telefone, endereco, senha);

//         await user.save();

//         res.redirect('/login');

//     } catch (error) {
//         console.log(error);
//         res.redirect('/register');
//     }
// });


// //==========================================================
// //LOGIN DOESN'T WORK
// //Form to login
// app.get('/login', async (req, res) => {
//     res.render('passport-login-system/login');
// });

// //Post
// app.post('/login', passport.authenticate('local', {
// 	successRedirect: '/',
// 	failureRedirect: '/login'
// }));
// //==========================================================