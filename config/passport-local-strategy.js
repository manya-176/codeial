const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

// Authentication using Passport
passport.use(new LocalStrategy({
        usernameField: 'email'
    },
    async function(email, password, done) {
        try {
            // Find the user by email
            const user = await User.findOne({ email: email }).exec();

            if (!user || user.password !== password) {
                console.log('Invalid username/password');
                return done(null, false); // No error, but user not found
            }

            return done(null, user); // Authentication successful
        } catch (err) {
            console.log('Error in finding user --> passport');
            return done(err); // Pass the error to done
        }
    }
));

// Serializing the user to decide which key is to be kept in the cookie
passport.serializeUser(function(user, done) {
    done(null, user.id); // Use null for error argument
});

// Deserializing the user from the key in the cookies
passport.deserializeUser(async function(id, done) {
    try {
        const user = await User.findById(id).exec();

        if (user) {
            return done(null, user); // Successful deserialization
        } else {
            return done(new Error('User not found')); // User not found
        }
    } catch (err) {
        console.log('Error in finding user--> Passport');
        return done(err); // Pass the error to done
    }
}); 

//this middleware checks if the user is authenticated using req.isAuthenticated()
passport.checkAuthentication=function (req,res,next){
    ///if user is signed in, pass req to next func(controllers action)
    if(req.isAuthenticated()){
        return next();  //to pass control to the next middleware
    }

    //if user is not signed in
    return res.redirect('/users/sign-in');
}

//This middleware sets res.locals.user with the currently authenticated user (if authenticated).
passport.setAuthenticatedUser=function(req,res,next){
    if(req.isAuthenticated()){
        //req.user contains current signed in user from session cookie & we are j sending it to the locals for the views
        res.locals.user=req.user;
    }
    next();
}

module.exports = passport;
