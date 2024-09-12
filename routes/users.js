const express= require("express"); //importing express
const router=express.Router();  //creating a router
const passport=require('passport');


const usersController = require('../controllers/users_controller');
router.get('/profile', passport.checkAuthentication, usersController.profile);

router.get('/sign-up',usersController.signUp);
router.get('/sign-in',usersController.signIn);

router.post('/create',usersController.create);   //bcz form mein we have used post method
// router.post('/create-session',usersController.createSession); 

//use passport as a middleware to authenticate
router.post('/create-session',passport.authenticate(
    'local',
    { failureRedirect:'/users/sign-in'},
),usersController.createSession);

router.get('/sign-out', usersController.destroySession);

module.exports=router;
 