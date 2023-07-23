import { Card, CardTitle } from '@/components/ui/card';
import Details from '@/components/details';
import dynamic from 'next/dynamic';
import StockInfo from '@/components/stock-info';
import { useState } from 'react';

import Recent from '@/components/recent';

import NewSearch, { SelectedStock } from '@/components/new-search';


const StockChart = dynamic(() => import ('../components/ui/stock-chart'), { ssr: false });

export default function Home() {

    const [recentSearches, setRecentSearches] = useState<SelectedStock[]>([]);
    const [currentStock, setCurrentStock] = useState<SelectedStock>({ id: 0, name: 'AAPL', title: 'Apple Inc.' });


    const onNewSearch = (stock: SelectedStock) => {
        setCurrentStock(stock);
        setRecentSearches((prevState) => {
            return [...prevState, stock];
        });
    };
    return (
            <div
                className=" container flex flex-col md:flex md:flex-col max-w-4xl lg:flex lg:flex-row lg:max-w-7xl gap-5 mb-10 ">
                <div className="flex flex-col gap-5">
                    <NewSearch onNewSearch={onNewSearch}></NewSearch>
                    <Card className="bg-[#262523] h-[200px] ">
                        <StockInfo ticker={currentStock.name} name={currentStock.title}></StockInfo>
                    </Card>
                    <Card className="bg-[#262523] h-[450px] overflow-hidden">
                        <div className="h-5/6">
                            <StockChart ticker={currentStock.name}/>
                        </div>
                    </Card>
                    <Card className="bg-[#262523] h-[400px]  md:h-[200px] lg:h-[125px]">
                        <Details ticker={currentStock.name}></Details>
                    </Card>
                </div>
                <Card className="bg-[#262523] h-[200px] min-w-[250px] lg:w-[400px] lg:h-[400px] overflow-y-scroll">
                    <CardTitle className="text-[#71716F] m-2">Recent</CardTitle>
                    <Recent recentList={recentSearches}></Recent>
                </Card>
            </div>
    );

}

// export const getServerSideProps: () => Promise<{ props: { state: AppState } }> = async () => {
//     return {
//         props: {
//             state: await getAllStockInformation('TTD')
//         }
//     };
// };

//initialState: InferGetServerSidePropsType<typeof getServerSideProps>
