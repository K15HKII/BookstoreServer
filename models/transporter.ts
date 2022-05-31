import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import {Transport} from "./transport";

@Entity()
export class Transporter {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: false
    })
    name: string;

    @Column()
    description: string;

    @OneToMany(type => Transport, transport => transport.transporter)
    transports: Transport[];

}
