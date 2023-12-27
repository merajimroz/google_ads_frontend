import { createContext, useState, useContext } from "react";

// Create the context
const ClientContext = createContext()

// Create a provider component
export const ClientProvider = ({ children }) => {
    const [currentClient, setCurrentClient] = useState({
        'customerId': '2215958043',
        'campaignId': '20856085585',
        'adGroupResourceName': ''
    })

    return (
        <ClientContext.Provider value={{currentClient, setCurrentClient}}>
            {children}
        </ClientContext.Provider>
    )
}

// create a custom hook for using context
export const useClient = () => {
    const context = useContext(ClientContext)

    if(!context) {
        throw new Error('useClient must be used within a client Provider')
    }
    return context
}