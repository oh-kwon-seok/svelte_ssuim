import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MakerController } from './maker.controller';
import { MakerService } from './maker.service';
import { maker } from './maker.entity';

@Module({
  imports: [TypeOrmModule.forFeature([maker])],
  controllers: [MakerController],
  providers: [MakerService],
})
export class MakerModule {}