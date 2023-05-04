const express = require("express");
const router = express.Router();
// const app = express();
const bcrypt = require("bcryptjs");
const passport = require("passport");


// login page
router.get('/login', (req , res) => {
    res.render('Login');
});

// use model
const User = require("../models/User");

// regis page
router.get('/register', (req , res) => {
    res.render('Register');
});

// regis handler
router.post('/register', (req, res) => {
    const {name , email, password, password2 } = req.body;
    let errors = [];
    // check return error
    if (!name || !email || !password || !password2)
    {
        errors.push({ msg : "please fill all the fields" });

    }
    //check password match
    if (password != password2){
        errors.push({msg : "Please Re-write the password because is not match"});
    }

    // check lenght of password
    if (password.length < 6)
    {
        errors.push({msg : "Password should be at least 6 char"});
    }

    if (errors.length > 0){
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        });
    }else
    {
        User.findOne({ email : email })
        .then(user =>{
         if(user) {
            // if the user exist
			errors.push({msg : "this user is already register"})
            res.render('register', {
                errors,
                name,
                email,
                password,
                password2
                });
            }
			else {
				const newUser = new User({
					name,
					email,
					password
				});
				// hash password
				bcrypt.genSalt(10, (err, salt) => 
					bcrypt.hash(newUser.password, salt, (err, hash) => {
						if (err) throw err;
					// set password to hash
						newUser.password = hash;
					// save user
						newUser.save()
							.then(user => {
                                req.flash("succes_message", "You are now register and you can login to your account");
								res.redirect('/users/login')
							})
							.catch(err => console.log(err));
				}));
			}
        });
    }
});

router.post('/login', (req, res, next) => {
	passport.authenticate('local', {
		successRedirect : '/dashboard',
		failureRedirect : '/users/login',
		failureFlash : true
	})(req, res , next);
});

// logout handler
router.get('/logout', (req, res) => {
	// req.logout();
	// req.flash("success_msg", "you are logged out");
	// res.redirect('/users/login');
	req.logout(function(err) {
		if (err) { 
		  return next(err); 
		  } else {
		req.flash("success_msg", "you are logged out");
		res.redirect('/users/login');
		  }
	  });
});

module.exports = router;