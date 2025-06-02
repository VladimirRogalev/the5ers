import { IsString, IsNumber, IsDateString } from 'class-validator';

export class CreateStockDto {
    @IsString()
    ticker: string;

    @IsNumber()
    amount: number;

    @IsNumber()
    buyPrice: number;

    @IsDateString()
    buyDate: string;
}