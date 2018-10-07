import * as jwt from 'jsonwebtoken';
import * as crypto from 'crypto';
import { IAuthService, IJwtOptions } from './interfaces/auth-service.interface';
import { Injectable } from '@nestjs/common';
import { Karyawan } from 'karyawan/karyawan.model';

@Injectable()
export class AuthService implements IAuthService {
    private _options: IJwtOptions = {
        algorithm: 'HS256',
        expiresIn: '2 days',
        jwtid: process.env.JWT_ID || ''
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
        if (!karyawan) throw new Error('Karyawan tidak ditemukan');

        const payload = {
            id: karyawan.id,
            NIK: karyawan.NIK
        };

        return await jwt.sign(payload, process.env.JWT_KEY || '', this._options);
    }
}
