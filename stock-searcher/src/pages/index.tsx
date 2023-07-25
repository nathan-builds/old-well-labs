import StockSearcher from '@/components/stock-searcher';
import { useSession } from 'next-auth/react';
import { createContext, useState } from 'react';
import { setRequestMeta } from 'next/dist/server/request-meta';
import { Dialog, DialogContent } from '@/components/ui/dialog';


/***
 * Error context available to all the components, any component that catches an error
 * can set the error to true and it will display the error dialog
 */
export const ErrorContext = createContext({
    error: false,
    setError: (val: boolean) => {
    }
});

export default function Home() {

    const [errorState, setErrorState] = useState(false);


    // NOTE: This hook can be used to grab session for any components that need
    // authentication/authorization as information about the user such as access token/ role can be stored
    // in the session using next-auth framework. if(no_session) redirect user to login page
    const { data: session } = useSession();

    return (
        <ErrorContext.Provider value={{ error: false, setError: setErrorState }}>
            <Dialog open={errorState} onOpenChange={() => setErrorState(false)}>
                <DialogContent>
                    Error occurred in API, please wait 60 seconds and refresh page
                </DialogContent>
            </Dialog>
            <StockSearcher></StockSearcher>
        </ErrorContext.Provider>
    );

}
