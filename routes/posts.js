const express= require("express"); //importing express
const router=express.Router();  //creating a router

const postsController = require('../controllers/posts_controller');
router.get('/posts',postsController.posts);

module.exports=router;
