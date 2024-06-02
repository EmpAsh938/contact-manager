import { useState, useContext, createContext } from "react";
import { BASE_URL } from "./constants";
import toast from "react-hot-toast";
import axios from 'axios';

export const AppContext = createContext(null);

const AppProvider = ({ children }) => {

    const [list, setList] = useState([]);
    const [contact, setContact] = useState([]);
    const [rows, setRows] = useState(5);
    const [pages, setPages] = useState(1);
    const [isLoading, setIsLoading] = useState(true);


    const addContact = async (person, id) => {
        console.log(person)
        axios.post(BASE_URL + "/api/v1/user/" + id + "/contacts", { ...person })
            .then(response => {
                console.log(response)
                setContact(prev => {
                    return [...prev, person]
                })
                toast.success('Successfully added')
            })
            .catch(error => {
                toast.error(error)
            })

    }

    const editContact = (person) => {
        // api call
        axios.put(BASE_URL + "/api/v1/" + person.contactId, { ...person })
            .then(response => {
                console.log(response)
                setContact(prev => {
                    return prev.map(item => {
                        if (item.contactId === person.contactId) {
                            return person;
                        }
                        return item;
                    })
                })
                toast.success('Successfully edited')
            })
            .catch(error => {
                toast.error(error)
            })

        // setContact()
        // messages
    }

    const deleteContact = (person, id) => {
        axios.delete(BASE_URL + "/api/v1/users/" + id + "/contacts/" + person.contactId)
            .then(response => {
                console.log(response)
                let filteredItems = contact.filter(item => item.contactId != person.contactId);
                setContact([...filteredItems])
                toast.success('Successfully removed')
            })
            .catch(error => {
                toast.error(error)
            })

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

    const loadContacts = async (id) => {

        axios.get(BASE_URL + "/api/v1/user/" + id + "/contacts")
            .then(response => {
                setContact([...response.data]);
                setList([...response.data]);
                toast.success('Contact List Fetched')
            }).catch(error => {
                toast.error(error)
                console.log(error)
            })
        setIsLoading(false)

    }

    const sortByName = (type) => {
        setContact(prevContacts => {
            const sortedContacts = [...prevContacts].sort((a, b) => {
                const nameA = a.name.toUpperCase();
                const nameB = b.name.toUpperCase();

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


        let filteredItems = list.filter(item => item.name.toLowerCase().includes(name.toLowerCase()));

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