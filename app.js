import express from 'express';
// import db from './models/index.js';
import morgan from 'morgan';
const app = express();

import databse from './database/db.js';

app.set('port', process.env.PORT || 3001);

// app.use(db);

app.get('/', (req, res, next) => {
    return res.send('API JIRA');
});

app.listen(app.get('port'), () => console.log(`Server on port ${app.get('port')}`));