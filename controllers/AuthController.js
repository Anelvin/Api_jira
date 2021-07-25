import { User } from '../database/db';

const AuthController = {};

AuthController.signIn = async (req, res, next) => {
    return res.send('Login');
};

AuthController.signUp = async (req, res, next) => {
    console.log(req.body);
    const newUser = await User.create(req.body);
    res.json(newUser);
};

export default AuthController;