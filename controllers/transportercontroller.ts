import {NextFunction, Request, Response} from "express"
import {TransporterRepository} from "../repositories/transporter";

export class TransporterController {

    static async all(req: Request, res: Response, next: NextFunction) {
        return res.json(await TransporterRepository.search(req.query.select as any, req.query.skip as any, req.query.limit as any));
    }

    static async one(req: Request, res: Response, next: NextFunction) {
        return res.json(await TransporterRepository.findOneBy({
            id: +req.params.id
        }));
    }

}