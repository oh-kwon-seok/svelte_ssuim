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

  async findOne(item_code: any): Promise<item> {
   
    return await this.itemRepository.findOne({ where : {item_code : item_code }});
  }

  async create(item: item): Promise<item> {
    let test = this.itemRepository.findOne({ where : {item_code : item.item_code }}); 
    
    console.log('item : ', item);
    console.log('test : ', test);
    return test;

    // return await this.itemRepository.save(item);
  }



  async update(item_code: any, item: item): Promise<item> {
    await this.itemRepository.update(item_code, item);
    return await this.itemRepository.findOne({ where : {item_code : item_code }});
  }

  async remove(id: number): Promise<void> {
    await this.itemRepository.delete(id);
  }
}