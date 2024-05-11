import { AutoIncrement, Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";
import Database from "..";

@Table
export class Messages extends Model {

    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    messageId: number;

    @Column(DataType.INTEGER)
    userId: number;

    @Column(DataType.TEXT)
    message: string;

}

Database.addModels([Messages]);