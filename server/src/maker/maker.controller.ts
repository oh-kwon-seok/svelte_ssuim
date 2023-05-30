import { Controller, Get, Post, Put, Delete, Param, Body,Query } from '@nestjs/common';
import { MakerService } from './maker.service';
import { maker } from './maker.entity';
import { AnyNsRecord } from 'dns';

@Controller('maker')
export class MakerController {
  constructor(private makerService: MakerService) {}

  @Get()
  async findAll(): Promise<maker[]> {
    return this.makerService.findAll();
  }

  @Get('auth/login')
  async findOne(@Query('maker_code') maker_code:any): Promise<maker> {
    
    return this.makerService.findOne(maker_code);
  }

  @Post()
  async create(@Body() maker: maker): Promise<maker> {
    return this.makerService.create(maker);
  }

}
