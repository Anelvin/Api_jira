import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import { secret } from '../constants/constants';

export async function verifyToken(req, res, next){
    let requestToken = req.headers['authorization'];
    if(!requestToken){
        return res.status(StatusCodes.UNAUTHORIZED).send({
            message: 'Es necesario un token'
        });
    }
    requestToken = requestToken.replace('Bearer ', '');
    console.log(requestToken);
    jwt.verify(requestToken, secret, function(error, user) {
        if(error){
            console.log(error);
            return res.status(StatusCodes.UNAUTHORIZED).send({
                ok: false,
                message: 'Token inválido'
            })
        } else {
            next();
        }
    })
}