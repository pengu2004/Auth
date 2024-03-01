const express=require("express");
const path=require("path");
const mongoose=require('mongoose')
const dotenv=require("dotenv");
const app=express();
const morgan=require('morgan');
const exphbs=require("express-handlebars")
const passport=require("passport")
const session=require('express-session')
const connectDB=require('./config/db')
app.use(express.urlencoded({
  extended: true
}));

dotenv.config({path:"./config/config.env"})
require('./config/passport')(passport)

connectDB()


//loggging
if(process.env.NODE_ENV=="development"){
    app.use(morgan('dev'));
}

// exhubs
app.engine('.hbs',exphbs.engine({defaultLayout:"main",extname:'.hbs'}));
app.set('view engine','.hbs');



app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    
  }))
  


app.use(passport.initialize())
app.use(passport.session())
//public
app.use(express.static((path.join(__dirname,"public"))))

//routes
app.use("/",require('./routes/index'))
app.use("/authy",require('./routes/authy'))


const PORT= process.env.PORT || 5000
app.listen(PORT,console.log(`This app is listening on ${PORT} in ${process.env.NODE_ENV}`))