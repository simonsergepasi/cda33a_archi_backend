import express from 'express';
import { errorHandlerMiddleware } from './middlewares/error-handler.middleware';
import { jsonReponseMiddleware } from './middlewares/json-response.middleware';
import { ConferenceRoute } from './routes/conference.routes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(jsonReponseMiddleware);
app.use(ConferenceRoute);

app.use(errorHandlerMiddleware);

export default app;