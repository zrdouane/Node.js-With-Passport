const express = require("express");
// const router = express.Router();
const app = express();

const { ensureAuthenticated } = require('../config/auth');

app.get('/', (req , res) => {
    // res.send("this a test from index.js that print hello world!");
    res.render('welcome');
});

app.get('/dashboard', ensureAuthenticated, (req, res) =>
res.render('dashboard', {
  name : req.user.name
})
);

module.exports = app;
