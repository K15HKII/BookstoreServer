import {Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Transport} from "./transport";
import {User} from "./user";
import {BillStatus} from "./billstatus";
import {BillDetail} from "./billdetail";
import {Book} from "./book";

@Entity()
export class Lend {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    user_id: string;

    @ManyToOne(type => User, user => user.lends)
    @JoinColumn({name: 'user_id'})
    user: User

    @Column()
    book_id: string;

    @OneToOne(() => Book)
    @JoinColumn({name: 'book_id'})
    book: Book

    @Column()
    start_date: Date

    @Column()
    end_date: Date

}
