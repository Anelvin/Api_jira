import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {User} from "../entity/User";
import {StatusCodes} from 'http-status-codes';
import {INTERNAL_SERVER_ERROR} from '../config/errorTypes';

class UserController {

    static findAll = async(req: Request, res: Response, next: NextFunction) => {
        try {
            const userRepository = getRepository(User);
            const users = await userRepository.find(); 
            return res.status(StatusCodes.OK).json( { users });
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(INTERNAL_SERVER_ERROR);
        }
    }

    static findOne = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userRepository = getRepository(User);
            const user = await userRepository.findOne(req.params.id);
            return res.status(StatusCodes.OK).json({ user });
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(INTERNAL_SERVER_ERROR);
        }
    }

    static delete = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userRepository = getRepository(User);
            let userToRemove = await userRepository.findOne(req.params.id);
            return res.status(StatusCodes.OK).json({ user: await userRepository.remove(userToRemove) })
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(INTERNAL_SERVER_ERROR);
        }
    }

}

export default UserController;