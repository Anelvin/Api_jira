import { createQueryBuilder, getConnection, getRepository } from 'typeorm';
import { Request, Response, NextFunction } from 'express';
import Controller from "./Controller";
import { Project } from '../entity/Project';
import { StatusCodes } from 'http-status-codes';
import { INTERNAL_SERVER_ERROR } from '../config/errorTypes';
import { decodedToken } from '../middlewares/checkJwt';
import { User } from '../entity/User';

class ProjectController extends Controller {

    constructor(){
        super();
    }

    static findAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const connection = getConnection();
            const projects = await connection.getRepository(Project)
                .createQueryBuilder('project')
                .innerJoinAndSelect("project.users", "user", "user.id = :id", { id: 1 })
                .getMany();
            return res.status(StatusCodes.OK).json({ projects });
        } catch (error) {
            console.log(error);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ INTERNAL_SERVER_ERROR })
        }
    }

    static findOne = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const projectRepository = getRepository(Project);
            const project = await projectRepository.findOne(req.params.id);
            return res.status(StatusCodes.OK).json({ project });
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ INTERNAL_SERVER_ERROR })
        }
    }

    static create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let connection = getConnection();
            const auth = decodedToken(req.headers.authorization.split(" ")[1]);
            const userRepository = getRepository(User);
            const user = await userRepository.findOne(auth['userId']);
            const project = new Project();
            project.name = req.body.name;
            project.users = [user]
            await connection.manager.save(project);
            return res.status(StatusCodes.CREATED).json({ project });
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ INTERNAL_SERVER_ERROR })
        }
    }

    static delete = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const projectRepository = getRepository(Project);
            const project = await projectRepository.findOne(req.params.id);
            const projectRemove = await projectRepository.remove(project);
            return res.status(StatusCodes.OK).json({ project: projectRemove });
        } catch(error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ INTERNAL_SERVER_ERROR })
        }
    }
}

export default ProjectController;