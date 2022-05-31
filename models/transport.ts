import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne} from "typeorm";
import { Transporter } from "./transporter";
import {Bill} from "./bill";

@Entity()
export class Transport {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(type => Transporter, transporter => transporter.transports)
    transporter: Transporter;

    @Column()
    raw: string;

    @OneToOne(type => Bill, bill => bill.transport)
    bill: Bill

}
