import {Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Transport} from "./transport";
import {User} from "./user";
import {BillStatus} from "./billstatus";
import {BillDetail} from "./billdetail";

@Entity()
export class Bill {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: true
    })
    transport_id: string;

    @OneToOne(type => Transport, transport => transport.bill)
    @JoinColumn({name: 'transport_id'})
    transport: Transport

    @Column()
    user_id: string;

    @Column()
    address_id: Date;

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

    //TODO: useraddress voucherProfile payment
    /* @Expose
    @Getter
    @SerializedName("user_address")
    private UserAddress userAddress;

    @Expose
    @Getter
    @SerializedName("voucher_profile")
    private VoucherProfile voucherProfile;

    @Expose
    @Getter
    @SerializedName("payment")
    private Payment payment; (enum:CASH,TRANSFER,CREDIT) */
}
}
