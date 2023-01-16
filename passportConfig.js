const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const RegisterModel = require('./models/user');

exports.initializingPassport  = (passport) => {

    passport.use(new LocalStrategy(async (username, password, done) => {
        const user = await RegisterModel.findOne({username})
        
        try {
            if(!user) return done(null, false);

        if(user.password !== password) return done(null, false);

        return done(null, user);
        } catch (error) {
        return done(error, false);
            
        }
    })) 


    passport.serializeUser((user, done) => {
        done(null, user.id);
    })

    passport.deserializeUser(async(id, done) => {
        try {
            const user = await RegisterModel.findById(id);

            done(null, user);
        } catch (error) {
            done(error, false);
        }
    });

}; 

exports.isAuthenticated = (req, res, next) => {
    if (req.user) return next();

    res.redirect('/login')
}