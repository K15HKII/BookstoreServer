import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./user";
import {BookTag} from "./booktag";

export enum LendStatus {
    USING = 'USING',
    CANCELED = 'CANCELED',
    FINISHED = 'FINISHED',
}

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
    start_date: Date

    @Column()
    end_date: Date

    @Column()
    book_id: string;

    @Column({
        type: "decimal"
    })
    unit_price: number;

    @Column({
        type: "enum",
        enum: LendStatus,
        default: LendStatus.USING
    })
    tags: LendStatus
    /*
    @Getter
    @Expose
    @SerializedName("lend_status")
    private LendStatus lendStatus; (enum: RENTING,RENTED)
    */

/*    @OneToMany(type => LendDetail, lend => lend.lend, {
        cascade: true,
        eager: true
    })
    details: LendDetail[]*/

}

/*
@Entity()
export class LendDetail {

    @PrimaryColumn()
    lend_id: string;

    @PrimaryColumn()
    book_id: string;

    @OneToOne(() => Book)
    @JoinColumn({name: "book_id"})
    book: Book;

    @Column({
        type: "decimal"
    })
    unit_price: number;

    @ManyToOne(type => Lend, lend => lend.details)
    @JoinColumn({
        name: "lend_id"
    })
    lend: Lend

}*/
