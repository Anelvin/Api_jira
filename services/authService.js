import { User } from '../database/db';
import { saltRounds } from '../constants/constants';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { OK, StatusCodes } from 'http-status-codes';
import { statusOk, unauthorized } from '../constants/responses';

async function createUser(data){
    const user = data;
    user.password = await bcrypt.hash(user.password, saltRounds);
    const newUser = await User.create(user);
    delete newUser.password;
    return newUser;
}

async function signIn(data){
    const user = await User.findOne({
        where: {
            email: data.email
        }
    });
    if(user){
        const passwordCorrect = await bcrypt.compare(data.password, user.password);
        if(passwordCorrect === true){
            const payload = {
                email: user.email
            }
            const token = jwt.sign(payload, 'secret', { expiresIn: '2h'});
            return statusOk(token);
        } else {
            return unauthorized();
        }
    } else {
        return unauthorized();
    }
}

export {
    createUser,
    signIn
}