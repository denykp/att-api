import { Get, Controller, Param, Res } from '@nestjs/common';
import { AppService, sequelize } from './app.service';
import { Karyawan } from './karyawan/karyawan.model';
import { Attendance } from './attendance/attendance.model';
import { Kegiatan } from './kegiatan/kegiatan.model';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
    this.load_database();
  }

  @Get('uploads/:imgId')
  async root(@Param('imgId') imgId, @Res() res) {
    return res.sendFile(imgId, { root: 'uploads' });
    // return this.appService.conn_test();
  }

  async load_database() {
    await sequelize.addModels([Karyawan, Kegiatan, Attendance])

    await this.dropForeignKeyConstraints(sequelize);
    await this.dropUniqueConstraints(sequelize);

    await sequelize.sync({ alter: true });
  }

  dropForeignKeyConstraints(database) {
    //this is a hack for dev only!
    //todo: check status of posted github issue, https://github.com/sequelize/sequelize/issues/7606
    const queryInterface = database.getQueryInterface();
    return queryInterface.showAllTables()
      .then(tableNames => {
        return Promise.all(tableNames.map(tableName => {
          return queryInterface.showConstraint(tableName)
            .then(constraints => {
              return Promise.all(constraints.map(constraint => {
                if (constraint.constraintType === 'FOREIGN KEY') {
                  return queryInterface.removeConstraint(tableName, constraint.constraintName);
                }
              }));
            });
        }));
      })
      .then(() => database);
  }

  dropUniqueConstraints(database) {
    //this is a hack for dev only!
    //todo: check status of posted github issue, https://github.com/sequelize/sequelize/issues/7606
    const queryInterface = database.getQueryInterface();
    return queryInterface.showAllTables()
      .then(tableNames => {
        return Promise.all(tableNames.map(tableName => {
          return queryInterface.showConstraint(tableName)
            .then(constraints => {
              return Promise.all(constraints.map(constraint => {
                if (constraint.constraintType === 'UNIQUE') {
                  return queryInterface.removeConstraint(tableName, constraint.constraintName);
                }
              }));
            });
        }));
      })
      .then(() => database);
  }
}
