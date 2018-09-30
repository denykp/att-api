import { Controller, Get } from '@nestjs/common';

@Controller('master-karyawan')
export class MasterKaryawanController {
    @Get()
    findAll() {
        return 'Return semua data karyawan';
    }
}
