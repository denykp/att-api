import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { LokasiController } from './lokasi.controller';
import { LokasiService } from './lokasi.service';
import { AuthMiddleware } from 'auth/auth.middleware';

@Module({
    controllers: [LokasiController],
    providers: [LokasiService],
    exports: [LokasiService]
})
export class LokasiModule {
    public configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthMiddleware)
            .forRoutes(
                { path: '/lokasi', method: RequestMethod.POST },
                { path: '/lokasi', method: RequestMethod.GET },
                { path: '/lokasi/:id', method: RequestMethod.GET },
                { path: '/lokasi/:id', method: RequestMethod.PUT },
                { path: '/lokasi/:id', method: RequestMethod.DELETE }
            );
    }
}
