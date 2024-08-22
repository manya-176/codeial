const express= require("express");
const router=express.Router();
console.log("router loaded"); //to check if router is created

const homeController = require('../controllers/home_controller');
router.get('/', homeController.home);

module.exports=router;
