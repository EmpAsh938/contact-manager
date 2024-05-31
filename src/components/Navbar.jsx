import { MdNotifications, MdPerson } from "react-icons/md";
import Avatar from "./Avatar";

export default function Navbar() {
    return (
        <nav>
            <div className="nav_container">
                {/* title */}
                <h2>Contact Management</h2>

                {/* icons */}
                <div className="nav_icons">
                    <MdNotifications className="icons" />
                    <Avatar size={35} />
                    {/* <MdPerson className="icons person_icon" /> */}
                </div>
            </div>
        </nav>
    )
}