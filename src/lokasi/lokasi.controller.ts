import { Controller, Get, Res, Post, Body, Param, Put, Delete, HttpStatus, HttpException } from '@nestjs/common';
import { LokasiService } from './lokasi.service';

@Controller()
export class LokasiController {
    constructor(private lksService: LokasiService) { }

    @Get('lokasi')
    public async index(@Res() res) {
        const lokasi = await this.lksService.findAll();
        return res.status(HttpStatus.OK).json(lokasi);
    }

    @Post('lokasi')
    public async create(@Body() body, @Res() res) {
        if (!body || (body && Object.keys(body).length === 0))
            throw new HttpException('Gagal membuat master lokasi karena data tidak ditemukan', HttpStatus.BAD_REQUEST);

        await this.lksService.create(body);
        return res.status(HttpStatus.CREATED).send();
    }

    @Get('lokasi/:id')
    public async show(@Param('id') id: number, @Res() res) {
        if (!id) throw new HttpException('id lokasi tidak ditemukan', HttpStatus.BAD_REQUEST);

        const lokasi = await this.lksService.findById(id);
        return res.status(HttpStatus.OK).json(lokasi);
    }

    @Put('lokasi/:id')
    public async update(@Body() body, @Param('id') id: number, @Res() res) {
        if (!id) throw new HttpException('id lokasi tidak ditemukan', HttpStatus.BAD_REQUEST);

        await this.lksService.update(id, body);
        return res.status(HttpStatus.OK).send();
    }

    @Delete('lokasi/:id')
    public async delete(@Param('id') id: number, @Res() res) {
        if (!id) throw new HttpException('id lokasi tidak ditemukan', HttpStatus.BAD_REQUEST);

        await this.lksService.delete(id);
        return res.status(HttpStatus.OK).send();
    }
}
