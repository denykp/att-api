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
            let kegiatan = await this.kegiatan.findById<Kegiatan>(id, {
                transaction
            });
            if (!kegiatan) throw new HttpException('Kegiatan tidak ditemukan', HttpStatus.NOT_FOUND);

            kegiatan = this._assign(kegiatan, newValue);
            return await kegiatan.save({
                returning: true,
                transaction
            });
        });
    }

    public async delete(id: number): Promise<void> {
        return await this.seqInstance.transaction(async transaction => {
            return await this.kegiatan.destroy({
                where: { id },
                transaction
            });
        });
    }

    private _assign(kegiatan: Kegiatan, newValue: Kegiatan): Kegiatan {
        for (const key of Object.keys(kegiatan)) {
            if (kegiatan[key] !== newValue[key]) kegiatan[key] = newValue[key];
        }

        return kegiatan as Kegiatan;
    }
}
