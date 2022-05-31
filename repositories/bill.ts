import {AppDataSource} from "../config/database";
import {Bill} from "../models/bill";
import {CartItemRepository} from "./caritem";
import {CartItem} from "../models/cartitem";
import {BillStatus} from "../models/billstatus";
import {BillDetail} from "../models/billdetail";

const BillDetailRepository = AppDataSource.getRepository(BillDetail);

export const BillRepository = AppDataSource.getRepository(Bill).extend({
    async createFromCart(user_id: string) {
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
        return bill;
    }
});