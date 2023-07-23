export const calculatePercentChange = (newNumber: number, oldNumber: number): number => {
    const change = ((newNumber - oldNumber) / oldNumber) * 100;
    const test = +change.toFixed(2);
    console.log(test);
    return test;
};

export const numberFormat = Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1
});