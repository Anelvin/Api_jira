import { getAll } from '../services/userServices';
import { StatusCodes } from 'http-status-codes';

const UserController = {};

UserController.getAll = async (req, res, next) => {
    const users = await getAll();
    return res.status(StatusCodes.OK).send({ users });
}

export default UserController;