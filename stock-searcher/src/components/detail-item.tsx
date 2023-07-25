import { Detail } from '@/lib/models';
import React from 'react';

export interface ItemProps {
    itemDetails: Detail;
}

/***
 *
 * @param itemDetails Contains the data point to display along with the displayable name for the param
 * @constructor
 */

export const DetailItem: React.FC<ItemProps> = ({ itemDetails }) => {
    return (
        <div className="flex flex-row justify-between border-b border-[#987C44] border-opacity-25 ">
            <span className="text-[#71716F] text-[15px] ">{itemDetails.displayableName}</span>
            <span className='text-md'>{itemDetails.dataPoint}</span>
        </div>
    );
};

export default DetailItem;