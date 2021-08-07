import { getRepository } from 'typeorm';
import { Request, Response, NextFunction } from 'express';
import Controller from "./Controller";
import { Project } from '../entity/Project';
import { StatusCodes } from 'http-status-codes';
import { INTERNAL_SERVER_ERROR } from '../config/errorTypes';

class ProjectController extends Controller {

    constructor(){
        super();
    }

    static findAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const projectRepository = getRepository(Project);
            const projects = await projectRepository.find();
            return res.status(StatusCodes.OK).json({ projects });
        } catch (error) {
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
            const projectRepository = getRepository(Project);
            const project = await projectRepository.save(req.body);
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