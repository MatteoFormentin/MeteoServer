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

            async function getUser() {

                //First try with redis cache
                let user = await redis_client.hgetallAsynch(username);
                //Then use primary sql db
                if (user === null) {
                    user = await database.asynchQuery(query);
                    user = user[0];
                    if (user === undefined) {
                        return done(null, false, {message: 'Username non Presente.'});
                    }
                    //Cache user
                    redis_client.hmset(user.Email, "Email", user.Email, "Id", user.Id, "Name", user.Name, "Password", user.Password, "Admin", user.Admin);
                }

                if (user.Password !== hash.update(password).digest('hex')) {
                    return done(null, false, {message: 'Password Errata.'});
                }

                return done(null, user);
            }

            getUser().catch((err) => error.errorHandler(err));
        }
    ));
};