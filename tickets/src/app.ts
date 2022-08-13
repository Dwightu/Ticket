//Testing
import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

import { errorHandler } from '@dehui/common';
import { NotFoundError } from '@dehui/common';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
    cookieSession({
        signed: false,
        // it means that cookies are only to be shared when 
        // someone is making a request to our server via http request
        secure: process.env.NODE_ENV !== 'test'
    })
);


app.all('*', async (req, res) => {
    throw new NotFoundError();
});

app.use(errorHandler);

export { app };