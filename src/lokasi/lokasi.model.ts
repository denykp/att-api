import { Table, Column, Model, CreatedAt, UpdatedAt, DeletedAt, Unique, BelongsTo, ForeignKey, DataType } from 'sequelize-typescript';

@Table({
    timestamps: true,
    tableName: 'ms_lokasi'
})
export class Lokasi extends Model<Lokasi> {

    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        allowNull: false,
        unique: true,
        primaryKey: true
    })
    id: string;

    @Column
    namaLokasi: string;

    @Column
    lintangMaster: string; //Latitude

    @Column
    bujurMaster: string; //Longitude

    @Column
    alamat: string;

    @CreatedAt
    creationDate: Date;

    @UpdatedAt
    updatedOn: Date;

    @DeletedAt
    deletionDate: Date;
}