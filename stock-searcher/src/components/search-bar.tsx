import Turnstone from 'turnstone';
import { tickerSymbols } from '@/data/tickers-data';

const apiKey = 'HJYDCKZXO7XLDG26';
const url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=ttd&apikey=${apiKey}`;


const SearchBar = (props) => {
    console.log('NEW SEARCH BAR RENDERED');
    let prevItem = '';

    const styles = {
        input: 'w-full py-2 px-4 text-2xl outline-none rounded-md bg-[#262523]',
        listbox: 'bg-[#987C44] w-full text-sm md:text-2xl font-medium rounded-md text-black cursor-pointer',
        highlightedItem: 'bg-[#ad9669] rounded-md ml-1 mr-1',
        query: 'text-[#EDEDED] placeholder:text-slate-600',
        typeahead: '',
        clearButton:
            'absolute inset-y-0 text-lg right-0 w-10 inline-flex items-center justify-center bg-netural-700 hover:text-red-500',
        noItems: 'cursor-default text-center my-20',
        match: 'font-semibold',
        groupHeading: 'px-5 py-3 text-pink-500'
        // item: 'm-5 text-[#EDEDED] '
    };

    const Item = ({ item }) => {
        return (
            <div
                className="flex flex-row justify-between m-2 text-[#262523] border-b border-[#262523] border-opacity-25">
                <span>{item.ticker}</span>
                <span>{item.title}</span>
            </div>
        );
    };

    const listbox = {
        displayField: 'characters',
        data: async (query: string) => {
            const results = tickerSymbols.filter(item => item.ticker.startsWith(query.toUpperCase()));
            return results;


        },
        searchType: 'startsWith'

    };


    const handleSelect = (item) => {
        if (item) {
            props.testChange();
        }

    };


    return (
        <Turnstone
            Item={Item}
            onSelect={handleSelect}
            listbox={listbox}
            id="search"
            styles={styles}
            name="search"
            autoFocus={true}
            typeahead={true}
            clearButton={true}
            debounceWait={250}
            listboxIsImmutable={false}
            maxItems={6}
            noItemsMessage="We ticker matches your search"
            placeholder="Search for stock ticker"></Turnstone>
    );

};

export default SearchBar;