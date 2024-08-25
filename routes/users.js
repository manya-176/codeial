const express= require("express"); //importing express
const router=express.Router();  //creating a router


const usersController = require('../controllers/users_controller');
router.get('/profile', usersController.profile);

module.exports=router;
