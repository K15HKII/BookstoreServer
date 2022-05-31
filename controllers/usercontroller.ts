import { NextFunction, Request, Response } from "express"
import {User} from "../models/user";
import {UserRepository, IdentifyProperties, ProfileProperties} from "../repositories/user";
import {AppDataSource} from "../config/database";
import {QueryBuilder, Repository, SelectQueryBuilder} from "typeorm";

export class UserController {

    static async one(request: Request, response: Response, next: NextFunction) {
        return UserRepository.findOne({
            where: request.params.id
        })
    }

    static async search(request: Request, response: Response, next: NextFunction) {
        if (request.params.search) {
            return UserRepository.searchByUser(request.params.search, request.query.select, request.query.skip, request.query.limit);
        }
        return UserRepository.search(request.query.select, request.query.skip, request.query.limit);
    }

    static async self(request: Request, response: Response, next: NextFunction) {
        return UserRepository.findOne({
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
        const user: User = await UserRepository.findOne({
            where: {
                id: request.user.id
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
        let userToRemove = await UserRepository.findOneBy({ id: request.params.id })
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
