import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AttendanceController } from './attendance.controller';
import { AttendanceService } from './attendance.service';
import { AuthMiddleware } from '../auth/auth.middleware';
import { Attendance } from './attendance.model';

@Module({
    controllers: [AttendanceController],
    providers: [AttendanceService],
    exports: [AttendanceService]
})
export class AttendanceModule {
    public configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthMiddleware)
            .forRoutes(
                { path: '/attendance', method: RequestMethod.GET },
                { path: '/attendance', method: RequestMethod.POST },
                { path: '/attendance/:id', method: RequestMethod.GET },
                { path: '/attendance/:id', method: RequestMethod.PUT },
                { path: '/attendance/:id', method: RequestMethod.DELETE }
            );
    }
}
