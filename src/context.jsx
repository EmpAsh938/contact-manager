import { useState, useContext, createContext } from "react";
import { BASE_URL } from "./constants";
import toast from "react-hot-toast";

export const AppContext = createContext(null);

const AppProvider = ({ children }) => {

    const [list, setList] = useState([]);
    const [contact, setContact] = useState([]);
    const [rows, setRows] = useState(5);
    const [pages, setPages] = useState(1);
    const [isLoading, setIsLoading] = useState(true);


    const addContact = (person) => {
        // fetch('url', {person}).then(resp => resp.json()).then(result => setContact([...contact,...result]))
        setContact(prev => {
            return [...prev, person]
        })
        toast.success('Successfully added')

    }

    const editContact = (person) => {
        // api call
        // fetch('url', {person}).then(resp => resp.json()).then(result => setContact([...contact,...result]))
        setContact(prev => {
            return prev.map(item => {
                if (item.email === person.email) {
                    return person;
                }
                return item;
            })
        })
        toast.success('Successfully edited')

        // setContact()
        // messages
    }

    const deleteContact = (person) => {
        // fetch('url', {id}).then(resp => resp.json()).then(result => setContact([...contact,...result]))
        let filteredItems = contact.filter(item => item.email != person.email);
        setContact([...filteredItems])
        toast.success('Successfully removed')
    }

    const paginate = (type) => {
        if (type === 'prev' && pages > 1) {
            setPages(prev => prev - 1);
        }
        let totalPages = contact.length / rows;
        if (type === 'next' && pages < totalPages) {
            setPages(prev => prev + 1);
        }
    }

    const loadContacts = async () => {
        try {
            const response = await fetch(BASE_URL);
            const result = await response.json();
            if (result.results) {
                setContact([...result.results]);
                setList([...result.results]);
                toast.success('Contact List Fetched')
            }
        } catch (error) {
            toast.error(error)
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    const sortByName = (type) => {
        setContact(prevContacts => {
            const sortedContacts = [...prevContacts].sort((a, b) => {
                const nameA = a.name.first.toUpperCase();
                const nameB = b.name.first.toUpperCase();

                if (type === 'asc') {
                    if (nameA < nameB) return -1;
                    if (nameA > nameB) return 1;
                    return 0;
                }

                if (type === 'desc') {
                    if (nameA > nameB) return -1;
                    if (nameA < nameB) return 1;
                    return 0;
                }

                return 0;
            });

            return sortedContacts;
        });
    }

    const searchUser = (name) => {


        let filteredItems = list.filter(item => item.name.first.toLowerCase().includes(name.toLowerCase()));

        if (name) {
            setContact(filteredItems);
        } else {
            setContact(list);
        }
    }

    return (
        <AppContext.Provider
            value={{
                contact,
                rows,
                pages,
                isLoading,
                loadContacts,
                addContact,
                editContact,
                deleteContact,
                paginate,
                sortByName,
                searchUser,
            }}
        >
            {children}
        </AppContext.Provider>
    )
}


export const useGlobalContext = () => useContext(AppContext);

export default AppProvider;