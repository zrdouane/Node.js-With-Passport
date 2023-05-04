const express = require("express");
const app = express();
const layouts = require("express-ejs-layouts");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");
// mongoose
const mongoose = require("mongoose");

// mongodb config
const db = require('./config/key').MONGO_URI;

// passport config
require('./config/passport')(passport);

// express session
app.use(session({
    secret : 'secret',
    resave : true,
    saveUninitialized : true
}));

// passport midlleware
app.use(passport.initialize());
app.use(passport.session());
// use flash
app.use(flash());

// Global variable
app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.failure_msg = req.flash("failure_msg");
	next();
});
// 

// mongodb connect
mongoose.connect(db, {useNewUrlParser: true})
    .then(() => console.log("Mongodb have been connected............."))
    .catch(err => console.log(err || "error to connect db"));


// bodyparser
app.use(express.urlencoded({ extended: false })); 

// ejs set
app.use(layouts);
app.set('view engine', 'ejs');

// routes.
app.use('/', (require('./routes/index')));
app.use('/users', (require('./routes/users')));

const port = 3000;

app.listen(port);