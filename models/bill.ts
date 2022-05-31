import {Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Transport} from "./transport";
import {User} from "./user";
import {BillStatus} from "./billstatus";
import {BillDetail} from "./billdetail";

@Entity()
export class Bill {

    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(type => Transport, transport => transport.bill)
    transport: Transport

    @ManyToOne(type => User, user => user.bills)
    user: User

    @Column({
        type: "enum",
        enum: BillStatus,
        default: BillStatus.UNPAID
    })
    status: BillStatus

    @OneToMany(() => BillDetail, billDetail => billDetail.bill, {
        eager: true
    })
    bill_details: BillDetail[]

}