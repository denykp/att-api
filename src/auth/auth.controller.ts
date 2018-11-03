import { Body, Controller, HttpStatus, Post, Res, HttpException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Karyawan } from '../karyawan/karyawan.model';
import * as crypto from 'crypto';

@Controller()
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    public async login(@Body() body, @Res() res) {
        if (!body) throw new HttpException('Informasi login tidak ditemukan', HttpStatus.BAD_REQUEST);
        if (!body.NIK) throw new HttpException('NIK tidak ditemukan', HttpStatus.BAD_REQUEST);
        if (!body.password) throw new HttpException('Password tidak ditemukan', HttpStatus.BAD_REQUEST);

        const token = await this.authService.sign(body);
        let karyawan = await Karyawan.findOne<Karyawan>({
            where: {
                NIK: body.NIK,
                password: crypto.createHmac('sha256', body.password).digest('hex')
            }
        });
        const resJson: any = {
            id: karyawan.id,
            NIK: karyawan.NIK,
            namaDepan: karyawan.namaDepan,
            email: karyawan.email,
            token: 'Bearer ' + token
        }
        res.status(HttpStatus.ACCEPTED).json({ 'result': resJson });
    }
}
