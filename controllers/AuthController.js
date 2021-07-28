import { User } from '../database/db';
import { StatusCodes } from 'http-status-codes';
import { signUp, signIn } from '../services/authService';

const AuthController = {};

AuthController.signIn = async (req, res, next) => {
    const data = await signIn(req.body);
    return res.status(StatusCodes.OK).json({ data })
};

AuthController.signUp = async (req, res, next) => {
    const user = await signUp(req.body);
    try {
        return res.status(StatusCodes.CREATED).json({'message':'User created!', data: user});
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR);
    }
};

export default AuthController;