import { Module } from '@nestjs/common';

import { AppController } from './app.controller';


import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ItemModule } from './item/item.module';



import { TypeOrmModule } from '@nestjs/typeorm';


import dbConfig from "../dbconfig";


@Module({
  imports: [UserModule,ItemModule,TypeOrmModule.forRoot(dbConfig)],



  controllers: [AppController],
  providers: [AppService],
  
})
export class AppModule {}
