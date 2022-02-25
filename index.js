const express = require('express');
const app = express();
const session = require('express-session');
const flash = require('connect-flash');
app.use(flash());
app.use(express.static('public'));
app.set("view engine", "ejs");
app.set("views", "./views");
app.listen(3000);
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
let home = require('./router/home');
let login = require('./router/login');
let api = require('./router/api');
app.use(api);
app.use(login);
app.use(home);


