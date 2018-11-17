import { Controller, Get, Res, Post, Body, Param, Put, Delete, HttpStatus, HttpException } from '@nestjs/common';
import { KegiatanService } from './kegiatan.service';

@Controller()
export class KegiatanController {
    constructor(private lksService: KegiatanService) { }

    @Get('kegiatan')
    public async index(@Res() res) {
        const kegiatan = await this.lksService.findAll();
        return res.status(HttpStatus.OK).json({ 'result': kegiatan });
    }

    @Post('kegiatan')
    public async create(@Body() body, @Res() res) {
        if (!body || (body && Object.keys(body).length === 0))
            throw new HttpException('Gagal membuat master kegiatan karena data tidak ditemukan', HttpStatus.BAD_REQUEST);

        await this.lksService.create(body);
        return res.status(HttpStatus.CREATED).json({
            'result': {
                'httpCode': HttpStatus.CREATED,
                'message': 'Data kegiatan berhasil disimpan'
            }
        });
    }

    @Get('kegiatan/:id')
    public async show(@Param('id') id: number, @Res() res) {
        if (!id) throw new HttpException('id kegiatan tidak ditemukan', HttpStatus.BAD_REQUEST);

        const kegiatan = await this.lksService.findById(id);
        return res.status(HttpStatus.OK).json({ 'result': kegiatan });
    }

    @Post('kegiatan/:id')
    public async update(@Body() body, @Param('id') id: number, @Res() res) {
        if (!id) throw new HttpException('id kegiatan tidak ditemukan', HttpStatus.BAD_REQUEST);

        await this.lksService.update(id, body);
        return res.status(HttpStatus.OK).json({
            'result': {
                'httpCode': HttpStatus.OK,
                'message': 'Data kegiatan berhasil diupdate'
            }
        });
    }

    @Delete('kegiatan/:id')
    public async delete(@Param('id') id: number, @Res() res) {
        if (!id) throw new HttpException('id kegiatan tidak ditemukan', HttpStatus.BAD_REQUEST);

        await this.lksService.delete(id);
        return res.status(HttpStatus.OK).json({
            'result': {
                'httpCode': HttpStatus.OK,
                'message': 'Data kegiatan berhasil dihapus'
            }
        });
    }
}
