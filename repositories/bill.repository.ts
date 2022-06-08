import {AppDataSource} from "../config/database";
import {Bill} from "../models/bill";
import {CartItemRepository} from "./caritem.repository";
import {CartItem} from "../models/cartitem";
import {BillStatus} from "../models/billstatus";
import {BillDetail} from "../models/billdetail";
import {SelectQueryBuilder} from "typeorm";

const BillDetailRepository = AppDataSource.getRepository(BillDetail);

export const BillRepository = AppDataSource.getRepository(Bill).extend({
    search(select?: string[], skip?: number, limit?: number, decorator?: Function) {
        const query: SelectQueryBuilder<Bill> = this.createQueryBuilder("bill");
        if (select) {
            query.select(select.map(item => "bill." + item));
        }
        if (skip) {
            console.log("skip: ", skip);
            query.skip(skip)
        }
        if (limit) {
            console.log("limit: ", limit);
            query.limit(limit)
        }
        if (decorator) {
            return decorator(query).getMany();
        }
        return query.getMany();
    },
    async createFromCart(user_id: string, removeCart: boolean = true) {
        const items: CartItem[] = await CartItemRepository.findByUser(user_id, true);
        const bill: Bill = this.create({
            user_id: user_id,
            status: BillStatus.WAITING
        });

        bill.bill_details = items.map(item => {
            return BillDetailRepository.create({
                bill_id: bill.id,
                book_id: item.book_id,
                quantity: item.quantity,
                unit_price: item.book.price
            });
        });

        if (removeCart) {
            await Promise.all(items.map(item => CartItemRepository.delete({
                user_id: user_id,
                book_id: item.book_id
            })));
        }

        return await this.save(bill);
    }
});
