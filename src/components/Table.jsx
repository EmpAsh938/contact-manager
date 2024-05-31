import { FaEdit, FaTrash } from "react-icons/fa";
import Avatar from "./Avatar";
import { useEffect, useState } from "react";
import { useGlobalContext } from "../context";

export default function Table() {

    const { contact, deleteContact } = useGlobalContext();

    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState({
        deleteModal: false,
        editModal: false,
    });



    const toggleModal = (type, value) => {
        setIsModalOpen(prev => {
            if (type === "delete") {
                return { ...prev, deleteModal: value };
            }
            if (type === "edit") {
                return { ...prev, editModal: value };
            }
        })
    }

    const handleModal = (e) => {
        if (e.target.classList.contains('modal')) {
            setIsModalOpen({ editModal: false, deleteModal: false });
        }
    }

    useEffect(() => {
        let timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000)

        return () => clearTimeout(timer);
    }, [])

    if (isLoading) {
        return (
            <div className="loader">
                <div className="loader_box"></div>
            </div>
        )
    }

    return (
        <div className="table">
            <table>
                <thead>
                    <tr>
                        <th className="table_actions">
                            <input type="checkbox" name="" id="" />
                            <span>
                                Name
                            </span>
                        </th>
                        <th>Email</th>
                        <th>Phonenumber</th>
                        <th>Address</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {contact.map(item => {
                        const { id, name, email, phonenumber, address } = item;
                        return (
                            <tr key={id}>
                                <td className="table_actions">
                                    <input type="checkbox" name="" id="" />
                                    <Avatar size={30} />
                                    <span>
                                        {name}
                                    </span>

                                </td>

                                <td>{email}</td>
                                <td>{phonenumber}</td>
                                <td>{address}</td>
                                <td className="table_actions">
                                    <FaEdit
                                        onClick={() => toggleModal('edit', true)}
                                        className="icons icon-edit" />
                                    <FaTrash
                                        onClick={() => toggleModal('delete', true)}
                                        className="icons icon-delete" />
                                </td>
                                {/* delete modal */}
                                {isModalOpen.deleteModal && <div onClick={handleModal} className="modal">
                                    <div className="modal_container">
                                        <h2>Remove the contact</h2>
                                        <p>Do you want to remove the selected contact detail? If clicked ‘Yes, delete’ will remove the contact permanently. Click ‘No, don’t to cancel the action.</p>
                                        <div className="modal_button_container">
                                            <button onClick={() => deleteContact(id)}>
                                                Yes, delete
                                            </button>
                                            <button onClick={() => toggleModal('delete', false)}>No, don't</button>
                                        </div>
                                    </div>
                                </div>}
                            </tr>
                        )
                    })}
                </tbody>
            </table>

            {/* edit contact modal  */}
            {isModalOpen.editModal && <div onClick={handleModal} className="modal">
                <div className="modal_container">
                    <h2>Edit contact</h2>
                    <div className="modal_box">
                        <label htmlFor="name">Name</label>
                        <input type="text" />
                    </div>
                    <div className="modal_box">
                        <label htmlFor="email">Email</label>
                        <input type="text" />
                    </div>
                    <div className="modal_box">
                        <label htmlFor="phonenumber">Phonenumber</label>
                        <input type="text" />
                    </div>
                    <div className="modal_box">
                        <label htmlFor="address">Address</label>
                        <input type="text" />
                    </div>
                    <button className="modal_button">Save Changes</button>
                </div>
            </div>}


        </div>
    )
}