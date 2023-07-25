import React, { useContext, useEffect, useState } from 'react';
import { Detail } from '@/lib/models';
import DetailItem from '@/components/detail-item';
import { APIStockService } from '@/lib/stock-api-service';
import { ErrorContext } from '@/pages';



export interface DetailsProps {
    ticker: string;
}


/***
 * The details for a given stock, the specific details are generic as long as they are in a
 * Detail type then it can be displayed
 * @param ticker
 * @constructor
 */
const Details: React.FC<DetailsProps> = ({ ticker }) => {

        const [details, setDetails] = useState<Detail[]>([]);
        const errorContext = useContext(ErrorContext);


        useEffect(() => {
            APIStockService.getDetailedStockInformation(ticker)
                .then(setDetails)
                .catch(e => errorContext.setError(true));
        }, [ticker]);

        return (
            <div className=" m-3 grid grid-cols-1  md:grid-cols-2 md:gap-x-5 lg:grid-cols-4 text-lg ">
                <div className="text-primary-white flex flex-col  font-medium gap-1">
                    {Object.values(details).slice(0, 3).map((detail, key) =>
                        <DetailItem itemDetails={detail} key={key}/>
                    )}
                </div>

                <div className="text-primary-white flex flex-col font-medium gap-1 ">
                    {Object.values(details).slice(3, 6).map((detail, key) =>
                        <DetailItem itemDetails={detail} key={key}/>
                    )}
                </div>
                <div className="text-primary-white flex flex-col  font-medium gap-1">
                    {Object.values(details).slice(6, 9).map((detail, key) =>
                        <DetailItem itemDetails={detail} key={key}/>
                    )}
                </div>
                <div className="text-primary-white flex flex-col font-medium gap-1">
                    {Object.values(details).slice(9, 12).map((detail, key) =>
                        <DetailItem itemDetails={detail} key={key}/>
                    )}
                </div>
            </div>

        );
    }
;

export default Details;