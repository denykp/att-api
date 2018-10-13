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
        return res.status(HttpStatus.CREATED).send();
    }

    @Get('karyawan/:id')
    public async show(@Param('id') id: number, @Res() res) {
        if (!id) throw new HttpException('id karyawan tidak ditemukan', HttpStatus.BAD_REQUEST);

        const karyawan = await this.karService.findById(id);
        return res.status(HttpStatus.OK).json(karyawan);
    }

    @Put('karyawan/:id')
    public async update(@Body() body, @Param('id') id: number, @Res() res) {
        if (!id) throw new HttpException('id karyawan tidak ditemukan', HttpStatus.BAD_REQUEST);

        await this.karService.update(id, body);
        return res.status(HttpStatus.OK).send();
    }

    @Delete('karyawan/:id')
    public async delete(@Param('id') id: number, @Res() res) {
        if (!id) throw new HttpException('id karyawan tidak ditemukan', HttpStatus.BAD_REQUEST);

        await this.karService.delete(id);
        return res.status(HttpStatus.OK).send();
    }
}
