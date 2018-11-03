import { Table, Column, Model, CreatedAt, UpdatedAt, DeletedAt, Unique, BelongsTo, ForeignKey, DataType } from 'sequelize-typescript';
import { Karyawan } from '../karyawan/karyawan.model';
import { Kegiatan } from '../kegiatan/kegiatan.model';

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

    @BelongsTo(() => Karyawan, { targetKey: 'id' })
    kegiatan: Kegiatan

    @ForeignKey(() => Kegiatan)
    @Column
    kegiatanId: string;

    @Column
    lintangAktual: string; //Latitude

    @Column
    bujurAktual: string; //Longitude

    @Column
    tanggal: Date;

    @Column
    tipe: string; //Attend-In dan Attend-Out

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