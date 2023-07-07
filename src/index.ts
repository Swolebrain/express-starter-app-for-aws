import express from 'express';

const app = express();

app.get('/', (_req, res) => {
    res.status(200).send('Hello world');
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
