import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Lokasi } from './lokasi.model';
import { sequelize } from 'app.service';

@Injectable()
export class LokasiService {
    lokasi = Lokasi;
    seqInstance = sequelize;

    public async findAll(): Promise<Array<Lokasi>> {
        return await this.lokasi.findAll<Lokasi>();
    }

    public async findOne(options: Object): Promise<Lokasi | null> {
        return await this.lokasi.findOne<Lokasi>(options);
    }

    public async findById(id: number): Promise<Lokasi | null> {
        return await this.lokasi.findById<Lokasi>(id);
    }

    public async create(lokasi: Lokasi): Promise<Lokasi> {
        return await this.seqInstance.transaction(async transaction => {
            return await this.lokasi.create<Lokasi>(lokasi, {
                returning: true,
                transaction
            });
        });
    }

    public async update(id: number, newValue: Lokasi): Promise<Lokasi | null> {
        return await this.seqInstance.transaction(async transaction => {
            let lokasi = await this.lokasi.findById<Lokasi>(id, {
                transaction
            });
            if (!lokasi) throw new HttpException('Lokasi tidak ditemukan', HttpStatus.NOT_FOUND);

            lokasi = this._assign(lokasi, newValue);
            return await lokasi.save({
                returning: true,
                transaction
            });
        });
    }

    public async delete(id: number): Promise<void> {
        return await this.seqInstance.transaction(async transaction => {
            return await this.lokasi.destroy({
                where: { id },
                transaction
            });
        });
    }

    private _assign(lokasi: Lokasi, newValue: Lokasi): Lokasi {
        for (const key of Object.keys(lokasi)) {
            if (lokasi[key] !== newValue[key]) lokasi[key] = newValue[key];
        }

        return lokasi as Lokasi;
    }
}
