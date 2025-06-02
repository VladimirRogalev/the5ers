import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PortfolioPage } from './features/portfolio/PortfolioPage';
import StockPage from './pages/StockPage';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<PortfolioPage />} />
                <Route path="/stock/:ticker" element={<StockPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
