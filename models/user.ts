import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    UpdateDateColumn,
    PrimaryColumn,
    ManyToOne,
    JoinColumn, TableInheritance
} from "typeorm";
import {Role} from "./role";
import {Bill} from "./bill";
import {CartItem} from "./cartitem";
import {Lend} from "./lend";
import {Voucher} from "./voucher";
import {Message} from "./message";
import {StorageLog} from "./storagelog";

export enum Gender {
    MALE = 'male',
    FEMALE = 'female',
    OTHER = 'other'
}

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    firstname: string

    @Column()
    lastname: string

    @Column()
    email: string

    @Column({
        nullable: false,
        update: false,
        unique: true,
    })
    username: string

    @Column()
    age: number

    @Column()
    phone: string

    @Column({
        type: "enum",
        enum: Gender,
        default: Gender.OTHER,
        nullable: false
    })
    gender: Gender

    @Column()
    birthday: Date

    @Column({
        nullable: false,
        select: false,
    })
    password: string

    @Column({
        nullable: false,
        select: false,
    })
    salt: string

    @Column({
        type: 'enum',
        enum: Role,
        default: Role.USER,
        nullable: false
    })
    role: Role

    @Column()
    refresh_token: string

    @OneToMany(type => UserAddress, address => address.user)
    addresses: UserAddress[]

    @OneToMany(type => UserBank, bank => bank.user)
    banks: UserBank[]

    @OneToMany(type => Bill, bill => bill.user)
    bills: Bill[]

    @OneToMany(type => Lend, lend => lend.user)
    lends: Lend[]

    @OneToMany(type => CartItem, cartItem => cartItem.user)
    cart_items: CartItem[]

    @OneToMany(type => Voucher, voucher => voucher.user)
    vouchers: Voucher[]

    @OneToMany(type => Message, message => message.user)
    messages: Message[]

    @OneToMany(type => StorageLog, log => log.actor)
    action_logs: StorageLog[]

}

@Entity()
export class UserAddress {

    @PrimaryColumn()
    user_id: string

    @ManyToOne(type => User, user => user.addresses)
    @JoinColumn({name: 'user_id'})
    user: User

    @UpdateDateColumn({
        primary: true,
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
    })
    updated_at: Date

    @Column()
    street: string

    @Column()
    city: string

    @Column()
    zip: string

    @Column()
    country: string

}

@Entity()
export class UserBank {

    @PrimaryColumn()
    user_id: string

    @ManyToOne(type => User, user => user.banks)
    @JoinColumn({name: 'user_id'})
    user: User

    @UpdateDateColumn({
        primary: true,
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
    })
    updated_at: Date

    @Column()
    bank_name: string

    @Column()
    iban: string

    @Column()
    bic: string

}