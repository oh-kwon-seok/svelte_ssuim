import { Injectable, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { maker } from './maker.entity';
// @ts-nocheck

@Injectable()
export class MakerService {
  constructor(
    @InjectRepository(maker)
    private makerRepository: Repository<maker>,
  ) {}

  async findAll(): Promise<maker[]> {
    return await this.makerRepository.find();
  }

  async findOne(maker_id: any, maker_password : any ): Promise<maker> {
    console.log(maker_id,maker_password);
    return await this.makerRepository.findOne({ where : {maker_id : maker_id, maker_password : maker_password }});
  }

  async create(maker: maker): Promise<maker> {
    return await this.makerRepository.save(maker);
  }

  async update(maker_id: any, maker: maker): Promise<maker> {
    await this.makerRepository.update(maker_id, maker);
    return await this.makerRepository.findOne({ where : {maker_id : maker_id }});
  }

  async remove(id: number): Promise<void> {
    await this.makerRepository.delete(id);
  }
}