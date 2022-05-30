require('dotenv').config()
require('reflect-metadata')
require('@google-cloud/debug-agent').start({serviceContext: {enableCanary: true}});

const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const passport = require('passport');

const envVariables = require('./variables/app');

const modelmap = require('./models/modelmap');

const apiRouter = require('./routes/api/api');
const authRouter = require('./routes/auth/auth');
const uploadRouter = require('./routes/upload/upload');

// Imports the Google Cloud client library
const {ErrorReporting} = require('@google-cloud/error-reporting');

// Instantiates a client
const errors = new ErrorReporting();

const app = express();

app.set('trust proxy', true);
app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/bodytest', (req, res, next) => {
  return res.json(req.body).end();
});

app.use(logger('dev'));

app.use(authRouter);
app.use('/api', apiRouter);
app.use(uploadRouter);

app.use(passport.initialize());

app.use((req, res, next) => {
    next(createError(404));
});

app.use(errors.express);

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
});

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the API',
    status: 'OK'
  });
});

app.listen(envVariables.PORT, '0.0.0.0', () => {
    console.log(`Listening on port ${envVariables.PORT}`)
});

module.exports = app;
