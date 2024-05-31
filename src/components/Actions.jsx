import { useState } from "react";
import { MdAdd, MdArrowDropDown, MdFilterAlt, MdSort } from "react-icons/md";

export default function Actions() {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModal = (e) => {
        if (e.target.classList.contains('modal')) {
            setIsModalOpen(false);
        }
    }

    return (
        <div className="actions">
            <div className="actions_container">
                {/* filter  */}
                <div className="actions_box">
                    <div>
                        {/* icon  */}
                        <MdSort />
                        <span>Sortby</span>
                        {/* icon  */}
                        <MdArrowDropDown />
                    </div>

                    <div className="actions_select">
                        <span>Ascending</span>
                        <span>Descending</span>
                    </div>
                </div>


                {/* sort  */}
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
                    <button className="modal_button">Save</button>
                </div>
            </div>}
        </div>
    )
}