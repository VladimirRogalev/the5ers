import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Stock {
    ticker: string;
    amount: number;
    buyPrice: number;
    buyDate: string;
}

interface PortfolioState {
    stocks: Stock[];
    loading: boolean;
}

const initialState: PortfolioState = {
    stocks: [],
    loading: false
};

export const fetchPortfolio = createAsyncThunk('portfolio/fetch', async () => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/portfolio/user`);
    return response.data;
});

export const addStock = createAsyncThunk('portfolio/add', async (stock: Stock) => {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/portfolio/add`, stock);
    return response.data;
});

export const removeStock = createAsyncThunk('portfolio/remove', async (ticker: string) => {
    await axios.delete(`${import.meta.env.VITE_API_URL}/portfolio/remove/${ticker}`);
    return ticker;
});

const portfolioSlice = createSlice({
    name: 'portfolio',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPortfolio.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchPortfolio.fulfilled, (state, action) => {
                state.loading = false;
                state.stocks = action.payload.stocks;
            })
            .addCase(addStock.fulfilled, (state, action) => {
                state.stocks.push(action.payload);
            })
            .addCase(removeStock.fulfilled, (state, action) => {
                state.stocks = state.stocks.filter((s) => s.ticker !== action.payload);
            });
    }
});

export default portfolioSlice.reducer;
