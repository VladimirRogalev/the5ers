import axios from 'axios';

export const fetchStockQuote = async (ticker: string) => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/stocks/${ticker}`);
    return res.data;
};
