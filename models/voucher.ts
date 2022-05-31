import {ChildEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, TableInheritance} from "typeorm";
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

    @Column()
    description: string;

    @Column(
        {
            type: 'enum',
            enum: DiscountType,
            default: DiscountType.PERCENTAGE
        }
    )
    discount_type: DiscountType;

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

}

@ChildEntity()
export class BookTagVoucher extends VoucherProfile {

    @Column({
        type: 'set',
        enum: BookTag,
    })
    tag: BookTag[];

}

class BaseVoucher {

    @Column()
    code: string;

    @Column()
    release_date: Date;

    @Column()
    expired_at: Date;

}

@Entity()
export class Voucher extends BaseVoucher {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(type => User, user => user.vouchers)
    user: User;

    @ManyToOne(type => VoucherProfile, voucherProfile => voucherProfile.vouchers)
    profile: VoucherProfile;

    @Column()
    used_at: Date;

}

@Entity()
export class WildVoucher extends BaseVoucher {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    remaining_uses: number;

    @Column()
    max_uses: number;

    @ManyToOne(type => VoucherProfile, voucherProfile => voucherProfile.wild_vouchers)
    profile: VoucherProfile;

}