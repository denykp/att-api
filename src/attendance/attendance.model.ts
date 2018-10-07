import { Table, Column, Model, CreatedAt, UpdatedAt, DeletedAt, Unique } from 'sequelize-typescript';

@Table({
    timestamps: true,
    tableName: 'ts_attendance'
})
export class Attendance extends Model<Attendance> {

    @Column
    NIK: string;

    @Column
    lokasi: string;

    @Column
    lintang: string; //Latitude

    @Column
    bujur: string; //Longitude

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