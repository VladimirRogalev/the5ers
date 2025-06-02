import { Schema } from 'mongoose';

export const PortfolioSchema = new Schema({
    userId: { type: String, required: true },
    stocks: [
        {
            ticker: String,
            amount: Number,
            buyPrice: Number,
            buyDate: Date,
        }
    ]
});