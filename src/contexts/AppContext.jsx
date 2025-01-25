import { createContext, useState } from "react";


const GlobalContext = createContext();


const GlobalContextProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState({
        user_id: null,
        email: '',
        role: ''
    })


    const contextValue = {
        // user
        isLoggedIn, setIsLoggedIn,
        user, setUser,
        isLoading ,setIsLoading,
        message, setMessage

    };

    return (
        <GlobalContext.Provider value={contextValue}>
            {children}
        </GlobalContext.Provider>
    );
}



export { GlobalContext, GlobalContextProvider };