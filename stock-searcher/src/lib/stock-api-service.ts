import {
    Detail,
    DataPoint,
    ChartData,
    StockDetails, GenericStockInformation, GlobalResponse
} from '@/lib/models';

const apiKey = 'UZIV4BJBISXTBDTH';


import { Datum } from '@nivo/line';
import { numberFormat } from '@/lib/stockUtils';


export class StockApiService {


    static async getStockChartData(stockSymbol: string): Promise<ChartData> {
        const intraDayURL = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${stockSymbol}&interval=5min&outputsize=full&apikey=${apiKey}`;
        const dailyURL = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stockSymbol}&interval=5min&outputsize=full&apikey=${apiKey}`;
        const dailySmaURL = `https://www.alphavantage.co/query?function=SMA&symbol=${stockSymbol}&interval=daily&min&time_period=10&series_type=open&apikey=${apiKey}`;
        const intraSmaUrl = `https://www.alphavantage.co/query?function=SMA&symbol=${stockSymbol}&interval=60min&time_period=10&series_type=open&apikey=${apiKey}`;


        const intraResponse = await fetch(intraDayURL);
        const dailyResponse = await fetch(dailyURL);
        const dailySMAResponse = await fetch(dailySmaURL);
        const intraSMAResponse = await (fetch(intraSmaUrl));
        const intraDay = await intraResponse.json();
        const daily = await dailyResponse.json();
        const dailySMA = await (dailySMAResponse).json();
        const intraSMA = await (intraSMAResponse.json());

        const cleanDailySMAData = cleanAPIData(dailySMA, 'Technical Analysis: SMA', true);
        const cleanIntraSMAData = cleanAPIData(intraSMA, 'Technical Analysis: SMA', true);
        const cleanIntraData = cleanAPIData(intraDay, 'Time Series (5min)', false);
        const cleanDailyData = cleanAPIData(daily, 'Time Series (Daily)', false);


        const currentDate = adjustDateToWeekday(new Date());


        const [oneDay, oneDaySma] = dateRangeFilter(
            [cleanIntraData, cleanIntraSMAData],
            (dataPoint => dataPoint.time.getDate() === currentDate.getDate()));

        const fiveDay = fiveDayHelperFilter(cleanIntraData);

        const [mtd, mtdSma] = dateRangeFilter(
            [cleanIntraData, cleanIntraSMAData],
            (dataPoint => currentDate.getMonth() === dataPoint.time.getMonth())
        );

        const [ytd, smaYtd] = dateRangeFilter(
            [cleanDailyData, cleanDailySMAData],
            (dataPoint => currentDate.getFullYear() === dataPoint.time.getFullYear())
        );
        const [l3Y, smaL3Y] = dateRangeFilter(
            [cleanDailyData, cleanDailySMAData],
            (dataPoint => dataPoint.time.getFullYear() - (currentDate.getFullYear() - 3) > 0)
        );
        const [l5Y, smaL5Y] = dateRangeFilter(
            [cleanDailyData, cleanDailySMAData],
            (dataPoint => dataPoint.time.getFullYear() - (currentDate.getFullYear() - 5) > 0)
        );

        const fiveDaySma = fiveDayHelperFilter(cleanIntraSMAData);


        return {
            '1D': [{ id: 'Price', data: oneDay }, { id: 'SMA', data: oneDaySma }],
            '5D': [{ id: 'Price', data: fiveDay }, { id: 'SMA', data: fiveDaySma }],
            'MTD': [{ id: 'Price', data: mtd }, { id: 'SMA', data: mtdSma }],
            'YTD': [{ id: 'Price', data: ytd }, { id: 'SMA', data: smaYtd }],
            'L3Y': [{ id: 'Price', data: l3Y }, { id: 'SMA', data: smaL3Y }],
            'L5Y': [{ id: 'Price', data: l5Y }, { id: 'SMA', data: smaL5Y }]
        };
    };

    static async getGenericStockInformation(ticker: string): Promise<GenericStockInformation> {
        const overviewURL = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${ticker}&apikey=${apiKey}`;
        const globalURL = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=${apiKey}`;
        const overviewResponse = await fetch(overviewURL);
        const globalResponse = await fetch(globalURL);
        const stockDetails: StockDetails = await overviewResponse.json();
        const globalDetails: GlobalResponse = await globalResponse.json();


        return {
            ticker: globalDetails['Global Quote']['01. symbol'],
            percentChange: globalDetails['Global Quote']['10. change percent'],
            currentPrice: globalDetails['Global Quote']['05. price'],
            name: stockDetails.Name,
            currency: stockDetails.Currency,
            sector: stockDetails.Sector
        };
    }

    static async getDetailedStockInformation(ticker: string): Promise<Detail[]> {
        const overviewURL = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${ticker}&apikey=${apiKey}`;
        const globalURL = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=${apiKey}`;
        const overviewResponse = await fetch(overviewURL);
        const globalResponse = await fetch(globalURL);
        const stockDetails: StockDetails = await overviewResponse.json();
        const globalDetails: GlobalResponse = await globalResponse.json();
        console.log('GLOBAL DETAILS', globalDetails);
        const details: Detail[] = [];
        details.push({ displayableName: 'P/E', dataPoint: stockDetails.PERatio });
        details.push({ displayableName: '52 W. High', dataPoint: stockDetails['52WeekHigh'] });
        details.push({ displayableName: '52 W. Low', dataPoint: stockDetails['52WeekLow'] });
        details.push({
            displayableName: 'Mkt. Cap',
            dataPoint: numberFormat.format(+stockDetails.MarketCapitalization)
        });
        details.push({ displayableName: 'EPS', dataPoint: stockDetails.EPS });
        details.push({ displayableName: 'Trailing P/E', dataPoint: stockDetails.TrailingPE });
        details.push({ displayableName: 'Forward P/E', dataPoint: stockDetails.ForwardPE });
        details.push({ displayableName: 'Target Price', dataPoint: stockDetails.AnalystTargetPrice });
        details.push({ displayableName: 'Open', dataPoint: globalDetails['Global Quote']['02. open'] });
        details.push({ displayableName: 'Low', dataPoint: globalDetails['Global Quote']['04. low'] });
        details.push({ displayableName: 'High', dataPoint: globalDetails['Global Quote']['03. high'] });
        details.push({ displayableName: 'Volume', dataPoint: globalDetails['Global Quote']['06. volume'] });


        return details;
    }

}


export const getStockDetails = async (stockSymbol: string): Promise<StockDetails> => {
    const URL = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${stockSymbol}&apikey=${apiKey}`;
    const response = await fetch(URL);
    const data: StockDetails = await response.json();
    return data;
};

const cleanAPIData = (data: any, timeSeries: string, isSMA: boolean): DataPoint[] => {

    if (!isSMA) {
        return Object.keys(data[timeSeries]).map(timeKey => {
            return {
                time: new Date(timeKey),
                open: +data[timeSeries][timeKey]['1. open'],
                high: +data[timeSeries][timeKey]['2. high'],
                low: +data[timeSeries][timeKey]['3. low'],
                close: +data[timeSeries][timeKey]['4. close'],
                volume: +data[timeSeries][timeKey]['5. volume']
            };
        });

    } else {

        return Object.keys(data[timeSeries]).map(timeKey => {
            return {
                time: new Date(timeKey),
                close: +data[timeSeries][timeKey]['SMA']
            };
        });

    }
};


const dateRangeFilter = (data: DataPoint[][], filterFunc: (dataPoint: DataPoint) => boolean): Datum[][] => {
    return data.map(dataSet => {
        return dataSet
            .filter(filterFunc)
            .map(filteredPoint => ({ x: filteredPoint.time, y: filteredPoint.close }));
    });


};

const fiveDayHelperFilter = (data: DataPoint[]): Datum[] => {
    let day = new Date().getDate() - 1;
    let count = 5;
    let filteredPoints = [];
    for (let dataPoint of data) {
        if (count === 0) {
            break;
        }
        if (day !== dataPoint.time.getDate()) {
            day -= 1;
            count -= 1;
        }
        filteredPoints.push(dataPoint);

    }
    return filteredPoints.map(filteredPoint => {
        return {
            x: filteredPoint.time,
            y: filteredPoint.close
        };
    });
};


const adjustDateToWeekday = (date: Date): Date => {
    if (date.getDay() === 0) {
        date.setDate(date.getDate() - 2);
    } else {
        date.setDate(date.getDate() - 1);
    }
    return date;
};



