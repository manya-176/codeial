const express= require("express"); //importing express
const router=express.Router();  //creating a router


const usersController = require('../controllers/users_controller');
router.get('/profile', usersController.profile);

router.get('/sign-up',usersController.signUp);
router.get('/sign-in',usersController.signIn);

router.post('/create',usersController.create);   //bcz form mein we have used post method


module.exports=router;
 