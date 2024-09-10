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
        console.log('Error in finding user');
        return done(err); // Pass the error to done
    }
});

module.exports = passport;
