import { useEffect, useState } from 'react';
import {
    addStock,
    fetchPortfolio,
    removeStock
} from './portfolioSlice';
import {
    AutoComplete,
    Button,
    Card,
    DatePicker,
    Divider,
    Form,
    InputNumber,
    List,
    message
} from 'antd';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks.ts';
import { DeleteOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import axios from 'axios';

export const PortfolioPage = () => {
    const dispatch = useAppDispatch();
    const { stocks, loading } = useAppSelector((state) => state.portfolio);

    const [options, setOptions] = useState<{ value: string }[]>([]);

    useEffect(() => {
        dispatch(fetchPortfolio());
    }, [dispatch]);

    const handleSearch = async (value: string) => {
        if (!value) return;
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_API_URL}/stocks?q=${value}`
            );
            const formatted = res.data.map((item: any) => ({
                value: item.symbol
            }));
            setOptions(formatted);
        } catch (e) {
            message.error('Ticker search failed');
        }
    };

    return (
        <div style={{ padding: 20 }}>
            <h1>My Portfolio</h1>

            <List
                grid={{ gutter: 16, column: 2 }}
                loading={loading}
                dataSource={stocks}
                renderItem={(stock: any) => (
                    <List.Item>
                        <Card
                            title={<Link to={`/stock/${stock.ticker}`}>{stock.ticker}</Link>}
                            actions={[
                                <DeleteOutlined
                                    key="delete"
                                    onClick={() => {
                                        dispatch(removeStock(stock.ticker))
                                            .unwrap()
                                            .then(() => message.success(`Removed ${stock.ticker}`))
                                            .catch(() => message.error('Failed to remove stock'));
                                    }}
                                />
                            ]}
                        >
                            <p>Amount: {stock.amount}</p>
                            <p>Buy price: ${stock.buyPrice}</p>
                        </Card>
                    </List.Item>
                )}
            />

            <Form
                layout="vertical"
                onFinish={async (values) => {
                    const dto = {
                        ...values,
                        buyDate: values.buyDate.format('YYYY-MM-DD')
                    };
                    try {
                         await dispatch(addStock(dto)).unwrap();
                        dispatch(fetchPortfolio());
                        message.success(`Stock ${values.ticker} added!`);
                    } catch (e) {
                        message.error('Failed to add stock');
                    }
                }}
                style={{ maxWidth: 400, marginTop: 40 }}
            >
                <Divider>Add Stock</Divider>

                <Form.Item label="Ticker" name="ticker" rules={[{ required: true }]}>
                    <AutoComplete
                        options={options}
                        onSearch={handleSearch}
                        placeholder="Search ticker"
                        style={{ width: '100%' }}
                    />
                </Form.Item>

                <Form.Item label="Amount" name="amount" rules={[{ required: true }]}>
                    <InputNumber min={1} style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item label="Buy Price" name="buyPrice" rules={[{ required: true }]}>
                    <InputNumber min={0} step={0.01} style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item label="Buy Date" name="buyDate" rules={[{ required: true }]}>
                    <DatePicker style={{ width: '100%' }} disabledDate={(d) => d.isAfter(dayjs())} />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Add to Portfolio
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};
