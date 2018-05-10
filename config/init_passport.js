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
            console.log('qua');
            let query = 'SELECT * FROM User WHERE Email = \'' + username + '\'';
            database.query(query, function (err, user) {
                if (err) {
                    console.log('err');
                    return done(err);
                }
                if (user[0] == undefined) {
                    console.log('Incorrect username.');
                    return done(null, false, {message: 'Incorrect username.'});
                }
                if (user[0].Password !== password) {
                    console.log('Incorrect password.');

                    return done(null, false, {message: 'Incorrect password.'});
                }
                console.log('OK!');

                return done(null, user[0]);
            });
        }
    ));
};