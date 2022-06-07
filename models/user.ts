import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    UpdateDateColumn,
    PrimaryColumn,
    ManyToOne,
    JoinColumn, TableInheritance, CreateDateColumn, AfterLoad, BeforeUpdate, BeforeInsert, ChildEntity, OneToOne
} from "typeorm";
import {Role} from "./role";
import {Bill} from "./bill";
import {CartItem} from "./cartitem";
import {Lend} from "./lend";
import {Voucher} from "./voucher";
import {Message} from "./message";
import {StorageLog} from "./storagelog";
import {hashSync} from "../routes/auth/auth.methods";
import {randomBytes} from 'crypto';
import {FavouriteBook} from "./book";
import {Image} from "./file";

export enum Gender {
    MALE = 'male',
    FEMALE = 'female',
    OTHER = 'other'
}

@Entity()
@TableInheritance({column: {type: "enum", name: "role", enum: Role, default: Role.USER}})
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({
        nullable: true
    })
    firstname: string

    @Column({
        nullable: true
    })
    lastname: string

    @Column({
        nullable: true
    })
    email: string

    @Column({
        nullable: false,
        update: false,
        unique: true,
    })
    username: string

    @Column({
        nullable: true
    })
    age: number

    @Column({
        nullable: true
    })
    phone: string

    @Column({
        type: "enum",
        enum: Gender,
        default: Gender.OTHER,
        nullable: false
    })
    gender: Gender

    @Column({
        nullable: true
    })
    birthday: Date

    @Column({
        nullable: true
    })
    avatar_id: string

    @OneToOne(type => Image, image => image.user)
    @JoinColumn({name: 'avatar_id'})
    avatar: Image

    @Column({
        nullable: false,
        select: false,
    })
    password: string

    private tempPassword: string;

    @AfterLoad()
    private loadTempPassword(): void {
        this.tempPassword = this.password;
    }

    @BeforeInsert()
    @BeforeUpdate()
    private encryptPassword(): void {
        if (!this.salt) {
            this.salt = randomBytes(16).toString('base64');
        }
        if (this.tempPassword !== this.password) {
            this.password = this.tempPassword = hashSync(this.password, this.salt).toString('base64');
        }
    }

    @Column({
        nullable: true,
        select: false
    })
    salt: string

    @Column({
        type: 'enum',
        enum: Role,
        default: Role.USER,
        nullable: false
    })
    role: Role

    @Column({
        nullable: true
    })
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

    @OneToMany(type => FavouriteBook, favouriteBook => favouriteBook.user)
    favourite_books: FavouriteBook[]

}

@ChildEntity({discriminatorValue: Role.EMPLOYEE})
export class Employee {

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
        onUpdate: 'CURRENT_TIMESTAMP(6)'
    })
    updated_at: Date = new Date()

    @Column()
    street: string

    @Column()
    city: string

    @Column()
    zip: string

    @Column()
    country: string

    @Column({
        default: false
    })
    is_primary: boolean

}

@Entity()
export class UserBank {

    @PrimaryColumn()
    user_id: string

    @ManyToOne(type => User, user => user.banks)
    @JoinColumn({name: 'user_id'})
    user: User

    @CreateDateColumn({
        primary: true,
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
    })
    @UpdateDateColumn({
        primary: true,
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
        onUpdate: 'CURRENT_TIMESTAMP(6)',
    })
    updated_at: Date = new Date()

    @Column()
    bank_name: string

    @Column()
    iban: string

    @Column()
    bic: string

    @Column({
        default: false
    })
    is_primary: boolean

}
