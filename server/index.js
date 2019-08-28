import mongoose from 'mongoose';
import express from 'express';

import middleware from './middleware';
import routes from './routes';
import config from './config';
import checkAuthentication from './lib/checkAuthentication';

const app = express();

middleware(app);

app.use('/api', checkAuthentication, routes);

mongoose.connect(config.database, {useNewUrlParser: true})
    .then(() => {
        console.log('MongoDB Connection Succeeded.');
        app.listen(config.port, () => {
            console.log(
                'Server is waiting for a connection... Open http://127.0.0.1:3001/ in your browser.'
            );
        });
    }).catch(err => console.log(`Error in DB connection : ${err}`));
