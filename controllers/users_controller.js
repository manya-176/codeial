//importing our model
const User=require('../models/user');


//to render user details on profile page after sign-in
// module.exports.profile = async function(req, res) {
//     try {
//         // Check if user_id cookie exists
//         if (req.cookies.user_id) {
//             const user = await User.findById(req.cookies.user_id).exec();
//             if (user) {
//                 return res.render('user_profile', {
//                     title: "User Profile",
//                     user: user
//                 });
//             } else {
//                 return res.redirect('/users/sign-in');
//             }
//         } else {
//             return res.redirect('/users/sign-in');
//         }
//     } catch (err) {
//         console.error('Error finding user:', err);
//         return res.redirect('/users/sign-in');
//     }
// };


module.exports.profile = function(req, res){
    return res.render('user_profile', {
        title: 'User Profile'
    })
}

//render the sign up page
module.exports.signUp=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_up',{
        title:"codeial | Sign up"
    });
}


//render the sign in page
module.exports.signIn=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

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
        const existingUser = await User.findOne({ email: req.body.email }).exec(); //using exec() to return a promise

        if (!existingUser) {
            // Create a new user if none exists with the given email
            await User.create(req.body);
            // Redirect to the sign-in page after successful user creation
            return res.redirect('/users/sign-in');
        } else {
            // Redirect back if a user already exists with the given email
            return res.redirect('/users/sign-up');
        }
    } catch (err) {
        // Log the error and send an appropriate response
        console.log('Error in finding or creating user during sign-up:', err);
        return res.status(500).send('Internal Server Error');
    }
};



//sign in and create a session for user
// module.exports.createSession = async function(req, res) {
    //removing it once as we are learning passport
    // try {
    //     const user = await User.findOne({ email: req.body.email });

    //     if (user) {
    //         if (user.password !== req.body.password) {
    //             return res.redirect('back');
    //         }

    //         res.cookie('user_id', user.id);
    //         return res.redirect('/users/profile');
    //     } else {
    //         return res.redirect('back');
    //     }
    // } catch (err) {
    //     console.error('Error in finding user during sign in:', err);
    //     return res.redirect('back');
    // }
// };

//sign-in w passport.js 
module.exports.createSession = async function(req, res){
    return res.redirect('/');
}
