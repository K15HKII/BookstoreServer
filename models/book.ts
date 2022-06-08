    import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    OneToMany,
    JoinColumn,
    ManyToOne,
    PrimaryColumn
} from "typeorm";
import {Role} from "./role";
import {Author} from "./author";
import {Publisher} from "./publisher";
import {Document, Image, Media, Video} from "./file";
import {Feedback, Message} from "./message";
import {User} from "./user";
    import {BookTag} from "./booktag";

@Entity()
export class Book {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    title: string

    @Column({
        nullable: true
    })
    description: string

    @Column({
        nullable: true
    })
    isbn: string

    @Column({
        default: 0
    })
    stock: number

    @Column({
        type: "set",
        enum: BookTag,
        nullable: true
    })
    tags: BookTag[]

    @Column({
        nullable: true
    })
    author_id: number

    @ManyToOne(() => Author, author => author.books)
    @JoinColumn({name: "author_id"})
    author: Author

    @Column({
        type: "decimal"
    })
    price: number

    @Column({
        nullable: true
    })
    publisher_id: number

    @ManyToOne(() => Publisher, publisher => publisher.books)
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

@Entity()
export class FavouriteBook {

    @ManyToOne(() => User, user => user.favourite_books)
    user: User

    @PrimaryColumn()
    user_id: string

    @ManyToOne(() => Book, {
        eager: true
    })
    @JoinColumn({name: "book_id"})
    book: Book

    @PrimaryColumn()
    book_id: string

}

