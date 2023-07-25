import { Serie } from '@nivo/line';


export type DetailMap<T> = { [index: string]: T };

export interface StockDetails {
    Name: string,
    Exchange: string,
    Currency: string,
    Country: string,
    Sector: string,
    MarketCapitalization: string,
    '52WeekHigh': string,
    '52WeekLow': string,
    PERatio: string,
    EPS: string,
    TrailingPE: string,
    ForwardPE: string,
    AnalystTargetPrice: string,
}

export interface GlobalResponse {
    'Global Quote': GlobalQuote;
}

export interface GlobalQuote {
    '01. symbol': string;
    '02. open': string;
    '03. high': string;
    '04. low': string;
    '05. price': string;
    '06. volume': string;
    '07. latest trading day': Date;
    '08. previous close': string;
    '09. change': string;
    '10. change percent': string;
}


export interface GenericStockInformation {
    ticker: string,
    currentPrice: string,
    percentChange: string,
    name: string,
    currency: string,
    sector: string

}

export const initialChartState = {
    '5D': [],
    'YTD': [],
    'MTD': [],
    'L3Y': [],
    'L5Y': []
};


export interface ChartData {
    '5D': Serie[];
    'YTD': Serie[];
    'MTD': Serie[];
    'L3Y': Serie[];
    'L5Y': Serie[];
}


export type TimeRange = '5D' | 'MTD' | 'YTD' | 'L3Y' | 'L5Y'

export interface Detail {
    displayableName: string;
    dataPoint: string | number;
}

export interface FullDataPoint extends DataPoint {
    open: number;
    high: number;
    low: number;
    volume: number;
}

export interface DataPoint {
    time: Date;
    close: number;
}

export const chartFormat = {
    '5D': '%d',//day
    'MTD': '%b %d',
    'YTD': '%b',//monthDay
    'L3Y': '%Y', //monthYear
    'L5Y': '%Y' //monthYear/
};


