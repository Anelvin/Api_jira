import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as jwt from 'jsonwebtoken';
import config from '../config/config';

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
    let token = <string>req.headers['authorization'];
    let jwtPayload;
    if(token){
        token = token.replace('Bearer ', '');
        try {
            jwtPayload = <any>jwt.verify(token, config.jwtSecret);
            res.locals.jwtPayload = jwtPayload;
        } catch (error) {
            res.status(401).send({'message':'Unauthorized', 'code': StatusCodes.UNAUTHORIZED});
            return;
        }
    
        const { userId, email } = jwtPayload;
        const newToken = jwt.sign({ userId, email }, config.jwtSecret, {
            expiresIn: "1h"
        });
        res.setHeader("token", newToken);
        next();
    } else {
        return res.status(401).send({'message':'Unauthorized', 'code': StatusCodes.UNAUTHORIZED});
    }
}

export const decodedToken = (token) => {
    const payload = jwt.decode(token);
    return payload;
}