
export const numberFormat = Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1
});


export const roundTwoDecimals = (val: string): string => {
    return parseFloat(val).toFixed(2);
};
