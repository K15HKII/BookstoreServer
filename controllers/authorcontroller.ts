import {NextFunction, Request, Response} from "express"
import {AuthorRepository} from "../repositories/author";

export class AuthorController {

    static async all(req: Request, res: Response, next: NextFunction) {
        return res.json(await AuthorRepository.search(req.query.select as any, req.query.skip as any, req.query.limit as any));
    }

    static async one(req: Request, res: Response, next: NextFunction) {
        return res.json(await AuthorRepository.findOneBy({
            id: +req.params.id
        }));
    }

}