import { Get, Controller } from '@nestjs/common';
import { AppService, sequelize } from './app.service';
import { Karyawan } from 'karyawan/karyawan.model';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
    this.load_database();
  }

  @Get()
  async root() {
    return this.appService.conn_test();
  }

  async load_database() {
    await sequelize.addModels([Karyawan])
    await sequelize.sync({ alter: true });
  }
}
