import { Controller, Get, Post, Put, Delete, Param, Body,Query,Res } from '@nestjs/common';
import { MakerService } from './maker.service';
import { maker } from './maker.entity';


@Controller('maker')
export class MakerController {
  constructor(private makerService: MakerService) {}

  @Get('select')
  async findAll(): Promise<maker[]> {
    
    return this.makerService.findAll();

    // return Object.assign({
    //   user_data: userList,
    //   statusCode: 200,
    //   statusMsg: `데이터 조회가 성공적으로 완료되었습니다.`,
    // });
  }

  @Get('search')
  async findOne(@Query('maker_code') maker_code:any): Promise<maker> {
    console.log('maker_code : ',maker_code);
    return this.makerService.findOne(maker_code);
  }

  @Post()
  async create(@Body() maker: maker): Promise<maker> {
    return this.makerService.create(maker);
  }

}
