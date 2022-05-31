import { NextFunction, Request, Response } from "express"
import {User} from "../models/user";
import {AppDataSource} from "../config/typeorm.database";
import {QueryBuilder, SelectQueryBuilder} from "typeorm";

export class UserController {

    private static userRepository = AppDataSource.getRepository(User);

    static async one(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.findOne({
            where: request.params.id
        })
    }

    static async search(request: Request, response: Response, next: NextFunction) {
        const query: SelectQueryBuilder<User> = this.userRepository.createQueryBuilder("user");
        query.select([
            "user.id",
            "user.name",
            "user.email"
        ]);
        if (request.params.search) {
            query.where("LOWER(username) LIKE :search", { search: `%${request.params.search.toLowerCase()}%` })
                .orWhere("LOWER(email) LIKE :search", { search: `%${request.params.search.toLowerCase()}%` })
        }
        if (request.params.skip) {
            query.skip(request.params.skip)
        }
        if (request.params.limit) {
            query.limit(request.params.limit)
        }
        return query.getMany();
    }

    static async self(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.findOne({
            where: {
                id: request.user.id
            },
            relations: {
                addresses: true,
                banks: true
            }
        })
    }

    static async updateSelfProfile(request: Request, response: Response, next: NextFunction) {
        const user: User = await this.userRepository.findOne({
            where: {
                id: request.user.id
            }
        });

        const body: any = request.body;
        const updated = this.filter(user, body, ['firstname'
            , 'lastname'
            , 'email'
            , 'phone'
            , 'age'
            , 'gender']);

        if (!updated) {
            return response.status(400).send({
                message: 'No changes detected'
            });
        }

        return this.userRepository.save(user);
    }

    static async save(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.save(request.body)
    }

    static async remove(request: Request, response: Response, next: NextFunction) {
        let userToRemove = await this.userRepository.findOneBy({ id: request.params.id })
        await this.userRepository.remove(userToRemove)
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