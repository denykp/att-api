import { Table, Column, Model, CreatedAt, UpdatedAt, DeletedAt, Unique, BelongsTo, ForeignKey, DataType, Sequelize, IsUUID } from 'sequelize-typescript';
import { Karyawan } from '../karyawan/karyawan.model';
import { Kegiatan } from '../kegiatan/kegiatan.model';
import sequelize = require('sequelize');

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
    karyawanNIK: string;

    @Column
    fotoLokasi: string;

    @Column
    namaLokasi: string;

    @BelongsTo(() => Kegiatan, { targetKey: 'id' })
    kegiatan: Kegiatan

    @ForeignKey(() => Kegiatan)
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4
    })
    kegiatanId: string;

    @Column
    lintangAktual: string; //Latitude

    @Column
    bujurAktual: string; //Longitude

    @Column
    tanggal: Date;

    @Column
    tipe: string; //Attend-In dan Attend-Out

    @Column
    keterangan: string;

    // @Column
    // attendIn: Date; //Absen masuk

    // @Column
    // attendOut: Date; //Absen keluar

    @CreatedAt
    creationDate: Date;

    @UpdatedAt
    updatedOn: Date;

    @DeletedAt
    deletionDate: Date;
}