import {NextFunction, Request, Response} from "express"
import {BillRepository} from "../repositories/bill.repository";

export class BillController {

    static async search(req: Request, res: Response, next: NextFunction) {

    }

    static async getByUser(req: Request, res: Response, next: NextFunction) {
        return res.json(await BillRepository.find({
            where: {
                user_id: req.params.user_id
            }
        }));
    }

    static async getBill(req: Request, res: Response, next: NextFunction) {
        return res.json(await BillRepository.findOne({
            where: {
                id: +req.params.bill_id
            }
        }));
    }

    static async updateBillStatus(req: Request, res: Response, next: NextFunction) {
        const bill = await BillRepository.findOne({
            where: {
                id: +req.params.bill_id
            }
        });
        if (!bill) {
            return res.status(404).json({
                message: "Bill not found"
            });
        }
        BillRepository.merge(bill, req.body);
        return res.json(await BillRepository.save(bill));
    }

}
