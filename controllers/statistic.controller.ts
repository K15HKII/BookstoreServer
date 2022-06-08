import {NextFunction, Request, Response} from "express"
import {UserController} from "./user.controller";
import {BookRepository} from "../repositories/book.repository";
import {FeedbackRepository} from "../repositories/feedback.repository";
import {Feedback} from "../models/message";
import {BillDetail} from "../models/billdetail";
import {BillDetailRepository} from "../repositories/bill.repository";

export class StatisticController {

    static async newBooks(req: Request, res: Response, next: NextFunction) {
    }

    static async getTopCustomers(req: Request, res: Response, next: NextFunction) {
        return UserController.search(req, res, next);
    }

    static async getBookSold(req: Request, res: Response, next: NextFunction) {
        const book_id = req.params.book_id;
        let details: BillDetail[];
        if (book_id) {
            details = await BillDetailRepository.find({
                where: {
                    book_id: book_id
                }
            });
        } else {
            details = await BillDetailRepository.find();
        }

        const result: number = details.map(detail => detail.quantity).reduce((a, b) => a + b);
        return res.json({
            result: result
        });
    }

    static async getBookRate(req: Request, res: Response, next: NextFunction) {
        const book_id = req.params.book_id;
        const book = await BookRepository.findOne({
            where: {
                id: book_id
            }
        });
        const feedbacks: Feedback[] = await FeedbackRepository.find({
            where: {
                book_id: book_id
            }
        })
        if (!feedbacks)
            return res.json({
                result: 0
            });

        const result: number = feedbacks.map(feedback => feedback.rating).reduce((a, b) => a + b) / feedbacks.length;
        return res.json({
            result: result
        });
    }

}
