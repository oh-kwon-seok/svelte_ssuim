import { Controller, Get, Post, Put, Delete, Param, Body,Query } from '@nestjs/common';
import { UserService } from './user.service';
import { user } from './user.entity';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async findAll(): Promise<user[]> {
    return this.userService.findAll();
  }

  @Get('auth/login')
  async findOne(@Query('user_id') user_id:any, @Query('user_password') user_password : any): Promise<user> {
    
    return this.userService.findOne(user_id, user_password);
  }

  @Post()
  async create(@Body() user: user): Promise<user> {
    return this.userService.create(user);
  }

}
