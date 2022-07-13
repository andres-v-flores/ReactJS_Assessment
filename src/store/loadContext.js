import { createContext, useState, useCallback } from "react";

const LoadContext = createContext({
    isLoading: false,
    errorState: {},
    stillLoading: ()=>{},
    doneLoading: ()=>{},
    changeError: (errorStat, errorMsg) =>{},
})
export const LoadContextProvider = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [errorState, setErrorState] = useState({isError: false, errorMessage: ''});
    
    const stillLoading = useCallback(() => {
        setIsLoading(true);
    },[]);

    const doneLoading = useCallback(() => {
        setIsLoading(false);
    },[]);

    const changeError = useCallback((errorStat, errorMsg) => {
        setErrorState({isError: errorStat, errorMessage: errorMsg})
    }, [])
    return(
        <LoadContext.Provider value={{
            isLoading: isLoading,
            stillLoading: stillLoading,
            doneLoading: doneLoading,
            errorState: errorState,
            changeError: changeError,
        }}>
            {props.children}
        </LoadContext.Provider>
    )
}
export default LoadContext
// this context manages the loading state to all pages and error