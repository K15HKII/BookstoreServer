import {NextFunction, Request, Response} from "express"
import {PublisherRepository} from "../repositories/publisher";

export class PublisherController {

    static async all(req: Request, res: Response, next: NextFunction) {
        return res.json(await PublisherRepository.search(req.query.select as any, req.query.skip as any, req.query.limit as any));
    }

    static async one(req: Request, res: Response, next: NextFunction) {
        return res.json(await PublisherRepository.findOneBy({
            id: +req.params.id
        }));
    }

}