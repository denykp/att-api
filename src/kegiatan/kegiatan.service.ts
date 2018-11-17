import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Kegiatan } from './kegiatan.model';
import { sequelize } from '../app.service';

@Injectable()
export class KegiatanService {
    kegiatan = Kegiatan;
    seqInstance = sequelize;

    public async findAll(): Promise<Array<Kegiatan>> {
        return await this.kegiatan.findAll<Kegiatan>();
    }

    public async findOne(options: Object): Promise<Kegiatan | null> {
        return await this.kegiatan.findOne<Kegiatan>(options);
    }

    public async findById(id: number): Promise<Kegiatan | null> {
        return await this.kegiatan.findById<Kegiatan>(id);
    }

    public async create(kegiatan: Kegiatan): Promise<Kegiatan> {
        return await this.seqInstance.transaction(async transaction => {
            return await this.kegiatan.create<Kegiatan>(kegiatan, {
                returning: true,
                transaction
            });
        });
    }

    public async update(id: number, newValue: Kegiatan): Promise<Kegiatan | null> {
        return await this.seqInstance.transaction(async transaction => {
            await this.kegiatan.findById<Kegiatan>(id, {
                transaction
            }).then(kegiatan => {
                kegiatan = this._assign(kegiatan, newValue);
                return kegiatan.save({
                    returning: true,
                    transaction
                });
            }).catch(() => {
                throw new HttpException('Kegiatan tidak ditemukan', HttpStatus.NOT_FOUND);
            });
        });
    }

    public async delete(id: number): Promise<void> {
        return await this.seqInstance.transaction(async transaction => {
            await this.kegiatan.findById<Kegiatan>(id, {
                transaction
            }).then(kegiatan => {
                return kegiatan.destroy({
                    transaction
                });
            }).catch(() => {
                throw new HttpException('Kegiatan tidak ditemukan', HttpStatus.NOT_FOUND);
            });
        });
    }

    private _assign(kegiatan: Kegiatan, newValue: Kegiatan): Kegiatan {
        for (const key of Object.keys(newValue)) {
            if (kegiatan.dataValues[key] !== newValue[key]) kegiatan[key] = newValue[key];
        }

        return kegiatan as Kegiatan;
    }
}
