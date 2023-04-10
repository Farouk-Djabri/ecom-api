require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const productsRouter = require('./routes/productsRouter');
const usersRouter = require('./routes/usersRouter');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const port = 5000;
const app = express();

require('./common/database/db');

app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}));

app.get('/', (req, res) => {
    res.send('This is the main Page !');
});

app.use('/products', productsRouter);
app.use('/user', usersRouter);


app.listen(port, () =>{
    console.log(`server is running on port ${port} `);
});