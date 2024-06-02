import { FaEdit, FaTrash } from "react-icons/fa";
import Avatar from "./Avatar";
import { useEffect, useState } from "react";
import { useGlobalContext } from "../context";
import { useLoaderData } from "react-router-dom";

export default function Table() {

    const { contact, deleteContact, editContact, pages, rows, isLoading } = useGlobalContext();

    const { id } = useLoaderData();

    const [isModalOpen, setIsModalOpen] = useState({
        deleteModal: false,
        editModal: false,
    });
    const [editingData, setEditingData] = useState({

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

    const handleEdit = (person) => {
        toggleModal('edit', true);
        setEditingData({ ...person });
    }

    const handleDelete = (person) => {
        deleteContact(person, id);
        toggleModal('delete', false);
    }

    const handleChange = (e) => {
        const name = e.target.name;
        setEditingData({
            ...editingData,
            [name]: e.target.value,
        })
    }

    const handleEditChanges = () => {
        toggleModal('edit', false);
        editContact(editingData);
    }

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
                    {contact.slice(pages - 1, pages + rows - 1).map((item, index) => {
                        const { name, email,
                            phone } = item;
                        console.log(item)
                        return (
                            <tr key={index}>
                                <td className="table_actions">
                                    <input type="checkbox" name="" id="" />
                                    <Avatar size={30} />
                                    <span>
                                        {name}
                                    </span>

                                </td>

                                <td>{email}</td>
                                <td>{phone}</td>
                                <td>{'Wellington'}</td>
                                <td className="table_actions">
                                    <FaEdit
                                        onClick={() => handleEdit(item)}
                                        className="icons icon-edit" />
                                    <FaTrash
                                        onClick={() => toggleModal('delete', true)}
                                        className="icons icon-delete" />
                                </td>
                                {/* edit contact modal  */}
                                {isModalOpen.editModal && <div onClick={handleModal} className="modal">
                                    <div className="modal_container">
                                        <h2>Edit contact</h2>
                                        <div className="modal_box">
                                            <label htmlFor="name">Name</label>
                                            <input name="name" value={editingData.name} onChange={handleChange} type="text" />
                                        </div>
                                        <div className="modal_box">
                                            <label htmlFor="email">Email</label>
                                            <input type="text" name="email" value={editingData.email} onChange={handleChange} />
                                        </div>
                                        <div className="modal_box">
                                            <label htmlFor="phone">Phonenumber</label>
                                            <input type="text" name="phone" value={editingData.phone} onChange={handleChange} />
                                        </div>
                                        {/* <div className="modal_box">
                                            <label htmlFor="address">Address</label>
                                            <input
                                                value={editingData.address}
                                                type="text" onChange={handleChange} />
                                        </div> */}
                                        <button onClick={handleEditChanges} className="modal_button">Save Changes</button>
                                    </div>
                                </div>}
                                {/* delete modal */}
                                {isModalOpen.deleteModal && <div onClick={handleModal} className="modal">
                                    <div className="modal_container">
                                        <h2>Remove the contact</h2>
                                        <p>Do you want to remove the selected contact detail? If clicked ‘Yes, delete’ will remove the contact permanently. Click ‘No, don’t to cancel the action.</p>
                                        <div className="modal_button_container">
                                            <button onClick={() => handleDelete(item)}>
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




        </div>
    )
}