import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PortfolioService {
    constructor(
        @InjectModel('Portfolio') private readonly portfolioModel: Model<any>,
    ) {}

    async getPortfolio(userId: string) {
        return this.portfolioModel.findOne({ userId }) || { stocks: [] };
    }

    async addStock(userId: string, stock: any) {
        let portfolio = await this.portfolioModel.findOne({ userId });
        if (!portfolio) {
            portfolio = new this.portfolioModel({ userId, stocks: [] });
        }
        portfolio.stocks.push(stock);
        return portfolio.save();
    }

    async removeStock(userId: string, ticker: string) {
        const portfolio = await this.portfolioModel.findOne({ userId });
        if (!portfolio) throw new NotFoundException();
        portfolio.stocks = portfolio.stocks.filter(s => s.ticker !== ticker);
        return portfolio.save();
    }
}