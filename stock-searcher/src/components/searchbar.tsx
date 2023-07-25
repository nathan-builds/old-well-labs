import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import { tickerSymbols } from '@/data/tickers-data';

export interface SelectedStock {
    id: number,
    name: string,
    title: string
}

export interface SearchProps {
    onNewSearch: (stock:SelectedStock) => void;
}


/***
 * Search bar for new tickers, the auto search feature is based on a list of common stocks
 * in tickerSymbols. Ideally this would make request to the API to actually do a complete auto complete
 * search but the API tier does not allow for that
 * @param props
 * @constructor
 */
const Searchbar: React.FC<SearchProps> = (props) => {
    const tickers = tickerSymbols.map((ticker, idx) => {
        return {
            id: idx,
            name: ticker['ticker'],
            title: ticker['title']

        };
    });


    const handleOnSelect = (item: SelectedStock) => {
        // the item selected
        props.onNewSearch(item);
    };

    const handleOnFocus = () => {

    };

    const formatResult = (item: SelectedStock) => {
        return (
            <div className="flex flex-row text-sm med:text-xl lg:text-xl justify-between cursor-pointer p-2">
                <span>{item.name}</span>
                <span> {item.title}</span>
            </div>
        );
    };
    return (
        <ReactSearchAutocomplete

            styling={{
                backgroundColor: '#262523',
                borderRadius: '10px',
                border: 'none',
                color: '#EDEDED',
                hoverBackgroundColor: '#987C44',
            }}
            items={tickers}
            placeholder={'Search for ticker'}
            onSelect={handleOnSelect}
            onFocus={handleOnFocus}
            autoFocus
            formatResult={formatResult}
            maxResults={6}
        />);


};

export default Searchbar;