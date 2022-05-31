import {Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Transport} from "./transport";
import {User} from "./user";
import {BillStatus} from "./billstatus";
import {BillDetail} from "./billdetail";
import {Book} from "./book";

@Entity()
export class Lend {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @OneToOne(type => Transport, transport => transport.bill)
    transport: Transport

    @ManyToOne(type => User, user => user.lends)
    user: User

    @OneToOne(() => Book)
    book: Book

    @Column()
    start_date: Date

    @Column()
    end_date: Date

}