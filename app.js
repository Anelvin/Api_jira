import express from 'express';
import morgan from 'morgan';
import authRoutes from './routes/auth';
const app = express();

import databse from './database/db.js';

//Settings
app.set('port', process.env.PORT || 3001);

//Midlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}))

//Routes
app.get('/', (req, res, next) => {
    return res.send('API JIRA');
});

app.use('/auth', authRoutes);

app.listen(app.get('port'), () => console.log(`Server on port ${app.get('port')}`));