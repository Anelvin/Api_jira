import { User } from '../database/db';
import { saltRounds } from '../constants/constants';
import * as bcrypt from 'bcrypt';

async function createUser(data){
    const user = data;
    user.password = await bcrypt.hash(user.password, saltRounds);
    const newUser = await User.create(user);
    delete newUser.password;
    return newUser;
}

export {
    createUser
}