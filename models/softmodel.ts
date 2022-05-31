import {CreateDateColumn, DeleteDateColumn, UpdateDateColumn} from "typeorm";

//TODO: add soft delete
export abstract class SoftModel {

    @CreateDateColumn({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP",
        onUpdate: "CURRENT_TIMESTAMP"
    })
    createdAt: Date;

    @DeleteDateColumn({
        type: "timestamp",
        default: null,
        onUpdate: "CURRENT_TIMESTAMP"
    })
    deletedAt: Date;

    @UpdateDateColumn({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP",
        onUpdate: "CURRENT_TIMESTAMP"
    })
    updatedAt: Date;

}