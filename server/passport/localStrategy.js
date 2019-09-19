import Strategy from 'passport-local';

import config from '../config';
import { User } from '../models/user';
const {comparePasswords} = require('../lib/bcrypt');

export const localStrategy = new Strategy(config.localAuth,
    async function (email, password, done) {
        console.log('localStrategy');
        try {
            const user = await User.findOne({email});

            const matchPasswords = user && await comparePasswords(password, user && user.password);
            if (user && matchPasswords) {
                done(null, user.toJSON());
            } else {
                done(null, null);
            }
        } catch (err) {
            done(err);
        }
    }
);