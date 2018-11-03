import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
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

    public async findByNIK(NIK: string, reporting: boolean): Promise<Karyawan | null> {
        let result: any;
        if (reporting) {
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
            return await this.karyawan.create<Karyawan>(karyawan, {
                returning: true,
                transaction
            });
        });
    }

    public async update(NIK: string, newValue: Karyawan): Promise<Karyawan | null> {
        return await this.seqInstance.transaction(async transaction => {
            let karyawan = await this.karyawan.findOne<Karyawan>({
                where: { NIK: NIK },
                transaction
            });
            if (!karyawan) throw new HttpException('Karyawan tidak ditemukan', HttpStatus.NOT_FOUND);

            karyawan = this._assign(karyawan, newValue);
            return await karyawan.save({
                returning: true,
                transaction
            });
        });
    }

    public async delete(NIK: string): Promise<void> {
        return await this.seqInstance.transaction(async transaction => {
            return await this.karyawan.destroy({
                where: { NIK: NIK },
                transaction
            });
        });
    }

    private _assign(karyawan: Karyawan, newValue: Karyawan): Karyawan {
        for (const key of Object.keys(karyawan)) {
            if (karyawan[key] !== newValue[key]) karyawan[key] = newValue[key];
        }

        return karyawan as Karyawan;
    }
}
