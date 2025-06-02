import { Module } from '@nestjs/common';
import { StocksService } from './stocks.service';
import { StocksController } from './stocks.controller';
import {ConfigModule} from '@nestjs/config';

@Module({
  imports: [
    ConfigModule
  ],
  controllers: [StocksController],
  providers: [StocksService],
})
export class StocksModule {}