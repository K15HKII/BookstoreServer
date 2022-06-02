import {NextFunction, Request, Response} from "express"
import {BillRepository} from "../repositories/bill.repository";

export class BillController {

    static async getByUser(req: Request, res: Response, next: NextFunction) {
        return res.json(await BillRepository.find({
            where: {
                user_id: req.params.user_id
            }
        }));
    }

}