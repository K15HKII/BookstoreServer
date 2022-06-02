import {NextFunction, Request, Response} from "express"
import {User} from "../models/user";
import {FavouriteBookRepository, ProfileProperties, UserRepository} from "../repositories/user.repository"
import {bodyFilter, entityMerge} from "./helper";
import {CartItemRepository, InteractProperties} from "../repositories/caritem.repository";

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

    //region Profile
    static async getProfile(request: Request, response: Response, next: NextFunction) {
        const targetId = request.params.id || request['user']['id'];
        return response.json(await UserRepository.findOne({
            where: {
                id: targetId
            },
            select: ProfileProperties.concat(['id']) as any,
            relations: {
                addresses: true,
                banks: true
            }
        }));
    }

    static async updateProfile(request: Request, response: Response, next: NextFunction) {
        const targetId = request.params.id || request['user']['id'];
        const user = await UserRepository.findOne({
            where: {
                id: targetId
            },
            select: ProfileProperties.concat(['id']) as any,
        });
        if (user) {
            const body = bodyFilter(request.body, ProfileProperties);
            await UserRepository.save(UserRepository.merge(user, body));
            return response.json(user);
        }
        return response.status(404).json({
            message: 'User not found'
        });
    }
    //endregion

    //region FavouriteBook
    static async favouriteBooks(request: Request, response: Response, next: NextFunction) {
        const targetId = request.params.user_id || request["user"]['id'];
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

    static async addFavouriteBook(request: Request, response: Response, next: NextFunction) {
        const targetId = request.params.user_id || request['user']['id'];
        response.json(await FavouriteBookRepository.save({
            user_id: targetId,
            book_id: request.params.book_id
        }));
    }

    static async removeFavouriteBook(request: Request, response: Response, next: NextFunction) {
        const targetId = request.params.user_id || request['user']['id'];
        const bookId = request.params.book_id;
        const book = await FavouriteBookRepository.findOne({
            where: {
                user_id: targetId,
                book_id: bookId
            }
        });
        if (book) {
            await FavouriteBookRepository.remove(book);
            return response.json({
                message: 'Book removed from favourites'
            });
        }
        return response.status(404).json({
            message: 'Book not found'
        });
    }
    //endregion

    //region CartItem
    static async cartItems(request: Request, response: Response, next: NextFunction) {
        const targetId = request.params.user_id || request['user']['id'];
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

    static async addCartItem(request: Request, response: Response, next: NextFunction) {
        const targetId = request.params.user_id || request['user']['id'];
        response.json(await CartItemRepository.save({
            user_id: targetId,
            book_id: request.params.book_id
        }));
    }

    static async removeCartItem(request: Request, response: Response, next: NextFunction) {
        const targetId = request.params.user_id || request["user"]['id'];
        const bookId = request.params.book_id;
        const item = await CartItemRepository.findOne({
            where: {
                user_id: targetId,
                book_id: bookId
            }
        });
        if (item) {
            await CartItemRepository.remove(item);
            return response.json({
                message: 'Book removed from cart'
            });
        }
        return response.status(404).json({
            message: 'Book not found'
        });
    }

    static async updateCartItem(request: Request, response: Response, next: NextFunction) {
        const targetId = request.params.user_id || request['user']['id'];
        const bookId = request.params.book_id;
        const item = await CartItemRepository.findOne({
            where: {
                user_id: targetId,
                book_id: bookId
            }
        });
        if (item) {
            const body = bodyFilter(request.body, InteractProperties);
            await CartItemRepository.save(CartItemRepository.merge(item, body));
            return response.json({
                message: 'Book quantity updated'
            });
        }
        return response.status(404).json({
            message: 'Book not found'
        });
    }
    //endregion

    //region Bill
    static async getBills(request: Request, response: Response, next: NextFunction) {
        const targetId = request.params.user_id || request["user"]['id'];
        const user = await UserRepository.findOne({
            where: {
                id: targetId
            },
            relations: {
                bills: true
            },
            select: ['bills']
        });
        return response.json(user.bills);
    }

    static async createBill(request: Request, response: Response, next: NextFunction) {
        const targetId = request.params.user_id || request["user"]['id'];
        const cartItems = await CartItemRepository.findByUser(targetId, true);



        /*return response.json(bill);*/
    }
    //endregion

    static async save(request: Request, response: Response, next: NextFunction) {
        return UserRepository.save(request.body)
    }

    static async remove(request: Request, response: Response, next: NextFunction) {
        let userToRemove = await UserRepository.findOneBy({id: request.params['id']})
        await UserRepository.remove(userToRemove)
    }

}
