var passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;

module.exports = function initPassport() {
    //Ritorna un id da un oggetto user
    passport.serializeUser(function (user, done) {
        done(null, user.Id);
    });

    //ritorna un user da un id
    passport.deserializeUser(function (id, done) {
        let query = 'SELECT * FROM User WHERE Id = ' + id;
        database.query(query, function (err, user) {
            return done(null, user[0]);
        });
    });

    //Funzione che controlla se la password è corretta e accetta il login NB username è l'email
    passport.use('login', new LocalStrategy(
        function (username, password, done) {
            let hash = crypto.createHash('sha256');
            let query = 'SELECT * FROM User WHERE Email = \'' + username + '\'';
            database.query(query, function (err, user) {
                if (err) {
                    return done(err);
                }
                if (user[0] === undefined) {
                    return done(null, false, {message: 'Username non Presente.'});
                }
                if (user[0].Password !== hash.update(password).digest('hex')) {
                    return done(null, false, {message: 'Password Errata.'});
                }
                return done(null, user[0]);
            });
        }
    ));
};