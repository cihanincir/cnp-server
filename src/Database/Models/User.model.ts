import { AutoIncrement, Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";
import Database from "..";

@Table
export class Users extends Model {

    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    userId: number;

    @Column(DataType.TEXT)
    username: string;

    @Column(DataType.TEXT)
    password: string;

}

Database.addModels([Users]);