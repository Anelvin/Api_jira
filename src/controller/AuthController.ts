import { User } from './../entity/User';
import { getRepository } from 'typeorm';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import config from '../config/config';
import {StatusCodes} from 'http-status-codes';
import Controller from './Controller';
import { UNAUTHORIZED, INTERNAL_SERVER_ERROR } from '../config/errorTypes';

class AuthController extends Controller {

    constructor(){
        super();
    }

    static signIn = async (req: Request, res: Response, next: NextFunction) => {
        let user: User;
        try {
            let { email, password } = req.body;
            if(!(email && password)) return res.status(StatusCodes.UNAUTHORIZED).json(UNAUTHORIZED);
            const userRepository = getRepository(User);
            user = await userRepository.findOneOrFail({ where: { email } });
            const controller = new Controller();
            const isPasswordValid = await controller.comparePassword(req.body.password, user.password);
            if(!isPasswordValid){
                return res.status(StatusCodes.UNAUTHORIZED).json(UNAUTHORIZED);
            }
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(INTERNAL_SERVER_ERROR);
        }
        const token = jwt.sign({ userId: user.id, email: user.email }, config.jwtSecret, { expiresIn: '2h' });
        const { password, ...result } = user;
        return res.status(StatusCodes.OK).json({ token, user: result });

    }

    static signUp = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const controller = new Controller();
            const userRepository = getRepository(User);
            const newUser = req.body;
            newUser.password = await controller.hashPassword(req.body.password);
            const saveUser = await userRepository.save(newUser);
            const token = jwt.sign({ userId: saveUser.id, email: saveUser.email }, config.jwtSecret, { expiresIn: '2h' });
            const { password, ...result } = saveUser;
            return res.status(StatusCodes.CREATED).json({ token, user: result });
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(INTERNAL_SERVER_ERROR);
        }
    }

}

export default AuthController;