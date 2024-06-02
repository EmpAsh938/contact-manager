import { MdArrowBack, MdArrowForward } from "react-icons/md";
import { useGlobalContext } from "../context";

export default function Pagination() {
    const { contact, rows, pages, paginate } = useGlobalContext();
    return (
        <div className="pagination">
            <p>Showing <span className="pagination_span">{pages * rows - 5 + 1}</span> to <span className="pagination_span">{pages * rows}</span> of <span className="pagination_span">{contact.length}</span> entries</p>
            <div>
                <button onClick={() => paginate("prev")} className="pagination_button">
                    <MdArrowBack />
                    <span>Previous</span>
                </button>
                <button onClick={() => paginate("next")} className="pagination_button">
                    <span>Next</span>
                    <MdArrowForward />
                </button>
            </div>
        </div>
    )
}