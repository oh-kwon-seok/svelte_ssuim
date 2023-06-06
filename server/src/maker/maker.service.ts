import { Injectable, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository} from 'typeorm';
import {maker} from './maker.entity';
// @ts-nocheck

@Injectable()
export class MakerService {
  constructor(
    @InjectRepository(maker)
    private makerRepository: Repository<maker>,
  ) {}

  async findAll(){
  const query = `SELECT maker_code,maker_name FROM maker`;
  return this.makerRepository.query(query);
  }

  async findOne(maker_code: any ): Promise<maker> {
    console.log(maker_code);
    return await this.makerRepository.findOne({ where : {maker_code : maker_code }});
  }

  async create(maker: maker): Promise<maker> {
    return await this.makerRepository.save(maker);
  }

  async update(maker_code: any, maker: maker): Promise<maker> {
    await this.makerRepository.update(maker_code, maker);
    return await this.makerRepository.findOne({ where : {maker_code : maker_code }});
  }

  async remove(id: number): Promise<void> {
    await this.makerRepository.delete(id);
  }
}