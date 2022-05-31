import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryColumn,
    PrimaryGeneratedColumn
} from "typeorm";
import {User} from "./user";
import {Book} from "./book";

export enum StorageAction {

    IMPORT = 'IMPORT',
    EXPORT = 'EXPORT',
/*    LEND = 'LEND',
    RETURN = 'RETURN',
    DELETE = 'DELETE',
    CREATE = 'CREATE',
    UPDATE = 'UPDATE',
    RESTORE = 'RESTORE',
    DELETE_PERMANENT = 'DELETE_PERMANENT'*/

}

@Entity()
export class StorageLog {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(type => User, user => user.action_logs)
    actor: User

    @Column()
    description: string;

    date: Date;

    @Column(
        {
            type: "enum",
            enum: StorageAction,
            nullable: false
        }
    )
    action: StorageAction;

    @OneToMany(() => StorageLogDetail, detail => detail.log, {
        eager: true,
        cascade: true
    })
    details: StorageLogDetail[]

}

@Entity()
export class StorageLogDetail {

    @PrimaryColumn()
    book_id: string;

    @OneToOne(type => Book)
    @JoinColumn({
        name: "book_id"
    })
    book: Book

    @ManyToOne(type => StorageLog, log => log.details)
    log: StorageLog

    @Column()
    quantity: number;

}