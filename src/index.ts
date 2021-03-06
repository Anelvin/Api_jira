import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from 'cors';
import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';
import projectRoutes from './routes/projectRoutes';

createConnection().then(async connection => {

    // create express app
    const app = express();
    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    //routes
    app.use('/auth', authRoutes);
    app.use('/users', userRoutes);
    app.use('/projects', projectRoutes);
    // setup express app here
    // ...

    // start express server
    app.listen(3001);

    console.log("Express server has started on port 3001. Open http://localhost:3001/users to see results");

}).catch(error => console.log(error));
