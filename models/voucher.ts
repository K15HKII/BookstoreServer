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
import {BookTag} from "./booktag";
import {User} from "./user";

export enum DiscountType {
    PERCENTAGE = 'PERCENTAGE',
    AMOUNT = 'AMOUNT'
}

@Entity()
@TableInheritance({column: {type: 'varchar', name: 'voucher_type'}})
export class VoucherProfile {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column({
        nullable: true
    })
    description: string;

    @Column(
        {
            type: 'enum',
            enum: DiscountType,
            default: DiscountType.PERCENTAGE
        }
    )
    discount_type: DiscountType; //TODO: create DiscountType

    @Column(
        {
            type: 'decimal',
        }
    )
    discount: number;

    @OneToMany(type => Voucher, voucher => voucher.profile)
    vouchers: Voucher[]

    @OneToMany(type => WildVoucher, voucher => voucher.profile)
    wild_vouchers: WildVoucher[]

    /*
        @Getter
    @Expose
    @SerializedName("book_tag")
    private BookTag[] bookTags;

    @Getter
    @Expose
    @SerializedName("discount_max")
    private double discountMax;

    @Getter
    @Expose
    @SerializedName("min_value")
    private double minValue;
    */
}

@ChildEntity()
export class BookTagVoucher extends VoucherProfile {

    @Column({
        type: 'set',
        enum: BookTag,
    })
    tags: BookTag[];

}

abstract class BaseVoucher {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    code: string;

    @Column()
    release_date: Date;

    @Column()
    expire_date: Date;

    @Column()
    profile_id: string;

}

@Entity()
export class Voucher extends BaseVoucher {

    @Column()
    user_id: string;

    @ManyToOne(type => User, user => user.vouchers)
    @JoinColumn({name: 'user_id'})
    user: User;

    @ManyToOne(type => VoucherProfile, voucherProfile => voucherProfile.vouchers)
    @JoinColumn({name: 'profile_id'})
    profile: VoucherProfile;

    @Column({
        nullable: true
    })
    used_at: Date;

}

@Entity()
export class WildVoucher extends BaseVoucher {

    @Column()
    remaining_uses: number;

    @Column()
    max_uses: number;

    @ManyToOne(type => VoucherProfile, voucherProfile => voucherProfile.wild_vouchers)
    @JoinColumn({name: 'profile_id'})
    profile: VoucherProfile;

}
