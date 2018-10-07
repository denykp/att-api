import { Injectable } from '@nestjs/common';
import { Attendance } from './attendance.model';

@Injectable()
export class AttendanceService {
    Attendance = Attendance;
    findAll() {
        this.Attendance.findAll().then(res => {
            console.log(res);
        })
    }
}
