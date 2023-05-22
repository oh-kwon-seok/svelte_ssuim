import { Controller, Get, Post, Put, Delete, Param, Body,Query } from '@nestjs/common';
import { MakerService } from './maker.service';
import { maker } from './maker.entity';

@Controller('maker')
export class MakerController {
  constructor(private makerService: MakerService) {}

  @Get()
  async findAll(): Promise<maker[]> {
    return this.makerService.findAll();
  }

  @Get('auth/login')
  async findOne(@Query('maker_id') maker_id:any, @Query('maker_password') maker_password : any): Promise<maker> {
    
    return this.makerService.findOne(maker_id, maker_password);
  }

  @Post()
  async create(@Body() maker: maker): Promise<maker> {
    return this.makerService.create(maker);
  }

}
