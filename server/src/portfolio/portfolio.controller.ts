import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import {CreateStockDto} from './dto/create-stock.dto';

@Controller('portfolio')
export class PortfolioController {
    constructor(private readonly portfolioService: PortfolioService) {}

    private readonly userId = 'user123';

    @Get('user')
    getPortfolio() {
        return this.portfolioService.getPortfolio(this.userId);
    }

    @Post('add')
    addStock(@Body() dto: CreateStockDto) {
        return this.portfolioService.addStock(this.userId, dto);
    }

    @Delete('remove/:ticker')
    removeStock(@Param('ticker') ticker: string) {
        return this.portfolioService.removeStock(this.userId, ticker);
    }
}