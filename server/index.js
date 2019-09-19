import "dotenv/config";
import mongoose from 'mongoose';
import express from 'express';

import middleware from './middleware';
import routes from './routes';
import config from './config';
import checkAuthentication from './lib/checkAuthentication';

const app = express();

middleware(app);

app.use(routes);
// app.use(checkAuthentication, routes);

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('MongoDB Connection Succeeded.');
        app.listen(process.env.PORT, () => {
            console.log(
                `Server is waiting for a connection... Open http://127.0.0.1:${process.env.PORT} in your browser.`
            );
        });
    }).catch(err => console.log(`Error in DB connection : ${err}`));
