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


  @Post('save')
  async create(@Body() item: item): Promise<item> {
  
    return this.itemService.create(item);
  }

}
