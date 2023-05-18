import { Injectable, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { user } from './user.entity';
// @ts-nocheck

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(user)
    private userRepository: Repository<user>,
  ) {}

  async findAll(): Promise<user[]> {
    return await this.userRepository.find();
  }

  async findOne(user_id: any, user_password : any ): Promise<user> {
    console.log(user_id,user_password);
    return await this.userRepository.findOne({ where : {user_id : user_id, user_password : user_password }});
  }

  async create(user: user): Promise<user> {
    return await this.userRepository.save(user);
  }

  async update(user_id: any, user: user): Promise<user> {
    await this.userRepository.update(user_id, user);
    return await this.userRepository.findOne({ where : {user_id : user_id }});
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}