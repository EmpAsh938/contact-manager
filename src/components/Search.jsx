import { FaSearch } from "react-icons/fa";

export default function Search() {
    return (
        <div className="search">
            <div className="search_box">
                {/* search icon  */}
                <FaSearch className="search_icon" />
                <input type="text" placeholder="Search by name" />
            </div>
        </div>
    )
}