import { Injectable } from '@nestjs/common';
import { Karyawan } from './karyawan.model';
import { sequelize } from './../app.service';

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

    public async update(id: number, newValue: Karyawan): Promise<Karyawan | null> {
        return await this.seqInstance.transaction(async transaction => {
            let karyawan = await this.karyawan.findById<Karyawan>(id, {
                transaction
            });
            if (!karyawan) throw new Error('User tidak ditemukan');

            karyawan = this._assign(karyawan, newValue);
            return await karyawan.save({
                returning: true,
                transaction
            });
        });
    }

    public async delete(id: number): Promise<void> {
        return await this.seqInstance.transaction(async transaction => {
            return await this.karyawan.destroy({
                where: { id },
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
