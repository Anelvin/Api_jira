import express from 'express';

const app = express();

app.set('port', process.env.PORT || 3001);

app.get('/', (req, res, next) => {
    return res.send('API JIRA');
});

app.listen(app.get('port'), () => console.log(`Server on port ${app.get('port')}`));