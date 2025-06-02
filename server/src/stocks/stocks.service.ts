import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class StocksService {
    private readonly apiKey: string | undefined;

    constructor(private readonly configService: ConfigService) {
        this.apiKey = configService.get<string>('FMP_API');
    }

    async getQuote(ticker: string) {
        const url = `https://financialmodelingprep.com/api/v3/quote/${ticker}?apikey=${this.apiKey}`;
        const response = await axios.get(url);
        return response.data[0];
    }

    async searchTickers(query: string) {
        const url = `https://financialmodelingprep.com/api/v3/search?query=${query}&limit=10&apikey=${this.apiKey}`;
        const res = await axios.get(url);
        return res.data;
    }
}