const express = require('express'),
    app = express(),
    bodyparser = require('body-parser'),
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    consign = require('consign'),
    cors = require('cors'),
    passport = require('passport'),
    passportConfig = require('./passport')(passport),
    jwt = require('jsonwebtoken'),
    config = require('./index'),
    database = require('./database')(mongoose, config);

app.use(express.static('.'));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(morgan('dev'));
app.use(cors());
app.use(passport.initialize());

app.set('budgetsecret', config.secret);

consign({ cwd: 'services' })
    .include('BudgetManagerAPI/app/setup')
    .then('BudgetManagerAPI/app/api')
    .then('BudgetManagerAPI/app/routes')
    .into(app);

module.exports = app;