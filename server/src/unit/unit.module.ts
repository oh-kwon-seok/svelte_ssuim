import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UnitController } from './unit.controller';
import { UnitService } from './unit.service';
import { unit } from './unit.entity';

@Module({
  imports: [TypeOrmModule.forFeature([unit])],
  controllers: [UnitController],
  providers: [UnitService],
})
export class UnitModule {}