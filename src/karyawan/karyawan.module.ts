import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { KaryawanController } from './karyawan.controller';
import { KaryawanService } from './karyawan.service';
import { AuthMiddleware } from '../auth/auth.middleware';
import { Karyawan } from './karyawan.model';

@Module({
    controllers: [KaryawanController],
    providers: [KaryawanService],
    exports: [KaryawanService]
})
export class KaryawanModule {
    public configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthMiddleware)
            .forRoutes(
                { path: '/karyawan', method: RequestMethod.GET },
                { path: '/karyawan/:NIK', method: RequestMethod.GET },
                { path: '/karyawan/:NIK', method: RequestMethod.PUT },
                { path: '/karyawan/:NIK', method: RequestMethod.DELETE },
                { path: '/karyawan-reporting/:NIK', method: RequestMethod.GET }
            );
    }
}
