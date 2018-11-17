import { Injectable, HttpException, HttpStatus, Options } from '@nestjs/common';
import { Karyawan } from './karyawan.model';
import { sequelize } from './../app.service';
import { Attendance } from '../attendance/attendance.model';

@Injectable()
export class KaryawanService {

    seqInstance = sequelize;

    karyawan = Karyawan;
    // findAll() {
    //     this.Karyawan.findAll().then(res => {
    //         console.log(res);
    //     })
    // }

    public async findAll(): Promise<Array<Karyawan>> {
        return await this.karyawan.findAll<Karyawan>();
    }

    public async findOne(options: Object): Promise<Karyawan | null> {
        return await this.karyawan.findOne<Karyawan>(options);
    }

    public async findByNIK(NIK: string, history: boolean): Promise<Karyawan | null> {
        let result: any;
        if (history) {
            result = await this.karyawan.findOne<Karyawan>({
                where: { NIK: NIK },
                include: [{ model: Attendance }]
            });
        } else {
            result = await this.karyawan.findOne<Karyawan>({
                where: { NIK: NIK }
            });
        }
        return result
    }

    public async findById(id: number): Promise<Karyawan | null> {
        return await this.karyawan.findById<Karyawan>(id);
    }

    public async create(karyawan: Karyawan): Promise<Karyawan> {
        return await this.seqInstance.transaction(async transaction => {
            await this.karyawan.findOne({
                where: { NIK: karyawan.NIK },
                transaction,
                paranoid: false
            }).then(async karyawanRes => {
                if (karyawanRes) {
                    if (karyawanRes.dataValues.deletionDate) {
                        await karyawanRes.restore({ transaction });
                        karyawanRes = this._assign(karyawanRes, karyawan);
                        return karyawanRes.save({
                            returning: true,
                            transaction
                        });
                    } else {
                        throw 'karyawan dengan NIK tersebut sudah terdaftar';
                    }
                } else {
                    return this.karyawan.create<Karyawan>(karyawan, {
                        returning: true,
                        transaction
                    });
                };
            }).catch(err => {
                throw new HttpException(err, HttpStatus.BAD_REQUEST);
            });
        });
    }

    public async update(NIK: string, newValue: Karyawan): Promise<Karyawan | null> {
        return await this.seqInstance.transaction(async transaction => {
            await this.karyawan.findOne<Karyawan>({
                where: { NIK: NIK },
                transaction
            }).then(karyawan => {
                karyawan = this._assign(karyawan, newValue);
                // console.log("Object.keys(newValue)", Object.keys(newValue));
                return karyawan.save({
                    returning: true,
                    transaction
                });
            }).catch(() => {
                throw new HttpException("Karyawan tidak ditemukan", HttpStatus.NOT_FOUND);
            });

        });
    }

    public async delete(NIK: string): Promise<void> {
        return await this.seqInstance.transaction(async transaction => {
            await this.karyawan.findOne<Karyawan>({
                where: { NIK: NIK },
                transaction
            }).then(karyawan => {
                karyawan.destroy({
                    transaction
                });
            }).catch(() => {
                throw new HttpException("Karyawan tidak ditemukan", HttpStatus.NOT_FOUND);
            });
        });
    }

    private _assign(karyawan: Karyawan, newValue: Karyawan): Karyawan {
        for (const key of Object.keys(newValue)) {
            if (karyawan.dataValues[key] !== newValue[key]) karyawan[key] = newValue[key];
        }
        return karyawan as Karyawan;
    }
}
