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

export interface GlobalResponse{
    "Global Quote": GlobalQuote;
}

export interface GlobalQuote {
    "01. symbol":             string;
    "02. open":               string;
    "03. high":               string;
    "04. low":                string;
    "05. price":              string;
    "06. volume":             string;
    "07. latest trading day": Date;
    "08. previous close":     string;
    "09. change":             string;
    "10. change percent":     string;
}


export interface GenericStockInformation {
    currentPrice: string,
    percentChange: string,
    name:string,
    currency:string,
    sector:string

}

export const initialStockInfoState = {

    currentPrice: '',
    percentChange: '',
};

export const initialChartState = {
    '1D': [],
    '5D': [],
    'YTD': [],
    'MTD': [],
    'L3Y': [],
    'L5Y': []
};


export interface ChartData {
    '1D': Serie[];
    '5D': Serie[];
    'YTD': Serie[];
    'MTD': Serie[];
    'L3Y': Serie[];
    'L5Y': Serie[];
}


export type TimeRange = '1D' | '5D' | 'MTD' | 'YTD' | 'L3Y' | 'L5Y'

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
    '1D': '%I %p', //hour
    '5D': '%b %d',//day
    'MTD': '%b %d',
    'YTD': '%b %d',//monthDay
    'L3Y': '%b %Y', //monthYear
    'L5Y': '%Y' //monthYear/
};


export const hourFormat = '%I %p';
export const monthDayFormat = '%b %d';
export const monthYearFormat = '%b %d';
export const dayFormat = '%a';

