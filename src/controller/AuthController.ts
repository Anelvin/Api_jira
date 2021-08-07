import { User } from './../entity/User';
import { getRepository } from 'typeorm';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import config from '../config/config';
import {StatusCodes} from 'http-status-codes';
import Controller from './Controller';

class AuthController extends Controller {

    constructor(){
        super();
    }

    static signIn = async (req: Request, res: Response, next: NextFunction) => {
        let { email, password } = req.body;
        if(!(email && password)) return res.status(StatusCodes.UNAUTHORIZED).send();

        const userRepository = getRepository(User);

        let user: User;
        try {
            user = await userRepository.findOneOrFail({ where: { email } });
        } catch (error) {
            res.status(StatusCodes.UNAUTHORIZED).send();
        }
        const token = jwt.sign({ userId: user.id, email: user.email }, config.jwtSecret, { expiresIn: '2h' });
        return res.status(StatusCodes.OK).json({ token });

    }

    static signUp = async (req: Request, res: Response, next: NextFunction) => {
        const controller = new Controller();
        const userRepository = getRepository(User);
        const newUser = req.body;
        newUser.password = await controller.hashPassword(req.body.password);
        const saveUser = await userRepository.save(newUser);
        const token = jwt.sign({ userId: saveUser.id, email: saveUser.email }, config.jwtSecret, { expiresIn: '2h' });
        const { password, ...result } = saveUser;
        return res.status(StatusCodes.CREATED).json({ token, user: result });
    }

}

export default AuthController;