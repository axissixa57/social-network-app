import express from 'express';
import passport from 'passport';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import {passportInitializer} from "../lib/passportInitializer";
import config from '../config';
import {localStrategy} from "../passport/localStrategy";

export default (app) => {
    app.use(
        express.urlencoded({
            extended: true
        })
    );
    app.use(
        express.json()
    );
    app.use(
        session(config.sessionOptions)
    );
    app.use(
        passport.initialize()
    );
    app.use(
        passport.session()
    );
    passportInitializer(passport, localStrategy);
};