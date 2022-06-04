import {NextFunction, Request, Response} from "express"
import {UserController} from "./user.controller";

export class StatisticController {

    static async newBooks(req: Request, res: Response, next: NextFunction) {
    }

    static async getTopCustomers(req: Request, res: Response, next: NextFunction) {
        return UserController.search(req, res, next);
    }

}
