require('dotenv').config()

const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const passport = require('passport');

const envVariables = require('./variables/app');

const modelmap = require('./models/modelmap');

const apiRouter = require('./routes/api/api');
const authRouter = require('./routes/auth/auth');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(logger('dev'));

app.use('/api', apiRouter);
app.use(authRouter);

app.use(passport.initialize());

app.use((req, res, next) => {
    next(createError(404));
});


app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
});

app.listen(envVariables.PORT, () => {
    console.log(`Listening on port ${envVariables.PORT}`)
})

module.exports = app;
