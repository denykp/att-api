import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { KaryawanController } from './karyawan.controller';
import { KaryawanService } from './karyawan.service';
import { AuthMiddleware } from 'auth/auth.middleware';

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
                { path: '/karyawan/:id', method: RequestMethod.GET },
                { path: '/karyawan/:id', method: RequestMethod.PUT },
                { path: '/karyawan/:id', method: RequestMethod.DELETE }
            );
    }
}
