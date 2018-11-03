import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KaryawanModule } from './karyawan/karyawan.module';
import { AuthModule } from './auth/auth.module';
import { AttendanceModule } from './attendance/attendance.module';
import { KegiatanModule } from './kegiatan/kegiatan.module';

@Module({
  imports: [AuthModule, KaryawanModule, AttendanceModule, KegiatanModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
