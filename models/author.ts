import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import {Book} from "./book";

@Entity()
export class Author {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: false
    })
    name: string;

    @Column({
        nullable: true
    })
    description: string;

    @OneToMany(() => Book, book => book.author)
    books: Book[];

    
}
