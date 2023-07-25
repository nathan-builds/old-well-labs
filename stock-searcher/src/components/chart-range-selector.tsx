import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TimeRange } from '@/lib/models';
import React from 'react';


export interface RangeProps {
    changeRange: (range: TimeRange) => void;
}


const ChartRangeSelector: React.FC<RangeProps> = (props) => {

    const onRangeChange = (range: TimeRange) => {
        props.changeRange(range);
    };

    return (
        <Tabs defaultValue="5D" className="space-y-4 m-2">
            <TabsList className="bg-[#262523] text-[#EDEDED]">
                {['5D', 'MTD','YTD', 'L3Y', 'L5Y'].map((range, idx) =>
                    <TabsTrigger key={idx} value={range} onClick={() => onRangeChange(range as TimeRange)}>
                        {range}
                    </TabsTrigger>
                )}
            </TabsList>
        </Tabs>);

};

export default ChartRangeSelector;