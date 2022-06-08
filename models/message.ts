import {
    ChildEntity,
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    TableInheritance
} from "typeorm";
import {User} from "./user";
import {Image, Video} from "./file";
import {Book} from "./book";

@Entity()
@TableInheritance({column: {type: "varchar", name: "type"}})
export class Message {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(type => User, user => user.messages)
    user: User;

    @Column({
        nullable: true
    })
    text: string;

    @OneToMany(type => Image, image => image.message)
    images: Image[]

    @OneToMany(type => Video, video => video.message)
    videos: Video[]

}

@ChildEntity()
export class Feedback extends Message {

    @OneToMany(type => ReplyFeedback, message => message.feedback, {
        eager: true
    })
    replies: ReplyFeedback[]

    @Column()
    book_id: string;

    @ManyToOne(type => Book, book => book.feedbacks)
    @JoinColumn({name: 'book_id'})
    book: Book

    @Column()
    rating: number;

}

@ChildEntity()
export class ReplyFeedback extends Message {

    @ManyToOne(type => Feedback, mainMessage => mainMessage.replies)
    feedback: Feedback;

}
