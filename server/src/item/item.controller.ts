import { Controller, Get, Post, Put, Delete, Param, Body,Query } from '@nestjs/common';
import { ItemService } from './item.service';
import { item } from './item.entity';

@Controller('item')
export class ItemController {
  constructor(private itemService: ItemService) {}

  @Get()
  async findAll(): Promise<item[]> {
    return this.itemService.findAll();
  }

  @Get('auth/login')
  async findOne(@Query('item_id') item_id:any, @Query('item_password') item_password : any): Promise<item> {
    
    return this.itemService.findOne(item_id, item_password);
  }

  @Post()
  async create(@Body() item: item): Promise<item> {
    return this.itemService.create(item);
  }

}
