const express= require('express');
const cookieParser= require('cookie-parser');
const app = express();
const port=8000;
const expressLayouts = require('express-ejs-layouts');
const db=require('./config/mongoose');

//user for session cookie
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');
const MongoStore= require('connect-mongo'); 

const sassMiddleware=require('node-sass-middleware');

app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug:true,
    outputStyle:'extended',
    prefix:'/css'
}));

app.use(express.urlencoded());
app.use(cookieParser());

app.use(express.static('./assets'));


app.use(expressLayouts);
// // extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//setting up view engine, ejs
app.set('view engine','ejs');
app.set('views','./views');
// app.set('views', path.join(__dirname, 'views'));


//mongo store is used to store session in the db
app.use(session({
    name:'codeial',
    //TODO change the secret before deployment
    secret:'blahsomething',
    saveUninitialized:false,  //dont save the data when the user has not logged in
    resave:false, //if ther is no change in user data do not resave it
    cookie:{
        maxAge:(1000 *60*100)//minutes in milliseconds
    },
    //to store session permanently
    store: new MongoStore(
        {
            mongoUrl: 'mongodb://localhost/codeial', //mongoDB url
            autoRemove:'disabled'
        },
        function(err){
            console.log(err || 'connect-mongo setup ok');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);


//use express router
app.use('/',require('./routes'));


app.listen(port, function(err){
    if(err){
        console.log(`error in loading the server : ${err}`); //Interpolation
    }
    console.log(`SErver is running on port: ${port}`);  //use backticks for Template Literals
});