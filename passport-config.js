const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const User = require("../projeto-banco-de-dados/models/User");

function initialize(passport) {
    const authenticateUser = async (email, password, done) => {

        const [user, _] = await User.findUserByEmail(email)

        if (user[0] == null) {
            return done(null, false, { message: 'No user with that email' })
        }
    
        try {
            if (await bcrypt.compare(password, user[0].senha)) {
                return done(null, user[0]);
            } else {
                return done(null, false, { message: 'Password incorrect' });
            };
        } catch (e) {
            return done(e);
        };
    };

    passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser));
    passport.serializeUser((user, done) => done(null, user.id_usuario));


    passport.deserializeUser(async (id, done) => {
        const [user, _] = await User.findUserById(id);
        return done(null, user[0]);
    });
  };
  
  module.exports = initialize;