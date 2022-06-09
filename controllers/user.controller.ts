import {NextFunction, Request, Response} from "express"
import {
    FavouriteBookRepository,
    ProfileProperties, RecentBookRepository,
    UserAddressRepository,
    UserBankRepository,
    UserRepository
} from "../repositories/user.repository"
import {bodyFilter} from "./helper";
import {CartItemRepository, InteractProperties} from "../repositories/caritem.repository";
import {BillRepository} from "../repositories/bill.repository";
import {BillStatus} from "../models/billstatus";
import {LendRepository} from "../repositories/lend.repository";

export class UserController {

    static async getUser(request: Request, response: Response, next: NextFunction) {
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

    //region RecentBook
    static async recentBooks(request: Request, response: Response, next: NextFunction) {
        const targetId = request.params.user_id || request["user"]['id'];
        const user = await UserRepository.findOne({
            where: {
                id: targetId
            },
            relations: {
                recent_books: true
            },
            select: ['recent_books']
        });
        return response.json(user.recent_books);
    }

    static async addRecentBook(request: Request, response: Response, next: NextFunction) {
        const targetId = request.params.user_id || request['user']['id'];
        return response.json(await RecentBookRepository.save({
            user_id: targetId,
            book_id: request.params.book_id
        }));
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
        console.log(request.body.book_id)
        const cartItem = await CartItemRepository.findOne({
            where: {
                user_id: targetId,
                book_id: request.body.book_id
            }
        });
        if (cartItem) {
            CartItemRepository.merge(cartItem, bodyFilter(request.body, InteractProperties));
            return response.json(await CartItemRepository.save(cartItem));
        } else {
            const newCart = CartItemRepository.create({
                user_id: targetId,
                book_id: request.body.book_id,
            });
            if (request.body.quantity) {
                newCart.quantity = request.body.quantity;
            }
            return response.json(await CartItemRepository.save(newCart));
        }
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

    static async createBillFromCart(request: Request, response: Response, next: NextFunction) {
        const targetId = request.params.user_id || request["user"]['id'];
        return response.json(await BillRepository.createFromCart(targetId));
    }

    static async cancelBill(request: Request, response: Response, next: NextFunction) {
        const billId = +request.params.bill_id;
        const bill = await BillRepository.findOne({
            where: {
                id: billId,
            }
        });
        if (bill) {
            bill.status = BillStatus.CANCELED;
            await BillRepository.remove(bill);
            return response.json({
                message: 'Bill canceled'
            });
        }
        return response.status(404).json({
            message: 'Bill not found'
        });
    }

    //endregion

    //region Address
    static async getAddresses(request: Request, response: Response, next: NextFunction) {
        const targetId = request.params.user_id || request["user"]['id'];
        const user = await UserRepository.findOne({
            where: {
                id: targetId
            },
            relations: {
                addresses: true
            },
            select: ['addresses']
        });
        return response.json(user.addresses);
    }

    static async getAddress(request: Request, response: Response, next: NextFunction) {
        const targetId = request.params.user_id || request["user"]['id'];
        const addressId = +request.params.address_id;
        const address = await UserAddressRepository.findOne({
            where: {
                sub_id: addressId,
                user_id: targetId
            }
        });
        return response.json(address);
    }

    static async addAddress(request: Request, response: Response, next: NextFunction) {
        const targetId = request.params.user_id || request["user"]['id'];
        const body = request.body;
        const address = await UserAddressRepository.save({
            ...body,
            user_id: targetId
        });
        return response.json(address);
    }

    static async removeAddress(request: Request, response: Response, next: NextFunction) {
        const targetId = request.params.user_id || request["user"]['id'];
        const addressId = +request.params.address_id;
        const address = await UserAddressRepository.findOne({
            where: {
                sub_id: addressId,
                user_id: targetId
            }
        });
        if (address) {
            await UserAddressRepository.softDelete({
                sub_id: addressId
            });
            return response.json({
                message: 'Address removed'
            });
        }
        return response.status(404).json({
            message: 'Address not found'
        });
    }

    //endregion

    //region Bank
    static async getBanks(request: Request, response: Response, next: NextFunction) {
        const targetId = request.params.user_id || request["user"]['id'];
        const user = await UserRepository.findOne({
            where: {
                id: targetId
            },
            relations: {
                banks: true
            },
            select: ['banks']
        });
        return response.json(user.banks);
    }

    static async getBank(request: Request, response: Response, next: NextFunction) {
        const targetId = request.params.user_id || request["user"]['id'];
        const bankId = +request.params.bank_id;
        const bank = await UserBankRepository.findOne({
            where: {
                sub_id: bankId,
                user_id: targetId
            }
        });
        return response.json(bank);
    }

    static async addBank(request: Request, response: Response, next: NextFunction) {
        const targetId = request.params.user_id || request["user"]['id'];
        const body = request.body;
        const bank = await UserBankRepository.save({
            ...body,
            user_id: targetId
        });
        return response.json(bank);
    }

    static async removeBank(request: Request, response: Response, next: NextFunction) {
        const targetId = request.params.user_id || request["user"]['id'];
        const bankId = +request.params.bank_id;
        const bank = await UserBankRepository.findOne({
            where: {
                sub_id: bankId,
                user_id: targetId
            }
        });
        if (bank) {
            await UserBankRepository.softDelete({
                sub_id: bankId,
            });
            return response.json({
                message: 'Bank removed'
            });
        }
        return response.status(404).json({
            message: 'Bank not found'
        });
    }

    //endregion

    //region Lend
    static async getLends(request: Request, response: Response, next: NextFunction) {
        const targetId = request.params.user_id || request["user"]['id'];
        const user = await UserRepository.findOne({
            where: {
                id: targetId
            },
            relations: {
                lends: true
            },
            select: ['lends']
        });
        return response.json(user.lends);
    }

    static async addLend(request: Request, response: Response, next: NextFunction) {
        const targetId = request.params.user_id || request["user"]['id'];
        const body = request.body;
        const lend = await LendRepository.lend(targetId, body.book_id, body.end_date);
        return response.json(lend);
    }

    //endregion

    //region Moderator
    static async createModerator(request: Request, response: Response, next: NextFunction) {
        const body = request.body;
        const user = await UserRepository.save({
            ...body,
            role: 'moderator'
        });
        return response.json(user);
    }

    //endregion

    //region Voucher
    static async getVouchers(request: Request, response: Response, next: NextFunction) {
        const targetId = request.params.user_id || request["user"]['id'];
        const user = await UserRepository.findOne({
            where: {
                id: targetId
            },
            relations: {
                vouchers: true
            },
            select: ['vouchers']
        });
        return response.json(user.vouchers);
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
