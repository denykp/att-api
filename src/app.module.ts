import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KaryawanModule } from './karyawan/karyawan.module';
import { AuthModule } from 'auth/auth.module';

@Module({
  imports: [KaryawanModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
