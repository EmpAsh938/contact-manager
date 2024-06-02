import { useState } from "react";
import { MdAdd, MdArrowDropDown, MdFilterAlt, MdSort } from "react-icons/md";
import { useGlobalContext } from "../context";


export default function Actions() {

    const { addContact, sortByName } = useGlobalContext();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [person, setPerson] = useState({
        id: '',
        name: '',
        address: '',
        email: '',
        phonenumber: '',
    })

    const handleModal = (e) => {
        if (e.target.classList.contains('modal')) {
            setIsModalOpen(false);
        }
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setPerson(prev => {
            return {
                ...prev,
                [name]: value
            }
        })

    }

    const submitContact = () => {
        const { name, address, phonenumber, email } = person;
        if (name !== '' && address !== '' && phonenumber !== '' && email !== '') {
            setPerson(prev => {
                return {
                    ...prev,
                    id: new Date().getTime(),
                }
            })
            addContact(person);
            setIsModalOpen(false);
            setPerson({
                id: '',
                name: '',
                address: '',
                email: '',
                phonenumber: '',
            })
        }
    }


    return (
        <div className="actions">
            <div className="actions_container">
                {/* sort  */}
                <div className="actions_box">
                    <div>
                        {/* icon  */}
                        <MdSort />
                        <span>Sortby</span>
                        {/* icon  */}
                        <MdArrowDropDown />
                    </div>

                    <div className="actions_select">
                        <span onClick={() => sortByName("asc")}>Ascending</span>
                        <span onClick={() => sortByName("desc")}>Descending</span>
                    </div>
                </div>


                {/* filter  */}
                <div className="actions_box">
                    <div>
                        {/* icon  */}
                        <MdFilterAlt />
                        <span>Filterby</span>
                        {/* icon  */}
                        <MdArrowDropDown />
                    </div>
                    <div className="actions_select">
                        <span>Gender</span>
                    </div>
                </div>

                {/* create new button  */}
                <button onClick={() => setIsModalOpen(true)}>
                    {/* icon  */}
                    <MdAdd className="icons" />
                    <span>Create new Contact</span>
                </button>

            </div>
            {/* new contact modal  */}
            {isModalOpen && <div onClick={handleModal} className="modal">
                <div className="modal_container">
                    <h2>Add new contact</h2>
                    <div className="modal_box">
                        <label htmlFor="name">Name</label>
                        <input onChange={handleChange} value={person.name} name="name" type="text" />
                    </div>
                    <div className="modal_box">
                        <label htmlFor="email">Email</label>
                        <input onChange={handleChange} value={person.email} name="email" type="text" />
                    </div>
                    <div className="modal_box">
                        <label htmlFor="phonenumber">Phonenumber</label>
                        <input onChange={handleChange} value={person.phonenumber} name="phonenumber" type="text" />
                    </div>
                    <div className="modal_box">
                        <label htmlFor="address">Address</label>
                        <input onChange={handleChange} value={person.address} name="address" type="text" />
                    </div>
                    <button
                        onClick={submitContact}
                        className="modal_button">Save</button>
                </div>
            </div>}
        </div>
    )
}