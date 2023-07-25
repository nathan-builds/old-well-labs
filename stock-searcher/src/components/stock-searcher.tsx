import Searchbar, { SelectedStock } from '@/components/searchbar';
import { Card, CardTitle } from '@/components/ui/card';
import StockInfo from '@/components/stock-info';
import Details from '@/components/details';
import Recent from '@/components/recent';
import { useState } from 'react';
import dynamic from 'next/dynamic';



const StockChart = dynamic(() => import ('../components/stock-chart'), { ssr: false });

/***
 * Main component that displays all the stock information
 * @constructor
 */
const StockSearcher = ()=>{
    // keep track of recent searches here
    const [recentSearches, setRecentSearches] = useState<SelectedStock[]>([]);
    const [currentStock, setCurrentStock] = useState<SelectedStock>({ id: 0, name: 'AAPL', title: 'Apple Inc.' });


    const onNewSearch = (stock: SelectedStock) => {
        setCurrentStock(stock);
        setRecentSearches((prevState) => {
            return [...prevState].filter(curr => curr.name != stock.name).concat([stock]);
        });
    };


    return(
        <div
            className="container flex flex-col min-w-[500px] items-center md:flex md:flex-col max-w-4xl lg:flex lg:flex-row lg:justify-center lg:items-start lg:max-w-7xl gap-5 mb-10 ">
            <div className="flex flex-col gap-5 w-2/3">
                <Searchbar onNewSearch={onNewSearch}></Searchbar>
                <Card className="bg-primary-grey h-[200px] ">
                    <StockInfo ticker={currentStock.name}></StockInfo>
                </Card>
                <Card className="bg-primary-grey h-[450px] overflow-hidden">
                    <div className="h-5/6">
                        <StockChart ticker={currentStock.name}/>
                    </div>
                </Card>
                <Card className="bg-primary-grey h-[400px]  md:h-[200px] lg:h-[125px]">
                    <Details ticker={currentStock.name}></Details>
                </Card>
            </div>
            <Card className="bg-primary-grey w-2/3 max-h-[200px] min-h-[400px] lg:max-h-[880px] min-w-[250px] lg:w-[250px] overflow-y-scroll">
                <div className='flex flex-row items-center justify-center'>
                    <CardTitle className="text-[#71716F] italic text text-opacity-40 font-medium tracking-wide m-2">History</CardTitle>
                </div>
                <Recent recentList={recentSearches} onRecentSelected={onNewSearch}></Recent>
            </Card>
        </div>
    )
}

export default StockSearcher;