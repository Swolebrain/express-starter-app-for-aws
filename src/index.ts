import express from 'express';
import { awsMetrics } from './middelwares/aws-metrics.js';

const app = express();

app.use(awsMetrics);

app.get('/', (_req, res): void => {
    res.send(`
    <h3>${process.env.APP_NAME} is working. This is ${process.env.NODE_ENV} env</h3>
    <span>${new Date().toISOString()}</span>
    `);
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
