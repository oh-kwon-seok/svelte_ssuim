import { Injectable, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {unit} from './unit.entity';
// @ts-nocheck

@Injectable()
export class UnitService {
  constructor(
    @InjectRepository(unit)
    private unitRepository: Repository<unit>,
  ) {}

  async findAll(){
  const query = `SELECT unit_code,unit_name FROM unit`;
  return this.unitRepository.query(query);
  }

  async findOne(unit_code: any ): Promise<unit> {
    console.log(unit_code);
    return await this.unitRepository.findOne({ where : {unit_code : unit_code }});
  }

  async create(unit: unit): Promise<unit> {
    return await this.unitRepository.save(unit);
  }

  async update(unit_code: any, unit: unit): Promise<unit> {
    await this.unitRepository.update(unit_code, unit);
    return await this.unitRepository.findOne({ where : {unit_code : unit_code }});
  }

  async remove(id: number): Promise<void> {
    await this.unitRepository.delete(id);
  }
}