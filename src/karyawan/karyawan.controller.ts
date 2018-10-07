import { Controller, Get, Res, Post, Body, Param, Put, Delete, HttpStatus } from '@nestjs/common';
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
            throw new Error('Gagal membuat master karyawan karena data tidak ditemukan');

        await this.karService.create(body);
        return res.status(HttpStatus.CREATED).send();
    }

    @Get('karyawan/:NIK')
    public async show(@Param('NIK') NIK: number, @Res() res) {
        if (!NIK) throw new Error('NIK karyawan tidak ditemukan');

        const karyawan = await this.karService.findById(NIK);
        return res.status(HttpStatus.OK).json(karyawan);
    }

    @Put('karyawan/:NIK')
    public async update(@Body() body, @Param('NIK') NIK: number, @Res() res) {
        if (!NIK) throw new Error('NIK karyawan tidak ditemukan');

        await this.karService.update(NIK, body);
        return res.status(HttpStatus.OK).send();
    }

    @Delete('karyawan/:NIK')
    public async delete(@Param('NIK') NIK: number, @Res() res) {
        if (!NIK) throw new Error('NIK karyawan tidak ditemukan');

        await this.karService.delete(NIK);
        return res.status(HttpStatus.OK).send();
    }
}
