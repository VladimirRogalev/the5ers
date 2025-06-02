import { Controller, Get, Param, Query} from '@nestjs/common';
import { StocksService } from './stocks.service';


@Controller('stocks')
export class StocksController {
    constructor(private readonly stocksService: StocksService) {}

    @Get(':ticker')
    getQuote(@Param('ticker') ticker: string) {
        return this.stocksService.getQuote(ticker);
    }

    @Get()
    searchTicker(@Query('q') query: string) {
        return this.stocksService.searchTickers(query);
    }
}
