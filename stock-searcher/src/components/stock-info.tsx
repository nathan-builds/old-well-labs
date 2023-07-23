import { GenericStockInformation } from '@/lib/models';
import React, { useEffect, useState } from 'react';
import { StockApiService } from '@/lib/stock-api-service';
import { numberFormat } from '@/lib/stockUtils';


export interface StockInfoProps {
    ticker: string
    name: string,
}


const StockInfo: React.FC<StockInfoProps> = ({ ticker, name }) => {


    const [stockInfo, setStockInfo] = useState<GenericStockInformation>({
        currentPrice: '0',
        percentChange: '',
        name: '',
        currency: '',
        sector: ''
    });


    useEffect(() => {
        StockApiService.getGenericStockInformation(ticker)
            .then(info => {
                console.log(info);
                setStockInfo(info);
            });
    }, [ticker]);


    return (
        <div className="text-[#EDEDED] flex flex-col gap-4 p-3">
            <div className="flex flex-col">
                <span className="font-bold text-3xl">{ticker}</span>
                <span>{stockInfo.name}</span>
                <span className="text-[#71716F] font-medium">{stockInfo.sector}</span>
            </div>
            <div className="flex flex-row gap-3">
                <span className="text-3xl font-bold">${parseFloat(stockInfo.currentPrice).toFixed(2)}</span>
                <span className="font-bold pt-3">{stockInfo.currency}</span>
                <span
                    className={`font-medium pt-3 text-[#518B5D]`}>{stockInfo.percentChange}</span>
            </div>
        </div>
    );
};

export default StockInfo;