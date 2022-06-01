import {AppDataSource} from "../config/database";
import {Book} from "../models/book";
import {SelectQueryBuilder} from "typeorm";
import {User} from "../models/user";

export const BookRepository = AppDataSource.getRepository(Book).extend({
    search(select?: string[], skip?: number, limit?: number, decorator?: Function) {
        const query: SelectQueryBuilder<Book> = this.createQueryBuilder("book");
        if (select) {
            query.select(select.map(item => "book." + item));
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
    }
});
