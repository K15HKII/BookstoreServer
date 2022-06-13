require('dotenv').config()
require('reflect-metadata')

const express = require('express');
const logger = require('morgan');
const passport = require('passport');
const createError = require('http-errors');

const envVariables = require('./variables/app.variable');
const swaggerDocs = require("./utils/swagger");

const RunApp = async () => {
    const app = express();

    app.set('trust proxy', true);
    app.use(express.static('public'));

    app.use(express.json());
    app.use(express.urlencoded({extended: false}));

    app.use(logger('dev'));

    app.use(passport.initialize({
        session: false,
    }));

    //region ORM - Database
    const AppDataSource = require('./config/database').AppDataSource;
    const { InitSamples } = require('./models/samples');

    await AppDataSource.initialize();
    await InitSamples();
    //endregion

    //region Routes
    const apiRouter = require('./routes/api/api.route');
    const authRouter = require('./routes/auth/auth');
    const uploadRouter = require('./routes/upload/upload');

    app.use(authRouter);
    app.use('/api', apiRouter);
    app.use(uploadRouter);
    //endregion

    swaggerDocs(app);

    //region Logging
    if (process.env.GOOGLE_CLOUD_PROJECT) {
        require('@google-cloud/debug-agent').start({serviceContext: {enableCanary: true}});
        const {ErrorReporting} = require('@google-cloud/error-reporting');
        const errors = new ErrorReporting();
        app.use(errors.express);
    }

    app.get('/', (req, res) => {
        res.json({
            message: 'Welcome to the API',
            status: 'OK'
        });
    });
    //endregion

    app.listen(envVariables.PORT, () => {
        console.log(`Listening on port ${envVariables.PORT}`)
    });
}

RunApp().then(() => {
    console.log('App started!');
});
