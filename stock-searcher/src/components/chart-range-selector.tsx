import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TimeRange } from '@/lib/models';
import React from 'react';


export interface RangeProps {
    changeRange: (range: TimeRange) => void;
}


const ChartRangeSelector:React.FC<RangeProps> = (props) => {

    const onRangeChange = (range: TimeRange) => {
        props.changeRange(range)
    };

    return (
        <Tabs defaultValue="1D" className="space-y-4 m-2">
            <TabsList className="bg-[#262523] text-[#EDEDED]">
                <TabsTrigger value="1D" onClick={e => onRangeChange('1D')}>1D</TabsTrigger>
                <TabsTrigger onClick={e => onRangeChange('5D')} value="5D">
                    5D
                </TabsTrigger>
                <TabsTrigger value="MTD" onClick={e => onRangeChange('MTD')}>
                    MTD
                </TabsTrigger>
                <TabsTrigger value="YTD" onClick={e => onRangeChange('YTD')}>
                    YTD
                </TabsTrigger>
                <TabsTrigger value="L3Y" onClick={e => onRangeChange('L3Y')}>
                    L3Y
                </TabsTrigger>
                <TabsTrigger value="L5Y" onClick={e => onRangeChange('L5Y')}>
                    L5Y
                </TabsTrigger>
            </TabsList>
        </Tabs>);

};

export default ChartRangeSelector;