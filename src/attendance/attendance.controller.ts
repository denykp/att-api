import { Controller, Get } from '@nestjs/common';
import { AttendanceService } from './attendance.service';

@Controller('attendance')
export class AttendanceController {
    constructor(private attService: AttendanceService) { }
    @Get()
    findAll() {
        return this.attService.findAll();
    }
}
