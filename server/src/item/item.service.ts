import { Injectable, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository,QueryBuilder,DataSource  } from 'typeorm';
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
    const query = `SELECT * FROM item where item_code = ?`;
    const param : any = [item_code];
    let items = await this.itemRepository.query(query,param);
    return items;
  }

  async create(item: item): Promise<item> {

    const query = `SELECT * FROM item where item_code = ? AND item_maker = ? `;
    const param : any = [item.item_code,item.item_maker];
    let items = await this.itemRepository.query(query,param);
    
    if(items.length === 0){
      return await this.itemRepository.save(item);

    }else {
    
   }

  }

  async update(item_code: any, item: item): Promise<item> {
    await this.itemRepository.update(item_code, item);
    return await this.itemRepository.findOne({ where : {item_code : item_code }});
  }

  async remove(id: number): Promise<void> {
    await this.itemRepository.delete(id);
  }
}