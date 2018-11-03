import { Controller, Get, Res, Post, Body, Param, Put, Delete, HttpStatus, HttpException } from '@nestjs/common';
import { AttendanceService } from './attendance.service';

@Controller()
export class AttendanceController {
    constructor(private attService: AttendanceService) { }
    @Get('attendance')
    public async index(@Res() res) {
        const attendance = await this.attService.findAll();
        return res.status(HttpStatus.OK).json({ 'result': attendance });
    }

    @Post('attendance')
    public async create(@Body() body, @Res() res) {
        if (!body || (body && Object.keys(body).length === 0))
            throw new HttpException('Gagal menyimpan attendance karena data tidak ditemukan', HttpStatus.BAD_REQUEST);

        await this.attService.create(body);
        return res.status(HttpStatus.CREATED).send();
    }

    @Get('attendance/:id')
    public async show(@Param('id') id: number, @Res() res) {
        if (!id) throw new HttpException('id attendance tidak ditemukan', HttpStatus.BAD_REQUEST);

        const attendance = await this.attService.findById(id);
        return res.status(HttpStatus.OK).json({ 'result': attendance });
    }

    @Put('attendance/:id')
    public async update(@Body() body, @Param('id') id: number, @Res() res) {
        if (!id) throw new HttpException('id attendance tidak ditemukan', HttpStatus.BAD_REQUEST);

        await this.attService.update(id, body);
        return res.status(HttpStatus.OK).send();
    }

    @Delete('attendance/:id')
    public async delete(@Param('id') id: number, @Res() res) {
        if (!id) throw new HttpException('id attendance tidak ditemukan', HttpStatus.BAD_REQUEST);

        await this.attService.delete(id);
        return res.status(HttpStatus.OK).send();
    }
}
