import { Controller, Get, Post, Put, Delete, Param, Body,Query,Res } from '@nestjs/common';
import { UnitService } from './unit.service';
import { unit } from './unit.entity';


@Controller('unit')
export class UnitController {
  constructor(private unitService: UnitService) {}

  @Get('select')
  async findAll(): Promise<unit[]> {
    
    return this.unitService.findAll();

    // return Object.assign({
    //   user_data: userList,
    //   statusCode: 200,
    //   statusMsg: `데이터 조회가 성공적으로 완료되었습니다.`,
    // });
  }

  @Get('search')
  async findOne(@Query('unit_code') unit_code:any): Promise<unit> {
    console.log('unit_code : ',unit_code);
    return this.unitService.findOne(unit_code);
  }

  @Post()
  async create(@Body() unit: unit): Promise<unit> {
    return this.unitService.create(unit);
  }

}
