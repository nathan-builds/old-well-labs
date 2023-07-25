import { GenericStockInformation } from '@/lib/models';
import React, { CSSProperties, useContext, useEffect, useState } from 'react';
import { numberFormat, roundTwoDecimals } from '@/lib/stockUtils';
import ClipLoader from 'react-spinners/ClipLoader';
import { PuffLoader } from 'react-spinners';
import { GridLine } from '@nivo/axes';
import { ErrorContext } from '@/pages';
import { APIStockService } from '@/lib/stock-api-service';


export interface StockInfoProps {
    ticker: string;
}


const StockInfo: React.FC<StockInfoProps> = ({ ticker }) => {

    const errorContext = useContext(ErrorContext);
    const [isLoading, setIsLoading] = useState(false);
    const [stockInfo, setStockInfo] = useState<GenericStockInformation>({
        ticker: '',
        currentPrice: '0',
        percentChange: '',
        name: '',
        currency: '',
        sector: ''
    });

    useEffect(() => {
        setIsLoading(true);
        APIStockService.getGenericStockInformation(ticker).then(
            info => {
                setStockInfo(info);
                setIsLoading(false);
            }).catch(e => errorContext.setError(true));
    }, [ticker]);

    if (isLoading) {
        return (
            <div className="flex flex-row items-center justify-center pt-20">
                <PuffLoader color="#987C44"></PuffLoader>
            </div>
        );
    }

    return (
        <div className="text-[#EDEDED] flex flex-col gap-4 p-3">

            <div className="flex flex-col">
                <span className="font-bold text-3xl">{stockInfo.ticker}</span>
                <span>{stockInfo.name}</span>
                <span className="text-[#71716F] font-medium">{stockInfo.sector}</span>
            </div>
            <div className="flex flex-row gap-3">
                <span className="text-3xl font-bold">${parseFloat(stockInfo.currentPrice).toFixed(2)}</span>
                <span className="font-bold pt-3">{stockInfo.currency}</span>
                <span
                    className={`font-medium pt-3  ${parseFloat(stockInfo.percentChange) >= 0 ? 'text-dark-green' : 'text-dark-orange'}`}>
                    {roundTwoDecimals(stockInfo.percentChange)}%
                </span>
            </div>
        </div>
    );
};

export default StockInfo;