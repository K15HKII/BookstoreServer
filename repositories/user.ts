import {AppDataSource} from "../config/database";
import {User} from "../models/user";
import {SelectQueryBuilder} from "typeorm";
import exp = require("constants");

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

export const UserRepository = AppDataSource.getRepository(User).extend({
    search(select?: string[], skip?: number, limit?: number, decorator?: Function) {
        const query: SelectQueryBuilder<User> = this.createQueryBuilder("user");
        if (select) {
            query.select(select.map(item => "user." + item));
        }
        if (skip) {
            query.skip(skip)
        }
        if (limit) {
            query.limit(limit)
        }
        if (decorator) {
            return decorator(query).getMany();
        }
        return query.getMany();
    },
    searchByUser(username: string, select?: string[], skip?: number, limit?: number, decorator?: Function) {
        return this.search(select, skip, limit, (query: SelectQueryBuilder<User>) => {
            const temp = query.where("LOWER(username) LIKE :username", { username: `%${username.toLowerCase()}%` })
                .orWhere("LOWER(email) LIKE :username", { username: `%${username.toLowerCase()}%` });
            return decorator ? decorator(temp) : temp;
        });
    }
})
