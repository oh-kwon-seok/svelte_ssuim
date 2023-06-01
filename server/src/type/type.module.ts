import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeController } from './type.controller';
import { TypeService } from './type.service';
import { type } from './type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([type])],
  controllers: [TypeController],
  providers: [TypeService],
})
export class TypeModule {}