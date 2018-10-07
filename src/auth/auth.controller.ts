import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    public async login(@Body() body, @Res() res) {
        if (!body) throw new Error('Informasi login tidak ditemukan');
        if (!body.NIK) throw new Error('NIK tidak ditemukan');
        if (!body.password) throw new Error('Password tidak ditemukan');

        const token = await this.authService.sign(body);
        res.status(HttpStatus.ACCEPTED).json('Bearer ' + token);
    }
}
