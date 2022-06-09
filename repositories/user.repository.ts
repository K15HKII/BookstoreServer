import {AppDataSource} from "../config/database";
import {User, UserAddress, UserBank} from "../models/user";
import {SelectQueryBuilder} from "typeorm";
import {FavouriteBook, RecentBook} from "../models/book";
import Fuse from "fuse.js";

export const IdentifyProperties = [
    'id',
    'username',
    'email'
];

export const ProfileProperties = [
    'firstname',
    'lastname',
    'email',
    'phone',
    'age',
    'gender',
    'birthday'
];

export const AuthProperties = [
    'salt',
    'password',
    'role',
    'refresh_token'
]

export const FavouriteBookRepository = AppDataSource.getRepository(FavouriteBook);

export const RecentBookRepository = AppDataSource.getRepository(RecentBook);

export const UserAddressRepository = AppDataSource.getRepository(UserAddress);

export const UserBankRepository = AppDataSource.getRepository(UserBank);

export const UserRepository = AppDataSource.getRepository(User).extend({
    async search(select?: string[], skip?: number, limit?: number, search?: string, search_by?: string, decorator?: Function) {
        const query: SelectQueryBuilder<User> = this.createQueryBuilder("user");
        if (select) {
            query.select(select.map(item => "user." + item));
        }
        if (skip) {
            console.log("skip: ", skip);
            query.skip(skip)
        }
        if (limit) {
            console.log("limit: ", limit);
            query.limit(limit)
        }
        const temp = decorator ? decorator(query) : query;
        const result = temp.leftJoinAndSelect("user.avatar", "avatar").getMany();
        if (search) {
            const search_key = !search_by ? "username" : search_by;

            const options = {
                includeScore: true,
                keys: [search_key]
            }

            const fuse = new Fuse(await result, options)

            const search_result = fuse.search(search);
            return search_result.map(item => item.item);
        }
        return result;
    },
    searchByUser(username: string, select?: string[], skip?: number, limit?: number, decorator?: Function) {
        return this.search(select, skip, limit, null, null, (query: SelectQueryBuilder<User>) => {
            const temp = query.where("LOWER(username) LIKE :username", { username: `%${username.toLowerCase()}%` })
                .orWhere("LOWER(email) LIKE :username", { username: `%${username.toLowerCase()}%` });
            return decorator ? decorator(temp) : temp;
        });
    }
})
