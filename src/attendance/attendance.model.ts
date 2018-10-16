import { Table, Column, Model, CreatedAt, UpdatedAt, DeletedAt, Unique, BelongsTo, ForeignKey, DataType } from 'sequelize-typescript';
import { Karyawan } from 'karyawan/karyawan.model';
import { Lokasi } from 'lokasi/lokasi.model';

@Table({
    timestamps: true,
    tableName: 'ts_attendance'
})
export class Attendance extends Model<Attendance> {

    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        allowNull: false,
        unique: true,
        primaryKey: true
    })
    id: string;

    @BelongsTo(() => Karyawan, { targetKey: 'NIK' })
    karyawan: Karyawan;

    @ForeignKey(() => Karyawan)
    @Column
    NIK: string;

    @BelongsTo(() => Lokasi, { targetKey: 'id' })
    lokasi: Lokasi;

    @ForeignKey(() => Lokasi)
    @Column({
        type: DataType.UUID,
    })
    lokasiId: string;

    @Column
    lintangAktual: string; //Latitude

    @Column
    bujurAktual: string; //Longitude

    @Column
    tanggal: Date;

    @Column
    tipe: string; //Attend-In dan Attend-Out

    @CreatedAt
    creationDate: Date;

    @UpdatedAt
    updatedOn: Date;

    @DeletedAt
    deletionDate: Date;
}