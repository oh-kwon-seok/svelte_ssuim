import { Injectable, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
// @ts-nocheck

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(user_id: any, user_password : any ): Promise<User> {
    
    return await this.userRepository.findOne({ where : {user_id : user_id, user_password : user_password }});
  }

  async create(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }

  async update(user_id: any, user: User): Promise<User> {
    await this.userRepository.update(user_id, user);
    return await this.userRepository.findOne({ where : {user_id : user_id }});
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}