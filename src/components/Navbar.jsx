import { MdLogout, MdNotifications, MdPerson } from "react-icons/md";
import Avatar from "./Avatar";
import { useLoaderData, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Navbar() {
    const { email, id } = useLoaderData();
    const navigate = useNavigate();
    return (
        <nav>
            <div className="nav_container">
                {/* title */}
                <h2>Contact Management</h2>

                {/* icons */}
                <div className="nav_icons">
                    <MdNotifications className="icons" />
                    <div className="profile">

                        <Avatar size={35} />
                        <div className="profile_modal">

                            <span>{id}</span>
                            <span>{email}</span>
                            <div onClick={() => {
                                toast.success('Successfully Logged out');
                                localStorage.clear();
                                navigate("/")
                            }}>
                                <span>Logout</span>
                                <MdLogout />
                            </div>
                        </div>
                    </div>
                    {/* <MdPerson className="icons person_icon" /> */}
                </div>
            </div>
        </nav>
    )
}