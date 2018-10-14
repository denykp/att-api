import { Table, Column, Model, CreatedAt, UpdatedAt, DeletedAt, Unique, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { Karyawan } from 'karyawan/karyawan.model';
import { Lokasi } from 'lokasi/lokasi.model';

@Table({
    timestamps: true,
    tableName: 'ts_attendance'
})
export class Attendance extends Model<Attendance> {

    @BelongsTo(() => Karyawan, { targetKey: 'NIK' })
    karyawan: Karyawan;

    @ForeignKey(() => Karyawan)
    @Column
    NIK: string;

    @BelongsTo(() => Lokasi)
    lokasi: Lokasi;

    @ForeignKey(() => Lokasi)
    @Column
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