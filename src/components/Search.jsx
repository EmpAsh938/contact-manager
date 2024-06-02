import { FaSearch } from "react-icons/fa";
import { useGlobalContext } from "../context";

export default function Search() {

    const { searchUser } = useGlobalContext();


    const handleChange = (e) => {
        searchUser(e.target.value);
    }
    return (
        <div className="search">
            <div className="search_box">
                {/* search icon  */}
                <FaSearch className="search_icon" />
                <input onChange={handleChange} type="text" placeholder="Search by name" />
            </div>
        </div>
    )
}