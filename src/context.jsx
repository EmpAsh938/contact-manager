import { useEffect, useState } from "react";
import { useContext, createContext } from "react";


export const AppContext = createContext(null);

const AppProvider = ({ children }) => {

    const [contact, setContact] = useState([]);
    const [rows, setRows] = useState(5);
    const [pages, setPages] = useState(5);

    const addContact = (person) => {
        setContact(prev => {
            return [...prev, person]
        })
        // fetch('url', {}).then(resp => resp.json()).then(result => setContact([...contact,...result]))
    }

    const deleteContact = (id) => {
        setContact(prev => {
            return prev.filter(item => item.id !== id);
        })
    }


    useEffect(() => {
        // fetch('url').then(resp => resp.json()).then(result => setContact([...result]))
    }, [])
    return (
        <AppContext.Provider
            value={{
                contact,
                rows,
                pages,
                addContact,
                deleteContact
            }}
        >
            {children}
        </AppContext.Provider>
    )
}


export const useGlobalContext = () => useContext(AppContext);

export default AppProvider;