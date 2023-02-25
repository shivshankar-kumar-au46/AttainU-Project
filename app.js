// Requiring module 
const express = require('express'); 
const connectDB  = require('./dbConfig');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const path  = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const { COOKIE_SEC } = require('./env');
const hbs = require('hbs');
const { initializingPassport } = require('./passportConfig');
const app = express(); // init Express App

const jwt = require('jsonwebtoken');

// const createToken = async () => {
//   const token = await jwt.sign({_id:'63dcb1c3ee62550be1521e31'}, 'ksdfsdifisdfksldfjsldjlskjkl',{
//     expiresIn: "2 seconds"
//   })

//   console.log(token)
//   const userVer = await jwt.verify(token, "ksdfsdifisdfksldfjsldjlskjkl")
//   console.log(userVer)
// }

// createToken()


// call DB function
connectDB();


// initialises Passport
initializingPassport(passport);




// middlewares
app.use(express.static('public'));
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser('secret'));
app.use(session({
  secret: COOKIE_SEC,
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




//Requires the Routes module
const homePage = require('./routes/usersRoutes');
const register = require('./routes/usersRoutes');
const login = require('./routes/usersRoutes');
const logout = require('./routes/usersRoutes');
const appointment = require('./routes/appointmentRoutes');
const dashboard = require('./routes/dashboardRoutes');
const store = require('./routes/storeRoutes');
const employee_and_doc_controller = require('./routes/employee_and_doc_routes');
const cart = require('./routes/storeRoutes')


// mount the specified middleware function
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



// setup server to listen on port 8866
app.listen(PORT,()=>{
    console.log(`Server running on http://localhost:${PORT}`);
    
})