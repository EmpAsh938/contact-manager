import { MdArrowBack, MdArrowForward } from "react-icons/md";
import { useGlobalContext } from "../context";

export default function Pagination() {
    const { contact, rows, pages } = useGlobalContext();
    return (
        <div className="pagination">
            <p>Showing <span className="pagination_span">{pages}</span> to <span className="pagination_span">{pages * rows}</span> of <span className="pagination_span">{contact.length}</span> entries</p>
            <div>
                <button className="pagination_button">
                    <MdArrowBack />
                    <span>Previous</span>
                </button>
                <button className="pagination_button">
                    <span>Next</span>
                    <MdArrowForward />
                </button>
            </div>
        </div>
    )
}