import { Controller, Get, Res, Post, Body, Param, Put, Delete, HttpStatus, HttpException, UseInterceptors, FileInterceptor, UploadedFile } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { diskStorage } from 'multer'
import { extname } from 'path'

@Controller()
export class AttendanceController {
    constructor(private attService: AttendanceService) { }
    @Get('attendance')
    public async index(@Res() res) {
        const attendance = await this.attService.findAll();
        return res.status(HttpStatus.OK).json({ 'result': attendance });
    }

    @Post('attendance')
    @UseInterceptors(FileInterceptor('fotoLokasi', {
        storage: diskStorage({
            destination: './uploads'
            , filename: (req, file, cb) => {
                // console.log(req);
                // console.log(file);
                // console.log(cb);
                // Generating a 32 random chars long string
                const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
                //Calling the callback passing the random name generated with the original extension name
                cb(null, `${randomName}${extname(file.originalname)}`)
            }
        })
    }))
    public async create(@UploadedFile() file, @Body() body, @Res() res) {
        console.log('iniLogFile', file);
        console.log('iniLogBody', body);
        if (!body || (body && Object.keys(body).length === 0))
            throw new HttpException('Gagal menyimpan attendance karena data tidak ditemukan', HttpStatus.BAD_REQUEST);
        body.fotoLokasi = file.filename;
        await this.attService.create(body);
        return res.status(HttpStatus.CREATED).json({
            'result': {
                'httpCode': HttpStatus.CREATED,
                'message': 'Data attendance berhasil disimpan'
            }
        });
    }

    @Get('attendance/:id')
    public async show(@Param('id') id: number, @Res() res) {
        if (!id) throw new HttpException('id attendance tidak ditemukan', HttpStatus.BAD_REQUEST);

        const attendance = await this.attService.findById(id);
        return res.status(HttpStatus.OK).json({ 'result': attendance });
    }

    @Post('attendance/:id')
    public async update(@Body() body, @Param('id') id: number, @Res() res) {
        if (!id) throw new HttpException('id attendance tidak ditemukan', HttpStatus.BAD_REQUEST);

        await this.attService.update(id, body);
        return res.status(HttpStatus.OK).json({
            'result': {
                'httpCode': HttpStatus.OK,
                'message': 'Data attendance berhasil diupdate'
            }
        });
    }

    @Delete('attendance/:id')
    public async delete(@Param('id') id: number, @Res() res) {
        if (!id) throw new HttpException('id attendance tidak ditemukan', HttpStatus.BAD_REQUEST);

        await this.attService.delete(id);
        return res.status(HttpStatus.OK).json({
            'result': {
                'httpCode': HttpStatus.OK,
                'message': 'Data kegiatan berhasil dihapus'
            }
        });
    }
}
