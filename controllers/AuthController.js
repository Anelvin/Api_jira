import { User } from '../database/db';
import { StatusCodes } from 'http-status-codes';

const AuthController = {};

AuthController.signIn = async (req, res, next) => {
    return res.send('Login');
};

AuthController.signUp = async (req, res, next) => {
    const newUser = await User.create(req.body);
    return res.status(StatusCodes.CREATED).json({'message':'User created!', data: newUser});
};

export default AuthController;