import express from 'express';
import passport from 'passport';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import cors from "cors";

import config from '../config';
import {passportInitializer} from "../lib/passportInitializer";
import {localStrategy} from "../passport/localStrategy";

export default (app) => {
    // app.use(cookieParser('passport_test'));
    app.use(express.urlencoded({extended: true}));
    app.use(express.json());
    app.use(cors({
        "origin": "http://localhost:3000",
        "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
        "credentials": true
    }));
    // app.use(session(config.sessionOptions));
    // app.use(passport.initialize());
    // app.use(passport.session());
    // passportInitializer(passport, localStrategy);
};