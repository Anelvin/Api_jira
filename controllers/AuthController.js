import { User } from '../database/db';
import { StatusCodes } from 'http-status-codes';
import { createUser } from '../services/userService';

const AuthController = {};

AuthController.signIn = async (req, res, next) => {
    return res.send('Login');
};

AuthController.signUp = async (req, res, next) => {
    const user = await createUser(req.body);
    return res.status(StatusCodes.CREATED).json({'message':'User created!', data: user});
};

export default AuthController;