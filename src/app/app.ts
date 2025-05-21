import express from 'express';
import { ConferenceRoute } from './routes/conference.routes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(ConferenceRoute);

export default app;