import { Table, Column, Model, CreatedAt, UpdatedAt, DeletedAt, Unique, BelongsTo, ForeignKey } from 'sequelize-typescript';

@Table({
    timestamps: true,
    tableName: 'ms_lokasi'
})
export class Lokasi extends Model<Lokasi> {

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