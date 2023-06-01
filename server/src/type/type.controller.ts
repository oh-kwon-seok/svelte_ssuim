import { Controller, Get, Post, Put, Delete, Param, Body,Query,Res } from '@nestjs/common';
import { TypeService } from './type.service';
import { type } from './type.entity';


@Controller('type')
export class TypeController {
  constructor(private typeService: TypeService) {}

  @Get('select')
  async findAll(): Promise<type[]> {
    
    return this.typeService.findAll();

    // return Object.assign({
    //   user_data: userList,
    //   statusCode: 200,
    //   statusMsg: `데이터 조회가 성공적으로 완료되었습니다.`,
    // });
  }

  @Get('search')
  async findOne(@Query('type_code') type_code:any): Promise<type> {
    console.log('type_code : ',type_code);
    return this.typeService.findOne(type_code);
  }

  @Post()
  async create(@Body() type: type): Promise<type> {
    return this.typeService.create(type);
  }

}
