import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchStockQuote } from '../features/stocks/stockService';
import { Card, Spin, Typography } from 'antd';

const { Title, Text } = Typography;

const StockPage = () => {
    const { ticker } = useParams<{ ticker: string }>();
    const [stock, setStock] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (ticker) {
            fetchStockQuote(ticker).then(data => {
                setStock(data);
                setLoading(false);
            });
        }
    }, [ticker]);

    if (loading || !stock) {
        return <Spin style={{ margin: '100px auto', display: 'block' }} />;
    }

    return (
        <div style={{ padding: 24 }}>
            <Link to="/">← Back to Portfolio</Link>
            <Card style={{ marginTop: 16 }}>
                <Title level={3}>{stock.name} ({stock.symbol})</Title>
                <Text strong>Current Price:</Text> ${stock.price} <br />
                <Text type={stock.changesPercentage >= 0 ? 'success' : 'danger'}>
                    {stock.changesPercentage > 0 ? '+' : ''}{stock.changesPercentage?.toFixed(2)}%
                </Text>
                {/* График можно вставить позже */}
            </Card>
        </div>
    );
};

export default StockPage;
