import {
    Column, CreateDateColumn,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn
} from "typeorm";
import {Transport} from "./transport";
import {User} from "./user";
import {BillStatus} from "./billstatus";
import {BillDetail} from "./billdetail";
import {VoucherProfile} from "./voucher";

export enum Payment {

    CASH = 'CASH',
    CREDIT_CARD = 'CREDIT_CARD',
    DEBIT_CARD = 'DEBIT_CARD',
    BANK_TRANSFER = 'BANK_TRANSFER',
    PAYPAL = 'PAYPAL',
    BITCOIN = 'BITCOIN',
    WECHAT = 'WECHAT',
    ALIPAY = 'ALIPAY',
    WALLET = 'WALLET',
    OTHER = 'OTHER'

}

@Entity()
export class Bill {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: true
    })
    transport_id: string;

    @CreateDateColumn()
    created_at: Date;

    @OneToOne(type => Transport, transport => transport.bill)
    @JoinColumn({name: 'transport_id'})
    transport: Transport

    @Column()
    user_id: string;

    @Column({
        type: "bigint"
    })
    address_id: number;

    @ManyToOne(type => User, user => user.bills)
    @JoinColumn({name: 'user_id'})
    user: User

    @Column({
        type: "enum",
        enum: BillStatus,
        default: BillStatus.WAITING
    })
    status: BillStatus

    @OneToMany(() => BillDetail, billDetail => billDetail.bill, {
        eager: true,
        cascade: true
    })
    bill_details: BillDetail[]

    @Column({
        type: "enum",
        enum: Payment,
        default: Payment.CASH
    })
    payment: Payment

    @ManyToMany(type => VoucherProfile, voucherProfile => voucherProfile.used_on_bill, {
        cascade: true
    })
    @JoinTable({
        name: "join_bill_voucher_profile",
        joinColumn: {
            name: "bill_id",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "voucher_profile_id",
            referencedColumnName: "id"
        }
    })
    used_vouchers: VoucherProfile[];

    //TODO: useraddress voucherProfile payment
    /*
    @Expose
    @Getter
    @SerializedName("voucher_profile")
    private VoucherProfile voucherProfile;
*/

}
