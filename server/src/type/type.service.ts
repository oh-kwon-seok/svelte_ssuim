import { Injectable, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {type} from './type.entity';
// @ts-nocheck

@Injectable()
export class TypeService {
  constructor(
    @InjectRepository(type)
    private typeRepository: Repository<type>,
  ) {}

  async findAll(){
  const query = `SELECT type_code,type_name FROM type`;
  return this.typeRepository.query(query);
  }

  async findOne(type_code: any ): Promise<type> {
    console.log(type_code);
    return await this.typeRepository.findOne({ where : {type_code : type_code }});
  }

  async create(type: type): Promise<type> {
    return await this.typeRepository.save(type);
  }

  async update(type_code: any, type: type): Promise<type> {
    await this.typeRepository.update(type_code, type);
    return await this.typeRepository.findOne({ where : {type_code : type_code }});
  }

  async remove(id: number): Promise<void> {
    await this.typeRepository.delete(id);
  }
}