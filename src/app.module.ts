import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KaryawanModule } from './karyawan/karyawan.module';
import { AuthModule } from 'auth/auth.module';
import { LokasiModule } from 'lokasi/lokasi.module';
import { AttendanceModule } from 'attendance/attendance.module';

@Module({
  imports: [AuthModule, KaryawanModule, LokasiModule, AttendanceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
