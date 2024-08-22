const express= require('express');
const app = express();
const port=8000;

//use express router
app.use('/',require('./routes/index'));




app.listen(port, function(err){
    if(err){
        console.log(`error in loading the server : ${err}`); //Interpolation
    }
    console.log(`SErver is running on port: ${port}`);  //use backticks for Template Literals
});