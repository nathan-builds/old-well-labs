import { ResponsiveLine } from '@nivo/line';
import { chartTheme } from '@/lib/chart-theme';
import React, { useContext, useEffect, useState } from 'react';
import ChartRangeSelector from '@/components/chart-range-selector';
import { ChartData, chartFormat, initialChartState, TimeRange } from '@/lib/models';
import { APIStockService } from '@/lib/stock-api-service';
import { ErrorContext } from '@/pages';


export interface ChartProps {
    ticker: string;
}

/***
 * Main chart to display actual stock data with variable ranges
 * @param props
 * @constructor
 */
const StockChart: React.FC<ChartProps> = (props) => {

    const [chartData, setChartData] = useState<ChartData>(initialChartState);
    const [chartRange, setChartRange] = useState<TimeRange>('5D');
    const [format, setChartFormat] = useState(chartFormat['5D']);
    const errorContext = useContext(ErrorContext);


    useEffect(() => {
        APIStockService.getStockChartData(props.ticker)
            .then(chartData => {
                    setChartData(chartData);
                }
            ).catch(e => errorContext.setError(true));
    }, [props]);

    const changeRange = (range: TimeRange) => {
        setChartRange(range);
        setChartFormat(chartFormat[range]);
    };


    return (
        <div className="h-full">
            <ChartRangeSelector changeRange={changeRange}></ChartRangeSelector>
            <ResponsiveLine
                theme={chartTheme}
                data={chartData[chartRange]}
                margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                xScale={{ type: 'time' }}
                yScale={{
                    type: 'linear',
                    min: 'auto',
                    max: 'auto',
                    stacked: false,
                    reverse: false
                }}
                xFormat="time:%Y-%m-%d"
                yFormat=" >-$.2f"
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    tickSize: 5,
                    tickValues: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legendOffset: 36,
                    legendPosition: 'middle',
                    format: format
                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legendOffset: -40,
                    legendPosition: 'middle'
                }}
                colors={['#E8A44D', '#C45728', '#987C44']}
                enableArea={true}
                areaOpacity={0.04}
                enableGridX={false}
                pointSize={0}
                pointColor={{ theme: 'background' }}
                pointBorderWidth={2}
                pointBorderColor={{ from: 'serieColor' }}
                pointLabelYOffset={-12}
                useMesh={true}
                legends={[
                    {
                        anchor: 'bottom-right',
                        direction: 'column',
                        justify: false,
                        translateX: 100,
                        translateY: 0,
                        itemsSpacing: 0,
                        itemDirection: 'left-to-right',
                        itemWidth: 80,
                        itemHeight: 20,
                        itemOpacity: 0.75,
                        symbolSize: 12,
                        symbolShape: 'circle',
                        symbolBorderColor: 'rgba(0, 0, 0, .5)',
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemBackground: 'rgba(0, 0, 0, .03)',
                                    itemOpacity: 1
                                }
                            }
                        ]
                    }
                ]}
            />
        </div>
    );
};

export default StockChart;
