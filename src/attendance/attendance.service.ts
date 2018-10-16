import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Attendance } from './attendance.model';
import { sequelize } from 'app.service';
import { Karyawan } from 'karyawan/karyawan.model';
import { Lokasi } from 'lokasi/lokasi.model';

@Injectable()
export class AttendanceService {
    attendance = Attendance;
    seqInstance = sequelize;

    public async findAll(): Promise<Array<Attendance>> {
        return await this.attendance.findAll<Attendance>({
            include: [
                { model: Karyawan },
                { model: Lokasi }
            ]
        });
    }

    public async findOne(options: Object): Promise<Attendance | null> {
        return await this.attendance.findOne<Attendance>(options);
    }

    public async findById(id: number): Promise<Attendance | null> {
        return await this.attendance.findById<Attendance>(id, {
            include: [
                { model: Karyawan },
                { model: Lokasi }
            ]
        });
    }

    public async create(attendance: Attendance): Promise<Attendance> {
        return await this.seqInstance.transaction(async transaction => {
            return await this.attendance.create<Attendance>(attendance, {
                returning: true,
                transaction
            });
        });
    }

    public async update(id: number, newValue: Attendance): Promise<Attendance | null> {
        return await this.seqInstance.transaction(async transaction => {
            let attendance = await this.attendance.findById<Attendance>(id, {
                transaction
            });
            if (!attendance) throw new HttpException('Attendance tidak ditemukan', HttpStatus.NOT_FOUND);

            attendance = this._assign(attendance, newValue);
            return await attendance.save({
                returning: true,
                transaction
            });
        });
    }

    public async delete(id: number): Promise<void> {
        return await this.seqInstance.transaction(async transaction => {
            return await this.attendance.destroy({
                where: { id },
                transaction
            });
        });
    }

    private _assign(attendance: Attendance, newValue: Attendance): Attendance {
        for (const key of Object.keys(attendance)) {
            if (attendance[key] !== newValue[key]) attendance[key] = newValue[key];
        }

        return attendance as Attendance;
    }
}
