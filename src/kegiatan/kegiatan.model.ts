import { Table, Column, Model, CreatedAt, UpdatedAt, DeletedAt, Unique, BelongsTo, ForeignKey, DataType } from 'sequelize-typescript';

@Table({
    timestamps: true,
    tableName: 'ms_kegiatan'
})
export class Kegiatan extends Model<Kegiatan> {

    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        allowNull: false,
        unique: true,
        primaryKey: true
    })
    id: string;

    @Column
    namaKegiatan: string;

    @CreatedAt
    creationDate: Date;

    @UpdatedAt
    updatedOn: Date;

    @DeletedAt
    deletionDate: Date;
}