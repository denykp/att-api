import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MasterKaryawanModule } from './master-karyawan/master-karyawan.module';

@Module({
  imports: [MasterKaryawanModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
