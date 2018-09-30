import { Module } from '@nestjs/common';
import { MasterKaryawanController } from './master-karyawan.controller';
import { MasterKaryawanService } from './master-karyawan.service';

@Module({
    controllers: [MasterKaryawanController],
    providers: [MasterKaryawanService],
    exports: [MasterKaryawanService]
})
export class MasterKaryawanModule { }
