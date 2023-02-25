const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const RegisterModel = require('./models/user');
const bcrypt = require('bcryptjs');

exports.initializingPassport  = (passport) => {

    passport.use(new LocalStrategy(async (username, password, done) => {
        
        const user = await RegisterModel.findOne({username})
        console.log(user.password)
        console.log(password)
        
        try {
            if(!user) return done(null, false);


        const isMatch = bcrypt.compare(password, user.password);

        if(!isMatch){
            return done(null, false);
        }

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

exports.isAdmin = async (req, res, next) => {
    console.log(req.user)
    const isAdmin = await req.user.is_Admin;
    if (!isAdmin) {
      return   res.status(401).send("You are not athorized to performe this operation")
    }
    return next();
}