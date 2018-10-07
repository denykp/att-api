import * as crypto from 'crypto';
import { Table, Column, Model, CreatedAt, UpdatedAt, DeletedAt, Unique, BeforeValidate, BeforeCreate } from 'sequelize-typescript';

@Table({
    timestamps: true,
    tableName: 'ms_karyawan',
})
export class Karyawan extends Model<Karyawan> {

    @Column
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
    tanggalMasuk: Date;

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
        if (!karyawan.NIK) throw new Error('NIK tidak boleh kosong');
        if (!karyawan.namaDepan) throw new Error('Nama Depan tidak boleh kosong');
        if (!karyawan.email) throw new Error('Email tidak boleh kosong');
        if (!karyawan.password) throw new Error('Password tidak boleh kosong');
    }

    @BeforeCreate
    public static async hashPassword(karyawan: Karyawan, options: any) {
        if (!options.transaction) throw new Error('Missing transaction.');

        karyawan.password = crypto.createHmac('sha256', karyawan.password).digest('hex');
    }
}