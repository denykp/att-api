import * as jwt from 'jsonwebtoken';
import * as crypto from 'crypto';
import * as dbConfig from "../../config/config.json"
import { IAuthService, IJwtOptions } from './interfaces/auth-service.interface';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Karyawan } from 'karyawan/karyawan.model';

@Injectable()
export class AuthService implements IAuthService {
    private _options: IJwtOptions = {
        algorithm: 'HS256',
        expiresIn: '1 days',
        jwtid: dbConfig.JWT_ID
    };

    get options(): IJwtOptions {
        return this._options;
    }

    set options(value: IJwtOptions) {
        this._options.algorithm = value.algorithm;
    }

    public async sign(credentials: { NIK: string; password: string }): Promise<string> {
        const karyawan = await Karyawan.findOne<Karyawan>({
            where: {
                NIK: credentials.NIK,
                password: crypto.createHmac('sha256', credentials.password).digest('hex')
            }
        });
        if (!karyawan) throw new HttpException('NIK atau password yang anda masukkan salah', HttpStatus.NOT_FOUND);

        const payload = {
            id: karyawan.id,
            NIK: karyawan.NIK
        };
        return await jwt.sign(payload, dbConfig.JWT_KEY || '', this._options);
    }
}
