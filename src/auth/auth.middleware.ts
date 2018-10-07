import * as jwt from 'jsonwebtoken';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Karyawan } from 'karyawan/karyawan.model';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    public resolve() {
        return async (req, res, next) => {
            if (req.headers.authorization && (req.headers.authorization as string).split(' ')[0] === 'Bearer') {
                const token = (req.headers.authorization as string).split(' ')[1];
                const decoded: any = jwt.verify(token, process.env.JWT_KEY || '');
                const karyawan = await Karyawan.findOne<Karyawan>({
                    where: {
                        id: decoded.id,
                        email: decoded.email
                    }
                });
                if (!karyawan) throw new Error('Unauthorized Access');
                next();
            } else {
                throw new Error('Unauthorized Access');
            }
        };
    }
}
