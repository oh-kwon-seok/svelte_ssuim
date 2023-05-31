import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';
import { item } from './item.entity';
import { maker } from '../maker/maker.entity';
import { unit } from '../unit/unit.entity';
import { type } from '../type/type.entity';


@Module({
  imports: [TypeOrmModule.forFeature([item,maker,type,unit])],
  controllers: [ItemController],
  providers: [ItemService],
})
export class ItemModule {}