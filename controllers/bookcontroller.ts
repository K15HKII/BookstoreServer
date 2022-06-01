import {NextFunction, Request, Response} from "express"
import {BookRepository} from "../repositories/book";

export class BookController {

    static async search(request: Request, response: Response, next: NextFunction) {
        if (request.params.search) {
            //TODO: return BookRepository.searchByUser(request.params.search, request.query.select, request.query.skip, request.query.limit);
        }
        return response.json(await BookRepository.search(request.query.select as string[], request.query.skip as any, request.query.limit as any));
    }

    static async recommend(request: Request, response: Response, next: NextFunction) { //TODO
        if (request.params.search) {

        }
        return response.json(await BookRepository.search(request.query.select as string[], request.query.skip as any, request.query.limit as any));
    }

    static async one(request: Request, response: Response, next: NextFunction) {
        console.log('find one ' + request.params.id);
        return response.json(await BookRepository.findOne({
            where: {
                id: request.params.id as any
            }
        }));
    }

}
