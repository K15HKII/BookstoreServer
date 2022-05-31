import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Publisher {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: false
    })
    name: string;

    @Column()
    description: string;

}
