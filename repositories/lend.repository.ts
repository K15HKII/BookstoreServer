import {AppDataSource} from "../config/database";
import {Lend} from "../models/lend";
import {BillStatus} from "../models/billstatus";
import {Book} from "../models/book";
import {BookRepository} from "./book.repository";

export const LendRepository = AppDataSource.getRepository(Lend).extend({
    async lend(user_id: string, book_ids: string[], end_date: Date) {
        const books: Book[] = await Promise.all(book_ids.map(id => BookRepository.findOne({
            where: {
                id: id
            }
        })));
        /*const lend: Lend = this.create({
            user_id: user_id,
            status: BillStatus.WAITING,
            start_date: new Date(),
            end_date: end_date,
        });
        lend.details = books.map(book => {
            return LendDetailRepository.create({
                lend_id: lend.id,
                book_id: book.id,
                unit_price: book.price
            });
        });
        return await this.save(lend);*/
        return await Promise.all(books.map(book => {
            const lend = this.create({
                user_id: user_id,
                status: BillStatus.WAITING,
                start_date: new Date(),
                end_date: end_date,
                book_id: book.id,
                unit_price: book.price
            });
            return this.save(lend);
        }));
    },
});