import {Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany, JoinColumn} from "typeorm";
import {Role} from "./role";
import {Author} from "./author";
import {Publisher} from "./publisher";
import {Document, Image, Media, Video} from "./file";
import {Feedback, Message} from "./message";

@Entity()
export class Book {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    title: string

    @Column()
    description: string

    @Column()
    isbn: string

    @Column()
    stock: number

    @Column()
    author_id: number

    @OneToOne(() => Author)
    @JoinColumn({name: "author_id"})
    author: Author

    @Column({
        type: "decimal"
    })
    price: number

    @Column()
    publisher_id: number

    @OneToOne(() => Publisher)
    @JoinColumn({name: "publisher_id"})
    publisher: Publisher

    @OneToMany(() => Image, image => image.book)
    images: Image[]

    @OneToMany(() => Video, video => video.book)
    videos: Video[]

    @OneToOne(() => Document)
    ebook: Document

    @OneToMany(() => Feedback, feedback => feedback.book)
    feedbacks: Feedback[]

}
