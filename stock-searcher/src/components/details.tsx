import React, { useEffect, useState } from 'react';
import { Detail, DetailMap } from '@/lib/models';
import DetailItem from '@/components/detail-item';
import { StockApiService } from '@/lib/stock-api-service';
// export interface DetailsProps {
//     open: string;
//     high: string;
//     low: string;
//     volume: number,
//     peRatio: number;
//     fiftyTwoWeekHigh: number,
//     fiftyTwoWeekLow: number,
//     eps: number,
//     marketCap: number,
//     trailingPE: number,
//     forwardPE: number,
//     analystTargetPrice: number
// }


export interface DetailsProps {
    ticker: string;
}


const Details: React.FC<DetailsProps> = ({ ticker }) => {

        const [details, setDetails] = useState<Detail[]>([]);

        useEffect(() => {
            StockApiService.getDetailedStockInformation(ticker).then(setDetails);
        }, [ticker]);


        return (
            <div className="container m-auto grid grid-cols-1  md:grid-cols-2 md:gap-x-5 lg:grid-cols-4 text-lg ">
                <div className="text-[#EDEDED] flex flex-col  font-medium gap-1">
                    {Object.values(details).slice(0, 3).map((detail, key) =>
                        <DetailItem itemDetails={detail} key={key}/>
                    )}
                </div>

                <div className="text-[#EDEDED] flex flex-col font-medium gap-1 ">
                    {Object.values(details).slice(3, 6).map((detail, key) =>
                        <DetailItem itemDetails={detail} key={key}/>
                    )}
                </div>
                <div className="text-[#EDEDED] flex flex-col  font-medium gap-1">
                    {Object.values(details).slice(6, 9).map((detail, key) =>
                        <DetailItem itemDetails={detail} key={key}/>
                    )}
                </div>
                <div className="text-[#EDEDED] flex flex-col font-medium gap-1">
                    {Object.values(details).slice(9, 12).map((detail, key) =>
                        <DetailItem itemDetails={detail} key={key}/>
                    )}
                </div>
            </div>

        );
    }
;

export default Details;