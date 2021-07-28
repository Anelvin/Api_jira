import express from 'express';
import morgan from 'morgan';
import authRoutes from './routes/auth';
const app = express();

import databse from './database/db.js';

//Settings
app.set('port', process.env.PORT || 3001);

//Midlewares
app.use( function ( req, res, next ) {
    res.header( "Access-Control-Allow-Origin", "*" );
    res.header( "Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept" );
    res.header( "Access-Control-Allow-Methods", "POST, PUT, PATCH, DELETE, GET" );
    next();
});

app.use(express.json());
app.use(express.urlencoded({extended: false}))

//Routes
app.get('/', (req, res, next) => {
    return res.send('API JIRA');
});

app.use('/auth', authRoutes);

app.listen(app.get('port'), () => console.log(`Server on port ${app.get('port')}`));