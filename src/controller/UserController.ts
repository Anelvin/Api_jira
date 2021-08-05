import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {User} from "../entity/User";

class UserController {

    static findAll = async(req: Request, res: Response, next: NextFunction) => {
        const userRepository = getRepository(User);
        const users = await userRepository.find(); 
        return res.status(200).json( { users });
    }

    static findOne = async (req: Request, res: Response, next: NextFunction) => {
        const userRepository = getRepository(User);
        const user = await userRepository.findOne(req.params.id);
        return res.status(200).json({ user });
    }

    static create = async (req: Request, res: Response, next: NextFunction) => {
        const userRepository = getRepository(User);
        return res.status(201).json({user: await userRepository.save(req.body)});
    }

    static delete = async (req: Request, res: Response, next: NextFunction) => {
        const userRepository = getRepository(User);
        let userToRemove = await userRepository.findOne(req.params.id);
        return res.status(200).json({ user: await userRepository.remove(userToRemove) })
    }

}

export default UserController;