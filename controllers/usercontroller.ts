import {NextFunction, Request, Response} from "express"
import {User} from "../models/user";
import {ProfileProperties, UserRepository} from "../repositories/user";

export class UserController {

    static async one(request: Request, response: Response, next: NextFunction) {
        return response.json(UserRepository.findOneBy({
            id: request.params.id
        }));
    }

    static async search(request: Request, response: Response, next: NextFunction) {
        if (request.params.search) {
            return response.json(await UserRepository.searchByUser(request.params.search, request.query.select as any, request.query.skip as any, request.query.limit as any));
        }
        return response.json(await UserRepository.search(request.query.select as any, request.query.skip as any, request.query.limit as any));
    }

    static async self(request: Request, response: Response, next: NextFunction) {
        return response.json(await UserRepository.findOne({
            where: {
                id: request["user"].id
            },
            select: ProfileProperties.concat(['id']) as any,
            relations: {
                addresses: true,
                banks: true
            }
        }));
    }

    static async favouriteBooks(request: Request, response: Response, next: NextFunction) {
        const targetId = request.params.id || request["user"].id;
        const user = await UserRepository.findOne({
            where: {
                id: targetId
            },
            relations: {
                favourite_books: true
            },
            select: ['favourite_books']
        });
        return response.json(user.favourite_books);
    }

    static async cartItems(request: Request, response: Response, next: NextFunction) {
        const targetId = request.params.id || request["user"].id;
        const user = await UserRepository.findOne({
            where: {
                id: targetId
            },
            relations: {
                cart_items: true
            },
            select: ['cart_items']
        });
        return response.json(user.cart_items);
    }

    static async updateSelfProfile(request: Request, response: Response, next: NextFunction) {
        const user: User = await UserRepository.findOne({
            where: {
                id: request["user"].id
            }
        });

        const body: any = request.body;
        const updated = this.filter(user, body, ProfileProperties);

        if (!updated) {
            return response.status(400).send({
                message: 'No changes detected'
            });
        }

        return UserRepository.save(user);
    }

    static async save(request: Request, response: Response, next: NextFunction) {
        return UserRepository.save(request.body)
    }

    static async remove(request: Request, response: Response, next: NextFunction) {
        let userToRemove = await UserRepository.findOneBy({id: request.params.id})
        await UserRepository.remove(userToRemove)
    }

    private static filter(entity: any, body: any, fields: any) {
        let updated: boolean = false;
        for (let field of fields) {
            if (body[field]) {
                entity[field] = body[field];
                updated = true;
            }
        }
        return updated;
    }

}
