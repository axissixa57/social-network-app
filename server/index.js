import "dotenv/config";
import mongoose from 'mongoose';
import express from 'express';

import middleware from './middleware';
import {verifyToken} from "./lib/jwt";
import routes from './routes';
import {User} from "./models/user";

const app = express();

middleware(app);

app.use(async (req, res, next) => {
    if (req.headers["x-access-token"]) {
        const accessToken = req.headers["x-access-token"];
        const {userId, exp} = await verifyToken(accessToken);

        if (exp < Date.now().valueOf() / 1000) {
            return res
                .status(401)
                .json({
                    error: "JWT token has expired, please login to obtain a new one"
                });
        }

        res.locals.loggedInUser = await User.findById(userId);
        next();
    } else {
        next();
    }
});

app.use(routes);

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
    .then(() => {
        console.log('MongoDB Connection Succeeded.');
        app.listen(process.env.PORT, () => {
            console.log(
                `Server is waiting for a connection... Open http://127.0.0.1:${process.env.PORT} in your browser.`
            );
        });
    }).catch(err => console.log(`Error in DB connection : ${err}`));
