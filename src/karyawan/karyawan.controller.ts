import { Controller, Get, Res, Post, Body, Param, Put, Delete, HttpStatus, HttpException } from '@nestjs/common';
import { KaryawanService } from './karyawan.service';

@Controller()
export class KaryawanController {
    constructor(private karService: KaryawanService) { }
    // @Get()
    // findAll() {
    //     return this.karService.findAll()
    // }

    @Get('karyawan')
    public async index(@Res() res) {
        const karyawan = await this.karService.findAll();
        return res.status(HttpStatus.OK).json(karyawan);
    }

    @Post('karyawan')
    public async create(@Body() body, @Res() res) {
        if (!body || (body && Object.keys(body).length === 0))
            throw new HttpException('Gagal membuat master karyawan karena data tidak ditemukan', HttpStatus.BAD_REQUEST);

        await this.karService.create(body);
        return res.status(HttpStatus.CREATED).json({
            'result': {
                'httpCode': HttpStatus.CREATED,
                'message': 'Data karyawan berhasil disimpan'
            }
        });
    }

    @Get('karyawan/:NIK')
    public async show(@Param('NIK') NIK: string, @Res() res) {
        if (!NIK) throw new HttpException('NIK karyawan tidak ditemukan', HttpStatus.BAD_REQUEST);

        const karyawan = await this.karService.findByNIK(NIK, false);
        return res.status(HttpStatus.OK).json({ 'result': karyawan });
    }

    @Get('history/:NIK')
    public async showReporting(@Param('NIK') NIK: string, @Res() res) {
        if (!NIK) throw new HttpException('NIK karyawan tidak ditemukan', HttpStatus.BAD_REQUEST);

        const karyawan = await this.karService.findByNIK(NIK, true);
        return res.status(HttpStatus.OK).json({ 'result': karyawan });
    }

    @Post('karyawan/:NIK')
    public async update(@Body() body, @Param('NIK') NIK: string, @Res() res) {
        if (!NIK) throw new HttpException('NIK karyawan tidak ditemukan', HttpStatus.BAD_REQUEST);

        await this.karService.update(NIK, body);
        return res.status(HttpStatus.OK).json({
            'result': {
                'httpCode': HttpStatus.OK,
                'message': 'Data karyawan berhasil diupdate'
            }
        });
    }

    @Delete('karyawan/:NIK')
    public async delete(@Param('NIK') NIK: string, @Res() res) {
        if (!NIK) throw new HttpException('NIK karyawan tidak ditemukan', HttpStatus.BAD_REQUEST);

        await this.karService.delete(NIK);
        return res.status(HttpStatus.OK).json({
            'result': {
                'httpCode': HttpStatus.OK,
                'message': 'Data karyawan berhasil dihapus'
            }
        });
    }
}
