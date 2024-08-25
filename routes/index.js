const express= require("express"); //importing express
const router=express.Router();  //creating a router
console.log("router loaded"); //to check if router is created

const homeController = require('../controllers/home_controller');
router.get('/', homeController.home);       //this router index.js is accessing home_controller
router.use('/users', require('./users')); 
  /*'/users' wali requests './users' router pr chli jaengi isliye use acces krne k liye
         we haveto req localhost:8000/users/profile*/

router.use('/users2',require('./posts'));



module.exports=router;        //bcoz we have called it in index.js 
