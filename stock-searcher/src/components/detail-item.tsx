import { Detail } from '@/lib/models';
import React from 'react';

export interface ItemProps {
    itemDetails: Detail;
}

export const DetailItem: React.FC<ItemProps> = ({ itemDetails }) => {
    return (
        <div className="flex flex-row justify-between border-b border-[#987C44] border-opacity-25 ">
            <span className="text-[#71716F] ">{itemDetails.displayableName}</span>
            <span>{itemDetails.dataPoint}</span>
        </div>
    );
};

export default DetailItem;