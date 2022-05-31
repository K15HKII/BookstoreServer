import {ChildEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, TableInheritance} from "typeorm";
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

    @Column()
    text: string;

    @OneToMany(type => Image, image => image.message)
    images: Image[]

    @OneToMany(type => Video, video => video.message)
    videos: Video[]

}

@ChildEntity()
export class Feedback extends Message {

    @OneToMany(type => ReplyFeedback, message => message.feedback)
    replies: ReplyFeedback[]

    @ManyToOne(type => Book, book => book.feedbacks)
    book: Book

    @Column()
    rating: number;

}

@ChildEntity()
export class ReplyFeedback extends Message {

    @ManyToOne(type => Feedback, mainMessage => mainMessage.replies)
    feedback: Feedback;

}