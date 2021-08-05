import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {User} from "../entity/User";

class UserController {

    static all = async(request: Request, response: Response, next: NextFunction) => {
        const userRepository = getRepository(User);
        const users = await userRepository.find(); 
        return response.status(200).json( { users });
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const userRepository = getRepository(User);
        return userRepository.findOne(request.params.id);
    }

    static save = async (request: Request, response: Response, next: NextFunction) => {
        const userRepository = getRepository(User);
        return response.send( await userRepository.save(request.body));
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const userRepository = getRepository(User);
        let userToRemove = await userRepository.findOne(request.params.id);
        await userRepository.remove(userToRemove);
    }

}

export default UserController;