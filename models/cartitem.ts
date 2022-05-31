import {Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn} from "typeorm";
import {User} from "./user";
import {Book} from "./book";

@Entity()
export class CartItem {

    @PrimaryColumn()
    user_id: string

    @PrimaryColumn()
    book_id: string

    @ManyToOne(type => User, user => user.cart_items)
    @JoinColumn({name: 'user_id'})
    user: User

    @OneToOne(type => Book)
    @JoinColumn({name: 'book_id'})
    book: Book

    @Column()
    selected: boolean

}