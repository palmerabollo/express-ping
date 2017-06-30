import express from 'express';
import health from '../';

const app = express();
export default app;

app.use(health.ping());

