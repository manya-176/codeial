const express= require('express');
const cookieParser= require('cookie-parser');
const app = express();
const port=8000;
const db=require('./config/mongoose');

//user for session cookie
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');


app.use(express.urlencoded());
app.use(cookieParser());

app.use(express.static('./assets'));


//use express router
app.use('/',require('./routes'));

//setting up view engine, ejs
app.set('view engine','ejs');
app.set('views','./views');
// app.set('views', path.join(__dirname, 'views'));


app.use(session({
    name:'codeial',
    //TODO change the secret before deployment
    secret:'balhsomething',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(100*60*100)
    }
}));


app.listen(port, function(err){
    if(err){
        console.log(`error in loading the server : ${err}`); //Interpolation
    }
    console.log(`SErver is running on port: ${port}`);  //use backticks for Template Literals
});