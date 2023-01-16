// Modules
require('dotenv').config();
const express = require('express'); 
const connectDB  = require('./dbConfig');
const cookieParser = require('cookie-parser');
const session = require('express-session')
const flash = require('express-flash')
const path  = require('path')
const bodyParser = require('body-parser')
const passport = require('passport');
const hbs = require('hbs')
const { initializingPassport } = require('./passportConfig');



connectDB();


initializingPassport(passport);
// init Express App
const app = express();



// middlewares
app.use(flash());
app.use(express.static('public'));
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser('secret'));
app.use(session({
  secret: process.env.COOKIE_SEC,
  resave: false,
  saveUninitialized: false,
  cookie: {maxAge: 1000 * 60 * 6 * 24}  //24 hours
}))
app.use(passport.initialize());
app.use(passport.session());

//flash message middleware
app.use((req, res, next)=>{
    res.locals.message = req.session.message
    delete req.session.message
    next()
  })


// View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');






const homePage = require('./routes/usersRoutes');
const register = require('./routes/usersRoutes');
const login = require('./routes/usersRoutes');
const logout = require('./routes/usersRoutes');
const appointment = require('./routes/appointmentRoutes');
const dashboard = require('./routes/dashboardRoutes');
const store = require('./routes/storeRoutes');
const employee_and_doc_controller = require('./routes/employee_and_doc_routes');
const cart = require('./routes/storeRoutes')



app.use('/', homePage)
app.use('/', dashboard)
app.use('/', register)
app.use('/', login)
app.use('/', logout)
app.use('/', appointment)
app.use('/', store)
app.use('/', employee_and_doc_controller)
app.use('/', cart)

// Port
const PORT = process.env.PORT || 8866;


// Start Application
app.listen(PORT,()=>{
    console.log('server started');
    
})