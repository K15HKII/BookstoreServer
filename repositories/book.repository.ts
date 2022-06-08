import {AppDataSource} from "../config/database";
import {Book} from "../models/book";
import {SelectQueryBuilder} from "typeorm";
import {Image} from "../models/file";

export const BookRepository = AppDataSource.getRepository(Book).extend({
    search(select?: string[], skip?: number, limit?: number, decorator?: Function) {
        let query: SelectQueryBuilder<Book> = this.createQueryBuilder("book");
        if (select) {
            query = query.select(select.map(item => "book." + item));
        }
        if (skip) {
            query = query.skip(skip)
        }
        if (limit) {
            query = query.limit(limit)
        }
        if (decorator) {
            return decorator(query).relation(Image, "book").loadMany();
        }
        return query.leftJoinAndSelect("book.images", "image").getMany();
    },
    increaseQuantity(book_id: string, quantity: number) {
        return this.createQueryBuilder("book")
            .update()
            .set({ quantity: () => `quantity + ${quantity}` })
            .where("book.id = :id", {id: book_id})
            .execute();
    },
    decreaseQuantity(book_id: string, quantity: number) {
        return this.createQueryBuilder("book")
            .update()
            .set({ quantity: () => `quantity - ${quantity}` })
            .where("book.id = :id", {id: book_id})
            .execute();
    }
});
