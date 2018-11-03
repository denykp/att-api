import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { KegiatanController } from './kegiatan.controller';
import { KegiatanService } from './kegiatan.service';
import { AuthMiddleware } from '../auth/auth.middleware';
import { Kegiatan } from './kegiatan.model';

@Module({
    controllers: [KegiatanController],
    providers: [KegiatanService],
    exports: [KegiatanService]
})
export class KegiatanModule {
    public configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthMiddleware)
            .forRoutes(
                { path: '/kegiatan', method: RequestMethod.POST },
                // { path: '/kegiatan', method: RequestMethod.GET },
                { path: '/kegiatan/:id', method: RequestMethod.GET },
                { path: '/kegiatan/:id', method: RequestMethod.PUT },
                { path: '/kegiatan/:id', method: RequestMethod.DELETE }
            );
    }
}
