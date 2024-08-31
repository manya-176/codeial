//importing our model
const User=require('../models/user');

module.exports.profile=function(req,res){
    return res.render('user_profile', {
        title:'user Profile'
    });
    
}


//render the sign up page
module.exports.signUp=function(req,res){
    return res.render('user_sign_up',{
        title:"codeial | Sign up"
    });
}


//render the sign in page
module.exports.signIn=function(req,res){
    return res.render('user_sign_in',{
        title:"codeial | Sign In"
    });
}



module.exports.create = async (req, res) => {
    try {
        // Check if passwords match
        if (req.body.password !== req.body.confirm_password) {
            return res.redirect('back');
        }

        // Check if a user with the given email already exists
        const existingUser = await User.findOne({ email: req.body.email });

        if (!existingUser) {
            // Create a new user if none exists with the given email
            await User.create(req.body);
            // Redirect to the sign-in page after successful user creation
            return res.redirect('/users/sign-in');
        } else {
            // Redirect back if a user already exists with the given email
            return res.redirect('/users/sign-in');
        }
    } catch (err) {
        // Log the error and send an appropriate response
        console.log('Error in finding or creating user during sign-up:', err);
        return res.status(500).send('Internal Server Error');
    }
};



//sign in and create a session for user
module.exports.createSession=function(req,res){
    //todo later
}


