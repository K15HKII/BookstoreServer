import {ChildEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn, TableInheritance} from "typeorm";
import {Book} from "./book";
import {Message} from "./message";

export abstract class File {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column()
    path: string;
}

export abstract class Media extends File {

}

@Entity()
export class Image extends Media {
    @Column()
    width: number;

    @Column()
    height: number;

    @ManyToOne(type => Book, book => book.images)
    book: Book;

    @ManyToOne(type => Message, message => message.images)
    message: Message;
}

@Entity()
export class Video extends Media {
    @Column()
    duration: number;

    @ManyToOne(type => Book, book => book.videos)
    book: Book;

    @ManyToOne(type => Message, message => message.videos)
    message: Message;
}

@Entity()
export class Audio extends Media {
    @Column()
    duration: number;
}

@Entity()
export class Document extends File {
    @Column()
    size: number;
}

@Entity()
export class Other extends File {
    @Column()
    size: number;
}
