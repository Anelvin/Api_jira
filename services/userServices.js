import { User } from '../database/db';

export async function getAll(){
    return await User.findAll();
}