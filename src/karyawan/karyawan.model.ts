import * as crypto from 'crypto';
import { Table, Column, Model, CreatedAt, UpdatedAt, DeletedAt, Unique, BeforeValidate, BeforeCreate, PrimaryKey, HasMany, DataType } from 'sequelize-typescript';
import { HttpStatus, HttpException } from '@nestjs/common';
import { Attendance } from '../attendance/attendance.model';

@Table({
    timestamps: true,
    tableName: 'ms_karyawan',
})
export class Karyawan extends Model<Karyawan> {

    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        allowNull: false,
        unique: true,
        primaryKey: true
    })
    id: string;

    @HasMany(() => Attendance, { foreignKey: 'karyawanNIK', sourceKey: 'NIK' })
    attendance: Attendance;

    @Column({
        allowNull: false,
        unique: true
    })
    NIK: string;

    @Column
    namaDepan: string;

    @Column
    namaBelakang: string;

    @Column
    tanggalLahir: Date;

    @Column
    alamat: string;

    @Column
    domisili: string;

    @Column
    telp: string;

    @Column
    email: string;

    @Column
    password: string;

    @CreatedAt
    creationDate: Date;

    @UpdatedAt
    updatedOn: Date;

    @DeletedAt
    deletionDate: Date;

    @BeforeValidate
    public static validateData(karyawan: Karyawan, options: any) {
        if (!options.transaction) throw new Error('Missing transaction.');
        if (!karyawan.NIK) throw new HttpException('NIK tidak boleh kosong', HttpStatus.BAD_REQUEST);
        if (!karyawan.namaDepan) throw new HttpException('Nama Depan tidak boleh kosong', HttpStatus.BAD_REQUEST);
        if (!karyawan.email) throw new HttpException('Email tidak boleh kosong', HttpStatus.BAD_REQUEST);
        if (!karyawan.password) throw new HttpException('Password tidak boleh kosong', HttpStatus.BAD_REQUEST);
    }

    @BeforeCreate
    public static async hashPassword(karyawan: Karyawan, options: any) {
        if (!options.transaction) throw new Error('Missing transaction.');

        karyawan.password = crypto.createHmac('sha256', karyawan.password).digest('hex');
    }
}