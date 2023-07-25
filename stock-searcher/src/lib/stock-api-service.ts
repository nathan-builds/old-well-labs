import {
    Detail,
    DataPoint,
    ChartData,
    StockDetails, GenericStockInformation, GlobalResponse
} from '@/lib/models';

// would have this as an environment variable, fine for now here
const apiKey = 'UZIV4BJBISXTBDTH';


import { Datum } from '@nivo/line';
import { numberFormat, roundTwoDecimals } from '@/lib/stockUtils';



export class APIStockService {
    static baseURL = `https://www.alphavantage.co/query?`;

    /***
     * Get the info for different time periods. Intra day is needed to show better data points for 5D and MTD intervals,
     * daily Data is needed for the rest of the time periods
     * @param stockSymbol
     */
    static async getStockChartData(stockSymbol: string): Promise<ChartData> {
        const intraDayURL = `${this.baseURL}function=TIME_SERIES_INTRADAY&symbol=${stockSymbol}&interval=5min&outputsize=full&apikey=${apiKey}`;
        const dailyURL = `${this.baseURL}function=TIME_SERIES_DAILY&symbol=${stockSymbol}&interval=5min&outputsize=full&apikey=${apiKey}`;
        const dailySmaURL = `${this.baseURL}function=SMA&symbol=${stockSymbol}&interval=daily&min&time_period=10&series_type=open&apikey=${apiKey}`;
        const intraSmaUrl = `${this.baseURL}function=SMA&symbol=${stockSymbol}&interval=60min&time_period=10&series_type=open&apikey=${apiKey}`;


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
            (dataPoint => dataPoint.time.getFullYear() - (currentDate.getFullYear() - 4) > 0)
        );
        const [l5Y, smaL5Y] = dateRangeFilter(
            [cleanDailyData, cleanDailySMAData],
            (dataPoint => dataPoint.time.getFullYear() - (currentDate.getFullYear() - 6) > 0)
        );

        const fiveDaySma = fiveDayHelperFilter(cleanIntraSMAData);


        return {
            '5D': [{ id: 'Price', data: fiveDay }, { id: 'SMA', data: fiveDaySma }],
            'MTD': [{ id: 'Price', data: mtd }, { id: 'SMA', data: mtdSma }],
            'YTD': [{ id: 'Price', data: ytd }, { id: 'SMA', data: smaYtd }],
            'L3Y': [{ id: 'Price', data: l3Y }, { id: 'SMA', data: smaL3Y }],
            'L5Y': [{ id: 'Price', data: l5Y }, { id: 'SMA', data: smaL5Y }]
        };
    };

    /***
     * Get generic stock information, this requires 2 endpoints due to how the data is structured in the API
     * @param ticker
     */
    static async getGenericStockInformation(ticker: string): Promise<GenericStockInformation> {
        const overviewURL = `${this.baseURL}function=OVERVIEW&symbol=${ticker}&apikey=${apiKey}`;
        const globalURL = `${this.baseURL}function=GLOBAL_QUOTE&symbol=${ticker}&apikey=${apiKey}`;
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

    /***
     * Get the detailed stock information, again this is a combination of 2 endpoints that are needed to display the
     * necessary details for the given stock. Put each of the details that should be displayed into a Detail type.
     * This allows a better visual display of the parameter rather than just the API object name
     * @param ticker
     */
    static async getDetailedStockInformation(ticker: string): Promise<Detail[]> {
        const overviewURL = `${this.baseURL}function=OVERVIEW&symbol=${ticker}&apikey=${apiKey}`;
        const globalURL = `${this.baseURL}function=GLOBAL_QUOTE&symbol=${ticker}&apikey=${apiKey}`;
        const overviewResponse = await fetch(overviewURL);
        const globalResponse = await fetch(globalURL);
        const stockDetails: StockDetails = await overviewResponse.json();
        const globalDetails: GlobalResponse = await globalResponse.json();
        const details: Detail[] = [];

        details.push({ displayableName: 'P/E', dataPoint: stockDetails.PERatio });
        details.push({ displayableName: '52W. High', dataPoint: stockDetails['52WeekHigh'] });
        details.push({ displayableName: '52W. Low', dataPoint: stockDetails['52WeekLow'] });
        details.push({
            displayableName: 'Mkt. Cap',
            dataPoint: numberFormat.format(+stockDetails.MarketCapitalization)
        });
        details.push({ displayableName: 'EPS', dataPoint: stockDetails.EPS });
        details.push({ displayableName: 'TRL. P/E', dataPoint: stockDetails.TrailingPE });
        details.push({ displayableName: 'FWD. P/E', dataPoint: stockDetails.ForwardPE });
        details.push({
            displayableName: 'TGT. Price',
            dataPoint: roundTwoDecimals(stockDetails.AnalystTargetPrice)
        });
        details.push({
            displayableName: 'Open',
            dataPoint: roundTwoDecimals(globalDetails['Global Quote']['02. open'])
        });
        details.push({
            displayableName: 'Low',
            dataPoint: roundTwoDecimals(globalDetails['Global Quote']['04. low'])
        });
        details.push({
            displayableName: 'High',
            dataPoint: roundTwoDecimals(globalDetails['Global Quote']['03. high'])
        });
        details.push({
            displayableName: 'Volume',
            dataPoint: numberFormat.format(+globalDetails['Global Quote']['06. volume'])
        });


        return details;
    }




}

/***
 * Alpha Vantage API has weird object keys with spaces and numbers as well as the time being a key itself.
 * This 'cleans' the data to put it in a more workable form for all downstream functions that need/want to use it.
 * @param data data to clean
 * @param timeSeries time series key
 * @param isSMA is it SMA data or price data
 */
const cleanAPIData = (data: any, timeSeries: string, isSMA: boolean): DataPoint[] => {
    console.log('DATA', data)
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

/***
 * Filter the data according to the given filter function
 * @param data sets of data to be filtered
 * @param filterFunc function used to filter
 */
const dateRangeFilter = (data: DataPoint[][], filterFunc: (dataPoint: DataPoint) => boolean): Datum[][] => {
    return data.map(dataSet => {
        return dataSet
            .filter(filterFunc)
            .map(filteredPoint => ({ x: filteredPoint.time, y: filteredPoint.close }));
    });


};

/**
 * More complicated to get last five days as weekends are not in the data.
 * Take the current day -1 because their data always starts one day behind at this API tier,
 * and get the last 5 days of trading activity
 * @param data
 */
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


/***
 * Adjust the date to start on a weekday
 * @param date
 */
//0 = Sunday 6= Saturday
const adjustDateToWeekday = (date: Date): Date => {
    if (date.getDay() === 0) {
        date.setDate(date.getDate() - 2);
    } else if (date.getDay() === 6) {
        date.setDate(date.getDate() - 1);
    }
    return date;
};


