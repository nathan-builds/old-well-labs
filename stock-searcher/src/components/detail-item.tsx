import { Detail } from '@/lib/models';
import React from 'react';

export interface ItemProps {
    itemDetails: Detail;
}

export const DetailItem: React.FC<ItemProps> = ({ itemDetails }) => {
    return (
        <div className="flex flex-row justify-between border-b border-[#987C44] border-opacity-25 ">
            <span className="text-[#71716F] text-[15px] ">{itemDetails.displayableName}</span>
            <span className='text-md'>{itemDetails.dataPoint}</span>
        </div>
    );
};

export default DetailItem;