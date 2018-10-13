import * as jwt from 'jsonwebtoken';
import * as dbConfig from "../../config/config.json"
import { Injectable, NestMiddleware, HttpException, HttpStatus, ForbiddenException } from '@nestjs/common';
import { Karyawan } from 'karyawan/karyawan.model';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    public resolve() {
        return async (req, res, next) => {
            if (req.headers.authorization && (req.headers.authorization as string).split(' ')[0] === 'Bearer') {
                const token = (req.headers.authorization as string).split(' ')[1];
                const decoded: any = jwt.verify(token, dbConfig.JWT_KEY || '');
                const karyawan = await Karyawan.findOne<Karyawan>({
                    where: {
                        id: decoded.id,
                        NIK: decoded.NIK
                    }
                });
                if (!karyawan) throw new HttpException('Unauthorized Access', HttpStatus.FORBIDDEN);
                next();
            } else {
                throw new HttpException('Unauthorized Access', HttpStatus.FORBIDDEN);
            }
        };
    }
}
