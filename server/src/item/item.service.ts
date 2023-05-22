import { Injectable, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { item } from './item.entity';
// @ts-nocheck

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(item)
    private itemRepository: Repository<item>,
  ) {}

  async findAll(): Promise<item[]> {
    return await this.itemRepository.find();
  }

  async findOne(item_id: any, item_password : any ): Promise<item> {
    console.log(item_id,item_password);
    return await this.itemRepository.findOne({ where : {item_id : item_id, item_password : item_password }});
  }

  async create(item: item): Promise<item> {
    return await this.itemRepository.save(item);
  }

  async update(item_id: any, item: item): Promise<item> {
    await this.itemRepository.update(item_id, item);
    return await this.itemRepository.findOne({ where : {item_id : item_id }});
  }

  async remove(id: number): Promise<void> {
    await this.itemRepository.delete(id);
  }
}