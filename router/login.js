const express = require('express');
const router = express.Router();
const mysql  = require('mysql');

let connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'quanlibanhang1'
});


let bodyParser = require("body-parser");

let urlencodedParser = bodyParser.urlencoded({extended: false});


router.get('/', (req, res) => {
    return res.render('login');
});

router.get('/register', (req, res) => res.render('register'));

router.post('/auth', urlencodedParser, (req, res) => {
    var username = req.body.username;
    var password = req.body.password;
    if (username && password) {
        connection.query('SELECT * FROM tbl_username WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
            if (results.length > 0) {
                req.session.loggedin = true;
                req.session.username = username;
                res.redirect('/home');
            } else {
                res.send('Incorrect Username and/or Password!');
            }
            res.end();
        });
    } else {
        res.send('Please enter Username and Password!');
        res.end();
    }
});


module.exports = router;