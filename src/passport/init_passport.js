var passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;

module.exports = function initPassport() {
    //Ritorna un id da un oggetto user
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    //ritorna un user da un id
    passport.deserializeUser(function (id, done) {
        db.getUserById(id).then((user) => {
            return done(null, user)
        })
    });

    //Funzione che controlla se la password è corretta e accetta il login NB username è l'email
    passport.use('login', new LocalStrategy(
        function (username, password, done) {
            let hash = crypto.createHash('sha256');
            db.loginUser(username, hash.update(password).digest('hex')).then((user) => {
                if (user == undefined) {
                    return done(null, false, { message: 'Username non Presente o password errata.' });
                }
                return done(null, user);
            })
        }
    ));
};