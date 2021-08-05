import { getRepository } from 'typeorm';
import { Request, Response, NextFunction } from 'express';
import { User } from '../entity/User';
import * as jwt from 'jsonwebtoken';
import config from '../config/config';

class AuthController {

    static login = async (req: Request, res: Response, next: NextFunction) => {
        let { email, password } = req.body;
        if(!(email && password)) res.status(401).send();

        const userRepository = getRepository(User);

        let user: User;
        try {
            user = await userRepository.findOneOrFail({ where: { email } });
        } catch (error) {
            res.status(401).send();
        }

        const token = jwt.sign({ userId: user.id, email: user.email }, config.jwtSecret, { expiresIn: '1h' });
        return res.status(200).json({ token });
    }

}

export default AuthController;