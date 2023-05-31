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

  @Get('/save')
  async findOne(@Query('item_code') item_code:any): Promise<item> {
    
    return this.itemService.findOne(item_code);
  }

  @Post()
  async create(@Body() item: item): Promise<item> {
    return this.itemService.create(item);
  }

}
